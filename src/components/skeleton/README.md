# Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

## 组件说明

Skeleton 骨架屏组件用于在内容加载前展示页面的大致结构，提升用户体验。

## 属性

| 属性名       | 说明               | 类型    | 可选值                 | 默认值 |
| ------------ | ------------------ | ------- | ---------------------- | ------ |
| animated     | 是否使用动画       | boolean | —                      | false  |
| loading      | 是否显示骨架屏     | boolean | —                      | true   |
| rows         | 骨架屏段落数量     | number  | —                      | 1      |
| title        | 是否显示标题占位符 | boolean | —                      | true   |
| avatar       | 是否显示头像占位符 | boolean | —                      | false  |
| avatar-size  | 头像占位符大小     | string  | large / medium / small | medium |
| avatar-shape | 头像占位符形状     | string  | circle / square        | circle |
| width        | 骨架屏宽度         | string  | —                      | —      |

## 插槽

| 插槽名  | 说明                     |
| ------- | ------------------------ |
| default | 真实UI（加载完成后显示） |

## CSS 变量

### 布局相关

| 变量名                                  | 说明             | 默认值 |
| --------------------------------------- | ---------------- | ------ |
| `--nv-skeleton-border-radius`           | 骨架屏圆角       | 4px    |
| `--nv-skeleton-avatar-margin-right`     | 头像右外边距     | 16px   |
| `--nv-skeleton-title-margin-bottom`     | 标题下外边距     | 16px   |
| `--nv-skeleton-title-width`             | 标题宽度         | 40%    |
| `--nv-skeleton-paragraph-margin-bottom` | 段落下外边距     | 16px   |
| `--nv-skeleton-text-last-width`         | 最后一行文本宽度 | 60%    |

### 尺寸相关

| 变量名                             | 说明               | 默认值 |
| ---------------------------------- | ------------------ | ------ |
| `--nv-skeleton-avatar-size-large`  | large尺寸头像大小  | 40px   |
| `--nv-skeleton-avatar-size-medium` | medium尺寸头像大小 | 32px   |
| `--nv-skeleton-avatar-size-small`  | small尺寸头像大小  | 24px   |
| `--nv-skeleton-title-height`       | 标题高度           | 16px   |
| `--nv-skeleton-text-height`        | 文本高度           | 16px   |

### 颜色相关

| 变量名                                  | 说明                 | 默认值  |
| --------------------------------------- | -------------------- | ------- |
| `--nv-skeleton-background-color`        | 骨架屏背景颜色       | #f2f2f2 |
| `--nv-skeleton-background-color-active` | 动画激活状态背景颜色 | #e6e6e6 |

## CSS Parts

| Name      | Description  | CSS Selector        |
| --------- | ------------ | ------------------- |
| base      | 根容器元素   | `::part(base)`      |
| avatar    | 头像占位元素 | `::part(avatar)`    |
| content   | 内容容器元素 | `::part(content)`   |
| title     | 标题占位元素 | `::part(title)`     |
| paragraph | 段落占位元素 | `::part(paragraph)` |
| text      | 文字占位元素 | `::part(text)`      |
