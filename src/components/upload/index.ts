/*
 * @Descripttion: upload组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component, state } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import type { PropertyValues } from 'lit';

/**
 * upload组件
 * 支持 auto-upload：为 true 时选完即上传（默认）；为 false 时仅收集文件，随表单提交（需配合 form 使用）。
 *
 * @slot - 默认插槽，触发上传的元素
 * @slot tip - 提示说明文字
 */
@customElement('nv-upload')
export class NvUpload extends Component {
  /**
   * 表单关联支持（auto-upload 为 false 时，选中的文件会随 form 提交）
   */
  static formAssociated = true;

  /**
   * 焦点委托：校验失败时表单会 focus 到无效控件，委托到内部 input 使其可聚焦，避免 "is not focusable" 报错
   */
  static shadowRootOptions: ShadowRootInit = {
    mode: 'open',
    delegatesFocus: true
  };

  /**
   * ElementInternals 实例，用于表单集成
   */
  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  /**
   * 是否选完文件后立即上传，默认 true；为 false 时仅收集文件，随表单提交
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-upload' })
  autoUpload: boolean = true;

  /**
   * 上传的地址（auto-upload 为 true 时必填）
   */
  @property({ type: String })
  action: string = '';

  /**
   * 设置上传的请求头部
   */
  @property({ type: Object })
  headers: Record<string, string> = {};

  /**
   * 是否支持多选文件
   */
  @property({ type: Boolean })
  multiple: boolean = false;

  /**
   * 上传时附带的额外参数
   */
  @property({ type: Object })
  data: Record<string, any> = {};

  /**
   * 接受上传的文件类型
   */
  @property({ type: String })
  accept: string = '';

  /**
   * 是否支持拖拽上传
   */
  @property({ type: Boolean })
  drag: boolean = false;

  /**
   * 是否禁用
   */
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * 最大允许上传个数
   */
  @property({ type: Number })
  limit: number = 0;

  /**
   * 表单字段名称（用于表单提交，auto-upload 为 false 时生效）
   */
  @property({ type: String, reflect: true })
  name: string = 'file';

  /**
   * 关联的表单 id（与原生 form 属性一致，用于在表单外仍可参与提交与校验）
   */
  @property({ type: String, reflect: true })
  form: string = '';

  /**
   * 是否必选（至少选一个文件时参与 form.reportValidity() / checkValidity()）
   */
  @property({ type: Boolean, reflect: true })
  required: boolean = false;

  /**
   * 用于为每个文件项分配唯一 id，供列表 key 使用，避免删除时 Lit 复用 DOM 导致下方项跳动
   */
  private _fileIdCounter: number = 0;

  /**
   * 刚加入列表、正在播放进入过渡的文件项 id 集合，一帧后移除 class 以触发过渡
   */
  private _enteringIds: Set<number> = new Set();

  /**
   * 正在执行删除过渡的项索引，过渡结束后再真正从列表移除
   */
  @state()
  private _removingIndex: number | null = null;

  /**
   * 文件列表
   */
  @state()
  private _fileList: Array<{
    id: number;
    name: string;
    url?: string;
    thumbUrl?: string;
    status: 'ready' | 'uploading' | 'success' | 'fail';
    file?: File;
  }> = [];

