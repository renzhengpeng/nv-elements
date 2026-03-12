/*
 * @Descripttion: color-picker组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component, state } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import { PropertyValues } from 'lit';
import '../input/index';
import '../button/index';
import '../button-group/index';
import '../icon/index';

/**
 * color-picker组件
 */
@customElement('nv-color-picker')
export class NvColorPicker extends Component {
  /**
   * 当前选中的颜色值（hex格式）
   */
  @property({ type: String })
  value: string = '#409EFF';

  /**
   * 是否禁用
   */
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * 是否显示alpha通道
   */
  @property({ type: Boolean, attribute: 'show-alpha' })
  showAlpha: boolean = false;

  /**
   * 颜色格式，可选: hex/rgb/hsl/hsv
   */
  @property({ type: String, attribute: 'color-format' })
  colorFormat: 'hex' | 'rgb' | 'hsl' | 'hsv' = 'hex';

  /**
   * 当前显示的颜色格式
   */
  @state()
  private _displayFormat: 'hex' | 'rgb' | 'hsl' | 'hsv' = 'hex';

  /**
   * 是否支持 EyeDropper API
   */
  @state()
  private _supportsEyeDropper: boolean = false;

  /**
   * 预定义颜色
   */
  @property({ type: Array })
  predefine: string[] = [];

  /**
   * 尺寸，可选: mini/small/medium/large/huge
   */
  @property({ type: String })
  size: 'mini' | 'small' | 'medium' | 'large' | 'huge' = 'medium';

  /**
   * 形状，可选: circle/square/rectangle
   */
  @property({ type: String })
  shape: 'circle' | 'square' | 'rectangle' = 'rectangle';

  /**
   * 是否显示边框
   */
  @property({ type: Boolean })
  bordered: boolean = false;

  /**
   * 是否支持取色器（EyeDropper API）
   */
  @property({ type: Boolean, attribute: 'eye-dropper' })
  eyeDropper: boolean = true;

  /**
   * 是否显示颜色选择器面板
   */
  @state()
  private _visible: boolean = false;

  /**
   * 当前颜色对象（HSV格式）
   */
  @state()
  private _color: { h: number; s: number; v: number; a: number } = { h: 0, s: 100, v: 100, a: 1 };

  /**
   * 是否正在内部更新（防止循环更新）
   */
  private _isInternalUpdate: boolean = false;

  /**
   * 是否正在拖拽饱和度面板
   */
  private _isDraggingSaturation: boolean = false;

  /**
   * 是否正在拖拽色相滑块
   */
  private _isDraggingHue: boolean = false;

  /**
   * 是否正在拖拽透明度滑块
   */
  private _isDraggingAlpha: boolean = false;

