# Tabs 标签页组件

分隔内容上有关联但属于不同类别的数据集合。

## 组件特性

- 🎨 **三种样式**：支持 line（线条）、card（卡片）、border-card（带边框卡片）三种风格
- 📍 **四个位置**：标签可以放置在顶部、底部、左侧、右侧
- ✏️ **可编辑**：支持动态增加和关闭标签页
- 🏷️ **可重命名**：双击标签可以编辑标签名称
- 🎯 **灵活控制**：支持禁用、默认激活等状态控制
- 🎪 **事件丰富**：提供完整的生命周期事件（切换、关闭、新增、编辑等）

## 组件构成

Tabs 组件由两个子组件组成：

- **nv-tabs**：标签页容器
- **nv-tab-pane**：标签面板

## Tabs 属性

| 属性     | 说明                   | 类型    | 可选值                      | 默认值 |
| -------- | ---------------------- | ------- | --------------------------- | ------ |
| value    | 当前激活的标签页的 key | string  | —                           | —      |
| type     | 标签页风格类型         | string  | card / border-card          | —      |
| position | 标签位置               | string  | top / right / bottom / left | top    |
| closable | 标签是否可关闭         | boolean | —                           | false  |
| addable  | 标签是否可增加         | boolean | —                           | false  |
| editable | 标签是否可编辑         | boolean | —                           | false  |

## Tabs 事件

| 事件名            | 说明               | 回调参数                                      |
| ----------------- | ------------------ | --------------------------------------------- |
| nv-change         | 切换标签时触发     | name: 新激活标签的 name                       |
| nv-tab-click      | 点击标签时触发     | { name: 被点击标签的 name }                   |
| nv-tab-remove     | 关闭标签时触发     | { name: 被关闭标签的 name }                   |
| nv-tab-add        | 点击新增按钮时触发 | —                                             |
| nv-tab-edit-start | 开始编辑标签时触发 | { name: 被编辑标签的 name }                   |
| nv-tab-edit-end   | 完成编辑标签时触发 | { name: 标签的 name, newLabel: 新的标签名称 } |

## TabPane 属性

| 属性     | 说明             | 类型    | 可选值 | 默认值 |
| -------- | ---------------- | ------- | ------ | ------ |
| name     | 标签页的唯一标识 | string  | —      | ''     |
| label    | 标签页显示的文本 | string  | —      | ''     |
| disabled | 是否禁用该标签页 | boolean | —      | false  |

## TabPane 插槽

| 插槽名 | 说明             |
| ------ | ---------------- |
| —      | 标签面板内容     |
| label  | 自定义标签页标题 |

## TabPane CSS Parts

| Name | Description | CSS Selector   |
| ---- | ----------- | -------------- |
| base | 根容器元素  | `::part(base)` |

## 样式变量

| 变量名                          | 说明                        | 默认值      |
| ------------------------------- | --------------------------- | ----------- |
| --nv-tabs-header-height         | 标签头部高度                | 40px        |
| --nv-tabs-tab-padding           | 标签内边距                  | 0 20px      |
| --nv-tabs-tab-font-size         | 标签字体大小                | 14px        |
| --nv-tabs-tab-color             | 标签文字颜色                | #303133     |
| --nv-tabs-tab-color-hover       | 标签悬停文字颜色            | #409EFF     |
| --nv-tabs-tab-color-active      | 激活标签文字颜色            | #409EFF     |
| --nv-tabs-tab-color-disabled    | 禁用标签文字颜色            | #C0C4CC     |
| --nv-tabs-tab-background        | 标签背景色                  | transparent |
| --nv-tabs-tab-background-hover  | 标签悬停背景色              | #f5f7fa     |
| --nv-tabs-tab-background-active | 激活标签背景色（card 类型） | #fff        |
| --nv-tabs-border-color          | 边框颜色                    | #e4e7ed     |
| --nv-tabs-line-height           | 激活指示线高度              | 2px         |
| --nv-tabs-line-color            | 激活指示线颜色              | #409EFF     |
| --nv-tabs-card-border-radius    | 卡片圆角                    | 4px         |
| --nv-tabs-content-padding       | 内容区域内边距              | 20px        |
| --nv-tabs-transition-duration   | 过渡动画时长                | 0.3s        |

## 使用建议

### 样式选择

- **line**：适合内容密集、注重效率的场景
- **card**：适合视觉突出、内容明确分隔的场景
- **border-card**：适合需要强调标签页容器边界的场景

### 位置选择

- **top**（默认）：最常用，适合大多数场景
- **bottom**：适合需要内容优先展示的场景
- **left/right**：适合标签较多、需要垂直排列的场景

### 可编辑功能

- `closable`：允许用户关闭不需要的标签
- `addable`：允许用户动态添加新标签（需监听 `tab-add` 事件并手动添加 `nv-tab-pane`）
- `editable`：允许用户双击标签编辑名称（需监听 `tab-edit-end` 事件并更新数据）

### 性能优化

- 对于内容复杂的标签页，建议使用懒加载
- 避免在未激活的标签页中执行耗时操作
- 合理使用 `disabled` 属性禁用不可用的标签页

## CSS Parts

| Name       | Description  | CSS Selector         |
| ---------- | ------------ | -------------------- |
| base       | 根属性容器   | `::part(base)`       |
| header     | 头部容器     | `::part(header)`     |
| nav-wrap   | 导航包装器   | `::part(nav-wrap)`   |
| nav-scroll | 导航滚动容器 | `::part(nav-scroll)` |
| nav        | 导航列表     | `::part(nav)`        |
| item       | 标签项       | `::part(item)`       |
| item-label | 标签文本     | `::part(item-label)` |
| item-close | 标签关闭按钮 | `::part(item-close)` |
| item-add   | 标签新增按钮 | `::part(item-add)`   |
| content    | 内容容器     | `::part(content)`    |
