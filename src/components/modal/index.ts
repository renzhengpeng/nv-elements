/*
 * @Descripttion: modal组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component, state, html } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import { PropertyValues } from 'lit';

/**
 * modal组件
 *
 * @slot - 默认插槽，对话框内容
 * @slot header - 自定义头部内容
 * @slot footer - 自定义底部内容
 *
 * @event nv-show - 模态框弹出时触发
 * @event nv-after-show - 模态框弹出且过渡效果完成后触发
 * @event nv-hide - 模态框隐藏时触发
 * @event nv-after-hide - 模态框隐藏且过渡效果完成后触发
 * @event nv-close - 模态框关闭时触发
 */
@customElement('nv-modal')
export class NvModal extends Component {
  /**
   * 是否显示对话框
   */
  @property({ type: Boolean, reflect: true })
  visible: boolean = false;

  /**
   * 对话框标题
   */
  @property({ type: String, reflect: true })
  label: string = '';

  /**
   * 对话框宽度
   */
  @property({ type: String })
  width: string = '50%';

  /**
   * 是否显示关闭按钮
   */
  @property({ type: Boolean })
  showClose: boolean = true;

  /**
   * 是否可以通过点击遮罩层关闭对话框
   */
  @property({ type: Boolean })
  closeOnClickModal: boolean = true;

  /**
   * 是否可以通过按下 ESC 关闭对话框
   */
  @property({ type: Boolean })
  closeOnPressEscape: boolean = true;

  /**
   * 是否在对话框出现时将 body 滚动锁定
   */
  @property({ type: Boolean })
  lockScroll: boolean = true;

  /**
   * 是否显示遮罩层
   */
  @property({ type: Boolean })
  modal: boolean = true;

  /**
   * 遮罩层是否插入至 body 元素上
   */
  @property({ type: Boolean })
  appendToBody: boolean = true;

  /**
   * 对话框的自定义类名
   */
  @property({ type: String, attribute: 'custom-class' })
  customClass: string = '';

  /**
   * 是否居中显示
   */
  @property({ type: Boolean, reflect: true })
  center: boolean = false;

  /**
   * 内部渲染状态（方案 B）
   *
   * @remarks
   * - visible: 对外的“打开/关闭”状态（影响动画）
   * - _rendered: 内部的“是否挂载到 DOM/布局树”状态（影响是否占文档流）
   *
   * 关闭时不能立刻卸载，否则会丢失关闭动画；因此在动画结束后再卸载。
   */
  @state()
  private _rendered: boolean = false;

  /**
   * ESC键监听器
   */
  private _keydownHandler: ((event: KeyboardEvent) => void) | null = null;

  /**
   * 设置渲染态并同步到 host attribute
   *
   * @remarks
   * 使用 data-rendered 控制 :host 的 display，从而实现“关闭时不占文档流”。
   * - 值为 true 且设置 attribute 时，:host { display: block }
   * - 值为 false 且移除 attribute 时，:host { display: none }
   */
  private _setRendered(rendered: boolean): void {
    if (this._rendered === rendered) {
      return;
    }

    this._rendered = rendered;
    this.toggleAttribute('data-rendered', rendered);
  }

  connectedCallback(): void {
    super.connectedCallback();

    // 兼容初始 visible=true 的场景：确保首次渲染时已进入渲染态
    if (this.visible) {
      this._setRendered(true);
      this.toggleAttribute('data-open', true);
    }
  }

  /**
   * 处理关闭
   */
  protected _handleClose(): void {
    this.visible = false;
    this.dispatch('nv-close', undefined, { bubbles: true, composed: true });
  }

  /**
   * 触发显示事件
   */
  private _emitShowEvent(): void {
    this.dispatch('nv-show', undefined, { bubbles: true, composed: true });
  }

  /**
   * 触发显示完成事件
   */
  private _emitAfterShowEvent(): void {
    this.dispatch('nv-after-show', undefined, { bubbles: true, composed: true });
  }

  /**
   * 触发隐藏事件
   */
  private _emitHideEvent(): void {
    this.dispatch('nv-hide', undefined, { bubbles: true, composed: true });
  }

  /**
   * 触发隐藏完成事件
   */
  private _emitAfterHideEvent(): void {
    this.dispatch('nv-after-hide', undefined, { bubbles: true, composed: true });
  }

