# Popconfirm 气泡确认框

点击元素，弹出气泡式的确认框。

## 组件说明

Popconfirm 气泡确认框组件基于 Popover 组件实现，提供简单的确认操作。

## 属性

| 属性名              | 说明                                                                                                                            | 类型    | 可选值                                                                                                                          | 默认值  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- | ------- |
| label               | 标题（未使用 label 插槽时生效）                                                                                                 | string  | —                                                                                                                               | 确定要删除吗？ |
| confirm-button-text | 确认按钮文字                                                                                                                    | string  | —                                                                                                                               | 确定    |
| cancel-button-text  | 取消按钮文字                                                                                                                    | string  | —                                                                                                                               | 取消    |
| confirm-button-type | 确认按钮类型（对应 nv-button 的 type，不含 text）                                                                               | string  | default / primary / success / warning / danger / info                                                                          | primary |
| cancel-button-type  | 取消按钮类型（对应 nv-button 的 type，不含 text）                                                                               | string  | default / primary / success / warning / danger / info                                                                           | default |
| confirm-text-button | 确认按钮是否为文字按钮（对应 nv-button 的 text 属性）                                                                          | boolean | —                                                                                                                               | false   |
| cancel-text-button  | 取消按钮是否为文字按钮（对应 nv-button 的 text 属性）                                                                          | boolean | —                                                                                                                               | true    |
| confirm-button-size | 确认按钮尺寸                                                                                                                    | string  | large / default / small                                                                                                         | small   |
| cancel-button-size  | 取消按钮尺寸                                                                                                                    | string  | large / default / small                                                                                                         | small   |
| placement           | 出现位置                                                                                                                        | string  | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | top     |
| trigger             | 触发方式                                                                                                                        | string  | click / hover / manual                                                                                                          | click   |
| arrow               | 是否显示箭头                                                                                                                    | boolean | —                                                                                                                               | true    |
| distance            | 弹出层与触发元素的距离（像素）                                                                                                  | number  | —                                                                                                                               | 8       |
| disabled            | 是否禁用                                                                                                                        | boolean | —                                                                                                                               | false   |

## 事件

| 事件名     | 说明               | 回调参数 |
| ---------- | ------------------ | -------- |
| nv-confirm | 点击确认按钮时触发 | —        |
| nv-cancel  | 点击取消按钮时触发 | —        |

## 插槽

| 插槽名    | 说明                                                                 |
| --------- | -------------------------------------------------------------------- |
| default   | 触发 Popconfirm 显示的元素                                          |
| reference | 同 default                                                          |
| label     | 自定义标题内容（支持富文本、图标等）；未提供时使用 `label` 属性文本 |

## CSS 变量

| 变量名                           | 说明               | 默认值 |
| -------------------------------- | ------------------ | ------ |
| --nv-popconfirm-background-color | 气泡确认框背景颜色 | —      |

## CSS Parts

| Name    | Description         | CSS Selector      |
| ------- | ------------------- | ----------------- |
| base    | 根属性容器（Popup） | `::part(base)`    |
| trigger | 触发器容器          | `::part(trigger)` |
| body    | 内容容器            | `::part(body)`    |
| label   | 标题文本            | `::part(label)`   |
| actions | 按钮区域            | `::part(actions)` |
