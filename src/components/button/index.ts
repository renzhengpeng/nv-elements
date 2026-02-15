/*
 * @Descripttion: button组件
 * @creater: zhengpeng.ren
 * @since: 2024-05-29 15:04:23
 * @LastAuthor: zhengpeng.ren
 * @lastTime: 2024-08-23 15:52:14
 */
import { unsafeCSS, css, customElement, property, Component } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';

/**
 * button组件
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('nv-button')
export class NvButton extends Component {
  /**
   * button类型，可选: default/primary/success/warning/info/danger
   */
  @property({ type: String })
  type: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger' = 'default';

  /**
   * 是否禁用
   */
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * 纯按钮
   */
  @property({ type: Boolean })
  plain: boolean = false;

  /**
   * 文字按钮
   */
  @property({ type: Boolean })
  text: boolean = false;

  /**
   * 链接按钮
   */
  @property({ type: Boolean })
  link: boolean = false;

  /**
   * 圆角按钮
   */
  @property({ type: Boolean })
  round: boolean = false;

  /**
   * 圆形按钮
   */
  @property({ type: Boolean })
  circle: boolean = false; //

  /**
   * 是否处于loading状态
   */
  @property({ type: Boolean })
  loading: boolean = false;

  /**
   * 是否处于激活状态（用于表示按钮被选中或当前激活）
   */
  @property({ type: Boolean, reflect: true })
  active: boolean = false;

  /**
   * button size. default: medium. options: mini/small/medium/large/huge
   */
  @property({ type: String })
  size: 'mini' | 'small' | 'medium' | 'large' | 'huge' = 'medium';

  /**
   * icon name
   */
  @property({ type: String })
  icon: string = '';

  /**
   * 是否有默认 slot 内容（非空文本或子元素）
   */
  protected get _hasDefaultSlotContent(): boolean {
    const nodes = this.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.nodeType === Node.ELEMENT_NODE) return true;
      if (n.nodeType === Node.TEXT_NODE && n.textContent && n.textContent.trim().length > 0) return true;
    }
    return false;
  }

  render() {
    return template.call(this, { _handleClick: this._handleClick });
  }

  $mounted(): void {
    //
  }

  private _handleClick(): void {
    //
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-button': NvButton
  }
}
