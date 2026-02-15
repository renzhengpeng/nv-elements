# NavMenu 导航菜单组件

为网站提供导航功能的菜单组件，支持水平和垂直两种模式，可配置图标、子菜单、折叠等功能。

## 组件特性

- 🎨 **双模式支持**：支持水平（horizontal）和垂直（vertical）两种布局模式
- 📁 **多级嵌套**：支持无限层级的子菜单嵌套
- 🎯 **多种触发方式**：支持点击（click）和悬停（hover）两种触发方式
- 🎨 **灵活的图标系统**：支持插槽、SVG 字符串、图标类名等多种图标配置方式
- 📏 **五种尺寸**：提供 mini、small、medium、large、huge 五种尺寸可选
- 🔄 **折叠模式**：垂直模式下支持折叠，只显示图标，节省空间
- 🎪 **手风琴模式**：可配置只保持一个子菜单展开
- ♿ **无障碍访问**：完善的键盘导航和 ARIA 支持

## 组件构成

NavMenu 组件由三个子组件组成：

- **nv-nav-menu**：导航菜单容器
- **nv-menu-item**：菜单项
- **nv-submenu**：子菜单

## NavMenu 属性

| 属性             | 说明                                     | 类型     | 可选值                               | 默认值     |
| ---------------- | ---------------------------------------- | -------- | ------------------------------------ | ---------- |
| default-active   | 默认激活菜单的 index                     | string   | —                                    | —          |
| active-index     | 当前激活菜单的 index                     | string   | —                                    | —          |
| mode             | 菜单模式                                 | string   | horizontal / vertical                | horizontal |
| collapse         | 是否折叠（仅在 vertical 模式有效）       | boolean  | —                                    | false      |
| default-openeds  | 当前展开的子菜单 index 数组              | array    | —                                    | []         |
| unique-opened    | 是否只保持一个子菜单的展开               | boolean  | —                                    | false      |
| size             | 菜单尺寸                                 | string   | mini / small / medium / large / huge | medium     |
| trigger          | 子菜单触发方式（仅在 horizontal 模式有效）| string   | click / hover                        | hover      |
| trigger        | 子菜单触发方式（折叠模式下强制为 hover） | string   | click / hover                        | hover      |

## NavMenu 事件

| 事件名    | 说明               | 回调参数                    |
| --------- | ------------------ | --------------------------- |
| nv-select | 菜单项被选中时触发 | index: 被选中菜单项的 index |
| nv-open   | 子菜单展开时触发   | index: 展开子菜单的 index   |
| nv-close  | 子菜单收起时触发   | index: 收起子菜单的 index   |

## MenuItem 属性

| 属性     | 说明                                | 类型    | 可选值 | 默认值 |
| -------- | ----------------------------------- | ------- | ------ | ------ |
| index    | 唯一标识符                          | string  | —      | ''     |
| disabled | 是否禁用                            | boolean | —      | false  |
| icon     | 图标（可以是图标类名或 SVG 字符串） | string  | —      | ''     |

## MenuItem 插槽

| 插槽名 | 说明       |
| ------ | ---------- |
| —      | 菜单项内容 |
| icon   | 自定义图标 |

### Submenu CSS Parts

| Name          | Description    | CSS Selector            |
| ------------- | -------------- | ----------------------- |
| base          | 根属性容器     | `::part(base)`          |
| label         | 标题容器       | `::part(label)`         |
| label-content | 标题内容       | `::part(label-content)` |
| icon          | 图标容器       | `::part(icon)`          |
| arrow         | 展开箭头       | `::part(arrow)`         |
| list          | 子菜单列表容器 | `::part(list)`          |

### MenuItem CSS Parts

| Name    | Description | CSS Selector      |
| ------- | ----------- | ----------------- |
| base    | 根容器元素  | `::part(base)`    |
| content | 内容包装器  | `::part(content)` |
| icon    | 图标容器    | `::part(icon)`    |
| label   | 标题容器    | `::part(label)`   |

## Submenu 属性

| 属性     | 说明                                | 类型    | 可选值        | 默认值                        |
| -------- | ----------------------------------- | ------- | ------------- | ----------------------------- |
| index    | 唯一标识符                          | string  | —             | ''                            |
| label    | 标题                                | string  | —             | ''                            |
| disabled | 是否禁用                            | boolean | —             | false                         |
| opened   | 是否展开                            | boolean | —             | false                         |
| icon     | 图标（可以是图标类名或 SVG 字符串） | string  | —             | ''                            |
| trigger  | 触发方式                            | string  | click / hover | click（水平模式自动为 hover） |

## Submenu 插槽

| 插槽名 | 说明                                        |
| ------ | ------------------------------------------- |
| —      | 子菜单项内容（可以是 menu-item 或 submenu） |
| title  | 自定义标题                                  |
| icon   | 自定义图标                                  |

## 样式变量

### NavMenu 样式变量

