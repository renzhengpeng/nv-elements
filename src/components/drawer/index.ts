/*
 * @Descripttion: drawer组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component, state, html } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import { PropertyValues } from 'lit';

/**
 * Drawer 抽屉组件
 *
 * 用于在屏幕边缘弹出面板，用于显示额外的内容或操作。
 * 支持从四个方向（上、下、左、右）弹出。
 *
 * 特性：
 * - 支持四个方向的弹出（rtl/ltr/ttb/btt）
 * - 支持自定义宽度/高度
 * - 支持遮罩层控制
 * - 支持滚动锁定
 * - 支持多种关闭方式（ESC键、点击遮罩、关闭按钮）
 * - 支持自定义头部和底部内容
 *
 * @slot - 默认插槽，抽屉主体内容
 * @slot header - 自定义头部内容
 * @slot footer - 自定义底部内容
 *
 * @event nv-open - 抽屉打开时触发
 * @event nv-after-open - 抽屉打开动画结束时触发
 * @event nv-close - 抽屉关闭时触发
 * @event nv-after-close - 抽屉关闭动画结束时触发
 *
 * @example
 * ```html
 * <nv-drawer
 *   .visible="${true}"
 *   label="标题"
 *   direction="rtl"
 *   width="30%">
 *   <p>抽屉内容</p>
 * </nv-drawer>
 * ```
 */
@customElement('nv-drawer')
export class NvDrawer extends Component {
  /**
   * 是否显示抽屉
   *
   * @remarks
   * 使用 reflect: true 使属性值反映到 HTML 属性上，
   * 便于 CSS 根据 :host([visible]) 选择器控制显示状态
   */
  @property({ type: Boolean, reflect: true })
  visible: boolean = false;

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

  connectedCallback(): void {
    super.connectedCallback();

    // 兼容初始 visible=true 的场景：确保首次渲染时已进入渲染态
    if (this.visible) {
      this._setRendered(true);
      this.toggleAttribute('data-open', true);
    }
  }

  /**
   * 抽屉标题
   *
   * @remarks
   * 如果不设置标题且没有提供 header slot，则不显示头部区域
   */
  @property({ type: String, reflect: true })
  label: string = '';

  /**
   * 抽屉的弹出方向
   *
   * @remarks
   * - rtl: 从右向左（默认）
   * - ltr: 从左向右
   * - ttb: 从上到下
   * - btt: 从下到上
   */
  @property({ type: String })
  direction: 'rtl' | 'ltr' | 'ttb' | 'btt' = 'rtl';

  /**
   * 抽屉的尺寸（宽度或高度）
   *
   * @remarks
   * - 对于 rtl/ltr 方向，该值控制宽度
   * - 对于 ttb/btt 方向，该值控制高度
   * - 支持百分比（如 '30%'）或固定值（如 '400px'）
   */
  @property({ type: String })
  size: string = '30%';

  /**
   * 是否显示关闭按钮
   *
   * @remarks
   * 关闭按钮显示在头部右侧，点击后会关闭抽屉
   */
  @property({ type: Boolean })
  showClose: boolean = true;

  /**
   * 是否可以通过点击遮罩层关闭抽屉
   *
   * @remarks
   * 设置为 false 时，只能通过关闭按钮或 ESC 键关闭
   */
  @property({ type: Boolean })
  closeOnClickModal: boolean = true;

  /**
   * 是否可以通过按下 ESC 键关闭抽屉
   *
   * @remarks
   * 设置为 false 时，按 ESC 键不会关闭抽屉
   */
  @property({ type: Boolean })
  closeOnPressEscape: boolean = true;

  /**
   * 是否在抽屉出现时将 body 滚动锁定
   *
   * @remarks
   * 设置为 true 时，打开抽屉会禁用页面滚动，
   * 关闭抽屉后会恢复滚动
   */
  @property({ type: Boolean })
  lockScroll: boolean = true;

  /**
   * 是否显示遮罩层
   *
   * @remarks
   * 设置为 false 时，抽屉后面不会显示半透明遮罩，
   * 用户可以与页面其他部分交互
   */
  @property({ type: Boolean })
  mask: boolean = true;

  /**
   * 遮罩层是否插入至 body 元素上
   *
   * @deprecated 该属性已废弃，组件现在使用 position: fixed 定位，不再挂载到 body
   */
  @property({ type: Boolean })
  appendToBody: boolean = true;

  /**
   * 抽屉的自定义类名
   *
   * @remarks
   * 该类名会被添加到抽屉面板元素上，用于自定义样式
   */
  @property({ type: String })
  customClass: string = '';

  /**
   * ESC 键监听器引用
   *
   * @remarks
   * 保存监听器引用以便在组件卸载时正确移除监听
   */
  private _keydownHandler: ((event: KeyboardEvent) => void) | null = null;

  /**
   * 设置渲染态并同步到 host attribute
   *
   * @remarks
   * 使用 data-rendered 控制 :host 的 display，从而实现“关闭时不占文档流”。
   */
  private _setRendered(rendered: boolean): void {
    if (this._rendered === rendered) {
      return;
    }

    this._rendered = rendered;
    this.toggleAttribute('data-rendered', rendered);
  }

