# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

## 组件说明

Table 组件基于虚拟滚动技术，可流畅渲染百万级数据，同时提供排序、多选、单选、固定列等丰富的交互功能。

## 属性

### nv-table

| 属性名                | 说明                                         | 类型          | 可选值                                         | 默认值     |
| --------------------- | -------------------------------------------- | ------------- | ---------------------------------------------- | ---------- |
| data                  | 表格数据                                     | array         | —                                              | `[]`       |
| columns               | 列配置数组                                   | TableColumn[] | —                                              | `[]`       |
| height                | 表格高度（开启固定表头及虚拟滚动）           | string        | —                                              | —          |
| max-height            | 流体高度：无 height 时生效，超出后出现滚动条 | string        | —                                              | —          |
| pagination            | 是否开启内置分页                             | boolean       | —                                              | `false`    |
| page-size             | 每页条数                                     | number        | —                                              | `10`       |
| current-page          | 当前页（从 1 开始）                          | number        | —                                              | `1`        |
| size                  | 表格尺寸                                     | string        | `mini` / `small` / `medium` / `large` / `huge` | `medium`   |
| row-height            | 行高（px），虚拟滚动必须指定                 | number        | —                                              | `48`       |
| stripe                | 是否显示斑马纹                               | boolean       | —                                              | `false`    |
| border                | 是否显示纵向边框                             | boolean       | —                                              | `false`    |
| resizable             | 是否允许拖拽列宽                             | boolean       | —                                              | `false`    |
| show-header           | 是否显示表头                                 | boolean       | —                                              | `true`     |
| highlight-current-row | 是否高亮当前点击行                           | boolean       | —                                              | `false`    |
| row-key               | 行数据的唯一标识字段名，多选/单选必填        | string        | —                                              | —          |
| row-class-name        | 行额外 class 回调                            | function      | —                                              | —          |
| cell-class-name       | 单元格额外 class 回调                        | function      | —                                              | —          |
| empty-text            | 数据为空时的提示文字                         | string        | —                                              | `暂无数据` |
| show-summary          | 是否显示表尾合计行                           | boolean       | —                                              | `false`    |
| sum-text              | 合计行首列文字                               | string        | —                                              | `合计`     |
| summary-method        | 自定义合计计算函数                           | function      | —                                              | —          |
| show-toolbar          | 是否显示顶部操作栏                           | boolean       | —                                              | `false`    |
| toolbar-title         | 操作栏左侧标题                               | string        | —                                              | —          |
| show-column-setting   | 是否显示列设置按钮                           | boolean       | —                                              | `false`    |
| show-density          | 是否显示密度切换按钮                         | boolean       | —                                              | `false`    |
| show-export           | 是否显示导出按钮                             | boolean       | —                                              | `false`    |
| tree-props            | 树形数据配置                                 | object        | —                                              | —          |
| lazy                  | 是否懒加载树形子节点                         | boolean       | —                                              | `false`    |
| load                  | 懒加载函数                                   | function      | —                                              | —          |
| default-expand-all    | 是否默认展开所有行（用于树形表格）           | boolean       | —                                              | `false`    |

### TableColumn 列配置

| 属性名              | 说明                                        | 类型             | 可选值                                     | 默认值     |
| ------------------- | ------------------------------------------- | ---------------- | ------------------------------------------ | ---------- |
| type                | 特殊列类型                                  | string           | `selection` / `radio` / `expand` / `index` | —          |
| prop                | 数据字段名                                  | string           | —                                          | —          |
| label               | 表头显示文字                                | string           | —                                          | —          |
| width               | 固定列宽（px）                              | number           | —                                          | —          |
| minWidth            | 最小列宽（px）                              | number           | —                                          | `80`       |
| align               | 单元格对齐方式                              | string           | `left` / `center` / `right`                | `left`     |
| headerAlign         | 表头对齐方式                                | string           | `left` / `center` / `right`                | 同 `align` |
| fixed               | 固定列位置                                  | string / boolean | `left` / `right` / `true`                  | —          |
| sortable            | 是否可排序，`'custom'` 仅触发事件不自动排序 | boolean / string | `true` / `false` / `'custom'`              | `false`    |
| sortMethod          | 自定义排序方法                              | function         | —                                          | —          |
| showOverflowTooltip | 内容溢出时以 tooltip 显示                   | boolean          | —                                          | `false`    |
| renderCell          | 自定义单元格渲染函数                        | CellRenderer     | —                                          | —          |
| renderHeader        | 自定义表头渲染函数                          | HeaderRenderer   | —                                          | —          |
| className           | 单元格额外 CSS class                        | string           | —                                          | —          |
| visible             | 是否显示该列                                | boolean          | —                                          | `true`     |