| 变量名                            | 说明                    | 默认值            |
| --------------------------------- | ----------------------- | ----------------- |
| --nv-nav-menu-background-color    | 背景色                  | #fff              |
| --nv-nav-menu-border-bottom       | 底部边框                | 1px solid #e4e7ed |
| --nv-nav-menu-border-right        | 右侧边框                | 1px solid #e4e7ed |
| --nv-nav-menu-collapse-width      | 折叠宽度                | 64px              |
| --nv-nav-menu-font-size-mini      | Mini 尺寸字体大小       | 12px              |
| --nv-nav-menu-font-size-small     | Small 尺寸字体大小      | 13px              |
| --nv-nav-menu-font-size-medium    | Medium 尺寸字体大小     | 14px              |
| --nv-nav-menu-font-size-large     | Large 尺寸字体大小      | 16px              |
| --nv-nav-menu-font-size-huge      | Huge 尺寸字体大小       | 18px              |
| --nv-nav-menu-item-height-mini    | Mini 尺寸菜单项高度     | 36px              |
| --nv-nav-menu-item-height-small   | Small 尺寸菜单项高度    | 44px              |
| --nv-nav-menu-item-height-medium  | Medium 尺寸菜单项高度   | 56px              |
| --nv-nav-menu-item-height-large   | Large 尺寸菜单项高度    | 64px              |
| --nv-nav-menu-item-height-huge    | Huge 尺寸菜单项高度     | 72px              |
| --nv-nav-menu-item-padding-mini   | Mini 尺寸菜单项内边距   | 0 12px            |
| --nv-nav-menu-item-padding-small  | Small 尺寸菜单项内边距  | 0 16px            |
| --nv-nav-menu-item-padding-medium | Medium 尺寸菜单项内边距 | 0 20px            |
| --nv-nav-menu-item-padding-large  | Large 尺寸菜单项内边距  | 0 24px            |
| --nv-nav-menu-item-padding-huge   | Huge 尺寸菜单项内边距   | 0 28px            |

### MenuItem 样式变量

| 变量名                                 | 说明           | 默认值  |
| -------------------------------------- | -------------- | ------- |
| --nv-menu-item-padding                 | 内边距         | 0 20px  |
| --nv-menu-item-height                  | 高度           | 56px    |
| --nv-menu-item-font-size               | 字体大小       | 14px    |
| --nv-menu-item-color                   | 文字颜色       | #303133 |
| --nv-menu-item-color-hover             | 悬停文字颜色   | #409EFF |
| --nv-menu-item-color-active            | 激活文字颜色   | #409EFF |
| --nv-menu-item-background-color-hover  | 悬停背景色     | #ecf5ff |
| --nv-menu-item-background-color-active | 激活背景色     | #ecf5ff |
| --nv-menu-item-active-indicator-height | 激活指示器高度 | 2px     |
| --nv-menu-item-active-indicator-color  | 激活指示器颜色 | #409EFF |
| --nv-menu-item-transition-duration     | 过渡时间       | 0.3s    |
| --nv-menu-item-icon-size               | 图标大小       | 18px    |
| --nv-menu-item-icon-gap                | 图标与文字间距 | 8px     |

### Submenu 样式变量

| 变量名                                    | 说明                 | 默认值                          |
| ----------------------------------------- | -------------------- | ------------------------------- |
| --nv-submenu-title-padding                | 标题内边距           | 0 20px                          |
| --nv-submenu-title-height                 | 标题高度             | 56px                            |
| --nv-submenu-title-font-size              | 标题字体大小         | 14px                            |
| --nv-submenu-title-color                  | 标题文字颜色         | #303133                         |
| --nv-submenu-title-color-hover            | 标题悬停文字颜色     | #409EFF                         |
| --nv-submenu-title-background-color-hover | 标题悬停背景色       | #ecf5ff                         |
| --nv-submenu-transition-duration          | 过渡时间             | 0.3s                            |
| --nv-submenu-icon-size                    | 图标大小             | 18px                            |
| --nv-submenu-icon-gap                     | 图标与文字间距       | 8px                             |
| --nv-submenu-list-padding-left            | 子菜单列表左内边距   | 20px                            |
| --nv-submenu-list-max-height              | 子菜单列表最大高度   | 1000px                          |
| --nv-submenu-border                       | 边框（水平模式）     | 1px solid #e4e7ed               |
| --nv-submenu-border-radius                | 圆角（水平模式）     | 4px                             |
| --nv-submenu-box-shadow                   | 阴影（水平模式）     | 0 2px 12px 0 rgba(0, 0, 0, 0.1) |
| --nv-submenu-dropdown-min-width           | 下拉菜单最小宽度     | 200px                           |
| --nv-submenu-dropdown-margin-top          | 下拉菜单顶部间距     | 4px                             |
| --nv-submenu-dropdown-margin-left         | 嵌套下拉菜单左侧间距 | 4px                             |

## 使用建议

### 图标配置

组件提供了四种图标配置方式，推荐优先级如下：

1. **插槽 + nv-icon 组件**（推荐）：最灵活，支持组件库的图标系统
2. **插槽 + 自定义 SVG**：适合使用自定义 SVG 图标
3. **icon 属性 + SVG 字符串**：适合动态配置 SVG
4. **icon 属性 + 图标类名**：适合使用第三方图标库（如 Font Awesome）

### 折叠模式建议

- 折叠模式仅在 `mode="vertical"` 时有效
- 折叠状态下，子菜单会以弹出层形式展示
- 折叠模式下，trigger 会强制设置为 hover
- 建议在折叠模式下为所有菜单项配置图标，以提供更好的视觉识别

### 性能优化

- 对于大型菜单，建议使用 `uniqueOpened` 属性，避免同时展开过多子菜单
- 合理设置 `defaultOpeneds`，避免初始渲染时展开过多子菜单

## CSS Parts

| Name | Description | CSS Selector   |
| ---- | ----------- | -------------- |
| base | 根容器元素  | `::part(base)` |
