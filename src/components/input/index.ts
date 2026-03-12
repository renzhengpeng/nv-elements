/*
 * @Descripttion: input组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 * @LastAuthor: zhengpeng.ren
 * @lastTime: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component, state } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import { PropertyValues } from 'lit';
import '../icon/index';

/**
 * input组件
 */
@customElement('nv-input')
export class NvInput extends Component {
  /**
   * 表单关联支持
   */
  static formAssociated = true;

  /**
   * 焦点委托，优化点击聚焦体验
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
   * 输入框的值
   */
  @property({ type: String })
  value: string = '';

  /**
   * 占位符
   */
  @property({ type: String })
  placeholder: string = '';

  /**
   * 是否禁用，默认false
   */
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * 是否只读，默认false
   */
  @property({ type: Boolean })
  readonly: boolean = false;

  /**
   * 输入框类型，默认text
   */
  @property({ type: String })
  type: 'text' | 'password' | 'textarea' | 'number' | 'email' | 'url' | 'tel' = 'text';

  /**
   * 是否可清空，默认false
   */
  @property({ type: Boolean })
  clearable: boolean = false;

  /**
   * 是否显示密码切换按钮（仅当type为password时有效），默认false
   */
  @property({ type: Boolean, attribute: 'show-password-toggle' })
  showPasswordToggle: boolean = false;

  /**
   * 密码是否可见（内部状态）
   */
  @state()
  protected _passwordVisible: boolean = false;

  /**
   * 是否处于焦点状态
   */
  private _isFocused: boolean = false;

  @state()
  hasPrepend: boolean = false;

  @state()
  hasAppend: boolean = false;

  @state()
  prependIsButton: boolean = false;

  @state()
  appendIsButton: boolean = false;

  /**
   * 获取焦点状态
   */
  get isFocused(): boolean {
    return this._isFocused;
  }

  /**
   * 最大输入长度
   */
  @property({ type: Number })
  maxlength: number | undefined = undefined;

  /**
   * 是否显示字数统计（仅当maxlength存在时有效），默认false
   */
  @property({ type: Boolean, attribute: 'show-word-limit' })
  showWordLimit: boolean = false;

  /**
   * 字数统计显示位置，默认outside（外部）。options: inside/outside
   */
  @property({ type: String, attribute: 'word-limit-position' })
  wordLimitPosition: 'inside' | 'outside' = 'outside';

  /**
   * 前置图标名称
   */
  @property({ type: String, attribute: 'prefix-icon' })
  prefixIcon: string = '';

  /**
   * 后置图标名称
   */
  @property({ type: String, attribute: 'suffix-icon' })
  suffixIcon: string = '';

  /**
   * 尺寸.default: medium. options: mini/small/medium/large/huge
   */
  @property({ type: String })
  size: 'mini' | 'small' | 'medium' | 'large' | 'huge' = 'medium';

  /**
   * 输入框原生 name 属性（用于表单提交）
   */
  @property({ type: String, reflect: true })
  name: string = '';

  /**
   * 关联的表单 id（与原生 form 属性一致，用于在表单外仍可参与提交与校验）
   */
  @property({ type: String, reflect: true })
  form: string = '';

  /**
   * 是否必填（参与 form.reportValidity() / checkValidity()）
   */
  @property({ type: Boolean, reflect: true })
  required: boolean = false;

  /**
   * 输入框原生autocomplete属性
   */
  @property({ type: String })
  autocomplete: string = 'off';

  /**
   * 输入框原生autofocus属性
   */
  @property({ type: Boolean })
  autofocus: boolean = false;

  /**
   * 输入框原生tabindex属性
   */
  @property({ type: Number })
  tabindex: number | undefined = undefined;

  /**
   * textarea的行数（仅当type为textarea时有效）
   */
  @property({ type: Number })
  rows: number = 2;

  /**
   * 数字输入框的最大值（仅当type为number时有效）
   */
  @property({ type: Number })
  max: number | undefined = undefined;

  /**
   * 数字输入框的最小值（仅当type为number时有效）
   */
  @property({ type: Number })
  min: number | undefined = undefined;