  /**
   * 处理文件选择
   */
  protected _handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) {
      return;
    }

    const filesArray = Array.from(files);

    // limit > 0 时：先加入至多 (limit - 当前数量) 个文件，超出部分通过 nv-exceed 通知，避免整批被丢弃导致列表为空
    const maxAdd = this.limit > 0
      ? Math.max(0, this.limit - this._fileList.length)
      : filesArray.length;
    const toAdd = filesArray.slice(0, maxAdd);
    const excess = maxAdd < filesArray.length ? filesArray.slice(maxAdd) : [];

    toAdd.forEach(file => {
      this._addFile(file);
    });

    if (excess.length > 0) {
      this.dispatchEvent(new CustomEvent('nv-exceed', {
        detail: { files: excess, fileList: this._fileList },
        bubbles: true,
        composed: true
      }));
    }

    // 清空 input，以便可以重复选择同一文件
    input.value = '';
  }

  /**
   * 添加文件
   */
  private _addFile(file: File): void {
    const fileItem = {
      id: ++this._fileIdCounter,
      name: file.name,
      status: 'ready' as const,
      file
    };
    this._fileList = [...this._fileList, fileItem];
    this._enteringIds.add(fileItem.id);
    this.requestUpdate();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._enteringIds.delete(fileItem.id);
        this.requestUpdate();
      });
    });

    // 如果是图片文件，生成缩略图
    if (this._isImageFile(file)) {
      this._generateThumbnail(file, fileItem);
    }

    // 触发 change 事件
    this.dispatchEvent(new CustomEvent('nv-change', {
      detail: { file, fileList: this._fileList },
      bubbles: true,
      composed: true
    }));

    // auto-upload 为 true 时立即上传；为 false 时仅收集，随表单提交
    if (this.autoUpload) {
      this._uploadFile(file, fileItem);
    } else {
      this._updateFormValue();
      this._updateValidity();
    }
  }

  /**
   * 判断是否为图片文件
   */
  private _isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * 生成缩略图
   */
  private _generateThumbnail(file: File, fileItem: typeof this._fileList[0]): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        fileItem.thumbUrl = result;
        this.requestUpdate();
      }
    };
    reader.onerror = () => {
      // 读取失败，不显示缩略图
    };
    reader.readAsDataURL(file);
  }

  /**
   * 上传文件（仅当 autoUpload 为 true 时由 _addFile 调用）
   */
  private _uploadFile(file: File, fileItem: typeof this._fileList[0]): void {
    if (!this.action) {
      console.warn('Upload action is required when auto-upload is true');
      return;
    }

    fileItem.status = 'uploading';
    this.requestUpdate();

    const formData = new FormData();
    formData.append('file', file);

    // 添加额外参数
    Object.keys(this.data).forEach(key => {
      formData.append(key, this.data[key]);
    });

    const xhr = new XMLHttpRequest();

    // 设置请求头
    Object.keys(this.headers).forEach(key => {
      xhr.setRequestHeader(key, this.headers[key]);
    });

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        this.dispatchEvent(new CustomEvent('nv-progress', {
          detail: { file, percent },
          bubbles: true,
          composed: true
        }));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        fileItem.status = 'success';
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.url) {
            fileItem.url = response.url;
          }
        } catch (e) {
          // 响应不是JSON格式
        }
        this.dispatchEvent(new CustomEvent('nv-success', {
          detail: { file, response: xhr.responseText },
          bubbles: true,
          composed: true
        }));
        this.dispatchEvent(new CustomEvent('nv-change', {
          detail: { file, fileList: this._fileList },
          bubbles: true,
          composed: true
        }));
      } else {
        fileItem.status = 'fail';
        this.dispatchEvent(new CustomEvent('nv-error', {
          detail: { file, error: new Error(`Upload failed with status ${ xhr.status }`) },
          bubbles: true,
          composed: true
        }));
        this.dispatchEvent(new CustomEvent('nv-change', {
          detail: { file, fileList: this._fileList },
          bubbles: true,
          composed: true
        }));
      }
      this._updateValidity();
      this.requestUpdate();
    });

    xhr.addEventListener('error', () => {
      fileItem.status = 'fail';
      this.dispatchEvent(new CustomEvent('nv-error', {
        detail: { file, error: new Error('Upload failed') },
        bubbles: true,
        composed: true
      }));
      this.dispatchEvent(new CustomEvent('nv-change', {
        detail: { file, fileList: this._fileList },
        bubbles: true,
        composed: true
      }));
      this._updateValidity();
      this.requestUpdate();
    });

    xhr.open('POST', this.action);
    xhr.send(formData);
  }

  /**
   * 删除项过渡时长（与 CSS 一致）
   */
  private static readonly _REMOVE_TRANSITION_MS = 220;

  /**
   * 处理文件删除（先播删除过渡，再真正移除并派发事件）
   */
  protected _handleRemove(index: number): void {
    if (this._removingIndex !== null) return;
    const removedFile = this._fileList[index];
    this._removingIndex = index;
    this.requestUpdate();

    setTimeout(() => {
      this._fileList.splice(index, 1);
      this._fileList = [...this._fileList];
      this._removingIndex = null;
      this.dispatchEvent(new CustomEvent('nv-remove', {
        detail: { file: removedFile, fileList: this._fileList },
        bubbles: true,
        composed: true
      }));
      this.dispatchEvent(new CustomEvent('nv-change', {
        detail: { file: removedFile, fileList: this._fileList },
        bubbles: true,
        composed: true
      }));
      if (!this.autoUpload) {
        this._updateFormValue();
        this._updateValidity();
      }
      this.requestUpdate();
    }, NvUpload._REMOVE_TRANSITION_MS);
  }

  /**
   * 处理拖拽
   */
  protected _handleDragOver(event: DragEvent): void {
    if (this.drag && !this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * 处理拖拽放下
   */
  protected _handleDrop(event: DragEvent): void {
    if (this.drag && !this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer?.files;
      if (!files || files.length === 0) return;
      const filesArray = Array.from(files);
      const maxAdd = this.limit > 0
        ? Math.max(0, this.limit - this._fileList.length)
        : filesArray.length;
      const toAdd = filesArray.slice(0, maxAdd);
      const excess = filesArray.slice(maxAdd);
      toAdd.forEach(file => this._addFile(file));
      if (excess.length > 0) {
        this.dispatchEvent(new CustomEvent('nv-exceed', {
          detail: { files: excess, fileList: this._fileList },
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  /**
   * 处理拖拽区域点击
   */
  protected _handleDragAreaClick(): void {
    if (this.drag && !this.disabled) {
      const input = this.shadowRoot?.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) {
        input.click();
      }
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('required') || changedProperties.has('_fileList')) {
      this._updateValidity();
    }
  }

  /**
   * 表单集成：更新表单值（auto-upload 为 false 时，将当前选中的文件写入 FormData）
   */
  private _updateFormValue(): void {
    if (!this._internals) return;
    if (this.autoUpload) {
      this._internals.setFormValue(null);
      return;
    }
    const filesWithFile = this._fileList.filter(item => item.file);
    if (filesWithFile.length === 0) {
      this._internals.setFormValue(null);
      return;
    }
    const formData = new FormData();
    const fieldName = this.name || 'file';
    filesWithFile.forEach(item => {
      if (item.file) {
        formData.append(fieldName, item.file);
      }
    });
    this._internals.setFormValue(formData);
  }

  /**
   * 表单集成：根据 required 与文件列表更新 ElementInternals 校验状态
   */
  private _updateValidity(): void {
    if (!this._internals) return;
    const hasFile = this.autoUpload
      ? this._fileList.some(item => item.status === 'success')
      : this._fileList.some(item => item.file);
    if (this.required && !hasFile) {
      this._internals.setValidity({ valueMissing: true }, '请选择文件');
    } else {
      this._internals.setValidity({});
    }
  }

  /**
   * 表单集成：表单重置时的回调
   */
  formResetCallback(): void {
    this._fileList = [];
    const input = this.shadowRoot?.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
    this._updateFormValue();
    this._updateValidity();
    this.requestUpdate();
  }

  render() {
    return template.call(this, {
      _handleFileSelect: this._handleFileSelect.bind(this),
      _handleRemove: this._handleRemove.bind(this),
      _handleDragOver: this._handleDragOver.bind(this),
      _handleDrop: this._handleDrop.bind(this),
      _handleDragAreaClick: this._handleDragAreaClick.bind(this),
      _fileList: this._fileList,
      _removingIndex: this._removingIndex,
      _enteringIds: this._enteringIds
    });
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-upload': NvUpload
  }
}
