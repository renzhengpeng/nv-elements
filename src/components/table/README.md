# Table 表格

用于展示行列数据，支持虚拟滚动以承载超大数据量（如 100W 条），列配置驱动，可选排序、斑马纹、边框、高亮当前行。

## 组件说明

Table 通过 `columns` 与 `data` 驱动渲染，与 element-plus Table-V2 类似。当数据量达到 `virtual-threshold` 且 `virtual` 为 true 时启用行虚拟滚动，仅渲染可视区域行以保障性能。

## 属性

| 属性名                   | 说明                                           | 类型               | 默认值   |
| ------------------------ | ---------------------------------------------- | ------------------ | -------- |
| data                     | 表格数据（行数组）                             | unknown[]          | []       |
| columns                  | 列配置（见下方 Column 类型）                    | TableColumn[]      | []       |
| height                   | 表体可视高度（虚拟滚动时建议设置），如 400 或 "100%" | number \| string   | —        |
| virtual                  | 是否启用虚拟滚动                               | boolean            | true     |
| virtual-threshold         | 启用虚拟滚动的数据条数阈值                     | number             | 100      |
| size                     | 尺寸：mini / small / medium / large / huge，控制行高、表头高度、内边距与字体 | TableSize          | medium   |
| row-height               | 行高（px）；不传时由 size 决定                 | number             | —        |
| row-key                  | 行唯一键字段名（如 "id"）                      | string             | id       |
| stripe                   | 斑马纹                                         | boolean            | false    |
| border                   | 显示边框                                       | boolean            | false    |
| highlight-current-row    | 高亮当前行                                     | boolean            | false    |
| selection-mode           | 行选择模式：single（单选）/ multiple（多选）；设置后左侧显示选择列 | 'single' \| 'multiple' | —        |
| selected-row-keys        | 当前选中的行 key 数组（受控）                  | string[]           | []       |
| empty-text               | 空数据时展示文案                               | string             | 暂无数据 |

### Column 列配置

| 字段          | 说明                 | 类型     |
| ------------- | -------------------- | -------- |
| key           | 列唯一标识（可与 dataKey 一致） | string   |
| dataKey       | 取数字段             | string   |
| title         | 表头标题             | string   |
| width         | 列宽（px）；不设时该列占满剩余空间 | number   |
| align         | 对齐：left/center/right | string   |
| sortable      | 是否可排序           | boolean  |
| cellRenderer  | 自定义单元格渲染函数 | (context) => TemplateResult \| string |

## 事件

| 事件名             | 说明               | detail                          |
| ------------------ | ------------------ | ------------------------------- |
| nv-sort            | 排序变化时触发     | { columnKey, order }            |
| nv-row-click       | 行点击时触发       | { row, index }                  |
| nv-current-change  | 当前行变化时触发（需 highlight-current-row） | { currentRow, previousRow } |
| nv-selection-change | 选中行变化时触发（需设置 selection-mode） | { selectedRowKeys, selectedRows } |

## CSS 变量

| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| --nv-table-row-height | 行高 | 40px |
| --nv-table-header-height | 表头高度 | 40px |
| --nv-table-border-color | 边框颜色 | #ebeef5 |
| --nv-table-header-background-color | 表头背景色 | #f5f7fa |
| --nv-table-header-text-color | 表头文字颜色 | #909399 |
| --nv-table-cell-padding | 单元格内边距 | 12px 0 |
| --nv-table-cell-text-color | 单元格文字颜色 | #606266 |
| --nv-table-row-background-color-stripe | 斑马纹行背景 | #fafafa |
| --nv-table-row-background-color-hover | 行悬停背景 | #f5f7fa |
| --nv-table-row-background-color-current | 当前行背景 | #ecf5ff |
| --nv-table-empty-text-color | 空数据文案颜色 | #909399 |

## CSS Parts

| Name           | Description | CSS Selector       |
| -------------- | ----------- | ------------------ |
| base           | 根容器      | `::part(base)`     |
| wrapper        | 表格包装器  | `::part(wrapper)`  |
| header-wrapper | 表头区域    | `::part(header-wrapper)` |
| body-wrapper   | 表体滚动区域 | `::part(body-wrapper)`  |

## 使用说明

- 通过 `.columns` 和 `.data` 设置列与数据；通过 `.rowKey` 可赋值为函数 `(row) => string` 以自定义行 key。
- 虚拟滚动时请为表体设置固定高度（`height` 或外层容器高度），否则无法正确滚动。
- 排序为组件内状态 + 事件：点击表头触发 `nv-sort`，可由外部根据 `detail.order` 与 `detail.columnKey` 对数据排序后更新 `data`。
