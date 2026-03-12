/*
 * @Descripttion: statistic组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';

/**
 * statistic组件
 *
 * @slot prefix - 前缀插槽
 * @slot suffix - 后缀插槽
 */
@customElement('nv-statistic')
export class NvStatistic extends Component {
  /**
   * 数�?
   */
  @property({ type: Number })
  value: number = 0;

  /**
   * 数值的精度（小数点后位数）
   */
  @property({ type: Number })
  precision: number = 0;

  /**
   * 数值的前缀
   */
  @property({ type: String })
  prefix: string = '';

  /**
   * 数值的后缀
   */
  @property({ type: String })
  suffix: string = '';

  /**
   * 数值的标题
   */
  @property({ type: String, reflect: true })
  label: string = '';

  /**
   * 数值的样式
   */
  @property({ type: String })
  valueStyle: string = '';

  /**
   * 格式化数�?
   */
  protected _formatValue(): string {
    const val = Number(this.value);
    if (!isNaN(val) && this.precision > 0) {
      return val.toFixed(this.precision);
    }
    return String(this.value);
  }

  protected _hasPrefixSlot(): boolean {
    return !!this.querySelector('[slot="prefix"]');
  }

  protected _hasSuffixSlot(): boolean {
    return !!this.querySelector('[slot="suffix"]');
  }

  render() {
    return template.call(this);
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-statistic': NvStatistic
  }
}