## 插槽

| 插槽名 | 说明             |
| ------ | ---------------- |
| empty  | 自定义空状态内容 |

## 事件

| 事件名              | 说明            | 回调参数                                                   |
| ------------------- | --------------- | ---------------------------------------------------------- |
| nv-row-click        | 行点击          | `{ row, rowIndex, event }`                                 |
| nv-row-dblclick     | 行双击          | `{ row, rowIndex, event }`                                 |
| nv-cell-click       | 单元格点击      | `{ row, rowIndex, column, columnIndex, cellValue, event }` |
| nv-row-contextmenu  | 行右键菜单      | `{ row, rowIndex, column, columnIndex, cellValue, event }` |
| nv-header-click     | 表头点击        | `{ column, columnIndex, event }`                           |
| nv-sort-change      | 排序改变        | `{ column, prop, order }`                                  |
| nv-selection-change | 多选选中项改变  | `{ selection }`                                            |
| nv-select           | 单行多选切换    | `{ row, selected }`                                        |
| nv-select-all       | 全选 / 取消全选 | `{ selection }`                                            |
| nv-current-change   | 单选行改变      | `{ currentRow }`                                           |
| nv-scroll           | 表格滚动        | `{ scrollLeft, scrollTop }`                                |

## 方法

| 方法名             | 说明               | 参数               |
| ------------------ | ------------------ | ------------------ |
| toggleRowSelection | 切换某行多选状态   | `(row, selected?)` |
| clearSelection     | 清空所有选中       | —                  |
| toggleAllSelection | 全选 / 取消全选    | —                  |
| getSelectionRows   | 获取当前选中行数组 | —                  |
| setCurrentRow      | 设置单选行         | `(row \| null)`    |

## CSS 变量

| 变量名                                     | 说明               | 默认值    |
| ------------------------------------------ | ------------------ | --------- |
| `--nv-table-background-color`              | 表格背景色         | `#ffffff` |
| `--nv-table-font-color`                    | 文字颜色           | `#606266` |
| `--nv-table-border-color`                  | 边框颜色           | `#ebeef5` |
| `--nv-table-header-background-color`       | 表头背景色         | `#f5f7fa` |
| `--nv-table-header-font-color`             | 表头文字颜色       | `#606266` |
| `--nv-table-header-height`                 | 表头行高           | `48px`    |
| `--nv-table-header-hover-background-color` | 表头 hover 背景色  | `#eaecef` |
| `--nv-table-cell-padding`                  | 单元格内边距       | `0 12px`  |
| `--nv-table-row-hover-background-color`    | 行 hover 背景色    | `#f5f7fa` |
| `--nv-table-row-current-background-color`  | 当前行高亮背景色   | `#ecf5ff` |
| `--nv-table-row-stripe-background-color`   | 斑马纹奇数行背景色 | `#fafafa` |
| `--nv-table-sort-icon-color`               | 排序图标默认颜色   | `#c0c4cc` |
| `--nv-table-sort-active-color`             | 排序图标激活颜色   | `#409eff` |
| `--nv-table-empty-font-color`              | 空状态文字颜色     | `#909399` |

## CSS Parts

| Name        | Description    | CSS Selector          |
| ----------- | -------------- | --------------------- |
| header      | 表头容器       | `::part(header)`      |
| body        | 表体容器       | `::part(body)`        |
| toolbar     | 顶部操作栏容器 | `::part(toolbar)`     |
| summary     | 表尾合计行容器 | `::part(summary)`     |
| pagination  | 底部翻页栏容器 | `::part(pagination)`  |
| contextmenu | 右键菜单弹层窗 | `::part(contextmenu)` |
