/*
 * @Descripttion: table 组件
 * @creater: zhengpeng.ren
 * @since: 2025-02-18
 */
import { unsafeCSS, css, customElement, property, state, query, Component } from '../../based-on/index.ts';
import { html } from '../../based-on';
import type { TemplateResult } from 'lit';
import cssText from './style.scss?inline';
import template from './template.ts';
import { renderTableBodyFull, renderTableRow } from './template-body';
import { repeat } from 'lit/directives/repeat.js';
import '../checkbox/index.js';
import '../radio/index.js';
import type { TableColumn, TableRow, TableSortOrder, TableSize, TableSelectionMode } from './types';
import {
  VIRTUAL_THRESHOLD,
  SCROLLBAR_GUTTER,
  ROW_HEIGHT_BY_SIZE,
  SELECTION_COLUMN_KEY,
  SELECTION_COLUMN_WIDTH
} from './constants';
import classNamesConfig from './classNames';

/**
 * table 组件
 * 支持虚拟滚动以展示超大数据（如 100W 条），列配置驱动，可选排序、斑马纹、边框、高亮当前行。
 *
 * @slot - 默认插槽可保留为表格上方操作栏等
 */
@customElement('nv-table')
export class NvTable extends Component {
  static styles = [css`${unsafeCSS(cssText)}`];

  /** 表格数据 */
  @property({ type: Array })
  data: unknown[] = [];

  /** 列配置 */
  @property({ type: Array })
  columns: TableColumn<unknown>[] = [];

  /** 表体可视高度（虚拟滚动时必填或由外层容器约束），如 400 或 "100%" */
  @property({ type: [Number, String] })
  height: number | string = '';

  /** 是否启用虚拟滚动 */
  @property({ type: Boolean })
  virtual: boolean = true;

  /** 启用虚拟滚动的数据条数阈值 */
  @property({ type: Number, attribute: 'virtual-threshold' })
  virtualThreshold: number = VIRTUAL_THRESHOLD;

  /** 尺寸：mini / small / medium / large / huge，影响行高、表头高度、内边距与字体 */
  @property({ type: String })
  size: TableSize = 'medium';

  /** 行高（px），不传时由 size 决定；供 virtualizer 与样式使用 */
  @property({ type: Number, attribute: 'row-height' })
  rowHeight?: number;

  /** 行唯一键字段名（如 "id"），用于 keyFunction；通过 .rowKey 可赋值为函数 */
  @property({ type: String, attribute: 'row-key' })
  rowKeyAttr: string = 'id';

  /** 斑马纹 */
  @property({ type: Boolean })
  stripe: boolean = false;

  /** 显示边框 */
  @property({ type: Boolean })
  border: boolean = false;

  /** 高亮当前行 */
  @property({ type: Boolean, attribute: 'highlight-current-row' })
  highlightCurrentRow: boolean = false;

  /** 空数据时展示文案 */
  @property({ type: String, attribute: 'empty-text' })
  emptyText: string = '暂无数据';

  /** 选择模式：单选或多选；不设则不显示选择列 */
  @property({ type: String, attribute: 'selection-mode' })
  selectionMode?: TableSelectionMode;

  /** 已选中的行 key 列表（受控，需监听 nv-selection-change 更新） */
  @property({
    type: Array,
    attribute: false,
    hasChanged: (a: string[], b: string[]) =>
      !Array.isArray(a) || !Array.isArray(b) || a.length !== b.length || a.some((v, i) => v !== b[i])
  })
  selectedRowKeys: string[] = [];

  /** 排序状态（内部 + 可由外部通过属性同步） */
  @state()
  private _sortBy: { columnKey: string; order: TableSortOrder } | null = null;

  /** 当前高亮行（highlight-current-row 时） */
  @state()
  private _currentRow: unknown = null;

  /** 行 key 的 getter：支持字符串字段或函数（仅通过 .rowKey 设置） */
  public rowKey: string | ((row: unknown) => string) = 'id';

  private _bodyScrollHandler = (e: Event) => this._handleBodyScroll(e);

  /** 虚拟滚动且存在弹性列时，用 ResizeObserver 测得的表体内容区宽度 */
  @state()
  private _bodyInnerMeasuredWidth: number = 0;

  private _resizeObserver: ResizeObserver | null = null;

  @query('.nv-table__body-inner')
  private _bodyInnerEl?: HTMLElement;