  /**
   * 处理遮罩层点击
   */
  protected _handleModalClick(event: Event): void {
    if (this.closeOnClickModal && (event.target as HTMLElement).classList.contains('nv-modal__wrapper')) {
      this._handleClose();
    }
  }

  /**
   * 处理ESC键
   */
  private _handleKeydown(event: KeyboardEvent): void {
    if (this.closeOnPressEscape && event.key === 'Escape' && this.visible) {
      this._handleClose();
    }
  }

  /**
   * 检查是否有header slot内容
   * 直接检查 Light DOM 中的内容，而不是查询 Shadow DOM 中的 slot 元素
   */
  protected _hasHeaderSlot(): boolean {
    // 检查 Light DOM 中是否有 slot="header" 的元素
    const headerSlotElements = Array.from(this.children).filter(
      (child) => child.getAttribute('slot') === 'header'
    );
    return headerSlotElements.length > 0;
  }

  /**
   * 检查是否有footer slot内容
   * 直接检查 Light DOM 中的内容，而不是查询 Shadow DOM 中的 slot 元素
   */
  protected _hasFooterSlot(): boolean {
    // 检查 Light DOM 中是否有 slot="footer" 的元素
    const footerSlotElements = Array.from(this.children).filter(
      (child) => child.getAttribute('slot') === 'footer'
    );
    return footerSlotElements.length > 0;
  }

  /**
   * 处理过渡结束事件
   * 该方法在 template 中直接绑定到 .nv-modal__dialog 的 @transitionend 上
   */
  protected _handleTransitionEnd(event: TransitionEvent): void {
    const target = event.target as HTMLElement;
    // 只处理对话框（panel）自身的过渡结束事件，忽略内部元素的冒泡或非主要属性动画
    if (!target.classList.contains('nv-modal__dialog') || event.propertyName !== 'transform') {
      return;
    }

    if (this.visible) {
      this._emitAfterShowEvent();
    } else {
      this._emitAfterHideEvent();
      // 动画结束，退出渲染态
      this._setRendered(false);
    }
  }

  /**
   * 锁定body滚动
   */
  private _lockBodyScroll(): void {
    if (this.lockScroll) {
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * 解锁body滚动
   */
  private _unlockBodyScroll(): void {
    if (this.lockScroll) {
      document.body.style.overflow = '';
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('visible')) {
      if (this.visible) {
        // 进入渲染态：确保组件挂载到布局树中（否则 display:none 无法显示）
        this._setRendered(true);
        // 使用 requestAnimationFrame 确保 display: block 生效后再添加 data-open 属性
        // 从而触发 CSS 过渡效果
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.toggleAttribute('data-open', true);
          });
        });

        this._emitShowEvent();
        this._lockBodyScroll();
        this._keydownHandler = this._handleKeydown.bind(this);
        document.addEventListener('keydown', this._keydownHandler);
      } else {
        this.toggleAttribute('data-open', false);
        this._emitHideEvent();
        this._unlockBodyScroll();
        if (this._keydownHandler) {
          document.removeEventListener('keydown', this._keydownHandler);
          this._keydownHandler = null;
        }

        // 如果没有过渡监听器（例如首次渲染即为关闭状态，或者 dialog 尚未渲染），直接设置不渲染
        const dialog = this.shadowRoot?.querySelector('.nv-modal__dialog');
        if (!dialog) {
          this._setRendered(false);
        }
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unlockBodyScroll();
    if (this._keydownHandler) {
      document.removeEventListener('keydown', this._keydownHandler);
      this._keydownHandler = null;
    }
  }

  render() {
    // 方案 B：非渲染态时直接不渲染任何 DOM，同时 :host 会 display:none 不占文档流
    if (!this._rendered && !this.visible) {
      return html``;
    }

    return template.call(this, {
      _handleClose: this._handleClose.bind(this),
      _handleModalClick: this._handleModalClick.bind(this),
      _handleTransitionEnd: this._handleTransitionEnd.bind(this),
      _hasHeaderSlot: this._hasHeaderSlot.bind(this),
      _hasFooterSlot: this._hasFooterSlot.bind(this)
    });
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-modal': NvModal
  }
}
