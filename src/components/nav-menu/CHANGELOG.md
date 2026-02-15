# NavMenu 组件更新日志

## 2024-12-03 - 重大更新

### 新增功能

#### 1. 图标支持
- ✅ MenuItem 组件新增 `icon` 属性，支持传入图标类名或 SVG 字符串
- ✅ MenuItem 组件新增 `icon` 插槽，支持自定义图标内容
- ✅ 推荐使用 `nv-icon` 组件配合 `icon` 插槽使用
- ✅ 图标自动继承文字颜色，支持主题定制

#### 2. Submenu 子菜单组件
- ✅ 新增 `nv-submenu` 组件，支持多级菜单嵌套
- ✅ 支持展开/收起动画效果
- ✅ 支持禁用状态
- ✅ 支持图标显示（属性或插槽）
- ✅ 支持自定义标题插槽

#### 3. 事件系统完善
- ✅ `select` 事件：菜单项被选中时触发，返回选中菜单项的 index
- ✅ `open` 事件：子菜单展开时触发，返回展开子菜单的 index
- ✅ `close` 事件：子菜单收起时触发，返回收起子菜单的 index

#### 4. 新增属性
- ✅ `defaultOpeneds`：当前展开的子菜单 index 数组，支持初始化多个子菜单的展开状态
- ✅ `uniqueOpened`：是否只保持一个子菜单的展开，类似手风琴效果
- ✅ `size`：菜单尺寸（mini / small / medium / large / huge），默认 medium

### 组件结构优化

#### MenuItem 组件
```html
<!-- 新的结构 -->
<nv-menu-item index="1">
  <nv-icon slot="icon" name="s-home"></nv-icon>
  首页
</nv-menu-item>
```

内部结构：
- `nv-menu-item__content`：内容容器
- `nv-menu-item__icon`：图标容器
- `nv-menu-item__label`：标题容器

#### Submenu 组件
```html
<!-- 基础用法 -->
<nv-submenu index="1" label="导航一">
  <nv-icon slot="icon" name="location"></nv-icon>
  <nv-menu-item index="1-1">选项1</nv-menu-item>
  <nv-menu-item index="1-2">选项2</nv-menu-item>
</nv-submenu>
```

内部结构：
- `nv-submenu__label`：标题容器
- `nv-submenu__title-content`：标题内容
- `nv-submenu__icon`：图标容器
- `nv-submenu__arrow`：箭头指示器
- `nv-submenu__list`：子菜单列表

### 样式变量

#### MenuItem 新增变量
- `--nv-menu-item-icon-size`：图标大小（默认 18px）
- `--nv-menu-item-icon-gap`：图标与文字间距（默认 8px）

#### Submenu 变量
- `--nv-submenu-title-padding`：标题内边距
- `--nv-submenu-title-height`：标题高度
- `--nv-submenu-title-font-size`：标题字体大小
- `--nv-submenu-title-color`：标题文字颜色
- `--nv-submenu-title-color-hover`：标题悬停文字颜色
- `--nv-submenu-title-background-color-hover`：标题悬停背景色
- `--nv-submenu-transition-duration`：过渡时间
- `--nv-submenu-icon-size`：图标大小
- `--nv-submenu-icon-gap`：图标与文字间距
- `--nv-submenu-list-padding-left`：子菜单列表左内边距
- `--nv-submenu-list-max-height`：子菜单列表最大高度
- `--nv-submenu-border`：边框（水平模式）
- `--nv-submenu-border-radius`：圆角（水平模式）
- `--nv-submenu-box-shadow`：阴影（水平模式）

### 使用示例

#### 带图标的菜单
```html
<nv-nav-menu defaultActive="1">
  <nv-menu-item index="1">
    <nv-icon slot="icon" name="s-home"></nv-icon>
    首页
  </nv-menu-item>
  <nv-menu-item index="2">
    <nv-icon slot="icon" name="user"></nv-icon>
    关于我们
  </nv-menu-item>
</nv-nav-menu>
```

