/*
 * @Descripttion: back-top组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component, state } from '../../based-on/index.ts';
import '../button/index';
import '../icon/index';
import cssText from './style.scss?inline';
import template from './template.ts';

/**
 * back-top组件
 *
 * @slot - 默认插槽，用于自定义回到顶部按钮内容
 */
@customElement('nv-back-top')
export class NvBackTop extends Component {
  /**
   * 触发显示回到顶部按钮的滚动高度
   */
  @property({ type: Number, attribute: 'visibility-height' })
  visibilityHeight: number = 400;

  /**
   * 回到顶部按钮距离页面底部的位置
   */
  @property({ type: String })
  right: string = '40px';

  /**
   * 回到顶部按钮距离页面底部的位置
   */
  @property({ type: String })
  bottom: string = '40px';

  /**
   * 图标名称
   */
  @property({ type: String })
  icon: string = 'caret-top';

  /**
   * 滚动容器的选择器
   */
  @property({ type: String })
  target: string = '';

  /**
   * 滚动容器元素
   */
  private _container: HTMLElement | Window | null = null;

  /**
   * 是否显示回到顶部按钮
   */
  @state()
  private _visible: boolean = false;

  /**
   * 滚动监听器
   */
  private _scrollHandler: (() => void) | null = null;

  /**
   * 处理点击事件
   */
  protected _handleClick(): void {
    if (this._container instanceof Window) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else if (this._container instanceof HTMLElement) {
      this._container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  /**
   * 处理滚动事件
   */
  private _handleScroll(): void {
    let scrollTop = 0;
    if (this._container instanceof Window) {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    } else if (this._container instanceof HTMLElement) {
      scrollTop = this._container.scrollTop;
    }
    this._visible = scrollTop >= this.visibilityHeight;
  }

  protected $mounted(): void {
    this._initContainer();
    this._scrollHandler = this._handleScroll.bind(this);
    this._container?.addEventListener('scroll', this._scrollHandler, { passive: true });
    // 初始化时检查一次
    this._handleScroll();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('target')) {
      // 移除旧容器的监听
      if (this._scrollHandler && this._container) {
        this._container.removeEventListener('scroll', this._scrollHandler);
      }
      // 重新初始化并绑定
      this._initContainer();
      if (this._scrollHandler && this._container) {
        this._container.addEventListener('scroll', this._scrollHandler, { passive: true });
        this._handleScroll();
      }
    }
  }

  /**
   * 初始化滚动容器
   */
  private _initContainer(): void {
    if (this.target) {
      this._container = document.querySelector(this.target) as HTMLElement;
      if (!this._container) {
        console.warn(`[nv-back-top] target not found: ${this.target}`);
        this._container = window;
      }
    } else {
      this._container = window;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._scrollHandler && this._container) {
      this._container.removeEventListener('scroll', this._scrollHandler);
      this._scrollHandler = null;
    }
  }

  /**
   * 检查是否有默认slot内容
   */
  protected _hasDefaultSlot(): boolean {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) {
      return false;
    }
    const assignedNodes = slot.assignedNodes({ flatten: true });
    return assignedNodes.length > 0;
  }

  render() {
    return template.call(this, {
      _handleClick: this._handleClick.bind(this),
      _visible: this._visible
    });
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-back-top': NvBackTop
  }
}
