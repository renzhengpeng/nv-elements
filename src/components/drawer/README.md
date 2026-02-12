# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 组件说明

Drawer 抽屉组件从屏幕边缘滑出，用于展示详细信息或进行复杂操作。

## 属性

| 属性名                | 说明                               | 类型    | 可选值                | 默认值 |
| --------------------- | ---------------------------------- | ------- | --------------------- | ------ |
| visible               | 是否显示 Drawer                    | boolean | —                     | false  |
| label                 | Drawer 的标题                      | string  | —                     | —      |
| direction             | Drawer 打开的方向                  | string  | rtl / ltr / ttb / btt | rtl    |
| size                  | Drawer 窗体的大小                  | string  | —                     | 30%    |
| show-close            | 是否显示关闭按钮                   | boolean | —                     | true   |
| close-on-click-modal  | 是否可以通过点击遮罩层关闭 Drawer  | boolean | —                     | true   |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Drawer   | boolean | —                     | true   |
| lock-scroll           | 是否锁定滚动                       | boolean | —                     | true   |
| mask                  | 是否需要遮罩层                     | boolean | —                     | true   |
| append-to-body        | 是否插入到 body 元素上             | boolean | —                     | true   |
| custom-class          | 自定义类名                         | string  | —                     | —      |

## 事件

| 事件名         | 说明                        | 回调参数 |
| -------------- | --------------------------- | -------- |
| nv-open        | Drawer 打开的回调           | —        |
| nv-after-open  | Drawer 打开动画结束时的回调 | —        |
| nv-close       | Drawer 关闭的回调           | —        |
| nv-after-close | Drawer 关闭动画结束时的回调 | —        |

## 插槽

| 插槽名  | 说明                |
| ------- | ------------------- |
| default | Drawer 的内容       |
| header  | Drawer 标题区的内容 |
| footer  | Drawer 底部区的内容 |

## CSS 变量

### 布局相关

| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| `--nv-drawer-z-index` | 层级 | 2000 |
| `--nv-drawer-drawer-box-shadow` | 抽屉阴影 | 0 2px 12px 0 rgba(0, 0, 0, 0.1) |
| `--nv-drawer-transition-duration` | 过渡动画时长 | 0.3s |

### 头部相关

| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| `--nv-drawer-header-padding` | 头部内边距 | 20px |
| `--nv-drawer-header-border-bottom` | 头部底部边框 | 1px solid #e4e7ed |
| `--nv-drawer-header-font-size` | 头部字体大小 | 18px |
| `--nv-drawer-header-font-weight` | 头部字重 | 500 |
| `--nv-drawer-header-color` | 头部文本颜色 | #303133 |

### 关闭按钮相关

| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| `--nv-drawer-close-color` | 关闭按钮颜色 | #909399 |
| `--nv-drawer-close-font-size` | 关闭按钮字体大小 | 16px |
| `--nv-drawer-close-transition-duration` | 关闭按钮过渡时长 | 0.3s |
| `--nv-drawer-close-color-hover` | hover状态关闭按钮颜色 | #303133 |

### 主体相关

| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| `--nv-drawer-body-padding` | 主体内边距 | 20px |
| `--nv-drawer-body-color` | 主体文本颜色 | #606266 |
| `--nv-drawer-body-font-size` | 主体字体大小 | 14px |
| `--nv-drawer-body-line-height` | 主体行高 | 1.5 |

### 底部相关

| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| `--nv-drawer-footer-padding` | 底部内边距 | 20px |
| `--nv-drawer-footer-border-top` | 底部顶部边框 | 1px solid #e4e7ed |
| `--nv-drawer-footer-text-align` | 底部文本对齐 | right |

### 颜色相关

| 变量名 | 说明 | 默认值 |
| ------ | ---- | ------ |
| `--nv-drawer-background-color` | 遮罩层背景颜色 | rgba(0, 0, 0, 0.5) |
| `--nv-drawer-drawer-background-color` | 抽屉背景颜色 | #fff |

## CSS Parts

| Name   | Description          | CSS Selector     |
| ------ | -------------------- | ---------------- |
| base   | 根属性容器（遮罩层） | `::part(base)`   |
| mask   | 遮罩层               | `::part(mask)`   |
| panel  | 抽屉面板             | `::part(panel)`  |
| header | 头部区域             | `::part(header)` |
| close  | 关闭按钮             | `::part(close)`  |
| body   | 主体内容区域         | `::part(body)`   |
| footer | 底部区域             | `::part(footer)` |
