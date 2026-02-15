/*
 * @Descripttion: submenu组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, Component } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';
import { PropertyValues } from 'lit';

/**
 * submenu组件
 *
 * @slot - 默认插槽，用于放置menu-item或submenu
 * @slot title - 标题插槽
 * @slot icon - 图标插槽
 */
@customElement('nv-submenu')
export class NvSubmenu extends Component {
  /**
   * 唯一标识符
   */
  @property({ type: String })
  index: string = '';

  /**
   * 标题
   */
  @property({ type: String, reflect: true })
  label: string = '';

  /**
   * 是否禁用
   */
  @property({ type: Boolean })
  disabled: boolean = false;

  /**
   * 是否展开
   */
  @property({ type: Boolean, reflect: true })
  opened: boolean = false;

  /**
   * 图标（可以是图标类名或 SVG 字符串）
   */
  @property({ type: String })
  icon: string = '';

  /**
   * 触发方式：click（点击）或 hover（悬停）
   */
  @property({ type: String })
  trigger: 'click' | 'hover' = 'click';

  /**
   * 是否是嵌套的子菜单（在另一个 submenu 内部）
   */
  @property({ type: Boolean, reflect: true, attribute: 'nested' })
  nested: boolean = false;

  /**
   * 是否折叠（由父菜单控制）
   */
  @property({ type: Boolean, reflect: true })
  collapsed: boolean = false;

  /**
   * 列表元素引用
   */
  private _listElement: HTMLElement | null = null;

  /**
   * 悬停定时器
   */
  private _hoverTimer: number | null = null;

  /**
   * 是否已添加文档点击监听器
   */
  private _hasDocumentClickListener: boolean = false;

  /**
   * 处理标题点击
   */
  protected _handleTitleClick(event: Event): void {
    if (this.disabled) {
      return;
    }

    // 阻止事件冒泡，避免触发父级菜单项
    event.stopPropagation();

    // 折叠模式下不响应点击
    if (this.collapsed) {
      return;
    }

    // hover 触发模式下，点击不应该关闭已打开的菜单
    if (this.trigger === 'hover') {
      // 如果菜单已经打开，点击不做任何处理
      if (this.opened) {
        return;
      }
      // 如果菜单未打开，点击可以打开它
      this.opened = true;
      this.dispatchEvent(new CustomEvent('nv-submenu-open', {
        detail: this.index,
        bubbles: true,
        composed: true
      }));
      return;
    }

    // click 触发模式下，正常切换状态
    const willOpen = !this.opened;

    // 触发展开/收起事件（在状态改变之前）
    const eventName = willOpen ? 'open' : 'close';
    this.dispatchEvent(new CustomEvent(`nv-submenu-${eventName}`, {
      detail: this.index,
      bubbles: true,
      composed: true
    }));

    this.opened = willOpen;
  }

  /**
   * 检查是否在水平模式下
   */
  private _isHorizontalMode(): boolean {
    const parentMenu = this.closest('nv-nav-menu');
    return parentMenu?.getAttribute('mode') === 'horizontal';
  }

  /**
   * 更新水平模式或折叠模式下拉菜单的位置
   */
  private _updateDropdownPosition(): void {
    if (!this._listElement) {
      return;
    }

    const isHorizontal = this._isHorizontalMode();
    const isCollapsed = this.collapsed;

    // 只在水平模式或折叠模式下更新位置
    if (!isHorizontal && !isCollapsed) {
      return;
    }

    const titleElement = this.shadowRoot?.querySelector('.nv-submenu__title') as HTMLElement;
    if (!titleElement) {
      return;
    }

    const titleRect = titleElement.getBoundingClientRect();

    this._listElement.style.position = 'fixed';

    // 水平模式
    if (isHorizontal) {
      // 如果是嵌套的子菜单（在另一个 submenu 内部）
      if (this.nested) {
        this._listElement.style.top = `${titleRect.top}px`;
        this._listElement.style.left = `${titleRect.right + 4}px`;
      } else {
        // 第一层子菜单
        this._listElement.style.top = `${titleRect.bottom + 4}px`;
        this._listElement.style.left = `${titleRect.left}px`;
      }
    }
    // 折叠模式
    else if (isCollapsed) {
      this._listElement.style.top = `${titleRect.top}px`;
      this._listElement.style.left = `${titleRect.right + 4}px`;
    }
  }

