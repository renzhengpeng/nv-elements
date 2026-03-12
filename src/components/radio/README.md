# Radio 单选框

在一组备选项中进行单选。

## 组件说明

Radio 单选框组件用于在一组互斥的选项中选择一个。可以单独使用，也可以配合 RadioGroup 组件使用。

## 属性

| 属性名   | 说明                           | 类型    | 可选值                               | 默认值 |
| -------- | ------------------------------ | ------- | ------------------------------------ | ------ |
| value    | 绑定值                         | string  | —                                    | —      |
| label    | 单选框的值                     | string  | —                                    | —      |
| name     | 原生 name 属性（用于表单提交） | string  | —                                    | —      |
| form     | 关联的表单 id                  | string  | —                                    | —      |
| required | 是否必填                       | boolean | —                                    | false  |
| checked  | 当前是否选中                   | boolean | —                                    | false  |
| disabled | 是否禁用                       | boolean | —                                    | false  |
| border   | 是否显示边框                   | boolean | —                                    | false  |
| type     | 单选框类型                     | string  | radio / button                       | radio  |
| size     | 单选框的尺寸                   | string  | mini / small / medium / large / huge | medium |

### RadioGroup 属性

| 属性名     | 说明                                                       | 类型    | 可选值                               | 默认值 |
| ---------- | ---------------------------------------------------------- | ------- | ------------------------------------ | ------ |
| value      | 绑定值                                                     | string  | —                                    | —      |
| name       | 原生 name 属性                                             | string  | —                                    | —      |
| disabled   | 是否禁用                                                   | boolean | —                                    | false  |
| size       | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效 | string  | mini / small / medium / large / huge | medium |
| text-color | 按钮形式的 Radio 激活时的文本颜色                          | string  | —                                    | —      |
| fill       | 按钮形式的 Radio 激活时的填充色和边框色                    | string  | —                                    | —      |

## 事件

| 事件名    | 说明                   | 回调参数              |
| --------- | ---------------------- | --------------------- |
| nv-change | 绑定值变化时触发的事件 | 选中的 Radio label 值 |
| nv-focus  | 获得焦点时触发         | —                     |
| nv-blur   | 失去焦点时触发         | —                     |

## 插槽

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 单选框的文本内容 |

## CSS 变量

Radio组件提供了丰富的CSS变量，支持普通单选框、带边框样式和按钮样式。

### 尺寸相关

| 变量名                              | 说明                 |
| ----------------------------------- | -------------------- |
| `--nv-radio-input-width`            | 单选框宽度           |
| `--nv-radio-input-height`           | 单选框高度           |
| `--nv-radio-input-border-radius`    | 单选框圆角           |
| `--nv-radio-after-width`            | 选中圆点宽度         |
| `--nv-radio-after-height`           | 选中圆点高度         |
| `--nv-radio-after-border-radius`    | 选中圆点圆角         |
| `--nv-radio-label-padding-left`     | 标签左内边距         |
| `--nv-radio-bordered-height`        | 带边框样式高度       |
| `--nv-radio-bordered-height-{size}` | 各尺寸带边框样式高度 |
| `--nv-radio-button-height-{size}`   | 各尺寸按钮样式高度   |
| `--nv-radio-focus-outline-width`    | 聚焦轮廓宽度         |
| `--nv-radio-focus-outline-offset`   | 聚焦轮廓偏移         |

### 颜色相关 - 普通样式

| 变量名                                               | 说明                     |
| ---------------------------------------------------- | ------------------------ |
| `--nv-radio-input-border-color`                      | 边框颜色                 |
| `--nv-radio-input-background-color`                  | 背景颜色                 |
| `--nv-radio-input-border-color-checked`              | 选中状态边框颜色         |
| `--nv-radio-input-background-color-checked`          | 选中状态背景颜色         |
| `--nv-radio-input-background-color-disabled`         | 禁用状态背景颜色         |
| `--nv-radio-input-border-color-disabled`             | 禁用状态边框颜色         |
| `--nv-radio-after-background-color`                  | 选中圆点背景颜色         |
| `--nv-radio-after-background-color-checked`          | 选中状态圆点背景颜色     |
| `--nv-radio-after-background-color-disabled`         | 禁用状态圆点背景颜色     |
| `--nv-radio-after-background-color-disabled-checked` | 禁用选中状态圆点背景颜色 |
| `--nv-radio-label-font-color`                        | 标签文本颜色             |
| `--nv-radio-label-font-color-checked`                | 选中状态标签文本颜色     |
| `--nv-radio-label-font-color-disabled`               | 禁用状态标签文本颜色     |

### 颜色相关 - 带边框样式

| 变量名                                      | 说明             |
| ------------------------------------------- | ---------------- |
| `--nv-radio-bordered-border-color`          | 边框颜色         |
| `--nv-radio-bordered-border-color-checked`  | 选中状态边框颜色 |
| `--nv-radio-bordered-border-color-disabled` | 禁用状态边框颜色 |

### 颜色相关 - 按钮样式

| 变量名                                                | 说明                     |
| ----------------------------------------------------- | ------------------------ |
| `--nv-radio-button-background-color`                  | 按钮背景颜色             |
| `--nv-radio-button-font-color`                        | 按钮文本颜色             |
| `--nv-radio-button-border-color`                      | 按钮边框颜色             |
| `--nv-radio-button-background-color-checked`          | 选中状态按钮背景颜色     |
| `--nv-radio-button-font-color-checked`                | 选中状态按钮文本颜色     |
| `--nv-radio-button-border-color-checked`              | 选中状态按钮边框颜色     |
| `--nv-radio-button-font-color-disabled`               | 禁用状态按钮文本颜色     |
| `--nv-radio-button-background-color-disabled`         | 禁用状态按钮背景颜色     |
| `--nv-radio-button-border-color-disabled`             | 禁用状态按钮边框颜色     |
| `--nv-radio-button-background-color-disabled-checked` | 禁用选中状态按钮背景颜色 |
| `--nv-radio-button-font-color-hover`                  | hover状态按钮文本颜色    |
| `--nv-radio-button-font-color-active`                 | active状态按钮文本颜色   |
| `--nv-radio-button-border-color-active`               | active状态按钮边框颜色   |
| `--nv-radio-focus-outline-color`                      | 聚焦轮廓颜色             |

> 注：`{size}` 表示 mini/small/medium/large/huge 五个尺寸

## CSS Parts

| Name  | Description          | CSS Selector    |
| ----- | -------------------- | --------------- |
| base  | 根容器元素           | `::part(base)`  |
| input | 单选框输入框显示元素 | `::part(input)` |
| label | 标签及文本内容       | `::part(label)` |
