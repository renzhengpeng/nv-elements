# Pagination 分页

当数据量过多时，使用分页分解数据。

## 组件说明

Pagination 分页组件用于展示和切换大量数据的不同页面。内部使用 `nv-button` 和 `nv-select` 组件实现，保证风格统一。组件的尺寸完全由内部的 `nv-button` 和 `nv-select` 控制，通过 `size` 属性统一传递给所有子组件。

## 属性

| 属性名       | 说明                         | 类型     | 可选值                               | 默认值                    |
| ------------ | ---------------------------- | -------- | ------------------------------------ | ------------------------- |
| current-page | 当前页数                     | number   | —                                    | 1                         |
| total        | 总条目数                     | number   | —                                    | 0                         |
| page-size    | 每页显示条目个数             | number   | —                                    | 10                        |
| page-sizes   | 每页显示个数选择器的选项设置 | number[] | —                                    | [10, 20, 30, 40, 50, 100] |
| pager-count  | 页码按钮的数量               | number   | —                                    | 7                         |
| size         | 分页尺寸                     | string   | mini / small / medium / large / huge | medium                    |
| type         | 页码按钮类型                 | string   | default / link                       | default                   |
| background   | 是否为分页按钮添加背景色     | boolean  | —                                    | false                     |
| disabled     | 是否禁用                     | boolean  | —                                    | false                     |
| show-jumper  | 是否显示快速跳转器           | boolean  | —                                    | false                     |

## 事件

| 事件名            | 说明                   | 回调参数 |
| ----------------- | ---------------------- | -------- |
| nv-current-change | currentPage 改变时触发 | 当前页码 |
| nv-size-change    | pageSize 改变时触发    | 每页条数 |

## CSS 变量

| 变量名                                | 说明                     | 默认值  |
| ------------------------------------- | ------------------------ | ------- |
| --nv-pagination-gap                   | 组件整体间距             | 4px     |
| --nv-pagination-pager-gap             | 页码之间的间距           | 4px     |
| --nv-pagination-sizes-margin-right    | 分页大小选择器右侧外边距 | 8px     |
| --nv-pagination-more-color            | 省略号颜色               | #606266 |
| --nv-pagination-jumper-margin-left    | 跳转器左侧外边距         | 8px     |
| --nv-pagination-jumper-gap            | 跳转器内部元素间距       | 8px     |
| --nv-pagination-jumper-text-color     | 跳转器文本颜色           | #606266 |
| --nv-pagination-jumper-text-font-size | 跳转器文本字体大小       | 14px    |
| --nv-pagination-jumper-input-width    | 跳转器输入框宽度         | 50px    |
| --nv-pagination-background-color     | background 为 true 时分页条背景色 | #f5f7fa |
| --nv-pagination-background-padding    | background 为 true 时分页条内边距 | 4px 8px |
| --nv-pagination-background-radius    | background 为 true 时分页条圆角   | 4px     |

**注意**：按钮、选择器和输入框的尺寸、字体等样式由 `nv-button`、`nv-select` 和 `nv-input` 组件的 CSS 变量控制。

## 设计说明

- **完全组件化**：所有按钮使用 `nv-button` 组件，分页大小选择器使用 `nv-select` 组件
- **尺寸一致性**：`size` 属性直接传递给所有子组件（`nv-button`、`nv-select`），确保尺寸完全一致
- **无冗余样式**：不定义自己的尺寸样式，完全依赖子组件的 `size` 属性控制
- **布局职责**：本组件只负责布局（间距、对齐），样式完全由子组件控制
- **省略号适配**：省略号的尺寸自动跟随 `size` 属性，与按钮高度保持一致

## CSS Parts

| Name         | Description    | CSS Selector           |
| ------------ | -------------- | ---------------------- |
| base         | 根属性容器     | `::part(base)`         |
| sizes        | 每页条数选择器 | `::part(sizes)`        |
| prev         | 上一页按钮     | `::part(prev)`         |
| pager        | 页码容器       | `::part(pager)`        |
| more         | 省略号文本     | `::part(more)`         |
| number       | 页码按钮       | `::part(number)`       |
| next         | 下一页按钮     | `::part(next)`         |
| jumper       | 跳转器容器     | `::part(jumper)`       |
| jumper-input | 跳转器输入框   | `::part(jumper-input)` |