  /**
   * 更新列表高度以实现过渡效果（仅在垂直模式下使用）
   */
  private _updateListHeight(): void {
    if (!this._listElement) {
      return;
    }

    // 水平模式下不使用高度动画，完全依赖 CSS 的 opacity 和 visibility
    if (this._isHorizontalMode()) {
      return;
    }

    if (this.opened) {
      // 展开：先设置为实际高度，然后设置为auto
      const contentHeight = this._listElement.scrollHeight;
      this._listElement.style.height = `${contentHeight}px`;
      // 等待过渡完成后设置为auto，以便内容变化时能自适应
      setTimeout(() => {
        if (this._listElement && this.opened) {
          this._listElement.style.height = 'auto';
        }
      }, 300);
    } else {
      // 收起：先设置为实际高度，然后设置为0
      const currentHeight = this._listElement.scrollHeight;
      this._listElement.style.height = `${currentHeight}px`;
      // 强制重排，确保高度设置生效
      this._listElement.offsetHeight;
      requestAnimationFrame(() => {
        if (this._listElement && !this.opened) {
          this._listElement.style.height = '0px';
        }
      });
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // 确保获取列表元素引用
    if (!this._listElement) {
      this._listElement = this.shadowRoot?.querySelector('.nv-submenu__list') as HTMLElement;
    }

    if (changedProperties.has('opened')) {
      // 当关闭时，递归关闭所有子菜单
      if (!this.opened) {
        this._closeAllSubmenus();
      }

      // 更新列表高度（仅垂直模式且非折叠模式）
      if (this._listElement && !this.collapsed) {
        requestAnimationFrame(() => {
          this._updateListHeight();
        });
      }

      // 水平模式或折叠模式下，更新下拉菜单位置
      if (this.opened && (this._isHorizontalMode() || this.collapsed)) {
        requestAnimationFrame(() => {
          this._updateDropdownPosition();
        });
      }

      // 处理文档点击监听器
      if (this.trigger === 'click') {
        if (this.opened) {
          this._addDocumentClickListener();
        } else {
          this._removeDocumentClickListener();
        }
      }
    }

    // 当 trigger 改变时，处理文档点击监听器
    if (changedProperties.has('trigger')) {
      if (this.trigger === 'click' && this.opened) {
        this._addDocumentClickListener();
      } else {
        this._removeDocumentClickListener();
      }
    }

    // 当折叠状态改变时
    if (changedProperties.has('collapsed')) {
      if (this.collapsed) {
        // 折叠模式下使用 hover 触发
        this.trigger = 'hover';
        // 关闭子菜单
        this.opened = false;
      } else {
        // 非折叠模式下，如果不是水平模式，恢复为 click 触发
        if (!this._isHorizontalMode()) {
          this.trigger = 'click';
        }
      }
      // 处理折叠状态变化
      this._handleCollapsedChange();
    }
  }

  /**
   * 关闭所有子菜单
   */
  private _closeAllSubmenus(): void {
    const submenus = this.querySelectorAll('nv-submenu');
    submenus.forEach((submenu: any) => {
      if (submenu.opened) {
        submenu.opened = false;
      }
    });
  }

  /**
   * 添加文档点击监听器
   */
  private _addDocumentClickListener(): void {
    if (this._hasDocumentClickListener) {
      return;
    }
    // 使用 setTimeout 延迟添加，避免当前点击事件立即触发
    setTimeout(() => {
      document.addEventListener('click', this._handleDocumentClick, true);
      this._hasDocumentClickListener = true;
    }, 0);
  }

  /**
   * 移除文档点击监听器
   */
  private _removeDocumentClickListener(): void {
    if (this._hasDocumentClickListener) {
      document.removeEventListener('click', this._handleDocumentClick, true);
      this._hasDocumentClickListener = false;
    }
  }

  /**
   * 处理文档点击事件
   */
  private _handleDocumentClick = (event: Event): void => {
    // 如果菜单未打开，不处理
    if (!this.opened) {
      return;
    }

    const target = event.target as Node;

    // 检查点击是否在当前 submenu 内部
    if (this.contains(target)) {
      return;
    }

    // 检查点击是否在 shadow DOM 内部
    const titleElement = this.shadowRoot?.querySelector('.nv-submenu__title');
    const listElement = this.shadowRoot?.querySelector('.nv-submenu__list');

    if (titleElement?.contains(target) || listElement?.contains(target)) {
      return;
    }

    // 点击在外部，关闭菜单
    this.opened = false;
    this.dispatchEvent(new CustomEvent('nv-submenu-close', {
      detail: this.index,
      bubbles: true,
      composed: true
    }));
  };

  /**
   * 处理鼠标进入
   */
  protected _handleMouseEnter(): void {
    if (this.disabled || this.trigger !== 'hover') {
      return;
    }

    // 清除之前的定时器
    if (this._hoverTimer) {
      clearTimeout(this._hoverTimer);
      this._hoverTimer = null;
    }

    // 延迟打开，避免鼠标快速划过时频繁触发
    this._hoverTimer = window.setTimeout(() => {
      if (!this.opened) {
        this.opened = true;
        this.dispatchEvent(new CustomEvent('submenu-open', {
          detail: this.index,
          bubbles: true,
          composed: true
        }));
      }
    }, 200);
  }

  /**
   * 处理鼠标离开
   */
  protected _handleMouseLeave(): void {
    if (this.disabled || this.trigger !== 'hover') {
      return;
    }

    // 清除打开定时器
    if (this._hoverTimer) {
      clearTimeout(this._hoverTimer);
      this._hoverTimer = null;
    }

    // 延迟关闭，给用户时间移动到子菜单
    this._hoverTimer = window.setTimeout(() => {
      if (this.opened) {
        this.opened = false;
        this.dispatchEvent(new CustomEvent('nv-submenu-close', {
          detail: this.index,
          bubbles: true,
          composed: true
        }));
      }
    }, 200);
  }

  /**
   * 处理列表鼠标进入
   */
  protected _handleListMouseEnter(): void {
    if (this.disabled || this.trigger !== 'hover') {
      return;
    }

    // 清除关闭定时器，保持菜单打开
    if (this._hoverTimer) {
      clearTimeout(this._hoverTimer);
      this._hoverTimer = null;
    }
  }

  /**
   * 处理列表鼠标离开
   */
  protected _handleListMouseLeave(): void {
    if (this.disabled || this.trigger !== 'hover') {
      return;
    }

    // 清除之前的定时器
    if (this._hoverTimer) {
      clearTimeout(this._hoverTimer);
      this._hoverTimer = null;
    }

    // 延迟关闭
    this._hoverTimer = window.setTimeout(() => {
      if (this.opened) {
        this.opened = false;
        this.dispatchEvent(new CustomEvent('nv-submenu-close', {
          detail: this.index,
          bubbles: true,
          composed: true
        }));
      }
    }, 200);
  }

  protected $mounted(): void {
    // 检测是否是嵌套的 submenu（在另一个 submenu 内部）
    // 需要在 requestAnimationFrame 之前检测，因为需要向上查找 DOM
    const parentSubmenu = this.parentElement?.closest('nv-submenu');
    if (parentSubmenu) {
      this.nested = true;
    }

    // 监听子菜单项点击事件，点击后关闭浮层
    this.addEventListener('nv-menu-item-select', () => {
      // 在水平模式或折叠模式下，点击子菜单项后关闭浮层
      if (this.opened && (this._isHorizontalMode() || this.collapsed)) {
        this.opened = false;
        this.dispatchEvent(new CustomEvent('nv-submenu-close', {
          detail: this.index,
          bubbles: true,
          composed: true
        }));
      }
    });

    // 使用 nextTick 确保 shadowRoot 已渲染
    requestAnimationFrame(() => {
      this._listElement = this.shadowRoot?.querySelector('.nv-submenu__list') as HTMLElement;

      // 检测父级菜单模式
      const isHorizontal = this._isHorizontalMode();

      // 仅在垂直模式且非折叠模式下设置初始高度
      if (this.opened && this._listElement && !isHorizontal && !this.collapsed) {
        // 初始化时如果是展开状态，设置为auto
        this._listElement.style.height = 'auto';
      }

      // 水平模式或折叠模式下，监听滚动和窗口大小变化，更新下拉菜单位置
      if (isHorizontal || this.collapsed) {
        window.addEventListener('scroll', this._handleScroll, true);
        window.addEventListener('resize', this._handleResize);
      }
    });
  }

  /**
   * 处理滚动事件
   */
  private _handleScroll = (): void => {
    if (this.opened && (this._isHorizontalMode() || this.collapsed)) {
      this._updateDropdownPosition();
    }
  };

  /**
   * 处理窗口大小变化
   */
  private _handleResize = (): void => {
    if (this.opened && (this._isHorizontalMode() || this.collapsed)) {
      this._updateDropdownPosition();
    }
  };

  /**
   * 处理折叠状态变化时的位置更新
   */
  private _handleCollapsedChange(): void {
    if (this.collapsed) {
      // 折叠模式下，如果菜单是打开的，更新位置
      if (this.opened && this._listElement) {
        requestAnimationFrame(() => {
          this._updateDropdownPosition();
        });
      }
      // 添加事件监听
      window.addEventListener('scroll', this._handleScroll, true);
      window.addEventListener('resize', this._handleResize);
    } else {
      // 非折叠模式下，移除事件监听（除非是水平模式）
      if (!this._isHorizontalMode()) {
        window.removeEventListener('scroll', this._handleScroll, true);
        window.removeEventListener('resize', this._handleResize);
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // 清理定时器
    if (this._hoverTimer) {
      clearTimeout(this._hoverTimer);
      this._hoverTimer = null;
    }
    // 清理事件监听
    window.removeEventListener('scroll', this._handleScroll, true);
    window.removeEventListener('resize', this._handleResize);
    this._removeDocumentClickListener();
  }

  render() {
    return template.call(this, {
      _handleTitleClick: this._handleTitleClick.bind(this),
      _handleMouseEnter: this._handleMouseEnter.bind(this),
      _handleMouseLeave: this._handleMouseLeave.bind(this),
      _handleListMouseEnter: this._handleListMouseEnter.bind(this),
      _handleListMouseLeave: this._handleListMouseLeave.bind(this)
    });
  }

  static styles = css`${unsafeCSS(cssText)}`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-submenu': NvSubmenu
  }
}
