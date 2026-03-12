# Message 消息提示

常用于主动操作后的反馈提示。

## 组件说明

Message 消息提示组件用于在页面顶部居中显示简短的提示信息。支持成功、警告、消息、错误等多种类型。

## 属性

| 属性名   | 说明                                  | 类型     | 可选值                           | 默认值 |
| -------- | ------------------------------------- | -------- | -------------------------------- | ------ |
| message  | 消息文字                              | string   | —                                | —      |
| type     | 主题                                  | string   | success / warning / info / error | info   |
| duration | 显示时间，毫秒。设为 0 则不会自动关闭 | number   | —                                | 3000   |
| closable | 是否显示关闭按钮                      | boolean  | —                                | false  |
| showIcon | 是否显示图标                          | boolean  | —                                | false  |
| center   | 文字是否居中                          | boolean  | —                                | false  |
| onClose  | 关闭时的回调函数                      | function | —                                | —      |

## 方法

| 方法名 | 说明               | 参数 |
| ------ | ------------------ | ---- |
| close  | 关闭当前的 Message | —    |

## CSS 变量

### 布局相关

| 变量名                       | 说明         |
| ---------------------------- | ------------ |
| `--nv-message-border-radius` | 消息圆角     |
| `--nv-message-padding`       | 消息内边距   |
| `--nv-message-min-width`     | 消息最小宽度 |

### 尺寸相关

| 变量名                            | 说明             |
| --------------------------------- | ---------------- |
| `--nv-message-icon-font-size`     | 图标字体大小     |
| `--nv-message-content-font-size`  | 内容字体大小     |
| `--nv-message-closebtn-font-size` | 关闭按钮字体大小 |
| `--nv-message-icon-width`         | 图标宽度         |
| `--nv-message-icon-margin-right`  | 图标右外边距     |
| `--nv-message-closebtn-right`     | 关闭按钮右偏移   |

### 颜色相关 - 背景

| 变量名                                  | 说明                |
| --------------------------------------- | ------------------- |
| `--nv-message-background-color-info`    | info类型背景颜色    |
| `--nv-message-background-color-success` | success类型背景颜色 |
| `--nv-message-background-color-warning` | warning类型背景颜色 |
| `--nv-message-background-color-error`   | error类型背景颜色   |

### 颜色相关 - 边框

| 变量名                              | 说明                |
| ----------------------------------- | ------------------- |
| `--nv-message-border-color-info`    | info类型边框颜色    |
| `--nv-message-border-color-success` | success类型边框颜色 |
| `--nv-message-border-color-warning` | warning类型边框颜色 |
| `--nv-message-border-color-error`   | error类型边框颜色   |

### 颜色相关 - 文本

| 变量名                            | 说明                |
| --------------------------------- | ------------------- |
| `--nv-message-font-color-info`    | info类型文本颜色    |
| `--nv-message-font-color-success` | success类型文本颜色 |
| `--nv-message-font-color-warning` | warning类型文本颜色 |
| `--nv-message-font-color-error`   | error类型文本颜色   |

### 颜色相关 - 图标

| 变量名                            | 说明                |
| --------------------------------- | ------------------- |
| `--nv-message-icon-color-info`    | info类型图标颜色    |
| `--nv-message-icon-color-success` | success类型图标颜色 |
| `--nv-message-icon-color-warning` | warning类型图标颜色 |
| `--nv-message-icon-color-error`   | error类型图标颜色   |

### 颜色相关 - 关闭按钮

| 变量名                              | 说明                  |
| ----------------------------------- | --------------------- |
| `--nv-message-closebtn-color`       | 关闭按钮颜色          |
| `--nv-message-closebtn-color-hover` | hover状态关闭按钮颜色 |

## CSS Parts

| Name    | Description  | CSS Selector      |
| ------- | ------------ | ----------------- |
| base    | 根属性容器   | `::part(base)`    |
| icon    | 图标容器     | `::part(icon)`    |
| content | 消息内容容器 | `::part(content)` |
| close   | 关闭按钮     | `::part(close)`   |