  /**
   * 将hex颜色转换为HSV
   */
  private _hexToHsv(hex: string): { h: number; s: number; v: number; a: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const a = hex.length > 7 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    if (delta !== 0) {
      if (max === r) {
        h = ((g - b) / delta) % 6;
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;

    const s = max === 0 ? 0 : Math.round((delta / max) * 100);
    const v = Math.round(max * 100);

    return { h, s, v, a };
  }

  /**
   * 将HSV转换为RGB
   */
  private _hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
    s = s / 100;
    v = v / 100;

    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  /**
   * 将HSV转换为HSL
   */
  private _hsvToHsl(h: number, s: number, v: number): { h: number; s: number; l: number } {
    s = s / 100;
    v = v / 100;

    const l = v * (1 - s / 2);
    const sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

    return {
      h: Math.round(h),
      s: Math.round(sl * 100),
      l: Math.round(l * 100)
    };
  }

  /**
   * 将HSV转换为hex
   */
  private _hsvToHex(h: number, s: number, v: number, a: number): string {
    const { r, g, b } = this._hsvToRgb(h, s, v);
    const hex = `#${ r.toString(16).padStart(2, '0') }${ g.toString(16).padStart(2, '0') }${ b.toString(16).padStart(2, '0') }`;
    if (this.showAlpha && a < 1) {
      const alpha = Math.round(a * 255).toString(16).padStart(2, '0');
      return `${ hex }${ alpha }`;
    }
    return hex;
  }

  /**
   * 获取当前颜色的显示字符串
   */
  protected _getColorString(): string {
    const { h, s, v, a } = this._color;

    switch (this._displayFormat) {
      case 'hex':
        return this._hsvToHex(h, s, v, a).toUpperCase();
      case 'rgb': {
        const { r, g, b } = this._hsvToRgb(h, s, v);
        return `rgba(${ r }, ${ g }, ${ b }, ${ a.toFixed(2) })`;
      }
      case 'hsl': {
        const { h: hue, s: sat, l } = this._hsvToHsl(h, s, v);
        return `hsla(${ hue }, ${ sat }%, ${ l }%, ${ a.toFixed(2) })`;
      }
      case 'hsv':
        return `hsva(${ h }, ${ s }%, ${ v }%, ${ a.toFixed(2) })`;
      default:
        return this._hsvToHex(h, s, v, a).toUpperCase();
    }
  }

  /**
   * 切换颜色格式
   */
  protected _toggleFormat(): void {
    const formats: Array<'hex' | 'rgb' | 'hsl' | 'hsv'> = ['hex', 'rgb', 'hsl', 'hsv'];
    const currentIndex = formats.indexOf(this._displayFormat);
    this._displayFormat = formats[(currentIndex + 1) % formats.length];
  }

  /**
   * 处理取色器点击
   */
  protected async _handleEyeDropper(): Promise<void> {
    if (!this._supportsEyeDropper || this.disabled) {
      return;
    }

    try {
      // @ts-ignore - EyeDropper API 可能不在 TypeScript 类型定义中
      const eyeDropper = new EyeDropper();
      // @ts-ignore
      const result = await eyeDropper.open();

      if (result && result.sRGBHex) {
        const color = this._hexToHsv(result.sRGBHex);
        this._handleColorChange(color.h, color.s, color.v, color.a);
      }
    } catch (err) {
      // 用户取消或发生错误
      console.warn('EyeDropper error:', err);
    }
  }

  /**
   * 处理颜色输入
   */
  protected _handleColorInput(e: Event): void {
    let colorStr = '';
    if (e instanceof CustomEvent && e.detail && e.detail.value) {
      colorStr = e.detail.value.trim();
    } else {
      const target = e.target as HTMLElement;
      if (target && 'value' in target) {
        colorStr = (target as any).value.trim();
      }
    }

    if (!colorStr) return;

    try {
      // 尝试解析输入的颜色
      const color = this._parseColorString(colorStr);
      if (color) {
        this._handleColorChange(color.h, color.s, color.v, color.a);
      }
    } catch (err) {
      // 解析失败，忽略
      console.warn('Invalid color format:', colorStr);
    }
  }

  /**
   * 解析颜色字符串
   */
  private _parseColorString(colorStr: string): { h: number; s: number; v: number; a: number } | null {
    colorStr = colorStr.trim().toLowerCase();

    // Hex格式
    if (colorStr.startsWith('#')) {
      return this._hexToHsv(colorStr);
    }

    // RGB/RGBA格式
    const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]) / 255;
      const g = parseInt(rgbMatch[2]) / 255;
      const b = parseInt(rgbMatch[3]) / 255;
      const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;

      // RGB转HSV
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;

      let h = 0;
      if (delta !== 0) {
        if (max === r) {
          h = ((g - b) / delta) % 6;
        } else if (max === g) {
          h = (b - r) / delta + 2;
        } else {
          h = (r - g) / delta + 4;
        }
      }
      h = Math.round(h * 60);
      if (h < 0) h += 360;

      const s = max === 0 ? 0 : Math.round((delta / max) * 100);
      const v = Math.round(max * 100);

      return { h, s, v, a };
    }

    // HSL/HSLA格式
    const hslMatch = colorStr.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
    if (hslMatch) {
      const h = parseInt(hslMatch[1]);
      const sl = parseInt(hslMatch[2]) / 100;
      const l = parseInt(hslMatch[3]) / 100;
      const a = hslMatch[4] ? parseFloat(hslMatch[4]) : 1;

      // HSL转HSV
      const v = l + sl * Math.min(l, 1 - l);
      const s = v === 0 ? 0 : 2 * (1 - l / v);

      return { h, s: Math.round(s * 100), v: Math.round(v * 100), a };
    }

    // HSV/HSVA格式
    const hsvMatch = colorStr.match(/hsva?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
    if (hsvMatch) {
      return {
        h: parseInt(hsvMatch[1]),
        s: parseInt(hsvMatch[2]),
        v: parseInt(hsvMatch[3]),
        a: hsvMatch[4] ? parseFloat(hsvMatch[4]) : 1
      };
    }

    return null;
  }

  /**
   * 处理点击触发
   */
  protected _handleClick(): void {
    if (this.disabled) {
      return;
    }
    this._visible = !this._visible;
  }

