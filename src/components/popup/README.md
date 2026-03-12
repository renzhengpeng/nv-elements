# Popup 弹出层

弹出层容器，用于展示弹窗、信息提示等内容。

## 组件说明

Popup 弹出层组件是一个基础的弹出层容器，为 Tooltip、Popover 等组件提供底层支持。

## 属性

| 属性名                     | 说明                                 | 类型    | 可选值                                                                                                                          | 默认值   |
| -------------------------- | ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- |
| placement                  | 出现位置                             | string  | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | top      |
| active                     | 是否激活（显示）弹出层               | boolean | —                                                                                                                               | false    |
| arrow                      | 是否显示箭头                         | boolean | —                                                                                                                               | false    |
| distance                   | 弹出层距离锚点的距离（像素）         | number  | —                                                                                                                               | 8        |
| skidding                   | 弹出层沿着锚点的偏移量（像素）       | number  | —                                                                                                                               | 0        |
| sync                       | 同步宽度/高度                        | string  | width / height / both                                                                                                           | —        |
| strategy                   | 定位策略                             | string  | absolute / fixed                                                                                                                | absolute |
| anchor                     | 锚点元素选择器                       | string  | —                                                                                                                               | —        |
| auto-adjust                | 是否自动调整位置以避免被视口边界遮挡 | boolean | —                                                                                                                               | true     |
| trigger                    | 触发方式                             | string  | click / hover / focus / manual                                                                                                  | hover    |
| open-delay                 | 延迟显示（毫秒），hover/focus 时生效 | number  | —                                                                                                                               | 100      |
| hide-delay                 | 延迟隐藏（毫秒），hover 时生效       | number  | —                                                                                                                               | 100      |
| keep-open-on-hover-content | hover 时鼠标移入浮层是否保持不关     | boolean | —                                                                                                                               | true     |
| close-on-click-outside     | 点击外部是否关闭                     | boolean | —                                                                                                                               | true     |
| disabled                   | 是否禁用                             | boolean | —                                                                                                                               | false    |

## 插槽

| 插槽名  | 说明                 |
| ------- | -------------------- |
| default | 触发弹出层显示的元素 |
| content | 弹出层内容           |

## CSS 变量

| 变量名                      | 说明           | 默认值                          |
| --------------------------- | -------------- | ------------------------------- |
| --nv-popup-background-color | 弹出层背景色   | #fff                            |
| --nv-popup-border-color     | 弹出层边框颜色 | #e4e7ed                         |
| --nv-popup-box-shadow       | 弹出层阴影     | 0 2px 12px 0 rgba(0, 0, 0, 0.1) |
| --nv-popup-border-radius    | 弹出层圆角     | 4px                             |
| --nv-popup-padding          | 弹出层内边距   | 12px                            |
| --nv-popup-z-index          | 弹出层层级     | 2000                            |
| --nv-popup-arrow-size       | 箭头大小       | 8px                             |
| --nv-popup-arrow-offset     | 箭头偏移量     | 12px                            |
| --nv-popup-min-width        | 最小宽度       | —                               |

## CSS Parts

| Name   | Description    | CSS Selector     |
| ------ | -------------- | ---------------- |
| base   | 根容器元素     | `::part(base)`   |
| anchor | 触发锚点包装器 | `::part(anchor)` |
| popup  | 弹出层容器     | `::part(popup)`  |