  /** 自定义虚拟滚动：首行索引（仅更新此状态 + 重排，不触发 virtualizer rangeChanged，避免拖动时空白） */
  @state()
  private _virtualFirst = 0;

  /** 表体可视高度，用于计算槽数量；在滚动/尺寸变化时更新 */
  @state()
  private _virtualViewportHeight = 0;

  private _virtualRafScheduled = false;

  /** 是否实际使用虚拟滚动 */
  private get _useVirtual(): boolean {
    if (!this.virtual) return false;
    const len = Array.isArray(this.data) ? this.data.length : 0;
    return len >= this.virtualThreshold;
  }

  /** 实际行高（px）：优先使用 rowHeight，否则按 size 取值，供虚拟滚动与布局 */
  private get _effectiveRowHeight(): number {
    return this.rowHeight ?? ROW_HEIGHT_BY_SIZE[this.size];
  }

  /** 是否存在未设宽度的列（弹性列，应占满剩余空间） */
  private get _hasFlexColumn(): boolean {
    const cols = this.columns ?? [];
    return cols.some((c) => c.width == null);
  }

  /** 用于渲染的列（含选择列）；表头/表体与总宽计算均基于此 */
  private get _displayColumns(): TableColumn<unknown>[] {
    const dataCols =
      this._useVirtual && this._hasFlexColumn ? this._getResolvedColumns() : (this.columns ?? []);
    if (!this.selectionMode) return dataCols;
    const selectionCol: TableColumn<unknown> = {
      key: SELECTION_COLUMN_KEY,
      dataKey: SELECTION_COLUMN_KEY,
      width: SELECTION_COLUMN_WIDTH,
      align: 'center'
    };
    return [selectionCol, ...dataCols];
  }

  /** 列宽总和（基于 _displayColumns，含选择列） */
  private _getTotalColumnWidth(): number {
    const cols = this._displayColumns;
    if (cols.length === 0) return 0;
    return cols.reduce((sum, c) => sum + (c.width != null ? c.width : 0), 0);
  }

  /**
   * 虚拟滚动 + 存在弹性列时，根据容器测量宽度解析出每列宽度（弹性列占满剩余），
   * 使 virtualizer 绝对定位行内的单元格有明确宽度，与表头列宽一致。
   */
  private _getResolvedColumns(): TableColumn<unknown>[] {
    const cols = this.columns ?? [];
    if (cols.length === 0) return [];
    if (!this._useVirtual || !this._hasFlexColumn) return cols;
    const totalWidth = this._bodyInnerMeasuredWidth > 0 ? this._bodyInnerMeasuredWidth : 800;
    const fixedTotal = cols.reduce((sum, c) => sum + (c.width != null ? c.width : 0), 0);
    const flexCount = cols.filter((c) => c.width == null).length;
    const flexWidth = flexCount > 0 ? Math.max(0, Math.floor((totalWidth - fixedTotal) / flexCount)) : 0;
    return cols.map((c) =>
      c.width != null ? c : { ...c, width: flexWidth }
    );
  }

  /** 解析行 key（属性为字符串时用 rowKeyAttr，否则用 .rowKey 函数） */
  private _getRowKey(row: unknown, index: number): string {
    const keyDef = this.rowKey;
    if (typeof keyDef === 'function') {
      return keyDef(row);
    }
    const field = typeof this.rowKeyAttr === 'string' && this.rowKeyAttr ? this.rowKeyAttr : keyDef;
    const r = row as TableRow;
    return String(r[field] ?? index);
  }

  /** 渲染单元格内容（选择列由 template-body 单独渲染，此处不处理） */
  private _renderCell(row: unknown, column: TableColumn<unknown>, rowIndex: number, columnIndex: number): TemplateResult | string {
    if (column.key === SELECTION_COLUMN_KEY) return '';
    const r = row as TableRow;
    const cellData = r[column.dataKey];
    if (column.cellRenderer) {
      const result = column.cellRenderer({
        rowData: row,
        column,
        cellData,
        rowIndex,
        columnIndex
      });
      return result;
    }
    return cellData != null ? String(cellData) : '';
  }

  /** 渲染选择列单元格（单选 radio / 多选 checkbox） */
  private _renderSelectionCell(row: unknown, rowIndex: number): TemplateResult {
    const rowKey = this._getRowKey(row, rowIndex);
    const selected = (this.selectedRowKeys ?? []).includes(rowKey);
    if (this.selectionMode === 'single') {
      return html`
        <nv-radio
          .value=${rowKey}
          .checked=${selected}
          name="nv-table-selection"
          @click=${(e: Event) => e.stopPropagation()}
          @change=${() => this._emitSelectionChange([rowKey], [row])}
        ></nv-radio>
      `;
    }
    return html`
      <nv-checkbox
        .checked=${selected}
        @click=${(e: Event) => e.stopPropagation()}
        @nv-change=${() => this._handleToggleRow(rowKey, row)}
      ></nv-checkbox>
    `;
  }

