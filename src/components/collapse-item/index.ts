/*
 * @Descripttion: collapse-item组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import { PropertyValues } from 'lit';

/**
 * collapse-item组件
 *
 * @slot - 默认插槽，面板内容
 * @slot label - 标题插槽
 */
@customElement('nv-collapse-item')
export class NvCollapseItem extends Component {
  /**
   * 唯一标识符
   */
  @property({ type: String })
  name: string = '';

  /**
   * 面板标题
   */
  @property({ type: String, reflect: true })
  label: string = '';

  /**
   * 是否禁用
   */
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * 是否激活（由父组件控制）
   */
  @property({ type: Boolean })
  isActive: boolean = false;

  /**
   * 异步加载后展示的内容（由父组件在 nv-before-expand 的 resolve/reject 中设置）
   * 为空时展示默认 slot 内容
   */
  @property({ type: String, attribute: 'loaded-content' })
  loadedContent: string = '';

  /**
   * 当前展示的 loadedContent 是否为错误态（reject 传入字符串时为 true，以醒目错误样式包裹）
   */
  @property({ type: Boolean, attribute: 'content-is-error' })
  contentIsError: boolean = false;

  /**
   * 是否处于加载中（异步展开时由父组件在等待 resolve/reject 期间设置）
   */
  @property({ type: Boolean })
  loading: boolean = false;

  /**
   * wrapper元素引用
   */
  private _wrapperElement: HTMLElement | null = null;

  /**
   * 处理点击事件
   */
  protected _handleClick(): void {
    if (this.disabled) {
      return;
    }
    this.dispatchEvent(new CustomEvent('nv-item-change', {
      detail: {
        name: this.name,
        isActive: !this.isActive
      },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 更新wrapper高度以实现过渡效果
   */
  private _updateWrapperHeight(): void {
    if (!this._wrapperElement) {
      return;
    }

    const duration = 300;

    if (this.isActive) {
      // 展开：先设置为实际高度，然后设置为auto
      const contentHeight = this._wrapperElement.scrollHeight;
      this._wrapperElement.style.height = `${ contentHeight }px`;
      // 等待过渡完成后设置为auto，并派发展开后事件
      setTimeout(() => {
        if (this._wrapperElement && this.isActive) {
          this._wrapperElement.style.height = 'auto';
          this.dispatchEvent(new CustomEvent('nv-item-expand-after', {
            detail: { name: this.name },
            bubbles: true,
            composed: true
          }));
        }
      }, duration);
    } else {
      // 收起：先设置为实际高度，然后设置为0
      const currentHeight = this._wrapperElement.scrollHeight;
      this._wrapperElement.style.height = `${ currentHeight }px`;
      // 强制重排，确保高度设置生效
      this._wrapperElement.offsetHeight;
      requestAnimationFrame(() => {
        if (this._wrapperElement && !this.isActive) {
          this._wrapperElement.style.height = '0px';
          // 过渡结束后派发收起后事件
          setTimeout(() => {
            this.dispatchEvent(new CustomEvent('nv-item-collapse-after', {
              detail: { name: this.name },
              bubbles: true,
              composed: true
            }));
          }, duration);
        }
      });
    }
  }

  /**
   * 是否有 label slot 内容（检查 Light DOM 中 slot="label" 的子节点）
   */
  protected get _hasLabelSlot(): boolean {
    return Array.from(this.children).some(
      (child) => child.getAttribute('slot') === 'label'
    );
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // 确保获取wrapper元素引用
    if (!this._wrapperElement) {
      this._wrapperElement = this.shadowRoot?.querySelector('.nv-collapse-item__wrapper') as HTMLElement;
    }

    if (changedProperties.has('isActive') && this._wrapperElement) {
      // 使用 requestAnimationFrame 确保 DOM 已更新
      requestAnimationFrame(() => {
        this._updateWrapperHeight();
      });
    }
  }

  protected $mounted(): void {
    // 使用 nextTick 确保 shadowRoot 已渲染
    requestAnimationFrame(() => {
      this._wrapperElement = this.shadowRoot?.querySelector('.nv-collapse-item__wrapper') as HTMLElement;
      if (this.isActive && this._wrapperElement) {
        // 初始化时如果是激活状态，设置为auto
        this._wrapperElement.style.height = 'auto';
      }
    });
  }

  render() {
    return template.call(this, {
      _handleClick: this._handleClick.bind(this)
    });
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-collapse-item': NvCollapseItem
  }
}
