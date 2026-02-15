# Button 按钮

常用的操作按钮。

## 组件说明

Button 组件提供了多种类型、尺寸和状态的按钮样式，支持图标、加载状态、禁用状态等功能。可以单独使用，也可以通过 ButtonGroup 组件将多个按钮组合使用。

## 属性

| 属性名   | 说明                         | 类型    | 可选值                                                       | 默认值  |
| -------- | ---------------------------- | ------- | ------------------------------------------------------------ | ------- |
| type     | 按钮类型                     | string  | default / primary / success / info / warning / danger | default |
| size     | 按钮尺寸                     | string  | mini / small / medium / large / huge                         | medium  |
| disabled | 是否禁用                     | boolean | —                                                            | false   |
| loading  | 是否加载中                   | boolean | —                                                            | false   |
| active   | 是否处于激活状态（选中状态） | boolean | —                                                            | false   |
| plain    | 是否朴素按钮                 | boolean | —                                                            | false   |
| text     | 是否文字按钮                 | boolean | —                                                            | false   |
| link     | 是否链接按钮                 | boolean | —                                                            | false   |
| round    | 是否圆角按钮                 | boolean | —                                                            | false   |
| circle   | 是否圆形按钮                 | boolean | —                                                            | false   |
| icon     | 图标名称                     | string  | —                                                            | —       |

## 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |

## 事件

Button组件没有自定义事件，使用原生click等事件即可。

## CSS 变量

Button组件提供了丰富的CSS变量用于自定义样式，包括尺寸、颜色、状态等。

### 尺寸相关变量

| 变量名 | 说明 |
| ------ | ---- |
| `--nv-button-padding-mini` | mini尺寸内边距 |
| `--nv-button-padding-small` | small尺寸内边距 |
| `--nv-button-padding-medium` | medium尺寸内边距 |
| `--nv-button-padding-large` | large尺寸内边距 |
| `--nv-button-padding-huge` | huge尺寸内边距 |
| `--nv-button-font-size-default` | 默认字体大小 |
| `--nv-button-font-size-mini` | mini尺寸字体大小 |
| `--nv-button-font-size-small` | small尺寸字体大小 |
| `--nv-button-font-size-medium` | medium尺寸字体大小 |
| `--nv-button-font-size-large` | large尺寸字体大小 |
| `--nv-button-font-size-huge` | huge尺寸字体大小 |
| `--nv-button-height-mini` | mini尺寸高度 |
| `--nv-button-height-small` | small尺寸高度 |
| `--nv-button-height-medium` | medium尺寸高度 |
| `--nv-button-height-large` | large尺寸高度 |
| `--nv-button-height-huge` | huge尺寸高度 |
| `--nv-button-length-of-side-mini` | mini尺寸圆形按钮边长 |
| `--nv-button-length-of-side-small` | small尺寸圆形按钮边长 |
| `--nv-button-length-of-side-medium` | medium尺寸圆形按钮边长 |
| `--nv-button-length-of-side-large` | large尺寸圆形按钮边长 |
| `--nv-button-length-of-side-huge` | huge尺寸圆形按钮边长 |
| `--nv-button-border-radius-round` | round圆角 |
| `--nv-button-border-radius-mini` | mini尺寸圆角 |
| `--nv-button-border-radius-small` | small尺寸圆角 |
| `--nv-button-border-radius-medium` | medium尺寸圆角 |
| `--nv-button-border-radius-large` | large尺寸圆角 |
| `--nv-button-border-radius-huge` | huge尺寸圆角 |
| `--nv-button-border-radius-{size}-top-left` | 各尺寸左上圆角 |
| `--nv-button-border-radius-{size}-top-right` | 各尺寸右上圆角 |
| `--nv-button-border-radius-{size}-bottom-right` | 各尺寸右下圆角 |
| `--nv-button-border-radius-{size}-bottom-left` | 各尺寸左下圆角 |
| `--nv-button-border-width-top` | 上边框宽度 |
| `--nv-button-border-width-right` | 右边框宽度 |
| `--nv-button-border-width-bottom` | 下边框宽度 |
| `--nv-button-border-width-left` | 左边框宽度 |

### 颜色相关变量

每种类型(default/primary/success/info/warning/danger)都有以下状态的颜色变量：

**default类型**

- `--nv-button-border-color-default` / `--nv-button-color-default` / `--nv-button-background-color-default`
- `--nv-button-*-default-hover` (hover状态)
- `--nv-button-*-default-active` (active状态)
- `--nv-button-*-default-disabled` (disabled状态)
- `--nv-button-*-default-disabled-hover` (disabled hover状态)
- `--nv-button-*-default-plain` (plain样式)
- `--nv-button-*-default-plain-hover` (plain hover状态)
- `--nv-button-*-default-plain-active` (plain active状态)
- `--nv-button-*-default-plain-disabled` (plain disabled状态)

**primary/success/info/warning/danger类型**

每种类型都有类似的变量结构：

- `--nv-button-border-color-{type}`
- `--nv-button-color-{type}`
- `--nv-button-background-color-{type}`
- `--nv-button-*-{type}-hover`
- `--nv-button-*-{type}-active`
- `--nv-button-*-{type}-disabled`
- `--nv-button-*-{type}-plain`
- `--nv-button-*-{type}-plain-hover`
- `--nv-button-*-{type}-plain-active`
- `--nv-button-*-{type}-plain-disabled`

**text按钮（text属性）**

文字按钮也有对应的颜色变量：

- `--nv-button-border-color-text` / `--nv-button-color-text` / `--nv-button-background-color-text`
- `--nv-button-*-text-hover`
- `--nv-button-*-text-active`
- `--nv-button-*-text-disabled`
- `--nv-button-*-text-plain`
- `--nv-button-*-text-plain-hover`
- `--nv-button-*-text-plain-active`
- `--nv-button-*-text-plain-disabled`

> 提示：`*` 代表 `border-color`、`color`、`background-color` 三个属性

**link按钮（link属性）**

链接按钮与 text 按钮类似，但有以下区别：

- 文字颜色由 type 决定，使用对应主题色的 CSS 变量（如 primary 类型使用 `--nv-primary-color-1`）
- hover 时颜色变浅（使用 `*-hover` 变量），但不显示背景色
- active 时颜色变化（使用 `*-active` 变量），但不显示背景色
- 始终保持透明背景，适合用作文本链接样式的按钮

## CSS Parts

| Name   | Description  | CSS Selector     |
| ------ | ------------ | ---------------- |
| base   | 根按钮元素   | `::part(base)`   |
| button | 按钮内容容器 | `::part(button)` |
