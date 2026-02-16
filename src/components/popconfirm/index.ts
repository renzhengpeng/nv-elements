/*
 * @Descripttion: popconfirm组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import '../button/index';
import '../popup/index';

/**
 * Popconfirm 气泡确认框组件
 *
 * 基于 nv-popup 组件实现，用于在用户进行危险操作时进行二次确认。
 *
 * @slot - 触发元素（默认插槽）
 *
 * @event nv-confirm - 点击确认按钮时触发
 * @event nv-cancel - 点击取消按钮时触发
 */
@customElement('nv-popconfirm')
export class NvPopconfirm extends Component {
  /**
   * 标题（未使用 label 插槽时生效）
   */
  @property({ type: String, reflect: true })
  label: string = '确定要删除吗？';

  /**
   * 确认按钮文字
   */
  @property({ type: String })
  confirmButtonText: string = '确定';

  /**
   * 取消按钮文字
   */
  @property({ type: String })
  cancelButtonText: string = '取消';

  /**
   * 确认按钮类型（与 nv-button 的 type 一致，不含 text，文字样式由 confirmTextButton 控制）
   */
  @property({ type: String })
  confirmButtonType: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'primary';

  /**
   * 取消按钮类型（与 nv-button 的 type 一致，不含 text，文字样式由 cancelTextButton 控制）
   */
  @property({ type: String })
  cancelButtonType: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'default';

  /**
   * 确认按钮是否为文字按钮（对应 nv-button 的 text 属性）
   */
  @property({ type: Boolean, attribute: 'confirm-text-button' })
  confirmTextButton: boolean = false;

  /**
   * 取消按钮是否为文字按钮（对应 nv-button 的 text 属性），默认 true
   */
  @property({ type: Boolean, attribute: 'cancel-text-button' })
  cancelTextButton: boolean = true;

  /**
   * 确认按钮尺寸
   */
  @property({ type: String })
  confirmButtonSize: 'large' | 'default' | 'small' = 'small';

  /**
   * 取消按钮尺寸
   */
  @property({ type: String })
  cancelButtonSize: 'large' | 'default' | 'small' = 'small';

  /**
   * 显示的位置
   */
  @property({ type: String, reflect: true })
  placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' = 'top';

  /**
   * 触发方式
   */
  @property({ type: String, reflect: true })
  trigger: 'click' | 'hover' | 'manual' = 'click';

  /**
   * 是否显示箭头
   */
  @property({ type: Boolean, reflect: true })
  arrow: boolean = true;

  /**
   * 弹出层与触发元素的距离（像素）
   */
  @property({ type: Number, reflect: true })
  distance: number = 8;

  /**
   * 是否禁用（禁用后无法通过触发器激活）
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * 获取 popup 元素
   */
  private _getPopupElement(): any {
    return this.shadowRoot?.querySelector('nv-popup');
  }

  /**
   * 处理确认按钮点击
   */
  protected _handleConfirm(event: Event): void {
    // 阻止事件冒泡
    event.stopPropagation();

    // 关闭 popup
    const popup = this._getPopupElement();
    if (popup) {
      popup.active = false;
    }

    // 触发确认事件
    this.dispatch('nv-confirm', undefined, { bubbles: true, composed: true });
  }

  /**
   * 处理取消按钮点击
   */
  protected _handleCancel(event: Event): void {
    // 阻止事件冒泡
    event.stopPropagation();

    // 关闭 popup
    const popup = this._getPopupElement();
    if (popup) {
      popup.active = false;
    }

    // 触发取消事件
    this.dispatch('nv-cancel', undefined, { bubbles: true, composed: true });
  }

  render() {
    return template.call(this, {
      _handleConfirm: this._handleConfirm.bind(this),
      _handleCancel: this._handleCancel.bind(this)
    });
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-popconfirm': NvPopconfirm
  }
}