#### 带子菜单的导航
```html
<nv-nav-menu 
  mode="vertical" 
  defaultActive="1-1" 
  style="width: 240px;"
  @select=${(e) => console.log('Selected:', e.detail)}
  @open=${(e) => console.log('Opened:', e.detail)}
  @close=${(e) => console.log('Closed:', e.detail)}
>
  <nv-submenu index="1" label="导航一">
    <nv-icon slot="icon" name="location"></nv-icon>
    <nv-menu-item index="1-1">选项1</nv-menu-item>
    <nv-menu-item index="1-2">选项2</nv-menu-item>
  </nv-submenu>
</nv-nav-menu>
```

#### 嵌套子菜单
```html
<nv-nav-menu 
  mode="vertical" 
  defaultActive="1-1-1" 
  .defaultOpeneds=${['1', '1-1']}
  style="width: 240px;"
>
  <nv-submenu index="1" label="导航一">
    <nv-icon slot="icon" name="location"></nv-icon>
    <nv-submenu index="1-1" label="选项1">
      <nv-menu-item index="1-1-1">子选项1</nv-menu-item>
      <nv-menu-item index="1-1-2">子选项2</nv-menu-item>
    </nv-submenu>
    <nv-menu-item index="1-2">选项2</nv-menu-item>
  </nv-submenu>
</nv-nav-menu>
```

#### 手风琴模式
```html
<nv-nav-menu 
  mode="vertical" 
  defaultActive="1-1" 
  uniqueOpened
  style="width: 240px;"
>
  <nv-submenu index="1" label="导航一">
    <nv-menu-item index="1-1">选项1</nv-menu-item>
  </nv-submenu>
  <nv-submenu index="2" label="导航二">
    <nv-menu-item index="2-1">选项1</nv-menu-item>
  </nv-submenu>
</nv-nav-menu>
```

### 文档更新
- ✅ 更新 README.md，添加完整的 API 文档
- ✅ 添加所有使用示例
- ✅ 添加样式变量说明
- ✅ 创建 Storybook 示例

### 兼容性
- ✅ 完全向后兼容，现有代码无需修改
- ✅ 新功能为可选功能，不影响现有使用

### 修复问题
- ✅ 修复 submenu 组件的 `opened` 属性，添加 `reflect: true` 确保属性变化反映到 DOM
- ✅ 修复样式选择器，使用 `&.is-opened` 替代 `@include m(opened)`
- ✅ 添加事件冒泡阻止，避免触发父级菜单项
- ✅ 修复事件处理函数的类型定义
- ✅ 添加平滑过渡效果，使用实际高度而不是 max-height
- ✅ 修复风琴式交互，展开和收起同步进行
- ✅ 完善 size 实现，不同尺寸下菜单项高度和内边距有明显差异

## 2024-12-03 - 水平下拉菜单支持

### 新增功能

#### 1. 水平模式下拉菜单
- ✅ 支持水平模式下的子菜单以下拉菜单形式显示
- ✅ 自动悬停触发，无需点击
- ✅ 支持嵌套下拉菜单（多级菜单）
- ✅ 平滑的展开/收起动画效果
- ✅ 添加 `trigger` 属性，支持 `click` 和 `hover` 两种触发方式
- ✅ 水平模式自动设置为 `hover` 触发

#### 2. 样式优化
- ✅ 下拉菜单带阴影和圆角
- ✅ 支持自定义下拉菜单最小宽度
- ✅ 支持自定义下拉菜单间距
- ✅ 嵌套子菜单从右侧弹出

### 使用示例

#### 水平下拉菜单
```html
<nv-nav-menu defaultActive="1-1">
  <nv-menu-item index="1">首页</nv-menu-item>
  <nv-submenu index="2" label="产品">
    <nv-menu-item index="2-1">产品 A</nv-menu-item>
    <nv-menu-item index="2-2">产品 B</nv-menu-item>
    <nv-submenu index="2-3" label="更多产品">
      <nv-menu-item index="2-3-1">产品 C</nv-menu-item>
    </nv-submenu>
  </nv-submenu>
</nv-nav-menu>
```

### 下一步计划
- [ ] 支持菜单项的路由跳转
- [ ] 支持菜单项的徽章显示
- [ ] 支持折叠模式下的 Tooltip 提示
