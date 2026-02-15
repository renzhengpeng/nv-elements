/*
 * @Descripttion: pagination组件
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { unsafeCSS, css, customElement, property, state, Component } from '../../based-on/index.ts';
import cssText from './style.scss?inline';
import template from './template.ts';

/**
 * pagination组件
 */
@customElement('nv-pagination')
export class NvPagination extends Component {
  /**
   * 当前页数
   */
  @property({ type: Number })
  currentPage: number = 1;

  /**
   * 每页显示条目个数
   */
  @property({ type: Number })
  pageSize: number = 10;

  /**
   * 总条目数
   */
  @property({ type: Number })
  total: number = 0;

  /**
   * 页码按钮的数量，当总页数超过该值时会折叠
   */
  @property({ type: Number })
  pagerCount: number = 7;

  /**
   * 分页尺寸.default: medium. options: mini/small/medium/large/huge
   */
  @property({ type: String })
  size: 'mini' | 'small' | 'medium' | 'large' | 'huge' = 'medium';

  /**
   * 页码按钮类型.default: default. options: default/link
   */
  @property({ type: String })
  type: 'default' | 'link' = 'default';

  /**
   * 是否禁用
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * 是否显示背景色
   */
  @property({ type: Boolean, reflect: true })
  background: boolean = false;

  /**
   * 每页显示个数选择器的选项设置
   */
  @property({ type: Array })
  pageSizes: number[] = [10, 20, 30, 40, 50, 100];

  /**
   * 是否显示快速跳转器，默认false
   */
  @property({ type: Boolean, attribute: 'show-jumper' })
  showJumper: boolean = false;

  /**
   * 跳转输入框的值
   */
  @state()
  jumperValue: string = '';

  /**
   * 总页数
   */
  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize) || 1;
  }

  /**
   * 处理页码点击
   */
  protected _handlePageClick(page: number): void {
    if (this.disabled || page === this.currentPage || page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.dispatchEvent(new CustomEvent('nv-current-change', {
      detail: page,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * 处理上一页
   */
  protected _handlePrev(): void {
    if (this.currentPage > 1) {
      this._handlePageClick(this.currentPage - 1);
    }
  }

  /**
   * 处理下一页
   */
  protected _handleNext(): void {
    if (this.currentPage < this.totalPages) {
      this._handlePageClick(this.currentPage + 1);
    }
  }

  /**
   * 处理每页条数变化
   */
  protected _handlePageSizeChange(event: CustomEvent): void {
    const newSize = Number(event.detail);
    if (newSize && newSize !== this.pageSize) {
      this.pageSize = newSize;
      // 重新计算当前页，确保不超出范围
      const newTotalPages = Math.ceil(this.total / this.pageSize) || 1;
      if (this.currentPage > newTotalPages) {
        this.currentPage = newTotalPages;
      }
      this.dispatchEvent(new CustomEvent('nv-size-change', {
        detail: newSize,
        bubbles: true,
        composed: true
      }));
      this.requestUpdate();
    }
  }

  /**
   * 处理跳转输入框值变化
   */
  protected _handleJumperInput(event: CustomEvent): void {
    this.jumperValue = event.detail.value;
  }

  /**
   * 处理跳转输入框回车
   */
  protected _handleJumperKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this._handleJumperGo();
    }
  }

  /**
   * 处理跳转
   */
  protected _handleJumperGo(): void {
    const page = Number(this.jumperValue);
    if (page && page >= 1 && page <= this.totalPages) {
      this._handlePageClick(page);
      this.jumperValue = '';
    }
  }

  /**
   * 获取要显示的页码数组
   */
  protected _getPages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pagerCount = this.pagerCount;
    const pages: number[] = [];

    if (total <= pagerCount) {
      // 总页数小于等于pagerCount，显示所有页码
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // 总页数大于pagerCount，需要折叠
      const halfPagerCount = Math.floor(pagerCount / 2);
      let start = Math.max(1, current - halfPagerCount);
      const end = Math.min(total, start + pagerCount - 1);

      if (end - start < pagerCount - 1) {
        start = Math.max(1, end - pagerCount + 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push(-1); // -1 表示省略号
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < total) {
        if (end < total - 1) {
          pages.push(-1); // -1 表示省略号
        }
        pages.push(total);
      }
    }

    return pages;
  }

  render() {
    return template.call(this);
  }

  static styles = css`${ unsafeCSS(cssText) }`;
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-pagination': NvPagination
  }
}