  /** 表头排序点击 */
  private _handleSort(columnKey: string): void {
    let nextOrder: TableSortOrder = 'ascending';
    if (this._sortBy?.columnKey === columnKey) {
      if (this._sortBy.order === 'ascending') nextOrder = 'descending';
      else if (this._sortBy.order === 'descending') nextOrder = null;
      else nextOrder = 'ascending';
    }
    this._sortBy = nextOrder ? { columnKey, order: nextOrder } : null;
    this.dispatchEvent(
      new CustomEvent('nv-sort', {
        bubbles: true,
        composed: true,
        detail: { columnKey, order: nextOrder }
      })
    );
  }

  /** 行点击（用于高亮、单选与事件） */
  private _handleRowClick(row: unknown, index: number): void {
    const prev = this._currentRow;
    this._currentRow = row;
    const key = this._getRowKey(row, index);
    if (this.selectionMode === 'single') {
      this._emitSelectionChange([key], [row]);
    }
    this.dispatchEvent(
      new CustomEvent('nv-row-click', {
        bubbles: true,
        composed: true,
        detail: { row, index }
      })
    );
    if (this.highlightCurrentRow && prev !== row) {
      this.dispatchEvent(
        new CustomEvent('nv-current-change', {
          bubbles: true,
          composed: true,
          detail: { currentRow: row, previousRow: prev }
        })
      );
    }
  }

  /** 多选：切换某行选中状态 */
  private _handleToggleRow(rowKey: string, _row: unknown): void {
    if (this.selectionMode !== 'multiple') return;
    const keys = this.selectedRowKeys ?? [];
    const data = Array.isArray(this.data) ? this.data : [];
    const keySet = new Set(keys);
    if (keySet.has(rowKey)) keySet.delete(rowKey);
    else keySet.add(rowKey);
    const nextKeys = Array.from(keySet);
    const nextRows = nextKeys
      .map((k) => data.find((_, i) => this._getRowKey(_, i) === k))
      .filter((r): r is unknown => r != null);
    this._emitSelectionChange(nextKeys, nextRows);
  }

  /** 多选：全选/取消全选当前页数据 */
  private _handleSelectAll(checked: boolean): void {
    if (this.selectionMode !== 'multiple') return;
    const data = Array.isArray(this.data) ? this.data : [];
    const nextKeys = checked ? data.map((row, i) => this._getRowKey(row, i)) : [];
    const nextRows = checked ? [...data] : [];
    this._emitSelectionChange(nextKeys, nextRows);
  }

  private _emitSelectionChange(selectedRowKeys: string[], selectedRows: unknown[]): void {
    this.dispatchEvent(
      new CustomEvent('nv-selection-change', {
        bubbles: true,
        composed: true,
        detail: { selectedRowKeys, selectedRows }
      })
    );
  }

  /** 表体滚动（预留固定列同步等） */
  private _handleBodyScroll(_e: Event): void {
    // 二期：同步固定列滚动
  }

  /** 自定义虚拟滚动：rAF 节流更新首行索引，保证拖动时只更新状态+重排，不触发 range 变更导致空白 */
  private _onVirtualScroll = (): void => {
    if (this._virtualRafScheduled) return;
    this._virtualRafScheduled = true;
    requestAnimationFrame(() => {
      this._virtualRafScheduled = false;
      const el = this._bodyInnerEl ?? this.shadowRoot?.querySelector('.nv-table__body-inner');
      const data = Array.isArray(this.data) ? this.data : [];
      const rowHeight = this._effectiveRowHeight;
      if (!el || data.length === 0 || rowHeight <= 0) return;
      const scrollTop = (el as HTMLElement).scrollTop;
      const viewHeight = (el as HTMLElement).clientHeight;
      const overhang = 10;
      const visibleRows = Math.ceil(viewHeight / rowHeight);
      const slotCount = visibleRows + 2 * overhang;
      const firstVisibleRow = Math.floor(scrollTop / rowHeight);
      const first = Math.max(0, Math.min(firstVisibleRow - overhang, data.length - 1));
      const lastPossible = Math.max(0, data.length - slotCount);
      const newFirst = Math.min(first, lastPossible);
      if (viewHeight !== this._virtualViewportHeight) {
        this._virtualViewportHeight = viewHeight;
      }
      if (newFirst !== this._virtualFirst) {
        this._virtualFirst = newFirst;
      }
    });
  };

