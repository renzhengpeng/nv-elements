import type { TemplateResult } from 'lit';

/**
 * 列对齐方式
 */
export type ColumnAlign = 'left' | 'center' | 'right';

/**
 * 排序方向
 */
export type SortDirection = 'ascending' | 'descending' | null;

/**
 * 列类型
 */
export type ColumnType = 'selection' | 'radio' | 'index' | 'expand';

/**
 * 自定义单元格渲染函数
 */
export type CellRenderer<T = Record<string, unknown>> = (
  cellValue: unknown,
  row: T,
  rowIndex: number,
  column: TableColumn<T>
) => TemplateResult | string | number | unknown;

/**
 * 自定义表头渲染函数
 */
export type HeaderRenderer<T = Record<string, unknown>> = (
  column: TableColumn<T>,
  columnIndex: number
) => TemplateResult | string | unknown;

/**
 * 列配置
 */
export interface TableColumn<T = Record<string, unknown>> {
  /** 特殊列类型：selection 多选、radio 单选、index 序号、expand 展开 */
  type?: ColumnType;
  /** 数据字段名 */
  prop: string;
  /** 表头显示文字 */
  label: string;
  /** 固定列宽(px) */
  width?: number;
  /** 最小列宽(px)，默认 80 */
  minWidth?: number;
  /** 单元格对齐方式，默认 'left' */
  align?: ColumnAlign;
  /** 表头对齐方式，默认与 align 一致 */
  headerAlign?: ColumnAlign;
  /** 自定义单元格渲染 */
  renderCell?: CellRenderer<T>;
  /** 自定义表头渲染 */
  renderHeader?: HeaderRenderer<T>;
  /** 是否可见，默认 true */
  visible?: boolean;
  // ---- 自定义 className ----
  /** 单元格额外 CSS class（字符串，所有行共用） */
  className?: string;
  /** 行额外 CSS class 回调，可根据行数据动态返回 */
  rowClassName?: (row: T, rowIndex: number) => string;
  /** 单元格额外 CSS class 回调，可根据单元格信息动态返回 */
  cellClassName?: (cellValue: unknown, row: T, rowIndex: number, column: TableColumn<T>) => string;

  // ---- 溢出 Tooltip ----
  /** 当内容过长截断时，鼠标 hover 显示完整文字 */
  showOverflowTooltip?: boolean;

  // ---- 排序 ----
  /** 是否可排序，'custom' 表示仅触发事件不自动排序 */
  sortable?: boolean | 'custom';
  /** 自定义排序方法 */
  sortMethod?: (a: T, b: T) => number;

  // ---- 固定列 ----
  /** 固定列位置，true 等同于 'left' */
  fixed?: 'left' | 'right' | boolean;

  // ---- 其他预留 ----
  /** 是否可筛选 */
  filterable?: boolean;
  /** 筛选选项 */
  filters?: Array<{ text: string; value: unknown }>;
  /** 是否支持多选过滤，默认 true */
  filterMultiple?: boolean;
  /** 自定义过滤方法，返回 true 表示该行展示 */
  filterMethod?: (value: unknown, row: T) => boolean;
  /** 是否可调整列宽 */
  resizable?: boolean;
  /** 多级表头子列 */
  children?: TableColumn<T>[];
}

/**
 * 内部处理后的列（包含计算后的宽度、sticky 位置等）
 */
export interface ProcessedColumn<T = Record<string, unknown>> {
  /** 特殊列类型 */
  type?: ColumnType;
  /** 数据字段名 */
  prop: string;
  /** 表头文字 */
  label: string;
  /** 最小列宽 */
  minWidth: number;
  /** 对齐方式 */
  align: ColumnAlign;
  /** 表头对齐方式 */
  headerAlign: ColumnAlign;
  /** 计算后的实际宽度(px) */
  resolvedWidth: number;
  /** 列索引（叶子列中的索引） */
  index: number;
  /** 额外 CSS class */
  className: string;
  /** 原始列配置 */
  original: TableColumn<T>;

  // ---- 固定列 ----
  /** 固定方向 */
  fixed?: 'left' | 'right';
  /** sticky left 偏移量(px) */
  stickyLeft?: number;
  /** sticky right 偏移量(px) */
  stickyRight?: number;
  /** 是否是最后一个左固定列（用于添加阴影） */
  isLastFixedLeft?: boolean;
  /** 是否是第一个右固定列（用于添加阴影） */
  isFirstFixedRight?: boolean;

  // ---- 多级表头 ----
  /** 是否是分组头 */
  isGroup?: boolean;
  /** 子列表 */
  children?: ProcessedColumn<T>[];
}

/**
 * 行点击事件 detail
 */
export interface RowClickEventDetail<T = Record<string, unknown>> {
  row: T;
  rowIndex: number;
  event: MouseEvent;
}

/**
 * 单元格点击 / 右键菜单事件 detail
 */
export interface CellClickEventDetail<T = Record<string, unknown>> {
  row: T;
  rowIndex: number;
  column: TableColumn<T>;
  columnIndex: number;
  cellValue: unknown;
  event: MouseEvent;
}

/**
 * 表头点击事件 detail
 */
export interface HeaderClickEventDetail<T = Record<string, unknown>> {
  column: TableColumn<T>;
  columnIndex: number;
  event: MouseEvent;
}

/**
 * 排序变更事件 detail
 */
export interface SortChangeEventDetail<T = Record<string, unknown>> {
  column: TableColumn<T>;
  prop: string;
  order: SortDirection;
}

/**
 * 多选变更事件 detail
 */
export interface SelectionChangeEventDetail<T = Record<string, unknown>> {
  selection: T[];
}
