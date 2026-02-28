/*
 * @Descripttion: table 组件类型定义
 * @creater: zhengpeng.ren
 * @since: 2025-02-18
 */
import type { TemplateResult } from 'lit';

/** 表格尺寸（与项目内 tag/switch/select 等一致） */
export type TableSize = 'mini' | 'small' | 'medium' | 'large' | 'huge';

/** 选择模式：单选或多选 */
export type TableSelectionMode = 'single' | 'multiple';

/** 列对齐方式 */
export type TableColumnAlign = 'left' | 'center' | 'right';

/** 固定列方向 */
export type TableColumnFixed = 'left' | 'right';

/** 排序顺序 */
export type TableSortOrder = 'ascending' | 'descending' | null;

/** 单元格渲染上下文 */
export interface TableCellRendererContext<T = unknown> {
  /** 当前行数据 */
  rowData: T;
  /** 当前列配置 */
  column: TableColumn<T>;
  /** 单元格值（rowData[column.dataKey]） */
  cellData: unknown;
  /** 行索引 */
  rowIndex: number;
  /** 列索引 */
  columnIndex: number;
}

/** 表头单元格渲染上下文 */
export interface TableHeaderCellRendererContext<T = unknown> {
  /** 当前列配置 */
  column: TableColumn<T>;
  /** 列索引 */
  columnIndex: number;
}

/** 列配置 */
export interface TableColumn<T = unknown> {
  /** 列唯一标识，与 dataKey 二选一或一致 */
  key?: string;
  /** 取数字段，用于从 row 中取值 */
  dataKey: string;
  /** 表头标题 */
  title?: string;
  /** 列宽（建议必填） */
  width?: number;
  /** 对齐方式 */
  align?: TableColumnAlign;
  /** 固定列 */
  fixed?: TableColumnFixed;
  /** 是否可排序 */
  sortable?: boolean;
  /** 自定义单元格渲染 */
  cellRenderer?: (context: TableCellRendererContext<T>) => TemplateResult | string;
  /** 自定义表头单元格渲染（后续扩展） */
  headerCellRenderer?: (context: TableHeaderCellRendererContext<T>) => TemplateResult | string;
}

/** 行数据类型（可扩展 id、children 等） */
export type TableRow = Record<string, unknown>;

/** 排序状态 */
export interface TableSortState {
  /** 排序列 key */
  columnKey: string;
  /** 排序顺序 */
  order: TableSortOrder;
}