  /**
   * 内部input元素
   */
  private _inputElement: HTMLInputElement | HTMLTextAreaElement | null = null;

  /**
   * 处理输入事件
   * @param evt
   * @protected
   */
  protected _handleInput(evt: Event) {
    const target = evt.target as HTMLInputElement | HTMLTextAreaElement;
    let inputValue = target.value;

    // 如果是数字类型，检查并限制范围
    if (this.type === 'number' && inputValue !== '') {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        // 如果设置了最小值且输入值小于最小值，限制为最小值
        if (this.min !== undefined && numValue < this.min) {
          inputValue = String(this.min);
          target.value = inputValue;
        } else if (this.max !== undefined && numValue > this.max) {
          // 如果设置了最大值且输入值大于最大值，限制为最大值
          inputValue = String(this.max);
          target.value = inputValue;
        }
      }
    }

    this.value = inputValue;
    this._updateFormValue();
    this.dispatchEvent(new CustomEvent('nv-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 处理焦点事件
   * @param evt
   * @protected
   */
  protected _handleFocus(evt: FocusEvent) {
    this._isFocused = true;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('nv-focus', {
      detail: evt,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 处理失焦事件
   * @param evt
   * @protected
   */
  protected _handleBlur(evt: FocusEvent) {
    this._isFocused = false;

    // 如果是数字类型，在失焦时进行最终验证和限制
    if (this.type === 'number' && this.value !== '') {
      const numValue = parseFloat(this.value);
      if (!isNaN(numValue)) {
        let finalValue = this.value;
        // 如果设置了最小值且输入值小于最小值，限制为最小值
        if (this.min !== undefined && numValue < this.min) {
          finalValue = String(this.min);
        } else if (this.max !== undefined && numValue > this.max) {
          // 如果设置了最大值且输入值大于最大值，限制为最大值
          finalValue = String(this.max);
        }

        if (finalValue !== this.value) {
          this.value = finalValue;
          const input = this.inputElement;
          if (input) {
            input.value = finalValue;
          }
        }
      }
    }

    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('nv-blur', {
      detail: evt,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 处理清除事件
   * @protected
   */
  protected _handleClear() {
    this.value = '';
    if (this._inputElement) {
      this._inputElement.value = '';
      this._inputElement.focus();
    }
    this._updateFormValue();
    this.dispatchEvent(new CustomEvent('nv-clear', {
      bubbles: true,
      composed: true
    }));
    this.dispatchEvent(new CustomEvent('nv-input', {
      detail: { value: '' },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 处理密码显示切换
   * @protected
   */
  protected _handlePasswordToggle() {
    this._passwordVisible = !this._passwordVisible;
    this.dispatchEvent(new CustomEvent('nv-password-visible-change', {
      detail: this._passwordVisible,
      bubbles: true,
      composed: true
    }));
  }

  protected _handlePrependSlotChange() {
    const slot = this.shadowRoot?.querySelector('slot[name="prepend"]') as HTMLSlotElement | null;
    const assignedNodes = slot ? slot.assignedNodes({ flatten: true }) : [];
    this.hasPrepend = assignedNodes.length > 0;

    // 检查是否是 button 组件，并同步 size
    this.prependIsButton = assignedNodes.some(
      node => node.nodeType === Node.ELEMENT_NODE &&
      (node as Element).tagName?.toLowerCase() === 'nv-button'
    );

    // 如果是 button，同步 size
    if (this.prependIsButton) {
      assignedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          if (element.tagName?.toLowerCase() === 'nv-button') {
            (element as any).size = this.size;
          }
        }
      });
    }
  }

  protected _handleAppendSlotChange() {
    const slot = this.shadowRoot?.querySelector('slot[name="append"]') as HTMLSlotElement | null;
    const assignedNodes = slot ? slot.assignedNodes({ flatten: true }) : [];
    this.hasAppend = assignedNodes.length > 0;

    // 检查是否是 button 组件，并同步 size
    this.appendIsButton = assignedNodes.some(
      node => node.nodeType === Node.ELEMENT_NODE &&
      (node as Element).tagName?.toLowerCase() === 'nv-button'
    );

    // 如果是 button，同步 size
    if (this.appendIsButton) {
      assignedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          if (element.tagName?.toLowerCase() === 'nv-button') {
            (element as any).size = this.size;
          }
        }
      });
    }
  }

  /**
   * 处理change事件
   * @protected
   */
  protected _handleChange() {
    this.dispatchEvent(new CustomEvent('nv-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 获取input元素
   */
  get inputElement(): HTMLInputElement | HTMLTextAreaElement | null {
    return this._inputElement || this.shadowRoot?.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null;
  }

  /**
   * 获取焦点
   */
  focus() {
    const input = this.inputElement;
    if (input) {
      input.focus();
    }
  }

  /**
   * 失去焦点
   */
  blur() {
    const input = this.inputElement;
    if (input) {
      input.blur();
    }
  }

  /**
   * 选中文本
   */
  select() {
    const input = this.inputElement;
    if (input && input instanceof HTMLInputElement) {
      input.select();
    }
  }

  render() {
    return template.call(this, {
      _handleInput: this._handleInput.bind(this),
      _handleFocus: this._handleFocus.bind(this),
      _handleBlur: this._handleBlur.bind(this),
      _handleClear: this._handleClear.bind(this),
      _handlePasswordToggle: this._handlePasswordToggle.bind(this),
      _handleChange: this._handleChange.bind(this)
    });
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    // 同步 value 到 input 元素
    if (changedProperties.has('value')) {
      const input = this.inputElement;
      if (input && input.value !== this.value) {
        input.value = this.value;
      }
      this._updateFormValue();
    }
    if (changedProperties.has('required') || changedProperties.has('value')) {
      this._updateValidity();
    }

    // 当 size 改变时，同步更新 button 的 size
    if (changedProperties.has('size')) {
      this._syncButtonSize();
    }
  }

  /**
   * 表单集成：更新表单值
   */
  private _updateFormValue(): void {
    if (this._internals) {
      this._internals.setFormValue(this.value);
    }
  }

  /**
   * 表单集成：根据 required 与 value 更新 ElementInternals 校验状态
   */
  private _updateValidity(): void {
    if (!this._internals) return;
    const isEmpty = this.value === undefined || this.value === null || String(this.value).trim() === '';
    if (this.required && isEmpty) {
      this._internals.setValidity({ valueMissing: true }, '请填写此项');
    } else {
      this._internals.setValidity({});
    }
  }

  /**
   * 表单集成：表单重置时的回调
   */
  formResetCallback(): void {
    this.value = '';
    this._updateFormValue();
    this._updateValidity();
    const input = this.inputElement;
    if (input) {
      input.value = '';
    }
    this.requestUpdate();
  }

  /**
   * 表单集成：表单状态恢复时的回调
   */
  formStateRestoreCallback(state: string, mode: 'restore' | 'autocomplete'): void {
    if (mode === 'restore') {
      this.value = state;
      this._updateFormValue();
      const input = this.inputElement;
      if (input) {
        input.value = state;
      }
      this.requestUpdate();
    }
  }

  /**
   * 同步 prepend 和 append 中 button 的 size
   * @protected
   */
  protected _syncButtonSize() {
    // 同步 prepend 中的 button
    if (this.prependIsButton) {
      const slot = this.shadowRoot?.querySelector('slot[name="prepend"]') as HTMLSlotElement | null;
      if (slot) {
        const assignedNodes = slot.assignedNodes({ flatten: true });
        assignedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName?.toLowerCase() === 'nv-button') {
              (element as any).size = this.size;
            }
          }
        });
      }
    }

    // 同步 append 中的 button
    if (this.appendIsButton) {
      const slot = this.shadowRoot?.querySelector('slot[name="append"]') as HTMLSlotElement | null;
      if (slot) {
        const assignedNodes = slot.assignedNodes({ flatten: true });
        assignedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName?.toLowerCase() === 'nv-button') {
              (element as any).size = this.size;
            }
          }
        });
      }
    }
  }

  protected $mounted() {
    // 保存input元素引用
    this._inputElement = this.inputElement;

    // 初始化 slot 是否有内容
    this._handlePrependSlotChange();
    this._handleAppendSlotChange();
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-input': NvInput
  }
}