  /** 构建表头上下文 */
  private _buildHeaderContext() {
    const data = Array.isArray(this.data) ? this.data : [];
    const selectedKeys = this.selectedRowKeys ?? [];
    const allKeys = data.map((row, i) => this._getRowKey(row, i));
    const allSelected =
      allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k));
    const someSelected = selectedKeys.length > 0;
    return {
      columns: this._displayColumns,
      sortBy: this._sortBy,
      onSort: (columnKey: string) => this._handleSort(columnKey),
      selectionMode: this.selectionMode,
      selectionColumnKey: SELECTION_COLUMN_KEY,
      selectAllChecked: allSelected,
      selectAllIndeterminate: someSelected && !allSelected,
      onSelectAll: (checked: boolean) => this._handleSelectAll(checked)
    };
  }

  /** 构建表体上下文 */
  private _buildBodyContext() {
    const data = Array.isArray(this.data) ? this.data : [];
    const rowKeyFn = (row: unknown, index: number) => this._getRowKey(row, index);
    const selectedSet = new Set(this.selectedRowKeys ?? []);
    return {
      data,
      columns: this._displayColumns,
      rowKey: rowKeyFn,
      currentRow: this._currentRow,
      stripe: this.stripe,
      highlightCurrentRow: this.highlightCurrentRow,
      border: this.border,
      emptyText: this.emptyText,
      onRowClick: (row: unknown, index: number) => this._handleRowClick(row, index),
      renderCell: (row: unknown, col: TableColumn<unknown>, ri: number, ci: number) =>
        this._renderCell(row, col, ri, ci),
      selectionMode: this.selectionMode,
      selectionColumnKey: SELECTION_COLUMN_KEY,
      selectedRowKeysSet: selectedSet,
      onToggleRow: (rowKey: string, row: unknown) => this._handleToggleRow(rowKey, row),
      renderSelectionCell: (row: unknown, rowIndex: number) => this._renderSelectionCell(row, rowIndex)
    };
  }

  /** 渲染表体内容：虚拟或全量 */
  private _renderBodyContent(): TemplateResult {
    const bodyContext = this._buildBodyContext();
    if (this._useVirtual) {
      return this._renderVirtualBody(bodyContext);
    }
    return renderTableBodyFull(bodyContext);
  }

  /** 自定义虚拟滚动表体：固定槽数，滚动时只更新首行索引与位置，不触发 range 变更，避免拖动滑块时空白 */
  private _renderVirtualBody(bodyContext: Parameters<typeof renderTableBodyFull>[0]): TemplateResult {
    const { data } = bodyContext;
    const n = data.length;
    if (!n) {
      return html`
        <div class="${classNamesConfig.elements.bodyInner} ${classNamesConfig.elements.bodyVirtual}">
          <div class="${classNamesConfig.elements.body} ${classNamesConfig.elements.empty}" role="rowgroup">
            <div class="${classNamesConfig.elements.emptyText}">${bodyContext.emptyText ?? '暂无数据'}</div>
          </div>
        </div>
      `;
    }
    const rowHeight = this._effectiveRowHeight;
    const bodyInnerClass = `${classNamesConfig.elements.bodyInner} ${classNamesConfig.elements.bodyVirtual}`;
    const overhang = 10;
    const viewRows = this._virtualViewportHeight > 0
      ? Math.ceil(this._virtualViewportHeight / rowHeight)
      : 25;
    const slotCount = Math.min(n, viewRows + 2 * overhang);
    const totalHeight = n * rowHeight;
    const first = Math.max(0, Math.min(this._virtualFirst, n - slotCount));
    const slotIndices = Array.from({ length: slotCount }, (_, i) => first + i);

    return html`
      <div
        class="${bodyInnerClass}"
        style="overflow: auto; width: 100%; height: 100%; display: block; box-sizing: border-box; min-height: 0;"
        @scroll=${this._onVirtualScroll}
      >
        <div class="${classNamesConfig.elements.body}" role="rowgroup" style="position: relative; height: ${totalHeight}px; min-width: 100%;">
          ${repeat(
            slotIndices,
            (rowIndex) => `slot-${rowIndex}`,
            (rowIndex) => {
              const row = data[rowIndex];
              if (row == null) return html``;
              return html`
                <div
                  style="position: absolute; left: 0; top: 0; width: 100%; transform: translateY(${rowIndex * rowHeight}px); box-sizing: border-box;"
                >
                  ${renderTableRow(row, rowIndex, bodyContext)}
                </div>
              `;
            }
          )}
        </div>
      </div>
    `;
  }

  /** 表体容器高度样式；虚拟滚动时未设置则给默认高度，避免被内容撑高 */
  private _getBodyHeightStyle(): string {
    if (typeof this.height === 'number') {
      return `height: ${this.height}px`;
    }
    const s = this.height != null ? String(this.height).trim() : '';
    if (s && /^\d+$/.test(s)) return `height: ${s}px`;
    if (s) return `height: ${this.height}`;
    if (this._useVirtual) return 'height: 400px';
    return '';
  }

  /** 表体高度像素值（用于 wrapper 的 min-height，保证 flex 下 body-wrapper 有高度） */
  private _getBodyHeightPx(): number | null {
    if (this._useVirtual && (this.height === '' || this.height == null)) return 400;
    if (typeof this.height === 'number') return this.height;
    const s = this.height != null ? String(this.height).trim() : '';
    if (s && /^\d+$/.test(s)) return parseInt(s, 10);
    return null;
  }

  /** 有弹性列时不用固定表宽，表头/表体 100%，未设宽的列占满剩余空间 */
  private get _useFixedTableWidth(): boolean {
    if (this._hasFlexColumn) return false;
    const total = this._getTotalColumnWidth();
    return this._useVirtual && total > 0;
  }

  protected updated(_changedProperties: Map<string, unknown>): void {
    super.updated?.(_changedProperties);
    if (this._useVirtual) {
      const el = this._bodyInnerEl ?? this.shadowRoot?.querySelector('.nv-table__body-inner');
      if (el) {
        const h = (el as HTMLElement).clientHeight;
        if (h > 0 && h !== this._virtualViewportHeight) {
          this._virtualViewportHeight = h;
        }
      }
    }
    if (!this._useVirtual || !this._hasFlexColumn) {
      this._disconnectResizeObserver();
      return;
    }
    const el = this._bodyInnerEl ?? this.shadowRoot?.querySelector('.nv-table__body-inner');
    if (!el) return;
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.target === el) {
          const w = (entry.target as HTMLElement).clientWidth;
          if (w !== this._bodyInnerMeasuredWidth) {
            this._bodyInnerMeasuredWidth = w;
          }
        }
      });
    }
    this._resizeObserver.disconnect();
    this._resizeObserver.observe(el);
    const w = (el as HTMLElement).clientWidth;
    if (w > 0 && w !== this._bodyInnerMeasuredWidth) {
      this._bodyInnerMeasuredWidth = w;
    }
  }

  private _disconnectResizeObserver(): void {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  override disconnectedCallback(): void {
    this._disconnectResizeObserver();
    super.disconnectedCallback();
  }

  render() {
    const headerContext = this._buildHeaderContext();
    const bodyContent = this._renderBodyContent();
    const bodyHeightStyle = this._getBodyHeightStyle();
    const useFixed = this._useFixedTableWidth;
    const totalColumnWidth = useFixed ? this._getTotalColumnWidth() : 0;
    const tableWidth = totalColumnWidth > 0 ? totalColumnWidth + SCROLLBAR_GUTTER : 0;
    const bodyHeightPx = this._getBodyHeightPx();
    const wrapperStyle =
      this._useVirtual && bodyHeightPx != null
        ? `min-height: calc(${bodyHeightPx}px + var(--nv-table-header-height, 40px))`
        : '';
    const bodyWrapperClass = this._useVirtual ? classNamesConfig.elements.bodyWrapperVirtual : '';
    return template.call(this, {
      headerContext,
      bodyContent,
      bodyHeightStyle,
      wrapperStyle,
      bodyWrapperClass,
      onBodyScroll: this._bodyScrollHandler,
      totalColumnWidth: useFixed ? totalColumnWidth : 0,
      tableWidth: useFixed ? tableWidth : 0
    });
  }
}

export type {
  TableColumn,
  TableRow,
  TableSize,
  TableSelectionMode,
  TableSortOrder,
  TableSortState,
  TableCellRendererContext,
  TableHeaderCellRendererContext
} from './types';
