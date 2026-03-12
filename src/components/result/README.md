# Result 结果

用于反馈一系列操作任务的处理结果。

## 组件说明

Result 结果组件用于向用户展示操作结果，如成功、失败、警告等状态。

## 属性

| 属性名    | 说明           | 类型   | 可选值                           | 默认值 |
| --------- | -------------- | ------ | -------------------------------- | ------ |
| type      | 结果类型       | string | success / warning / info / error | info   |
| label     | 标题           | string | —                                | —      |
| sub-title | 二级标题       | string | —                                | —      |
| icon      | 自定义图标名称 | string | —                                | —      |

## 插槽

| 插槽名    | 说明               |
| --------- | ------------------ |
| icon      | 自定义图标         |
| title     | 自定义标题         |
| sub-title | 自定义二级标题     |
| extra     | 自定义底部额外区域 |

## CSS 变量

| 变量名                  | 说明         | 默认值 |
| ----------------------- | ------------ | ------ |
| --nv-result-icon-size   | 结果图标大小 | —      |
| --nv-result-title-color | 结果标题颜色 | —      |

## CSS Parts

| Name     | Description  | CSS Selector       |
| -------- | ------------ | ------------------ |
| base     | 根容器元素   | `::part(base)`     |
| icon     | 图标容器元素 | `::part(icon)`     |
| title    | 标题元素     | `::part(title)`    |
| subtitle | 二级标题元素 | `::part(subtitle)` |
| content  | 内容区域元素 | `::part(content)`  |
| extra    | 额外区域元素 | `::part(extra)`    |
