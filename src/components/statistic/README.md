# Statistic 统计数值

用于突出展示某个统计数值。

## 组件说明

Statistic 统计数值组件用于突出显示重要的统计数据，支持数字动画和自定义格式。

## 属性

| 属性名      | 说明           | 类型   | 可选值 | 默认值 |
| ----------- | -------------- | ------ | ------ | ------ |
| value       | 数值内容       | number | —      | 0      |
| precision   | 数值精度       | number | —      | 0      |
| prefix      | 设置数值的前缀 | string | —      | —      |
| suffix      | 设置数值的后缀 | string | —      | —      |
| label       | 数值的标题     | string | —      | —      |
| value-style | 数值的样式     | string | —      | —      |

## 插槽

| 插槽名 | 说明       |
| ------ | ---------- |
| prefix | 数值的前缀 |
| suffix | 数值的后缀 |

## CSS 变量

| 变量名                     | 说明     | 默认值 |
| -------------------------- | -------- | ------ |
| --nv-statistic-value-color | 数值颜色 | —      |
| --nv-statistic-title-color | 标题颜色 | —      |

## CSS Parts

| Name    | Description  | CSS Selector      |
| ------- | ------------ | ----------------- |
| base    | 根容器元素   | `::part(base)`    |
| title   | 标题元素     | `::part(title)`   |
| content | 内容容器元素 | `::part(content)` |
| prefix  | 前缀元素     | `::part(prefix)`  |
| value   | 数值元素     | `::part(value)`   |
| suffix  | 后缀元素     | `::part(suffix)`  |
