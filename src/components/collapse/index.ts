/*
 * @Descripttion: collapse组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import { PropertyValues } from 'lit';
import '../collapse-item/index';

/**
 * collapse组件
 *
 * @slot - 默认插槽，用于放置collapse-item
 */
@customElement('nv-collapse')
export class NvCollapse extends Component {
  /**
   * 当前激活的面板（手风琴模式为字符串，非手风琴模式为字符串数组）
   */
  @property({ type: String })
  value: string | string[] = '';

  /**
   * 是否手风琴模式（同时只能展开一个面板）
   */
  @property({ type: Boolean })
  accordion: boolean = false;

  /**
   * 是否异步展开（为 true 时展开前会触发 nv-before-expand，由 resolve/reject 决定是否展开及内容）
   */
  @property({ type: Boolean, attribute: 'async-expand' })
  asyncExpand: boolean = false;

  /**
   * 已展开过的面板 name 集合，用于 nv-before-expand 的 expandedBefore 参数
   */
  private _expandedNames: Set<string> = new Set();

  /**
   * 根据 name 获取对应的 collapse-item 元素
   */
  protected _getItemByName(name: string): HTMLElement | null {
    const items = this.querySelectorAll('nv-collapse-item');
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement & { name?: string };
      if (item.name === name) return item;
    }
    return null;
  }

  /**
   * 处理面板切换
   */
  protected _handleItemChange(name: string, isActive: boolean): void {
    if (this.accordion) {
      // 手风琴模式
      this.value = isActive ? name : '';
    } else {
      // 非手风琴模式
      const currentValue = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValue.indexOf(name);
      if (isActive) {
        if (index === -1) {
          currentValue.push(name);
        }
      } else {
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      }
      this.value = currentValue;
    }

    this.dispatchEvent(new CustomEvent('nv-change', {
      detail: this.value,
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }

  /**
   * 应用展开结果：更新 value、子项 isActive，并可设置子项的 loadedContent / contentIsError
   */
  protected _applyExpandResult(name: string, content: true | string, isError: boolean): void {
    const item = this._getItemByName(name) as (HTMLElement & { isActive?: boolean; loadedContent?: string; contentIsError?: boolean }) | null;
    if (content === true) {
      if (item) {
        item.loadedContent = '';
        item.contentIsError = false;
      }
    } else {
      if (item) {
        item.loadedContent = content;
        item.contentIsError = isError;
      }
    }
    this._handleItemChange(name, true);
  }

  /**
   * 检查面板是否激活
   */
  protected _isItemActive(name: string): boolean {
    if (this.accordion) {
      return this.value === name;
    } else {
      return Array.isArray(this.value) && this.value.includes(name);
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    // 更新所有子项的激活状态（收起时不清空 loadedContent，避免收起瞬间内容闪回占位）
    if (changedProperties.has('value')) {
      const items = this.querySelectorAll('nv-collapse-item');
      items.forEach((item: any) => {
        if (item.name) {
          item.isActive = this._isItemActive(item.name);
        }
      });
    }
  }

  protected $mounted(): void {
    // 监听子项的 item-change 事件
    this.addEventListener('nv-item-change', (event: Event) => {
      const customEvent = event as CustomEvent;
      const { name, isActive } = customEvent.detail;

      // 收起：先派发收起前事件，再处理
      if (!isActive) {
        this.dispatchEvent(new CustomEvent('nv-before-collapse', {
          detail: { name },
          bubbles: true,
          composed: true
        }));
        this._handleItemChange(name, false);
        return;
      }

      // 展开：若启用异步展开，先显示 loading，触发 nv-before-expand，由 resolve/reject 决定结果
      if (this.asyncExpand) {
        const item = this._getItemByName(name) as (HTMLElement & { loading?: boolean }) | null;
        if (item) item.loading = true;

        let settled = false;
        const clearLoading = () => {
          const el = this._getItemByName(name) as (HTMLElement & { loading?: boolean }) | null;
          if (el) el.loading = false;
        };
        const resolveOnce = (value: true | string) => {
          if (settled) return;
          settled = true;
          clearLoading();
          if (value === true) {
            this._expandedNames.add(name);
            this._applyExpandResult(name, true, false);
          } else {
            this._expandedNames.add(name);
            this._applyExpandResult(name, value, false);
          }
        };
        const rejectOnce = (value: false | string) => {
          if (settled) return;
          settled = true;
          clearLoading();
          if (value === false) {
            return;
          }
          this._expandedNames.add(name);
          this._applyExpandResult(name, value, true);
        };
        const beforeEvent = new CustomEvent('nv-before-expand', {
          detail: {
            name,
            expandedBefore: this._expandedNames.has(name),
            resolve: resolveOnce,
            reject: rejectOnce
          },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(beforeEvent);
        return;
      }

      this._handleItemChange(name, isActive);
    });

    // 子项展开/收起动画结束后，由 collapse 派发 nv-after-expand / nv-after-collapse
    this.addEventListener('nv-item-expand-after', (event: Event) => {
      const e = event as CustomEvent<{ name: string }>;
      this.dispatchEvent(new CustomEvent('nv-after-expand', {
        detail: { name: e.detail.name },
        bubbles: true,
        composed: true
      }));
    });
    this.addEventListener('nv-item-collapse-after', (event: Event) => {
      const e = event as CustomEvent<{ name: string }>;
      this.dispatchEvent(new CustomEvent('nv-after-collapse', {
        detail: { name: e.detail.name },
        bubbles: true,
        composed: true
      }));
    });

    // 初始化子项的激活状态
    const items = this.querySelectorAll('nv-collapse-item');
    items.forEach((item: any) => {
      if (item.name) {
        item.isActive = this._isItemActive(item.name);
      }
    });
  }

  render() {
    return template.call(this);
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-collapse': NvCollapse
  }
}
