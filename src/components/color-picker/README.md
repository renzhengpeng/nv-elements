# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

## 组件说明

ColorPicker 颜色选择器组件用于选择颜色值，支持多种颜色格式的输入和输出。

## 功能特性

- 支持拖拽选择颜色的饱和度、亮度、色相和透明度
- 支持多种颜色格式：HEX、RGB、HSL、HSV
- 支持格式切换：点击面板中的格式按钮可以切换显示格式
- 支持直接输入颜色值：可以在输入框中直接输入任意支持的格式
- 支持预定义颜色快速选择
- 支持多种尺寸和形状
- 支持边框显示控制

## 属性

| 属性名             | 说明                                                                                      | 类型    | 可选值                               | 默认值    |
| ------------------ | ----------------------------------------------------------------------------------------- | ------- | ------------------------------------ | --------- |
| value              | 绑定值                                                                                    | string  | —                                    | #409EFF   |
| disabled           | 是否禁用                                                                                  | boolean | —                                    | false     |
| show-alpha         | 是否支持透明度选择                                                                        | boolean | —                                    | false     |
| color-format       | 颜色格式（写入 value 的颜色格式，也是初始显示格式）                                       | string  | hex / rgb / hsl / hsv                | hex       |
| predefine          | 预定义颜色                                                                                | array   | —                                    | []        |
| size               | 尺寸（高度与全局尺寸一致：mini-24px / small-28px / medium-32px / large-36px / huge-40px） | string  | mini / small / medium / large / huge | medium    |
| shape              | 形状                                                                                      | string  | circle / square / rectangle          | rectangle |
| bordered           | 是否显示边框                                                                              | boolean | —                                    | false     |
| eye-dropper        | 是否启用吸管工具                                                                          | boolean | —                                    | true      |

## 事件

| 事件名           | 说明                               | 回调参数         |
| ---------------- | ---------------------------------- | ---------------- |
| nv-change        | 当绑定值变化时触发                 | 当前值           |
| nv-active-change | 面板中当前显示的颜色发生改变时触发 | 当前显示的颜色值 |

## CSS 变量

### 触发器（Trigger）

| 变量名                                        | 说明               | 默认值            |
| --------------------------------------------- | ------------------ | ----------------- |
| --nv-color-picker-trigger-border              | 触发器边框         | 1px solid #dcdfe6 |
| --nv-color-picker-trigger-border-radius       | 触发器边框圆角     | 4px               |
| --nv-color-picker-trigger-padding             | 触发器内边距       | 4px               |
| --nv-color-picker-trigger-background-color    | 触发器背景色       | #fff              |
| --nv-color-picker-trigger-transition-duration | 触发器过渡时长     | 0.3s              |
| --nv-color-picker-trigger-border-color-hover  | 触发器悬停边框颜色 | #409EFF           |

### 颜色块尺寸（Circle & Square）

| 变量名                              | 说明                    | 默认值                               |
| ----------------------------------- | ----------------------- | ------------------------------------ |
| --nv-color-picker-color-size-mini   | 迷你尺寸（圆形/正方形） | var(--nv-global-height-mini, 24px)   |
| --nv-color-picker-color-size-small  | 小尺寸（圆形/正方形）   | var(--nv-global-height-small, 28px)  |
| --nv-color-picker-color-size-medium | 中等尺寸（圆形/正方形） | var(--nv-global-height-medium, 32px) |
| --nv-color-picker-color-size-large  | 大尺寸（圆形/正方形）   | var(--nv-global-height-large, 36px)  |
| --nv-color-picker-color-size-huge   | 超大尺寸（圆形/正方形） | var(--nv-global-height-huge, 40px)   |

### 颜色块尺寸（Rectangle）

| 变量名                                          | 说明                 | 默认值                               |
| ----------------------------------------------- | -------------------- | ------------------------------------ |
| --nv-color-picker-color-width-rectangle-mini    | 长方形宽度（mini）   | 48px                                 |
| --nv-color-picker-color-height-rectangle-mini   | 长方形高度（mini）   | var(--nv-global-height-mini, 24px)   |
| --nv-color-picker-color-width-rectangle-small   | 长方形宽度（small）  | 56px                                 |
| --nv-color-picker-color-height-rectangle-small  | 长方形高度（small）  | var(--nv-global-height-small, 28px)  |
| --nv-color-picker-color-width-rectangle-medium  | 长方形宽度（medium） | 64px                                 |
| --nv-color-picker-color-height-rectangle-medium | 长方形高度（medium） | var(--nv-global-height-medium, 32px) |
| --nv-color-picker-color-width-rectangle-large   | 长方形宽度（large）  | 72px                                 |
| --nv-color-picker-color-height-rectangle-large  | 长方形高度（large）  | var(--nv-global-height-large, 36px)  |
| --nv-color-picker-color-width-rectangle-huge    | 长方形宽度（huge）   | 80px                                 |
| --nv-color-picker-color-height-rectangle-huge   | 长方形高度（huge）   | var(--nv-global-height-huge, 40px)   |

### 形状（Shape）

