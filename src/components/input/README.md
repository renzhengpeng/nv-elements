# Input 输入框

通过鼠标或键盘输入字符。

## 组件说明

Input 输入框组件是最基础的表单组件，支持多种输入类型（文本、密码、数字等），可以设置前缀后缀图标、清空按钮、字数统计等功能。当 type 为 textarea 时，支持多行文本输入和高度自适应。组件的高度使用全局高度变量（`--nv-global-height-*`），与 `nv-button`、`nv-select` 组件保持一致。

## 属性

| 属性名               | 说明                 | 类型    | 可选值                                                  | 默认值 |
| -------------------- | -------------------- | ------- | ------------------------------------------------------- | ------ |
| value                | 绑定值               | string  | —                                                       | —      |
| type                 | 输入框类型           | string  | text / password / textarea / number / email / url / tel | text   |
| placeholder          | 占位文本             | string  | —                                                       | —      |
| disabled             | 是否禁用             | boolean | —                                                       | false  |
| readonly             | 是否只读             | boolean | —                                                       | false  |
| clearable            | 是否可清空           | boolean | —                                                       | false  |
| show-password-toggle | 是否显示切换密码图标 | boolean | —                                                       | false  |
| prefix-icon          | 输入框头部图标       | string  | —                                                       | —      |
| suffix-icon          | 输入框尾部图标       | string  | —                                                       | —      |
| maxlength            | 最大输入长度         | number  | —                                                       | —      |
| show-word-limit      | 是否显示字数统计     | boolean | —                                                       | false  |
| rows                 | textarea 行数        | number  | —                                                       | 2      |
| size                 | 输入框尺寸           | string  | mini / small / medium / large / huge                    | medium |
| name                 | 原生name属性         | string  | —                                                       | —      |
| form                 | 关联的表单id         | string  | —                                                       | —      |
| required             | 是否必填             | boolean | —                                                       | false  |
| autocomplete         | 原生属性             | string  | —                                                       | off    |
| autofocus            | 是否自动聚焦         | boolean | —                                                       | false  |
| max                  | 最大值(数字)         | number  | —                                                       | —      |
| min                  | 最小值(数字)         | number  | —                                                       | —      |

## 事件

| 事件名                     | 说明                                        | 回调参数            |
| -------------------------- | ------------------------------------------- | ------------------- |
| nv-input                   | 在 Input 值改变时触发                       | (value: string)     |
| nv-change                  | 仅在输入框失去焦点或用户按下回车时触发      | (value: string)     |
| nv-focus                   | 在 Input 获得焦点时触发                     | (event: FocusEvent) |
| nv-blur                    | 在 Input 失去焦点时触发                     | (event: FocusEvent) |
| nv-clear                   | 在点击由 clearable 属性生成的清空按钮时触发 | —                   |
| nv-password-visible-change | 点击密码切换图标时触发                      | (visible: boolean)  |

## 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

## CSS 变量

### 尺寸相关

| 变量名                            | 说明               |
| --------------------------------- | ------------------ |
| `--nv-input-padding-mini`         | mini尺寸内边距     |
| `--nv-input-padding-small`        | small尺寸内边距    |
| `--nv-input-padding-medium`       | medium尺寸内边距   |
| `--nv-input-padding-large`        | large尺寸内边距    |
| `--nv-input-padding-huge`         | huge尺寸内边距     |
| `--nv-input-font-size-default`    | 默认字体大小       |
| `--nv-input-font-size-mini`       | mini尺寸字体大小   |
| `--nv-input-font-size-small`      | small尺寸字体大小  |
| `--nv-input-font-size-medium`     | medium尺寸字体大小 |
| `--nv-input-font-size-large`      | large尺寸字体大小  |
| `--nv-input-font-size-huge`       | huge尺寸字体大小   |
| `--nv-input-height-mini`          | mini尺寸高度       |
| `--nv-input-height-small`         | small尺寸高度      |
| `--nv-input-height-medium`        | medium尺寸高度     |
| `--nv-input-height-large`         | large尺寸高度      |
| `--nv-input-height-huge`          | huge尺寸高度       |
| `--nv-input-border-radius-mini`   | mini尺寸圆角       |
| `--nv-input-border-radius-small`  | small尺寸圆角      |
| `--nv-input-border-radius-medium` | medium尺寸圆角     |
| `--nv-input-border-radius-large`  | large尺寸圆角      |
| `--nv-input-border-radius-huge`   | huge尺寸圆角       |

### 颜色相关

| 变量名                                 | 说明                 |
| -------------------------------------- | -------------------- |
| `--nv-input-border-color`              | 边框颜色             |
| `--nv-input-border-color-hover`        | hover状态边框颜色    |
| `--nv-input-border-color-focus`        | focus状态边框颜色    |
| `--nv-input-border-color-disabled`     | disabled状态边框颜色 |
| `--nv-input-background-color`          | 背景颜色             |
| `--nv-input-background-color-disabled` | disabled状态背景颜色 |
| `--nv-input-font-color`                | 文本颜色             |
| `--nv-input-font-color-disabled`       | disabled状态文本颜色 |
| `--nv-input-font-color-placeholder`    | 占位文本颜色         |
| `--nv-input-icon-color`                | 图标颜色             |
| `--nv-input-icon-color-hover`          | hover状态图标颜色    |

### 其他

| 变量名                              | 说明                     | 默认值 |
| ----------------------------------- | ------------------------ | ------ |
| `--nv-input-number-spinner-opacity` | number类型上下箭头透明度 | 0.5    |

## CSS Parts

| Name     | Description      | CSS Selector       |
| -------- | ---------------- | ------------------ |
| base     | 根容器元素       | `::part(base)`     |
| prepend  | 前置内容容器     | `::part(prepend)`  |
| wrapper  | 输入框包装层     | `::part(wrapper)`  |
| prefix   | 头部图标容器     | `::part(prefix)`   |
| input    | 内部原生输入元素 | `::part(input)`    |
| suffix   | 尾部图标容器     | `::part(suffix)`   |
| clear    | 清空图标容器     | `::part(clear)`    |
| password | 密码切换图标容器 | `::part(password)` |
| append   | 后置内容容器     | `::part(append)`   |
| count    | 字数统计容器     | `::part(count)`    |
