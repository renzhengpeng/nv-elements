/*
 * @creater: zhengpeng.ren
 * @since: 2024/11/25
 * @LastAuthor: zhengpeng.ren
 * @Descripttion: popup组件 - 弹出层定位组件
 */
import { unsafeCSS, css, customElement, property, Component } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';

/**
 * popup组件
 *
 * @slot anchor - popup 的锚点元素
 * @slot - popup 的内容
 *
 * @event nv-show - popup 显示时触发
 * @event nv-hide - popup 隐藏时触发
 */
@customElement('nv-popup')
export class NvPopup extends Component {
  /**
   * popup 的位置
   */
  @property({ type: String, reflect: true })
  placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'top';

  /**
   * 是否激活（显示）popup
   */
  @property({ type: Boolean, reflect: true })
  active: boolean = false;

  /**
   * 是否显示箭头
   */
  @property({ type: Boolean, reflect: true })
  arrow: boolean = false;

  /**
   * popup 距离锚点的距离（像素）
   * 注意：当有箭头时，此距离是箭头尖端到锚点的距离，而不是 popup 元素边缘到锚点的距离
   */
  @property({ type: Number, reflect: true })
  distance: number = 8;

  /**
   * popup 沿着锚点的偏移量（像素）
   */
  @property({ type: Number, reflect: true })
  skidding: number = 0;

  /**
   * 同步宽度或高度
   */
  @property({ type: String, reflect: true })
  sync: 'width' | 'height' | 'both' | undefined = undefined;

  /**
   * 定位策略。absolute 在大多数情况下有效，但如果 overflow 被裁剪，使用 fixed 策略通常可以解决问题。
   */
  @property({ type: String, reflect: true })
  strategy: 'absolute' | 'fixed' = 'absolute';

  /**
   * 外部锚点元素的 ID。如果指定，popup 将相对于该元素定位，而不是 slot="anchor" 的元素。
   */
  @property({ type: String, reflect: true })
  anchor: string = '';

  /**
   * 是否自动调整位置以避免被视口边界遮挡
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-adjust' })
  autoAdjust: boolean = true;

  /**
   * 实际使用的 placement（经过自动调整后）
   * 用于正确显示箭头位置和过渡效果
   *
   * 注意：此属性主要由组件内部计算和更新，外部不应该手动设置
   * 反射到 DOM 属性（actual-placement）上，以便外部样式可以基于实际位置设置过渡效果
   * 例如：nv-popup[actual-placement^="top"]::part(popup) { ... }
   */
  @property({ type: String, reflect: true, attribute: 'actual-placement' })
  _actualPlacement: typeof this.placement = 'top';

  /**
   * 触发方式
   */
  @property({ type: String, reflect: true })
  trigger: 'click' | 'hover' | 'focus' | 'manual' = 'hover';

  /**
   * 延迟显示时间（毫秒），hover/focus 时生效
   */
  @property({ type: Number, reflect: true, attribute: 'open-delay' })
  openDelay: number = 100;

  /**
   * 延迟隐藏时间（毫秒），hover 时生效
   */
  @property({ type: Number, reflect: true, attribute: 'hide-delay' })
  hideDelay: number = 100;

  /**
   * hover 触发时，鼠标移入浮层内容区是否保持不关闭（默认 true）
   */
  @property({ type: Boolean, reflect: true, attribute: 'keep-open-on-hover-content' })
  keepOpenOnHoverContent: boolean = true;

  /**
   * 点击外部时是否关闭 popup
   */
  @property({ type: Boolean, reflect: true })
  closeOnClickOutside: boolean = true;

  /**
   * 是否禁用 popup（禁用后无法通过触发器激活）
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * reposition 重试计数器
   */
  private _repositionRetries: number = 0;

  /**
   * ResizeObserver 用于监听 popup 内容尺寸变化
   */
  private _resizeObserver: ResizeObserver | null = null;

  /**
   * 标记是否已经完成首次定位
   */
  private _hasInitialPositioned: boolean = false;

  /**
   * 外部锚点元素（通过 anchor 属性指定）
   */
  private _externalAnchor: HTMLElement | null = null;

