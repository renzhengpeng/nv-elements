import { customElement, property, Component, unsafeCSS, css } from '../../based-on/index';
import type { ProcessedColumn, RowClickEventDetail, CellClickEventDetail } from '../table/types';
import { VirtualizerController } from '@tanstack/lit-virtual';

import { createRef } from 'lit/directives/ref.js';
import cssText from './style.scss?inline';
import template from './template';

@customElement('nv-table-body')
export class NvTableBody extends Component {
  static styles = css`${unsafeCSS(cssText)}`;

  @property({ type: Array })
  data: Record<string, unknown>[] = [];

  @property({ type: Array })
  columns: ProcessedColumn[] = [];

  @property({ type: Number })
  rowHeight: number = 48;

  @property({ type: Boolean })
  stripe: boolean = false;

  @property({ type: Boolean })
  border: boolean = false;

  @property({ type: Boolean })
  highlightCurrentRow: boolean = false;

  @property({ type: Number })
  currentRowIndex: number = -1;

  /** 多选：已选中的 key 集合 */
  @property({ attribute: false })
  selectedKeys: Set<unknown> = new Set();

  /** 单选：当前选中行的 key */
  @property({ attribute: false })
  radioKey: unknown = undefined;

  /** 行唯一键字段名，与 nv-table 的 row-key 属性一致 */
  @property({ type: String, attribute: 'row-key' })
  rowKey: string = '';

  /** 行额外 class 回调 */
  @property({ attribute: false })
  rowClassName?: (row: Record<string, unknown>, rowIndex: number) => string;

  /** 单元格额外 class 回调 */
  @property({ attribute: false })
  cellClassName?: (cellValue: unknown, row: Record<string, unknown>, rowIndex: number) => string;

  /** 树形结构对应行的 UI 状态数据 */
  @property({ attribute: false })
  treeStates?: Map<unknown, { level: number; isExpanded: boolean; isLeaf: boolean; loading: boolean; hasChildren: boolean }>;

  /** 行展开：已展开行的 key 集合 */
  @property({ attribute: false })
  expandedKeys: Set<unknown> = new Set();

  /** 用于实时渲染的临时拖拽宽度（prop → px），仅拖拽中使用 */
  @property({ attribute: false })
  draggingWidths?: Map<string, number>;

  /** 滚动容器的 ref */
  readonly scrollRef = createRef<HTMLElement>();

  /** TanStack Virtualizer Controller */
  readonly virtualizerController = new VirtualizerController<HTMLElement, Element>(this, {
    count: 0,
    getScrollElement: () => this.scrollRef.value ?? null,
    estimateSize: () => this.rowHeight,
    overscan: 5,
  });



  protected willUpdate(changedProperties: Map<string | symbol, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('columns') || changedProperties.has('draggingWidths')) {
      // 尺寸变化前可能需要提示虚拟滚动重算（当前定高不需要，但引发重新渲染即可）
    }
  }

  protected updated(changedProperties: Map<string | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('columns') || changedProperties.has('draggingWidths')) {
      // 如果使用了动态高度（暂且定高），可调用 this.virtualizerController.getVirtualizer().measure()
    }
  }

  _handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    this.dispatch('nv-body-scroll', {
      scrollLeft: target.scrollLeft,
      scrollTop: target.scrollTop,
    }, { composed: false });
  }

  _dispatchRowClick(row: Record<string, unknown>, rowIndex: number, e: MouseEvent) {
    this.dispatch('nv-row-click', {
      row, rowIndex, event: e,
    } as RowClickEventDetail, { composed: false });
  }

  _dispatchRowDblClick(row: Record<string, unknown>, rowIndex: number, e: MouseEvent) {
    this.dispatch('nv-row-dblclick', {
      row, rowIndex, event: e,
    } as RowClickEventDetail, { composed: false });
  }

  _dispatchCellClick(
    row: Record<string, unknown>,
    rowIndex: number,
    col: ProcessedColumn,
    colIndex: number,
    cellValue: unknown,
    e: MouseEvent
  ) {
    e.stopPropagation();
    this.dispatch('nv-cell-click', {
      row, rowIndex, column: col.original, columnIndex: colIndex, cellValue, event: e,
    } as CellClickEventDetail, { composed: false });
    this._dispatchRowClick(row, rowIndex, e);
  }

  _dispatchCellContextMenu(
    row: Record<string, unknown>,
    rowIndex: number,
    col: ProcessedColumn,
    colIndex: number,
    cellValue: unknown,
    e: MouseEvent
  ) {
    e.preventDefault();
    this.dispatch('nv-cell-contextmenu', {
      row, rowIndex, column: col.original, columnIndex: colIndex, cellValue, event: e,
    } as CellClickEventDetail, { composed: false });
  }

  _dispatchSelectionChange(row: Record<string, unknown>, selected: boolean, e: Event) {
    e.stopPropagation();
    this.dispatch('nv-row-selection-change', { row, selected }, { composed: false });
  }

  _dispatchRadioChange(row: Record<string, unknown>, e: Event) {
    e.stopPropagation();
    this.dispatch('nv-radio-change', { row }, { composed: false });
  }

  _dispatchExpandChange(row: Record<string, unknown>, rowIndex: number, expanded: boolean, e: Event) {
    e.stopPropagation();
    this.dispatch('nv-expand-change', { row, rowIndex, expanded }, { composed: false });
  }

  render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-table-body': NvTableBody;
  }
}
