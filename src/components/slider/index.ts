/*
 * @Descripttion: slider组件
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

/**
 * slider组件
 */
@customElement('nv-slider')
export class NvSlider extends Component {
  /**
   * 当前值
   */
  @property({ type: Number })
  value: number = 0;

  /**
   * 最小值
   */
  @property({ type: Number })
  min: number = 0;

  /**
   * 最大值
   */
  @property({ type: Number })
  max: number = 100;

  /**
   * 步长
   */
  @property({ type: Number })
  step: number = 1;

  /**
   * 是否禁用
   */
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * 是否竖向模式
   */
  @property({ type: Boolean })
  vertical: boolean = false;

  /**
   * 滑块尺寸.default: medium. options: mini/small/medium/large/huge
   */
  @property({ type: String })
  size: 'mini' | 'small' | 'medium' | 'large' | 'huge' = 'medium';

  /**
   * 是否显示输入框
   */
  @property({ type: Boolean, attribute: 'show-input' })
  showInput: boolean = false;

  /**
   * 是否显示间断点
   */
  @property({ type: Boolean, attribute: 'show-stops' })
  showStops: boolean = false;

  /**
   * 是否显示 tooltip
   */
  @property({ type: Boolean, attribute: 'show-tooltip' })
  showTooltip: boolean = true;

  /**
   * 间断点
   */
  stops: number[] = [];

  private _isDragging: boolean = false;
  // @ts-ignore - 保留用于未来功能
  private _startX: number = 0;
  // @ts-ignore - 保留用于未来功能
  private _startY: number = 0;
  // @ts-ignore - 保留用于未来功能
  private _startValue: number = 0;

  render() {
    return template.call(this, {
      _handleMouseDown: this._handleMouseDown.bind(this),
      _handleButtonMouseDown: this._handleButtonMouseDown.bind(this),
      _handleInput: this._handleInput.bind(this)
    });
  }

  $mounted(): void {
    // 初始化完成
  }

  /**
   * 处理轨道点击事件（直接跳转）
   */
  private _handleMouseDown(event: MouseEvent): void {
    if (this.disabled) return;

    // 检查是否点击在按钮上，如果是则不处理
    const target = event.target as HTMLElement;
    if (target.classList.contains('nv-slider__button') ||
        target.classList.contains('nv-slider__button-wrapper')) {
      return;
    }

    event.preventDefault();

    const runway = this.shadowRoot?.querySelector('.nv-slider__runway') as HTMLElement;
    if (!runway) return;

    const rect = runway.getBoundingClientRect();
    let percentage: number;

    if (this.vertical) {
      const offsetY = rect.bottom - event.clientY;
      percentage = (offsetY / rect.height) * 100;
    } else {
      const offsetX = event.clientX - rect.left;
      percentage = (offsetX / rect.width) * 100;
    }

    percentage = Math.max(0, Math.min(100, percentage));
    const newValue = this.min + (percentage / 100) * (this.max - this.min);
    const steppedValue = Math.round(newValue / this.step) * this.step;
    this.value = Math.max(this.min, Math.min(this.max, steppedValue));

    this.dispatchEvent(
      new CustomEvent('nv-change', {
        detail: this.value,
        bubbles: true,
        composed: true
      })
    );
    this.requestUpdate();
  }

  /**
   * 处理按钮拖动事件
   */
  private _handleButtonMouseDown(event: MouseEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    event.stopPropagation();
    this._isDragging = true;
    this._startX = event.clientX;
    this._startY = event.clientY;
    this._startValue = this.value;

    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseup', this._handleMouseUp);
  }

  /**
   * 处理鼠标移动事件
   */
  private _handleMouseMove = (event: MouseEvent): void => {
    if (!this._isDragging) return;

    const runway = this.shadowRoot?.querySelector('.nv-slider__runway') as HTMLElement;
    if (!runway) return;

    const rect = runway.getBoundingClientRect();
    let percentage: number;

    if (this.vertical) {
      const offsetY = rect.bottom - event.clientY;
      percentage = (offsetY / rect.height) * 100;
    } else {
      const offsetX = event.clientX - rect.left;
      percentage = (offsetX / rect.width) * 100;
    }

    percentage = Math.max(0, Math.min(100, percentage));
    const newValue = this.min + (percentage / 100) * (this.max - this.min);
    const steppedValue = Math.round(newValue / this.step) * this.step;
    this.value = Math.max(this.min, Math.min(this.max, steppedValue));

    this.dispatchEvent(
      new CustomEvent('nv-input', {
        detail: this.value,
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * 处理鼠标抬起事件
   */
  private _handleMouseUp = (): void => {
    if (!this._isDragging) return;

    this._isDragging = false;
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);

    this.dispatchEvent(
      new CustomEvent('nv-change', {
        detail: this.value,
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * 处理输入框输入事件
   */
  private _handleInput(event: Event): void {
    const customEvent = event as CustomEvent;
    const detail = customEvent.detail;
    const newValue = Number(detail.value);
    if (!isNaN(newValue)) {
      this.value = Math.max(this.min, Math.min(this.max, newValue));
      this.dispatchEvent(
        new CustomEvent('nv-change', {
          detail: this.value,
          bubbles: true,
          composed: true
        })
      );
    }
  }

  static styles = css`
    ${ unsafeCSS(cssText) }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-slider': NvSlider;
  }
}