  /**
   * hover 显示延迟定时器
   */
  private _hoverShowTimer: number | null = null;

  /**
   * hover 隐藏延迟定时器
   */
  private _hoverHideTimer: number | null = null;

  /**
   * 是否已设置文档点击监听
   */
  private _hasDocumentClickListener: boolean = false;

  /**
   * 获取锚点容器元素
   */
  private _getAnchorElement(): HTMLElement | null {
    // 如果指定了外部锚点，优先使用外部锚点
    if (this._externalAnchor) {
      return this._externalAnchor;
    }
    // 获取 slot="anchor" 的实际元素，而不是包裹的 div
    const anchorSlot = this.shadowRoot?.querySelector('slot[name="anchor"]') as HTMLSlotElement;
    if (anchorSlot) {
      const assignedElements = anchorSlot.assignedElements();
      if (assignedElements.length > 0) {
        return assignedElements[0] as HTMLElement;
      }
    }
    // 如果没有找到slot元素，回退到容器div
    return this.shadowRoot?.querySelector('.nv-popup__anchor') as HTMLElement || null;
  }

  /**
   * 更新外部锚点元素
   */
  private _updateExternalAnchor(): void {
    // 清理旧的事件监听
    this._removeAnchorEventListeners();

    if (this.anchor) {
      // 根据 ID 查找外部元素
      const element = document.getElementById(this.anchor);
      if (element) {
        this._externalAnchor = element;
        // 设置新的事件监听
        this._setupAnchorEventListeners();
      } else {
        console.warn(`[nv-popup] Cannot find anchor element with id: ${ this.anchor }`);
        this._externalAnchor = null;
      }
    } else {
      this._externalAnchor = null;
      // 如果没有外部锚点，使用内部 slot 锚点
      this._setupAnchorEventListeners();
    }
  }

