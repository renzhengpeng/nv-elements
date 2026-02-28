/*
 * @Descripttion: table 表头模板
 * @creater: zhengpeng.ren
 * @since: 2025-02-18
 */
import { html } from '../../based-on';
import '../checkbox/index.js';
import classNamesConfig from './classNames';
import type { TableColumn, TableSortOrder } from './types';

export interface TableHeaderContext<T = unknown> {
  columns: TableColumn<T>[];
  sortBy: { columnKey: string; order: TableSortOrder } | null;
  onSort: (columnKey: string) => void;
  /** 虚拟滚动时表头表格宽度（与表体列总宽一致） */
  tableWidth?: number;
  /** 选择模式 */
  selectionMode?: 'single' | 'multiple';
  /** 选择列 key，用于识别表头中的选择列 */
  selectionColumnKey?: string;
  /** 多选时全选是否勾选 */
  selectAllChecked?: boolean;
  /** 多选时是否半选（部分选中） */
  selectAllIndeterminate?: boolean;
  /** 多选时全选/取消全选 */
  onSelectAll?: (checked: boolean) => void;
}

function renderSortIcon(order: TableSortOrder) {
  if (order === 'ascending') {
    return html`<span class="${classNamesConfig.elements.sortIcon} ${classNamesConfig.modifiers.sortAsc}" aria-hidden="true">↑</span>`;
  }
  if (order === 'descending') {
    return html`<span class="${classNamesConfig.elements.sortIcon} ${classNamesConfig.modifiers.sortDesc}" aria-hidden="true">↓</span>`;
  }
  return html`<span class="${classNamesConfig.elements.sortIcon}" aria-hidden="true">⇅</span>`;
}

export function renderTableHeader<T = unknown>(context: TableHeaderContext<T>) {
  const {
    columns,
    sortBy,
    onSort,
    tableWidth,
    selectionMode,
    selectionColumnKey,
    selectAllChecked,
    selectAllIndeterminate,
    onSelectAll
  } = context;
  if (!columns || columns.length === 0) {
    return html`<div class="${classNamesConfig.elements.header}" role="rowgroup"></div>`;
  }
  const headerStyle = tableWidth != null && tableWidth > 0 ? `width: ${tableWidth}px` : '';

  const alignModifier = (align?: string) => {
    if (align === 'center') return classNamesConfig.modifiers.alignCenter;
    if (align === 'right') return classNamesConfig.modifiers.alignRight;
    return classNamesConfig.modifiers.alignLeft;
  };

  return html`
    <div class="${classNamesConfig.elements.header}" role="rowgroup" style="${headerStyle}">
      <div class="${classNamesConfig.elements.row}" role="row">
        ${columns.map((col, columnIndex) => {
          const key = col.key ?? col.dataKey;
          const isSelectionCol = selectionColumnKey != null && key === selectionColumnKey;
          const isSortable = !isSelectionCol && col.sortable === true;
          const currentOrder = sortBy?.columnKey === key ? sortBy.order : null;
          let headerContent =
            col.headerCellRenderer != null
              ? col.headerCellRenderer({ column: col, columnIndex })
              : html`<span>${col.title ?? col.dataKey}</span>`;
          if (isSelectionCol && selectionMode === 'multiple' && onSelectAll) {
            headerContent = html`
              <nv-checkbox
                .checked=${!!selectAllChecked}
                .indeterminate=${!!selectAllIndeterminate}
                @click=${(e: Event) => e.stopPropagation()}
                @nv-change=${(e: Event) => {
                  const d = (e as CustomEvent).detail as { checked?: boolean };
                  if (d && typeof d.checked === 'boolean') onSelectAll(d.checked);
                }}
              ></nv-checkbox>
            `;
          } else if (isSelectionCol) {
            headerContent = html``;
          }
          return html`
            <div
              class="${classNamesConfig.elements.headerCell} ${alignModifier(col.align)} ${isSortable ? classNamesConfig.elements.sortable + ' ' + (currentOrder ? (currentOrder === 'ascending' ? classNamesConfig.modifiers.sortAsc : classNamesConfig.modifiers.sortDesc) : '') : ''}"
              role="columnheader"
              style="${col.width != null ? `width: ${col.width}px` : ''}"
              @click=${isSortable ? () => onSort(key) : undefined}
            >
              ${headerContent}
              ${isSortable ? renderSortIcon(currentOrder) : ''}
            </div>
          `;
        })}
      </div>
    </div>
  `;
}