  /**
   * 处理抽屉关闭
   *
   * @remarks
   * 统一的关闭处理方法，被其他事件处理方法调用。
   * 设置 visible 为 false 并触发 close 事件。
   */
  protected _handleClose(): void {
    this.visible = false;
    // 使用 EventProxy 的 dispatch 方法触发事件
    this.dispatch('nv-close', undefined, { bubbles: true, composed: true });
  }

  /**
   * 处理遮罩层点击事件
   *
   * @param event - 鼠标点击事件对象
   *
   * @remarks
   * 只有在以下条件都满足时才关闭抽屉：
   * 1. closeOnClickModal 属性为 true
   * 2. 点击目标是遮罩层本身（wrapper 元素）
   * 3. 点击目标不是抽屉面板或其子元素
   *
   * 这样可以确保只有点击遮罩层空白区域才会关闭，
   * 点击抽屉内容不会触发关闭。
   */
  protected _handleModalClick(event: Event): void {
    // 检查是否允许通过点击遮罩关闭
    if (!this.closeOnClickModal) {
      return;
    }

    // 获取遮罩层和抽屉面板元素
    const wrapper = this.shadowRoot?.querySelector('.nv-drawer__wrapper');
    const drawer = this.shadowRoot?.querySelector('.nv-drawer__drawer');

    const target = event.target as HTMLElement;

    // 判断点击目标是否为遮罩层本身，且不是抽屉面板或其子元素
    // target === wrapper: 确保点击的是遮罩层
    // !drawer?.contains(target): 确保点击的不是抽屉面板内容
    if (target === wrapper && !drawer?.contains(target)) {
      this._handleClose();
    }
  }

  /**
   * 处理键盘事件
   *
   * @param event - 键盘事件对象
   *
   * @remarks
   * 监听 Escape 键，在允许的情况下关闭抽屉。
   * 只有当 closeOnPressEscape 为 true 且按下的是 Escape 键时才会关闭。
   */
  protected _handleKeydown(event: KeyboardEvent): void {
    // 检查是否允许通过 ESC 键关闭，以及是否按下的是 Escape 键
    if (this.closeOnPressEscape && event.key === 'Escape') {
      this._handleClose();
    }
  }


