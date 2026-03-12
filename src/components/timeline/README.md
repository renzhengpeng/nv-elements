# Timeline 时间线

可视化地呈现时间流信息。

## 组件说明

Timeline 时间线组件用于垂直展示一系列事件的时间流信息。

## Timeline-Item 属性

| 属性名    | 说明                             | 类型    | 可选值                                     | 默认值 |
| --------- | -------------------------------- | ------- | ------------------------------------------ | ------ |
| timestamp | 时间戳                           | string  | —                                          | —      |
| pending   | 是否处于悬浮待处理状态           | boolean | —                                          | false  |
| type      | 节点类型                         | string  | primary / success / warning / error / info | —      |
| color     | 节点颜色（支持任何 CSS 颜色值）  | string  | —                                          | —      |
| icon      | 自定义节点图标名称               | string  | —                                          | —      |
| reverse   | 是否反向排列时间线条（样式控制） | boolean | —                                          | false  |

## Timeline-Item 插槽

| 插槽名    | 说明           |
| --------- | -------------- |
| default   | 时间轴节点内容 |
| timestamp | 自定义时间戳   |

## CSS 变量

| 变量名                   | 说明           | 默认值 |
| ------------------------ | -------------- | ------ |
| --nv-timeline-node-color | 时间线节点颜色 | —      |
| --nv-timeline-line-color | 时间线颜色     | —      |

## CSS Parts

| Name | Description | CSS Selector   |
| ---- | ----------- | -------------- |
| base | 根容器元素  | `::part(base)` |

## Timeline-Item CSS Parts

| Name      | Description | CSS Selector        |
| --------- | ----------- | ------------------- |
| base      | 根容器元素  | `::part(base)`      |
| tail      | 连线        | `::part(tail)`      |
| node      | 节点容器    | `::part(node)`      |
| wrapper   | 内容包装器  | `::part(wrapper)`   |
| content   | 内容区域    | `::part(content)`   |
| timestamp | 时间戳区域  | `::part(timestamp)` |