| 变量名                                          | 说明           | 默认值 |
| ----------------------------------------------- | -------------- | ------ |
| --nv-color-picker-color-border-radius-circle    | 圆形边框圆角   | 50%    |
| --nv-color-picker-color-border-radius-square    | 正方形边框圆角 | 4px    |
| --nv-color-picker-color-border-radius-rectangle | 长方形边框圆角 | 2px    |

### 面板（Panel）

| 变量名                                   | 说明         | 默认值                          |
| ---------------------------------------- | ------------ | ------------------------------- |
| --nv-color-picker-panel-z-index          | 面板层级     | 2000                            |
| --nv-color-picker-panel-background-color | 面板背景色   | #fff                            |
| --nv-color-picker-panel-border           | 面板边框     | 1px solid #e4e7ed               |
| --nv-color-picker-panel-border-radius    | 面板边框圆角 | 4px                             |
| --nv-color-picker-panel-box-shadow       | 面板阴影     | 0 2px 12px 0 rgba(0, 0, 0, 0.1) |
| --nv-color-picker-panel-padding          | 面板内边距   | 12px                            |
| --nv-color-picker-panel-min-width        | 面板最小宽度 | 200px                           |

### 颜色选择区（Picker）

| 变量名                                 | 说明         | 默认值 |
| -------------------------------------- | ------------ | ------ |
| --nv-color-picker-picker-margin-bottom | 选择区下边距 | 12px   |

### 饱和度（Saturation）

| 变量名                                     | 说明               | 默认值 |
| ------------------------------------------ | ------------------ | ------ |
| --nv-color-picker-saturation-width         | 饱和度区域宽度     | 180px  |
| --nv-color-picker-saturation-height        | 饱和度区域高度     | 180px  |
| --nv-color-picker-saturation-border-radius | 饱和度区域边框圆角 | 2px    |

### 指针（Pointer）

| 变量名                                  | 说明         | 默认值                     |
| --------------------------------------- | ------------ | -------------------------- |
| --nv-color-picker-pointer-size          | 指针大小     | 12px                       |
| --nv-color-picker-pointer-border        | 指针边框     | 2px solid #fff             |
| --nv-color-picker-pointer-border-radius | 指针边框圆角 | 50%                        |
| --nv-color-picker-pointer-box-shadow    | 指针阴影     | 0 0 2px rgba(0, 0, 0, 0.3) |

### 色相（Hue）

| 变量名                              | 说明             | 默认值 |
| ----------------------------------- | ---------------- | ------ |
| --nv-color-picker-hue-width         | 色相滑块宽度     | 180px  |
| --nv-color-picker-hue-height        | 色相滑块高度     | 12px   |
| --nv-color-picker-hue-margin-top    | 色相滑块上边距   | 12px   |
| --nv-color-picker-hue-border-radius | 色相滑块边框圆角 | 2px    |

### 透明度（Alpha）

| 变量名                                | 说明               | 默认值 |
| ------------------------------------- | ------------------ | ------ |
| --nv-color-picker-alpha-width         | 透明度滑块宽度     | 180px  |
| --nv-color-picker-alpha-height        | 透明度滑块高度     | 12px   |
| --nv-color-picker-alpha-margin-top    | 透明度滑块上边距   | 12px   |
| --nv-color-picker-alpha-border-radius | 透明度滑块边框圆角 | 2px    |

### 预定义颜色（Predefine）

| 变量名                                                | 说明                   | 默认值            |
| ----------------------------------------------------- | ---------------------- | ----------------- |
| --nv-color-picker-predefine-gap                       | 预定义颜色间距         | 8px               |
| --nv-color-picker-predefine-margin-top                | 预定义颜色区域上边距   | 12px              |
| --nv-color-picker-predefine-padding-top               | 预定义颜色区域上内边距 | 12px              |
| --nv-color-picker-predefine-border-top                | 预定义颜色区域上边框   | 1px solid #e4e7ed |
| --nv-color-picker-predefine-color-size                | 预定义颜色块大小       | 20px              |
| --nv-color-picker-predefine-color-border-radius       | 预定义颜色块边框圆角   | 2px               |
| --nv-color-picker-predefine-color-border              | 预定义颜色块边框       | 1px solid #dcdfe6 |
| --nv-color-picker-predefine-color-transition-duration | 预定义颜色块过渡时长   | 0.2s              |
| --nv-color-picker-predefine-color-hover-scale         | 预定义颜色块悬停缩放   | 1.1               |

## CSS Parts

| Name            | Description        | CSS Selector              |
| --------------- | ------------------ | ------------------------- |
| base            | 根属性容器         | `::part(base)`            |
| trigger         | 颜色选择器触发区域 | `::part(trigger)`         |
| panel           | 颜色选择面板       | `::part(panel)`           |
| saturation      | 饱和度选择区       | `::part(saturation)`      |
| hue             | 色相选择条         | `::part(hue)`             |
| alpha           | 透明度选择条       | `::part(alpha)`           |
| predefine       | 预定义颜色区域     | `::part(predefine)`       |
| predefine-color | 预定义颜色块       | `::part(predefine-color)` |
| svg             | 取色器图标         | `::part(svg)`             |
