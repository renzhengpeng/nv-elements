/*
 * @Descripttion: table 组件常量
 * @creater: zhengpeng.ren
 * @since: 2025-02-18
 */
import type { TableSize } from './types';

/** 默认行高（px），供 virtualizer 与样式使用 */
export const DEFAULT_ROW_HEIGHT = 40;

/** 各尺寸对应的行高（px），供虚拟滚动与默认行高使用 */
export const ROW_HEIGHT_BY_SIZE: Record<TableSize, number> = {
  mini: 28,
  small: 32,
  medium: 40,
  large: 48,
  huge: 56
};

/** 启用虚拟滚动的数据条数阈值 */
export const VIRTUAL_THRESHOLD = 100;

/** 默认列宽（px） */
export const DEFAULT_COL_WIDTH = 150;

/** 表头默认高度（px） */
export const DEFAULT_HEADER_HEIGHT = 40;

/** 预留滚动条宽度（px），用于表头与表体列对齐 */
export const SCROLLBAR_GUTTER = 17;

/** 选择列占位 key，用于识别选择列 */
export const SELECTION_COLUMN_KEY = '__selection__';

/** 选择列宽度（px） */
export const SELECTION_COLUMN_WIDTH = 48;
