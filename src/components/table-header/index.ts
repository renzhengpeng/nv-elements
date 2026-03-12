import { customElement, property, Component, unsafeCSS, css, state } from '../../based-on/index';
import type { ProcessedColumn, SortDirection, HeaderClickEventDetail } from '../table/types';
import cssText from './style.scss?inline';
import template from './template';

@customElement('nv-table-header')
export class NvTableHeader extends Component {
  static styles = css`${unsafeCSS(cssText)}`;

  @property({ type: Array })
  columns: ProcessedColumn[] = [];

  @property({ type: Boolean })
  border: boolean = false;

  /** 正在排序的列 prop */
  @property({ type: String, attribute: 'sort-prop' })
  sortProp: string = '';

  /** 当前排序方向 */
  @property({ attribute: false })
  sortDirection: SortDirection = null;

  /** 已选中的 key 集合（用于全选状态判断） */
  @property({ attribute: false })
  selectedKeys: Set<unknown> = new Set();

  /** 总行数（用于全选 checkbox 状态） */
  @property({ type: Number })
  totalCount: number = 0;

  /** 当前各列的过滤值 Map<prop, value[]> */
  @property({ attribute: false })
  filterValues: Map<string, unknown[]> = new Map();

  /** Y 轴滚动条宽度，用于修正右侧固定列 sticky right 的偏移量 */
  @property({ type: Number })
  yScrollbarWidth: number = 0;

  /** 是否允许拖拽调整列宽 */
  @property({ type: Boolean })
  resizable: boolean = false;

  /** 过滤 popup 当前打开的列 prop */
  @state()
  _openFilterProp: string = '';

  /** 过滤 popup 临时选中值（未 confirm 前） */
  @state()
  _tempFilterValues: Map<string, Set<unknown>> = new Map();

  // ====== 列宽拖拽状态 ======
  private _draggingProp: string = '';
  private _dragStartX: number = 0;
  private _dragStartWidth: number = 0;
  private _dragMoveHandler: ((e: MouseEvent) => void) | null = null;
  private _dragEndHandler: ((e: MouseEvent) => void) | null = null;

  /** 用于实时渲染的临时拖拽宽度（prop → px），仅拖拽中使用 */
  @state()
  _draggingWidths: Map<string, number> = new Map();

  _handleHeaderClick(col: ProcessedColumn, index: number, e: MouseEvent) {
    // 排序列点击触发排序，同时触发 header-click 事件
    if (col.original.sortable) {
      this.dispatch('nv-header-sort', { column: col }, { composed: false });
    }
    this.dispatch('nv-header-click', {
      column: col.original,
      columnIndex: index,
      event: e,
    } as HeaderClickEventDetail, { composed: false });
  }

  _handleSelectAll(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.dispatch('nv-select-all', { checked }, { composed: false });
  }

  /** 打开某列的过滤 popup */
  _openFilter(prop: string) {
    this._openFilterProp = prop;
    // 初始化临时值为当前已选值
    const current = this.filterValues.get(prop) ?? [];
    const tempMap = new Map(this._tempFilterValues);
    tempMap.set(prop, new Set(current));
    this._tempFilterValues = tempMap;
  }

  /** 切换临时过滤项 */
  _toggleTempFilter(prop: string, value: unknown, multiple: boolean) {
    const tempMap = new Map(this._tempFilterValues);
    const set = new Set(tempMap.get(prop) ?? []);
    if (multiple) {
      if (set.has(value)) set.delete(value);
      else set.add(value);
    } else {
      // 单选：只选一个
      if (set.has(value) && set.size === 1) set.clear();
      else { set.clear(); set.add(value); }
    }
    tempMap.set(prop, set);
    this._tempFilterValues = tempMap;
  }

  /** 确认过滤 */
  _confirmFilter(prop: string) {
    const values = Array.from(this._tempFilterValues.get(prop) ?? []);
    this.dispatch('nv-filter-change', { prop, values }, { composed: false });
    this._openFilterProp = '';
  }

  /** 清空过滤 */
  _clearFilter(prop: string) {
    const tempMap = new Map(this._tempFilterValues);
    tempMap.set(prop, new Set());
    this._tempFilterValues = tempMap;
    this.dispatch('nv-filter-change', { prop, values: [] }, { composed: false });
    this._openFilterProp = '';
  }

  /** 关闭当前开着的过滤弹窗（外部调用） */
  closeFilter() {
    this._openFilterProp = '';
  }

  /** 列宽拖拽开始 */
  _handleResizeStart(col: ProcessedColumn, e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this._draggingProp = col.prop;
    this._dragStartX = e.clientX;
    this._dragStartWidth = col.resolvedWidth;

    // 拖拽期间禁用文本选中
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    this._dragMoveHandler = (moveEvent: MouseEvent) => {
      if (!this._draggingProp) return;
      const delta = moveEvent.clientX - this._dragStartX;
      const minWidth = col.original.minWidth ?? 80;
      const newWidth = Math.max(minWidth, this._dragStartWidth + delta);
      const next = new Map(this._draggingWidths);
      next.set(col.prop, newWidth);
      this._draggingWidths = next;
      // 向外通知实时宽度，让 nv-table 可以同步给 nv-table-body
      this.dispatch('nv-column-resizing', { prop: col.prop, width: newWidth }, { bubbles: true, composed: true });
    };

    this._dragEndHandler = (upEvent: MouseEvent) => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';

      const delta = upEvent.clientX - this._dragStartX;
      const minWidth = col.original.minWidth ?? 80;
      const finalWidth = Math.max(minWidth, this._dragStartWidth + delta);

      // 清除临时拖拽宽度
      const next = new Map(this._draggingWidths);
      next.delete(col.prop);
      this._draggingWidths = next;
      this._draggingProp = '';

      // 上报实际宽度
      this.dispatch('nv-column-resize', { prop: col.prop, width: finalWidth }, { composed: false });

      if (this._dragMoveHandler) document.removeEventListener('mousemove', this._dragMoveHandler);
      if (this._dragEndHandler) document.removeEventListener('mouseup', this._dragEndHandler);
      this._dragMoveHandler = null;
      this._dragEndHandler = null;
    };

    document.addEventListener('mousemove', this._dragMoveHandler);
    document.addEventListener('mouseup', this._dragEndHandler);
  }

  render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-table-header': NvTableHeader;
  }
}
