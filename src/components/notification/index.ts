/*
 * @Descripttion: notification组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import {
  unsafeCSS,
  css,
  customElement,
  property,
  Component
} from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import { registerNotificationInstance, unregisterNotificationInstance } from './notification.ts';

/**
 * notification组件
 *
 * @slot - 默认插槽，用于放置通知内容
 * @slot label - 标题插槽
 * @slot content - 内容插槽
 * @slot icon - 图标插槽，用于自定义图标
 * 
 * @fires nv-close - 关闭通知时触发
 * @fires nv-after-close - 关闭动画完成后触发
 */
@customElement('nv-notification')
export class NvNotification extends Component {
  /**
   * 通知类型，可选: success/warning/info/error
   */
  @property({ type: String })
  type: 'success' | 'warning' | 'info' | 'error' = 'info';

  /**
   * 标题
   */
  @property({ type: String, reflect: true })
  label: string = '';

  /**
   * 显示的文字
   */
  @property({ type: String })
  message: string = '';

  /**
   * 是否显示图标
   */
  @property({ type: Boolean })
  showIcon: boolean = true;

  /**
   * 自定义图标名称
   */
  @property({ type: String })
  icon: string = '';

  /**
   * 是否可关闭
   */
  @property({ type: Boolean })
  closable: boolean = true;

  /**
   * 显示时长，毫秒。设为 0 则不会自动关闭
   */
  @property({ type: Number })
  duration: number = 4500;

  /**
   * 自定义弹出位置，可选: top-right/top-left/bottom-right/bottom-left
   */
  @property({ type: String })
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' =
    'top-right';

  /**
   * 层级
   */
  @property({ type: Number })
  zIndex: number = 2000;

  /**
   * 自定义关闭图标
   */
  @property({ type: String })
  closeIcon: string = 'close';

  private _timer: number | null = null;
  private _remainingDuration: number = 0;
  private _startTime: number = 0;

  render() {
    return template.call(this, {
      _handleClose: this._handleClose.bind(this),
      _handleMouseEnter: this._handleMouseEnter.bind(this),
      _handleMouseLeave: this._handleMouseLeave.bind(this)
    });
  }

  $mounted(): void {
    // 设置左右位置
    const isRight = this.position.endsWith('right');
    this.style.right = isRight ? '16px' : 'auto';
    this.style.left = isRight ? 'auto' : '16px';
    
    // 设置 z-index
    this.style.zIndex = String(this.zIndex);
    
    // 获取内部 .nv-notification 元素
    const notificationEl = this.shadowRoot?.querySelector('.nv-notification') as HTMLElement;
    
    // 初始就添加 is-entering 类，让元素从隐藏+偏移状态开始
    if (notificationEl) {
      notificationEl.classList.add('is-entering');
    }
    
    // 监听位置更新完成事件
    this.addEventListener('position-updated', () => {
      // 位置已正确设置，现在触发滑入动画
      if (notificationEl) {
        // 强制浏览器重排，确保 is-entering 初始样式生效
        void notificationEl.offsetHeight;
        
        // 使用 setTimeout 让出主线程，然后移除 is-entering 触发滑入动画
        setTimeout(() => {
          notificationEl.classList.remove('is-entering');
        }, 10);
      }
    }, { once: true });
    
    // 注册到全局位置管理（会在 RAF 中更新位置并触发 position-updated 事件）
    registerNotificationInstance(this);
    
    this._startTimer();
  }

  /**
   * 启动倒计时
   */
  private _startTimer(): void {
    if (this.duration > 0) {
      // 如果是首次启动，使用 duration；否则使用剩余时间
      if (this._remainingDuration === 0) {
        this._remainingDuration = this.duration;
      }
      this._startTime = Date.now();
      this._timer = window.setTimeout(() => {
        this.close();
      }, this._remainingDuration);
    }
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    this._updatePosition();
    
    // 更新 z-index
    if (changedProperties.has('zIndex')) {
      this.style.zIndex = String(this.zIndex);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timer) {
      window.clearTimeout(this._timer);
      this._timer = null;
    }
  }

  /**
   * 更新位置
   * - 左右位置：始终设置
   * - 上下位置：由全局管理器负责设置
   */
  private _updatePosition(): void {
    const isRight = this.position.endsWith('right');
    
    // 只设置左右位置
    this.style.right = isRight ? '16px' : 'auto';
    this.style.left = isRight ? 'auto' : '16px';
  }

  /**
   * 处理关闭事件
   */
  private _handleClose(event: Event): void {
    event.stopPropagation();
    this.close();
  }

  /**
   * 处理鼠标移入事件
   */
  private _handleMouseEnter(): void {
    if (this._timer && this.duration > 0) {
      // 计算剩余时间
      const elapsed = Date.now() - this._startTime;
      this._remainingDuration = this._remainingDuration - elapsed;
      // 清除定时器
      window.clearTimeout(this._timer);
      this._timer = null;
    }
  }

  /**
   * 处理鼠标移出事件
   */
  private _handleMouseLeave(): void {
    if (this._remainingDuration > 0 && this.duration > 0) {
      // 重新启动定时器
      this._startTime = Date.now();
      this._timer = window.setTimeout(() => {
        this.close();
      }, this._remainingDuration);
    }
  }

  /**
   * 关闭通知
   */
  close(): void {
    // 派发 nv-close 事件
    this.dispatchEvent(new CustomEvent('nv-close', {
      bubbles: true,
      composed: true,
      detail: { instance: this }
    }));
    
    if (this._timer) {
      window.clearTimeout(this._timer);
      this._timer = null;
    }
    
    // 从全局位置管理中注销
    unregisterNotificationInstance(this);
    
    const notificationEl = this.shadowRoot?.querySelector('.nv-notification') as HTMLElement;
    
    if (notificationEl) {
      notificationEl.classList.add('is-closing');
    }
    
    setTimeout(() => {
      // 派发 nv-after-close 事件
      this.dispatchEvent(new CustomEvent('nv-after-close', {
        bubbles: true,
        composed: true,
        detail: { instance: this }
      }));
      
      this.remove();
    }, 300);
  }

  static styles = css`
    ${ unsafeCSS(cssText) }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-notification': NvNotification;
  }
}