  /**
   * 获取 popup 面板元素
   */
  private _getPopupElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.nv-popup__popup') as HTMLElement || null;
  }

  /**
   * 获取 popup 的定位父元素
   */
  private _getOffsetParent(element: HTMLElement): HTMLElement | null {
    return element.offsetParent as HTMLElement;
  }

  /**
   * 获取变换原点
   */
  private _getTransformOrigin(placement: string): string {
    switch (placement) {
      case 'top': return 'bottom center';
      case 'top-start': return 'bottom left';
      case 'top-end': return 'bottom right';
      case 'bottom': return 'top center';
      case 'bottom-start': return 'top left';
      case 'bottom-end': return 'top right';
      case 'left': return 'center right';
      case 'left-start': return 'top right';
      case 'left-end': return 'bottom right';
      case 'right': return 'center left';
      case 'right-start': return 'top left';
      case 'right-end': return 'bottom left';
      default: return 'center center';
    }
  }

  /**
   * 更新 popup 位置
   */
  public reposition(): void {
    const popup = this._getPopupElement();
    const anchor = this._getAnchorElement();

    if (!popup || !anchor) return;

    const anchorRect = anchor.getBoundingClientRect();

    // 如果锚点尺寸为0，说明可能还没渲染完成，重试最多 10 次
    if (anchorRect.width === 0 && anchorRect.height === 0) {
      if (this._repositionRetries < 10) {
        this._repositionRetries++;
        requestAnimationFrame(() => this.reposition());
        return;
      } else {
        this._repositionRetries = 0;
        return;
      }
    }

    // 重置重试计数器
    this._repositionRetries = 0;

    const anchorWidth = anchorRect.width;
    const anchorHeight = anchorRect.height;

    // 先应用 sync，这样后续的位置计算才会使用正确的尺寸
    if (this.sync === 'width' || this.sync === 'both') {
      popup.style.width = `${ anchorWidth }px`;
    }
    if (this.sync === 'height' || this.sync === 'both') {
      popup.style.height = `${ anchorHeight }px`;
    }

    // 获取应用 sync 后的 popup 尺寸
    const popupRect = popup.getBoundingClientRect();
    const popupWidth = popupRect.width;
    const popupHeight = popupRect.height;

    // 获取视口尺寸
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 计算可用空间（考虑滚动）
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // 确定最终的 placement（如果启用了 autoAdjust，会根据可用空间调整）
    let finalPlacement = this.placement;

    if (this.autoAdjust) {
      finalPlacement = this._adjustPlacement(
        anchorRect,
        popupWidth,
        popupHeight,
        viewportWidth,
        viewportHeight
      );
    }

    // 更新实际使用的 placement，用于正确显示箭头
    this._actualPlacement = finalPlacement;

    // 根据最终的 placement 计算位置
    const position = this._calculatePosition(
      finalPlacement,
      anchorRect,
      popupWidth,
      popupHeight,
      anchorWidth,
      anchorHeight
    );

    let { top, left } = position;

    // 如果启用了 autoAdjust，确保不超出视口边界（微调）
    if (this.autoAdjust) {
      const adjusted = this._adjustForViewportBounds(
        top,
        left,
        popupWidth,
        popupHeight,
        viewportWidth,
        viewportHeight
      );
      top = adjusted.top;
      left = adjusted.left;
    }

    // 当使用 absolute 定位时，需要加上页面滚动距离
    // getBoundingClientRect() 返回的是视口坐标，而 absolute 定位是相对于文档的
    if (this.strategy === 'absolute') {
      top += scrollY;
      left += scrollX;

      // 如果有定位父元素（不是 body），需要减去父元素的偏移
      const offsetParent = this._getOffsetParent(popup);
      if (offsetParent && offsetParent.tagName.toLowerCase() !== 'body') {
        const parentRect = offsetParent.getBoundingClientRect();
        top -= (parentRect.top + scrollY);
        left -= (parentRect.left + scrollX);
      }
    }

    // 设置定位策略和位置
    popup.style.position = this.strategy;
    popup.style.top = `${ top }px`;
    popup.style.left = `${ left }px`;

    // 设置变换原点
    if (this._actualPlacement) {
       const origin = this._getTransformOrigin(this._actualPlacement);
       popup.style.setProperty('--origin', origin);
    }
  }

  /**
   * 获取箭头的实际可见高度
   * 箭头通过伪元素实现（border: 6px），虽然伸出 popup 元素 12px，
   * 但三角形的实际可见高度只有 6px
   */
  private _getArrowOffset(): number {
    // 箭头的 border 是 6px，三角形的可见高度也是 6px
    return this.arrow ? 6 : 0;
  }

  /**
   * 根据可用空间调整 placement
   * 如果首选位置放不下，会尝试翻转到对立位置
   */
  private _adjustPlacement(
    anchorRect: DOMRect,
    popupWidth: number,
    popupHeight: number,
    viewportWidth: number,
    viewportHeight: number
  ): typeof this.placement {
    // 计算各个方向的可用空间
    const spaceTop = anchorRect.top;
    const spaceBottom = viewportHeight - anchorRect.bottom;
    const spaceLeft = anchorRect.left;
    const spaceRight = viewportWidth - anchorRect.right;

    // 获取箭头偏移量
    const arrowOffset = this._getArrowOffset();

    // 所需空间（包括 distance 和箭头大小）
    const requiredHeight = popupHeight + this.distance + arrowOffset;
    const requiredWidth = popupWidth + this.distance + arrowOffset;

    const placement = this.placement;

    // 主方向检测和翻转
    if (placement.startsWith('top')) {
      // 如果顶部空间不足，且底部空间更多，翻转到底部
      if (spaceTop < requiredHeight && spaceBottom > spaceTop) {
        return placement.replace('top', 'bottom') as typeof this.placement;
      }
    } else if (placement.startsWith('bottom')) {
      // 如果底部空间不足，且顶部空间更多，翻转到顶部
      if (spaceBottom < requiredHeight && spaceTop > spaceBottom) {
        return placement.replace('bottom', 'top') as typeof this.placement;
      }
    } else if (placement.startsWith('left')) {
      // 如果左侧空间不足，且右侧空间更多，翻转到右侧
      if (spaceLeft < requiredWidth && spaceRight > spaceLeft) {
        return placement.replace('left', 'right') as typeof this.placement;
      }
    } else if (placement.startsWith('right')) {
      // 如果右侧空间不足，且左侧空间更多，翻转到左侧
      if (spaceRight < requiredWidth && spaceLeft > spaceRight) {
        return placement.replace('right', 'left') as typeof this.placement;
      }
    }

    // 如果主方向可以放下，或者翻转后也放不下，保持原 placement
    return placement;
  }

  /**
   * 根据 placement 计算位置
   */
  private _calculatePosition(
    placement: typeof this.placement,
    anchorRect: DOMRect,
    popupWidth: number,
    popupHeight: number,
    anchorWidth: number,
    anchorHeight: number
  ): { top: number; left: number } {
    let top = 0;
    let left = 0;

    // 获取箭头偏移量
    // 如果有箭头，需要在 distance 基础上额外增加箭头偏移，确保 distance 是箭头尖端到锚点的距离
    const arrowOffset = this._getArrowOffset();

    // 根据 placement 计算位置
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = anchorRect.top - popupHeight - this.distance - arrowOffset;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = anchorRect.bottom + this.distance + arrowOffset;
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        left = anchorRect.left - popupWidth - this.distance - arrowOffset;
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        left = anchorRect.right + this.distance + arrowOffset;
        break;
    }

    // 水平对齐
    if (placement.startsWith('top') || placement.startsWith('bottom')) {
      if (placement.endsWith('-start')) {
        left = anchorRect.left + this.skidding;
      } else if (placement.endsWith('-end')) {
        left = anchorRect.right - popupWidth + this.skidding;
      } else {
        left = anchorRect.left + (anchorWidth - popupWidth) / 2 + this.skidding;
      }
    }

    // 垂直对齐
    if (placement.startsWith('left') || placement.startsWith('right')) {
      if (placement.endsWith('-start')) {
        top = anchorRect.top + this.skidding;
      } else if (placement.endsWith('-end')) {
        top = anchorRect.bottom - popupHeight + this.skidding;
      } else {
        top = anchorRect.top + (anchorHeight - popupHeight) / 2 + this.skidding;
      }
    }

    return { top, left };
  }

  /**
   * 微调位置以确保不超出视口边界
   * 这个调整是在翻转之后进行的，用于处理水平/垂直方向的边界溢出
   */
  private _adjustForViewportBounds(
    top: number,
    left: number,
    popupWidth: number,
    popupHeight: number,
    viewportWidth: number,
    viewportHeight: number
  ): { top: number; left: number } {
    const padding = 8; // 距离视口边缘的最小间距

    // 调整水平位置
    if (left < padding) {
      left = padding;
    } else if (left + popupWidth > viewportWidth - padding) {
      left = viewportWidth - popupWidth - padding;
    }

    // 调整垂直位置
    if (top < padding) {
      top = padding;
    } else if (top + popupHeight > viewportHeight - padding) {
      top = viewportHeight - popupHeight - padding;
    }

    return { top, left };
  }

  /**
   * 显示 popup（通过 CSS class 控制，actual visibility 由 CSS 管理）
   */
  private _emitShowEvent(): void {
    this.dispatchEvent(new CustomEvent('nv-show', { bubbles: true, composed: true }));
  }

  /**
   * 隐藏 popup（通过 CSS class 控制，actual visibility 由 CSS 管理）
   */
  private _emitHideEvent(): void {
    this.dispatchEvent(new CustomEvent('nv-hide', { bubbles: true, composed: true }));
  }

  /**
   * 设置 ResizeObserver 监听 popup 内容尺寸变化
   */
  private _setupResizeObserver(): void {
    const popup = this._getPopupElement();
    if (!popup) return;

    // 清理旧的 observer
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }

    // 创建新的 observer
    this._resizeObserver = new ResizeObserver((entries) => {
      // 只在 active 状态下响应尺寸变化
      if (!this.active) return;

      // 内容尺寸发生变化时重新定位
      for (const entry of entries) {
        if (entry.target === popup) {
          // 使用 requestAnimationFrame 确保布局完成
          requestAnimationFrame(() => {
            this.reposition();

            // 首次定位完成后触发 show 事件
            if (!this._hasInitialPositioned) {
              this._hasInitialPositioned = true;
              this._emitShowEvent();
            }
          });
          break;
        }
      }
    });

    // 开始观察
    this._resizeObserver.observe(popup);
  }

  /**
   * 清理 ResizeObserver
   */
  private _cleanupResizeObserver(): void {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  /**
   * 设置锚点事件监听
   */
  private _setupAnchorEventListeners(): void {
    if (this.trigger === 'manual') return;

    const anchor = this._getAnchorElement();
    if (!anchor) return;

    if (this.trigger === 'click') {
      anchor.addEventListener('click', this._handleAnchorClick);
    } else if (this.trigger === 'hover') {
      anchor.addEventListener('mouseenter', this._handleAnchorMouseEnter);
      anchor.addEventListener('mouseleave', this._handleAnchorMouseLeave);
      if (this.keepOpenOnHoverContent) {
        const popup = this._getPopupElement();
        if (popup) {
          popup.addEventListener('mouseenter', this._handlePopupMouseEnter);
          popup.addEventListener('mouseleave', this._handlePopupMouseLeave);
        }
      }
    } else if (this.trigger === 'focus') {
      // 使用 focusin/focusout 以便锚点内子元素（如 slot 里的按钮）获得焦点时也能触发
      anchor.addEventListener('focusin', this._handleAnchorFocus);
      anchor.addEventListener('focusout', this._handleAnchorBlur);
    }
  }

  /**
   * 移除锚点事件监听
   */
  private _removeAnchorEventListeners(): void {
    const anchor = this._getAnchorElement();
    if (anchor) {
      anchor.removeEventListener('click', this._handleAnchorClick);
      anchor.removeEventListener('mouseenter', this._handleAnchorMouseEnter);
      anchor.removeEventListener('mouseleave', this._handleAnchorMouseLeave);
      anchor.removeEventListener('focusin', this._handleAnchorFocus);
      anchor.removeEventListener('focusout', this._handleAnchorBlur);
    }

    const popup = this._getPopupElement();
    if (popup) {
      popup.removeEventListener('mouseenter', this._handlePopupMouseEnter);
      popup.removeEventListener('mouseleave', this._handlePopupMouseLeave);
    }

    if (this._hoverShowTimer !== null) {
      window.clearTimeout(this._hoverShowTimer);
      this._hoverShowTimer = null;
    }
    if (this._hoverHideTimer !== null) {
      window.clearTimeout(this._hoverHideTimer);
      this._hoverHideTimer = null;
    }
  }

  /**
   * 处理锚点点击
   */
  private _handleAnchorClick = (event: Event): void => {
    // 禁用状态下不处理点击
    if (this.disabled) return;
    event.stopPropagation();
    this.toggle();
  };

  /**
   * 处理锚点鼠标进入
   */
  private _handleAnchorMouseEnter = (): void => {
    if (this.disabled) return;
    if (this._hoverHideTimer !== null) {
      window.clearTimeout(this._hoverHideTimer);
      this._hoverHideTimer = null;
    }
    this._hoverShowTimer = window.setTimeout(() => {
      this._hoverShowTimer = null;
      this.show();
    }, this.openDelay);
  };

  /**
   * 处理锚点鼠标离开
   */
  private _handleAnchorMouseLeave = (): void => {
    if (this._hoverShowTimer !== null) {
      window.clearTimeout(this._hoverShowTimer);
      this._hoverShowTimer = null;
    }
    this._hoverHideTimer = window.setTimeout(() => {
      this._hoverHideTimer = null;
      this.hide();
    }, this.hideDelay);
  };

  /**
   * 处理 popup 鼠标进入（移入浮层保持不关）
   */
  private _handlePopupMouseEnter = (): void => {
    if (this._hoverHideTimer !== null) {
      window.clearTimeout(this._hoverHideTimer);
      this._hoverHideTimer = null;
    }
  };

  /**
   * 处理 popup 鼠标离开
   */
  private _handlePopupMouseLeave = (): void => {
    this._hoverHideTimer = window.setTimeout(() => {
      this._hoverHideTimer = null;
      this.hide();
    }, this.hideDelay);
  };

  /**
   * 处理锚点获得焦点
   */
  private _handleAnchorFocus = (): void => {
    if (this.disabled) return;
    if (this.openDelay <= 0) {
      this.show();
    } else {
      this._hoverShowTimer = window.setTimeout(() => {
        this._hoverShowTimer = null;
        this.show();
      }, this.openDelay);
    }
  };

  /**
   * 处理锚点失去焦点
   */
  private _handleAnchorBlur = (): void => {
    if (this.hideDelay <= 0) {
      this.hide();
    } else {
      this._hoverHideTimer = window.setTimeout(() => {
        this._hoverHideTimer = null;
        this.hide();
      }, this.hideDelay);
    }
  };

  /**
   * 处理文档点击（点击外部关闭）
   */
  private _handleDocumentClick = (event: Event): void => {
    // 如果 popup 未激活，不处理
    if (!this.active) return;

    const popup = this._getPopupElement();
    const anchor = this._getAnchorElement();

    // 使用 composedPath 获取事件路径，可以正确处理 Shadow DOM
    const path = event.composedPath();

    // 检查点击是否在 popup 内部（包括 slot 内容）
    if (popup && path.includes(popup)) {
      return;
    }

    // 检查点击是否在 anchor 内部
    if (anchor && path.includes(anchor)) {
      return;
    }

    // 检查点击是否在组件自身（包括 shadow root）
    if (path.includes(this)) {
      return;
    }

    // 点击外部，关闭 popup
    this.hide();
  };

  /**
   * 设置文档点击监听
   */
  private _setupDocumentClickListener(): void {
    // 只有在开启 closeOnClickOutside 时才添加监听
    if (!this.closeOnClickOutside) return;

    if (!this._hasDocumentClickListener) {
      // 使用 setTimeout 延迟添加，避免当前点击事件立即触发
      // 使用更长的延迟确保当前点击事件完全结束
      setTimeout(() => {
        document.addEventListener('click', this._handleDocumentClick, false);
        this._hasDocumentClickListener = true;
      }, 10);
    }
  }

  /**
   * 移除文档点击监听
   */
  private _removeDocumentClickListener(): void {
    if (this._hasDocumentClickListener) {
      document.removeEventListener('click', this._handleDocumentClick, false);
      this._hasDocumentClickListener = false;
    }
  }

  /**
   * 显示 popup
   */
  public show(): void {
    if (this.disabled) return;
    this.active = true;
    this.dispatch('nv-show', {});
  }

  /**
   * 隐藏 popup
   */
  public hide(): void {
    this.active = false;
    this.dispatch('nv-hide', {});
  }

  /**
   * 切换 popup 显示状态
   */
  public toggle(): void {
    // 禁用状态下不允许切换
    if (this.disabled) return;
    this.active = !this.active;
  }

  /**
   * 更新 popup
   */
  private _updatePopup(): void {
    if (this.active) {
      // 重置首次定位标记
      this._hasInitialPositioned = false;

      // 设置 ResizeObserver 监听内容变化
      this._setupResizeObserver();

      // 设置文档点击监听（如果开启了 closeOnClickOutside）
      this._setupDocumentClickListener();


      // 这里的逻辑为了防止初次渲染时的位置跳动
      // 1. 先隐藏 (但保持 display: inline-flex 以便测量)
      const popup = this._getPopupElement();
      if (popup) popup.style.visibility = 'hidden';

      // 立即进行首次定位尝试
      requestAnimationFrame(() => {
        this.reposition();

        requestAnimationFrame(() => {
           if (popup) {
             // 2. 恢复可见性
             popup.style.visibility = '';

             // 3. 重置动画 (为了让动画从正确位置开始播放)
             // 获取 content 元素
             const content = popup.querySelector('.nv-popup__content') as HTMLElement;
             if (content) {
                // 触发重绘（读 offsetWidth 以强制 reflow）
                // eslint-disable-next-line no-unused-expressions -- 有意利用读操作触发 reflow
                content.offsetWidth;
                // 动画会自动重新播放，因为 component 保持着 --active 状态，
                // 或者我们可以重新单纯触发一次 animation (如果 animation 是一次性的)
                // 由于我们使用的是 forwards animation，它播放完就停了。
                // 如果刚刚 render，animation 已经开始。
                // 这里的重绘可能不会重置 animation，除非移除再添加 class。
                // 但是由于前几帧是 invisible 的，用户应该看不到跳动。
             }
           }
        });

        // 如果内容已经有尺寸，说明渲染完成，立即触发 show 事件
        if (popup) {
          const rect = popup.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
             this._hasInitialPositioned = true;
             this._emitShowEvent();
          }
        }
      });
    } else {
      // 清理 observer
      this._cleanupResizeObserver();

      // 清理文档点击监听
      this._removeDocumentClickListener();

      this._emitHideEvent();
    }
  }

  protected firstUpdated(): void {
    // 监听滚动和 resize
    window.addEventListener('scroll', this._handleScroll, true);
    window.addEventListener('resize', this._handleResize);

    // 更新外部锚点
    this._updateExternalAnchor();

    // 设置事件监听
    this._setupAnchorEventListeners();

    // 如果初始状态为激活，则创建并显示
    if (this.active) {
      requestAnimationFrame(() => {
        this._updatePopup();
      });
    }
  }

  protected updated(changedProps: Map<PropertyKey, unknown>): void {
    super.updated(changedProps);

    // 处理外部锚点变化
    if (changedProps.has('anchor')) {
      this._updateExternalAnchor();
      if (this.active) {
        requestAnimationFrame(() => {
          this.reposition();
        });
      }
    }

    // 处理触发方式、延迟或“移入浮层保持不关”变化
    if (
      changedProps.has('trigger') ||
      changedProps.has('openDelay') ||
      changedProps.has('hideDelay') ||
      changedProps.has('keepOpenOnHoverContent')
    ) {
      this._removeAnchorEventListeners();
      this._setupAnchorEventListeners();
    }

    // 处理 closeOnClickOutside 变化
    if (changedProps.has('closeOnClickOutside')) {
      if (this.active) {
        if (this.closeOnClickOutside) {
          this._setupDocumentClickListener();
        } else {
          this._removeDocumentClickListener();
        }
      }
    }

    // 只处理 active 状态变化，且只在变为 true 或从 true 变为 false 时处理
    if (changedProps.has('active')) {
      const oldValue = changedProps.get('active');
      // 只在真正的状态切换时才更新（从 undefined 到 false 不算切换）
      if (oldValue !== undefined || this.active === true) {
        this._updatePopup();
      }
      return;
    }

    // 处理 placement 变化（无论是否激活）
    if (changedProps.has('placement')) {
      // 在非激活状态下，直接同步 _actualPlacement
      // 这样过渡效果的样式能正确匹配初始 placement
      // 如果已激活，会在下面的逻辑中调用 reposition 重新计算（可能因为 autoAdjust 而改变）
      if (!this.active) {
        this._actualPlacement = this.placement;
      }
    }

    // 只有在激活状态下才处理其他属性变化
    if (this.active && (
      changedProps.has('placement') ||
      changedProps.has('distance') ||
      changedProps.has('skidding') ||
      changedProps.has('sync') ||
      changedProps.has('arrow') ||
      changedProps.has('strategy')
    )) {
      requestAnimationFrame(() => {
        this.reposition();
        this.requestUpdate(); // 重新渲染以更新 CSS classes
      });
    }
  }

  private _handleScroll = (): void => {
    if (this.active) {
      this.reposition();
    }
  };

  private _handleResize = (): void => {
    if (this.active) {
      this.reposition();
    }
  };

  /**
   * 组件连接到 DOM 时的生命周期钩子
   */
  connectedCallback(): void {
    super.connectedCallback();

    // 初始化实际 placement
    this._actualPlacement = this.placement;
  }

  disconnectedCallback(): void {
    window.removeEventListener('scroll', this._handleScroll, true);
    window.removeEventListener('resize', this._handleResize);
    this._cleanupResizeObserver();
    this._removeAnchorEventListeners();
    this._removeDocumentClickListener();
    super.disconnectedCallback();
  }

  render() {
    return template.call(this);
  }

  static styles = [
    unsafeCSS(cssText),
    css``
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-popup': NvPopup;
  }
}
