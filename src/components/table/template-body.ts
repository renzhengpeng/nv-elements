/*
 * @Descripttion: table 表体模板（全量 repeat 与虚拟滚动分支）
 * @creater: zhengpeng.ren
 * @since: 2025-02-18
 */
import { html } from '../../based-on';
import { repeat as litRepeat } from 'lit/directives/repeat.js';
import classNamesConfig from './classNames';
import type { TableColumn, TableRow } from './types';

export interface TableBodyContext<T = unknown> {
  data: T[];
  columns: TableColumn<T>[];
  /** 行 key：字段名或 (row, index) => string */
  rowKey: string | ((row: T, index: number) => string);
  rowClassName?: (row: T, index: number) => string;
  currentRow: T | null;
  stripe: boolean;
  highlightCurrentRow: boolean;
  border: boolean;
  emptyText?: string;
  onRowClick?: (row: T, index: number) => void;
  renderCell: (row: T, column: TableColumn<T>, rowIndex: number, columnIndex: number) => unknown;
  /** 选择列 key */
  selectionColumnKey?: string;
  /** 渲染选择列单元格（单选/多选） */
  renderSelectionCell?: (row: T, rowIndex: number) => unknown;
}

/** 根据 rowKey 配置计算行 key（供 repeat 与 virtualize 的 keyFunction 使用） */
export function getRowKey<T>(row: T, index: number, rowKey: string | ((row: T, index: number) => string)): string {
  if (typeof rowKey === 'function') {
    return rowKey(row, index);
  }
  const r = row as TableRow;
  return String(r[rowKey] ?? index);
}

function getAlignModifier(align?: string): string {
  if (align === 'center') return classNamesConfig.modifiers.alignCenter;
  if (align === 'right') return classNamesConfig.modifiers.alignRight;
  return classNamesConfig.modifiers.alignLeft;
}

/** 渲染单行（供 repeat 与 virtualize 共用） */
export function renderTableRow<T = unknown>(
  row: T,
  rowIndex: number,
  context: TableBodyContext<T>
) {
  const { columns, rowKey, rowClassName, currentRow, highlightCurrentRow, onRowClick, renderCell, selectionColumnKey, renderSelectionCell } = context;
  const key = getRowKey(row, rowIndex, rowKey);
  const extraClass = rowClassName ? rowClassName(row, rowIndex) : '';
  const isCurrent = highlightCurrentRow && currentRow === row;
  const rowClass = [
    classNamesConfig.elements.row,
    isCurrent ? classNamesConfig.modifiers.highlightCurrentRow : '',
    extraClass
  ]
    .filter(Boolean)
    .join(' ');

  return html`
    <div
      class="${rowClass}"
      role="row"
      data-row-key="${key}"
      @click=${onRowClick ? () => onRowClick(row, rowIndex) : undefined}
    >
      ${columns.map((col, columnIndex) => {
        const isSelectionCol = selectionColumnKey != null && (col.key ?? col.dataKey) === selectionColumnKey;
        const cellContent = isSelectionCol && renderSelectionCell
          ? renderSelectionCell(row, rowIndex)
          : renderCell(row, col, rowIndex, columnIndex);
        const widthStyle = col.width != null ? `width: ${col.width}px` : '';
        return html`
          <div
            class="${classNamesConfig.elements.cell} ${getAlignModifier(col.align)}"
            role="cell"
            style="${widthStyle}"
          >
            ${typeof cellContent === 'string' ? cellContent : cellContent}
          </div>
        `;
      })}
    </div>
  `;
}

/** 全量渲染表体（无虚拟滚动） */
export function renderTableBodyFull<T = unknown>(context: TableBodyContext<T>) {
  const { data, emptyText } = context;

  if (!data || data.length === 0) {
    return html`
      <div class="${classNamesConfig.elements.body} ${classNamesConfig.elements.empty}" role="rowgroup">
        <div class="${classNamesConfig.elements.emptyText}">
          ${emptyText ?? '暂无数据'}
        </div>
      </div>
    `;
  }

  return html`
    <div class="${classNamesConfig.elements.body}" role="rowgroup">
      ${litRepeat(
        data,
        (row, i) => getRowKey(row, i, context.rowKey),
        (row, rowIndex) => renderTableRow(row, rowIndex, context)
      )}
    </div>
  `;
}