  /**
   * 处理颜色变化
   */
  protected _handleColorChange(h: number, s: number, v: number, a: number): void {
    this._isInternalUpdate = true;
    this._color = { h, s, v, a };
    const newValue = this._hsvToHex(h, s, v, a);

    // 触发 active-change 事件（面板中颜色实时变化）
    this.dispatchEvent(new CustomEvent('nv-active-change', {
      detail: newValue,
      bubbles: true,
      composed: true
    }));

    this.value = newValue;
    this._isInternalUpdate = false;

    // 触发 change 事件（绑定值变化）
    this.dispatchEvent(new CustomEvent('nv-change', {
      detail: this.value,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 处理预定义颜色选择
   */
  protected _handlePredefineClick(color: string): void {
    this._isInternalUpdate = true;
    this.value = color;
    this._color = this._hexToHsv(color);
    this._isInternalUpdate = false;
    this._visible = false;
    this.dispatchEvent(new CustomEvent('nv-change', {
      detail: this.value,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 处理饱和度面板鼠标按下
   */
  protected _handleSaturationMouseDown(e: MouseEvent): void {
    if (this.disabled) return;
    e.preventDefault();
    this._isDraggingSaturation = true;

    const target = e.currentTarget as HTMLElement;
    this._updateSaturation(e, target);

    const handleMouseMove = (e: MouseEvent) => {
      if (this._isDraggingSaturation) {
        this._updateSaturation(e, target);
      }
    };

    const handleMouseUp = () => {
      this._isDraggingSaturation = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  /**
   * 更新饱和度和亮度
   */
  private _updateSaturation(e: MouseEvent, target: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);

    this._handleColorChange(this._color.h, s, v, this._color.a);
  }

  /**
   * 处理色相滑块鼠标按下
   */
  protected _handleHueMouseDown(e: MouseEvent): void {
    if (this.disabled) return;
    e.preventDefault();
    this._isDraggingHue = true;

    const target = e.currentTarget as HTMLElement;
    this._updateHue(e, target);

    const handleMouseMove = (e: MouseEvent) => {
      if (this._isDraggingHue) {
        this._updateHue(e, target);
      }
    };

    const handleMouseUp = () => {
      this._isDraggingHue = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  /**
   * 更新色相
   */
  private _updateHue(e: MouseEvent, target: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

    const h = Math.round((x / rect.width) * 360);

    this._handleColorChange(h, this._color.s, this._color.v, this._color.a);
  }

  /**
   * 处理透明度滑块鼠标按下
   */
  protected _handleAlphaMouseDown(e: MouseEvent): void {
    if (this.disabled) return;
    e.preventDefault();
    this._isDraggingAlpha = true;

    const target = e.currentTarget as HTMLElement;
    this._updateAlpha(e, target);

    const handleMouseMove = (e: MouseEvent) => {
      if (this._isDraggingAlpha) {
        this._updateAlpha(e, target);
      }
    };

    const handleMouseUp = () => {
      this._isDraggingAlpha = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  /**
   * 更新透明度
   */
  private _updateAlpha(e: MouseEvent, target: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

    const a = Math.round((x / rect.width) * 100) / 100;

    this._handleColorChange(this._color.h, this._color.s, this._color.v, a);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    // 只在 value 属性变化且不是由内部更新引起时才更新 _color
    if (changedProperties.has('value') && this.value && !this._isInternalUpdate) {
      const newColor = this._hexToHsv(this.value);
      // 只有当颜色真正改变时才更新，避免循环
      if (
        newColor.h !== this._color.h ||
        newColor.s !== this._color.s ||
        newColor.v !== this._color.v ||
        newColor.a !== this._color.a
      ) {
        this._color = newColor;
      }
    }
  }

  protected $mounted(): void {
    if (this.value) {
      this._color = this._hexToHsv(this.value);
    }

    // 设置初始显示格式
    this._displayFormat = this.colorFormat;

    // 检查是否支持 EyeDropper API
    this._supportsEyeDropper = 'EyeDropper' in window;

    // 添加全局点击事件监听，点击外部关闭面板
    document.addEventListener('click', this._handleDocumentClick.bind(this));
  }

  /**
   * 处理文档点击事件（点击外部关闭面板）
   */
  private _handleDocumentClick(e: MouseEvent): void {
    if (!this._visible) return;

    const target = e.target as HTMLElement;
    const host = this.shadowRoot?.host as HTMLElement;

    // 检查点击是否在组件内部
    if (!host.contains(target) && !this.shadowRoot?.contains(target)) {
      this._visible = false;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick.bind(this));
  }

  render() {
    return template.call(this, {
      _handleClick: this._handleClick.bind(this),
      _handleColorChange: this._handleColorChange.bind(this),
      _handlePredefineClick: this._handlePredefineClick.bind(this),
      _handleSaturationMouseDown: this._handleSaturationMouseDown.bind(this),
      _handleHueMouseDown: this._handleHueMouseDown.bind(this),
      _handleAlphaMouseDown: this._handleAlphaMouseDown.bind(this),
      _toggleFormat: this._toggleFormat.bind(this),
      _handleColorInput: this._handleColorInput.bind(this),
      _handleEyeDropper: this._handleEyeDropper.bind(this),
      _getColorString: this._getColorString.bind(this),
      _visible: this._visible,
      _color: this._color,
      _displayFormat: this._displayFormat,
      _supportsEyeDropper: this._supportsEyeDropper
    });
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-color-picker': NvColorPicker
  }
}