  /**
   * 锁定 body 滚动
   *
   * @remarks
   * 当抽屉打开时，如果 lockScroll 为 true，
   * 则通过设置 body 的 overflow 为 hidden 来禁止页面滚动。
   * 这可以防止用户在查看抽屉内容时意外滚动背景页面。
   */
  private _lockBodyScroll(): void {
    // 只有在 lockScroll 为 true 时才锁定滚动
    if (this.lockScroll) {
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * 解锁 body 滚动
   *
   * @remarks
   * 当抽屉关闭时，如果之前锁定了滚动，
   * 则恢复 body 的 overflow 样式，允许页面正常滚动。
   */
  private _unlockBodyScroll(): void {
    // 只有在 lockScroll 为 true 时才需要解锁（恢复默认值）
    if (this.lockScroll) {
      document.body.style.overflow = '';
    }
  }

  /**
   * 检查是否有 header slot 内容
   *
   * @returns 如果有分配给 header slot 的节点，返回 true；否则返回 false
   *
   * @remarks
   * 用于判断是否需要渲染自定义头部。
   * 如果用户提供了 header slot 内容，则使用自定义头部；
   * 否则使用默认的标题 + 关闭按钮布局。
   * 直接检查 Light DOM 中的内容，而不是查询 Shadow DOM 中的 slot 元素。
   */
  protected _hasHeaderSlot(): boolean {
    // 检查 Light DOM 中是否有 slot="header" 的元素
    const headerSlotElements = Array.from(this.children).filter(
      (child) => child.getAttribute('slot') === 'header'
    );
    return headerSlotElements.length > 0;
  }

  /**
   * 检查是否有 footer slot 内容
   *
   * @returns 如果有分配给 footer slot 的节点，返回 true；否则返回 false
   *
   * @remarks
   * 用于判断是否需要渲染底部区域。
   * 如果没有 footer slot 内容，底部区域会通过 CSS :empty 选择器自动隐藏。
   * 直接检查 Light DOM 中的内容，而不是查询 Shadow DOM 中的 slot 元素。
   */
  protected _hasFooterSlot(): boolean {
    // 检查 Light DOM 中是否有 slot="footer" 的元素
    const footerSlotElements = Array.from(this.children).filter(
      (child) => child.getAttribute('slot') === 'footer'
    );
    return footerSlotElements.length > 0;
  }

  /**
   * 获取抽屉面板的内联样式
   *
   * @returns 包含宽度或高度样式的字符串
   *
   * @remarks
   * 根据抽屉的弹出方向决定使用 width 还是 height：
   * - rtl（右到左）或 ltr（左到右）：使用 width
   * - ttb（上到下）或 btt（下到上）：使用 height
   *
   * 这样可以根据不同方向正确设置抽屉的尺寸。
   */
  protected _getDrawerStyle(): string {
    // 确保 size 有默认值，防止 undefined、null、空字符串、字符串"undefined" 导致样式错误
    const size = (this.size && String(this.size) !== 'undefined') ? this.size : '30%';

    // 确保 direction 有默认值（运行时可能因模板字符串插值得到字符串 "undefined"）
    const directionStr = String(this.direction);
    const direction = (this.direction && directionStr !== 'undefined') ? this.direction : 'rtl';

    // 左右方向的抽屉使用 width
    if (direction === 'rtl' || direction === 'ltr') {
      return `width: ${ size };`;
    }

    // 上下方向的抽屉使用 height
    return `height: ${ size };`;
  }

  /**
   * 属性更新后的生命周期钩子
   *
   * @param changedProperties - 发生变化的属性集合
   *
   * @remarks
   * 主要处理 visible 属性的变化：
   * - 当抽屉打开时（visible 变为 true）：
   *   1. 锁定页面滚动（如果启用了 lockScroll）
   *   2. 添加 ESC 键监听器（如果启用了 closeOnPressEscape）
   * - 当抽屉关闭时（visible 变为 false）：
   *   1. 解锁页面滚动
   *   2. 移除 ESC 键监听器
   *
   * 使用 CSS 过渡效果来处理抽屉的显示/隐藏动画，
   * 不需要在 JavaScript 中手动控制动画。
   */
  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // 检查 visible 属性是否发生变化
    if (changedProperties.has('visible')) {
      // 抽屉打开
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

        // 触发打开事件
        this.dispatch('nv-open', undefined, { bubbles: true, composed: true });

        // 锁定页面滚动
        this._lockBodyScroll();

        // 创建并绑定键盘事件监听器
        this._keydownHandler = this._handleKeydown.bind(this);
        document.addEventListener('keydown', this._keydownHandler);

        // 监听过渡结束，触发 after-open 事件
        setTimeout(() => {
          const drawer = this.shadowRoot?.querySelector('.nv-drawer__drawer') as HTMLElement;
          if (drawer && this.visible) {
            const transitionEndHandler = () => {
              this.dispatch('nv-after-open', undefined, { bubbles: true, composed: true });
              drawer.removeEventListener('transitionend', transitionEndHandler);
            };
            drawer.addEventListener('transitionend', transitionEndHandler);
          }
        }, 0);
      } else {
        // 抽屉关闭
        this.toggleAttribute('data-open', false);
        // 监听过渡结束，触发 after-close 事件，并在结束后退出渲染态（方案 B）
        const drawer = this.shadowRoot?.querySelector('.nv-drawer__drawer') as HTMLElement;
        if (drawer) {
          const transitionEndHandler = () => {
            this.dispatch('nv-after-close', undefined, { bubbles: true, composed: true });
            drawer.removeEventListener('transitionend', transitionEndHandler);
            // 注意：visible 已经为 false，此时再卸载不会影响动画
            this._setRendered(false);
          };
          drawer.addEventListener('transitionend', transitionEndHandler);
        } else {
          // 兜底：如果抽屉节点不存在，直接退出渲染态
          this._setRendered(false);
        }

        // 解锁页面滚动
        this._unlockBodyScroll();

        // 移除键盘事件监听器
        if (this._keydownHandler) {
          document.removeEventListener('keydown', this._keydownHandler);
          this._keydownHandler = null;
        }
      }
    }
  }

  /**
   * 组件从 DOM 中移除时的生命周期钩子
   *
   * @remarks
   * 执行清理工作，确保不会留下副作用：
   * 1. 解锁页面滚动（防止页面保持不可滚动状态）
   * 2. 移除键盘事件监听器（防止内存泄漏）
   *
   * 即使抽屉在移除时是关闭状态，也需要执行清理，
   * 因为可能存在打开状态下被强制移除的情况。
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();

    // 确保恢复页面滚动
    this._unlockBodyScroll();

    // 确保移除事件监听器
    if (this._keydownHandler) {
      document.removeEventListener('keydown', this._keydownHandler);
      this._keydownHandler = null;
    }
  }

  /**
   * 渲染组件模板
   *
   * @returns 组件的 HTML 模板结果
   *
   * @remarks
   * 调用外部模板函数，并传入上下文对象。
   * 上下文对象包含了模板中需要使用的所有方法，
   * 这些方法都需要绑定 this 以确保正确的执行上下文。
   */
  render() {
    // 方案 B：非渲染态时直接不渲染任何 DOM，同时 :host 会 display:none 不占文档流
    if (!this._rendered && !this.visible) {
      return html``;
    }

    return template.call(this, {
      _handleClose: this._handleClose.bind(this),
      _handleModalClick: this._handleModalClick.bind(this),
      _hasHeaderSlot: this._hasHeaderSlot.bind(this),
      _hasFooterSlot: this._hasFooterSlot.bind(this),
      _getDrawerStyle: this._getDrawerStyle.bind(this)
    });
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-drawer': NvDrawer
  }
}
