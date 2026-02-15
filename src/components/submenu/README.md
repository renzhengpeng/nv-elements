# Submenu 子菜单组件

子菜单组件，用于在导航菜单中创建多级菜单结构。

## 基础用法

```html
<nv-submenu index="1" label="导航菜单">
  <nv-icon slot="icon" name="setting"></nv-icon>
  <nv-menu-item index="1-1">选项1</nv-menu-item>
  <nv-menu-item index="1-2">选项2</nv-menu-item>
  <nv-menu-item index="1-3">选项3</nv-menu-item>
</nv-submenu>
```

## 嵌套子菜单

```html
<nv-submenu index="1" label="一级菜单" opened>
  <nv-icon slot="icon" name="location"></nv-icon>
  <nv-submenu index="1-1" label="二级菜单" opened>
    <nv-menu-item index="1-1-1">三级选项1</nv-menu-item>
    <nv-menu-item index="1-1-2">三级选项2</nv-menu-item>
  </nv-submenu>
  <nv-menu-item index="1-2">二级选项</nv-menu-item>
</nv-submenu>
```

## 禁用状态

```html
<nv-submenu index="1" label="导航菜单（禁用）" disabled>
  <nv-icon slot="icon" name="setting"></nv-icon>
  <nv-menu-item index="1-1">选项1</nv-menu-item>
  <nv-menu-item index="1-2">选项2</nv-menu-item>
</nv-submenu>
```

## 属性

| 属性     | 说明                                | 类型    | 可选值 | 默认值 |
| -------- | ----------------------------------- | ------- | ------ | ------ |
| index    | 唯一标识符                          | string  | —      | ''     |
| label    | 标题                                | string  | —      | ''     |
| disabled | 是否禁用                            | boolean | —      | false  |
| opened   | 是否展开                            | boolean | —      | false  |
| icon     | 图标（可以是图标类名或 SVG 字符串） | string  | —      | ''     |

## 插槽

| 插槽名 | 说明                                        |
| ------ | ------------------------------------------- |
| —      | 子菜单项内容（可以是 menu-item 或 submenu） |
| title  | 自定义标题                                  |
| icon   | 自定义图标                                  |

## 事件

| 事件名        | 说明             | 回调参数              |
| ------------- | ---------------- | --------------------- |
| submenu-open  | 子菜单展开时触发 | index: 子菜单的 index |
| submenu-close | 子菜单收起时触发 | index: 子菜单的 index |

注意：这些事件会冒泡到父级 nav-menu 组件，并被转换为 `open` 和 `close` 事件。

## 样式变量

| 变量名                                    | 说明               | 默认值                          |
| ----------------------------------------- | ------------------ | ------------------------------- |
| --nv-submenu-title-padding                | 标题内边距         | 0 20px                          |
| --nv-submenu-title-height                 | 标题高度           | 56px                            |
| --nv-submenu-title-font-size              | 标题字体大小       | 14px                            |
| --nv-submenu-title-color                  | 标题文字颜色       | #303133                         |
| --nv-submenu-title-color-hover            | 标题悬停文字颜色   | #409EFF                         |
| --nv-submenu-title-background-color-hover | 标题悬停背景色     | #ecf5ff                         |
| --nv-submenu-transition-duration          | 过渡时间           | 0.3s                            |
| --nv-submenu-icon-size                    | 图标大小           | 18px                            |
| --nv-submenu-icon-gap                     | 图标与文字间距     | 8px                             |
| --nv-submenu-list-padding-left            | 子菜单列表左内边距 | 20px                            |
| --nv-submenu-list-max-height              | 子菜单列表最大高度 | 1000px                          |
| --nv-submenu-border                       | 边框（水平模式）   | 1px solid #e4e7ed               |
| --nv-submenu-border-radius                | 圆角（水平模式）   | 4px                             |
| --nv-submenu-box-shadow                   | 阴影（水平模式）   | 0 2px 12px 0 rgba(0, 0, 0, 0.1) |

## 使用注意事项

1. **必须在 nav-menu 中使用**：submenu 组件需要在 nav-menu 组件内部使用才能正常工作。

2. **index 属性**：每个 submenu 和 menu-item 都需要唯一的 index 属性。

3. **嵌套层级**：理论上支持无限层级嵌套，但建议不超过 3 层，以保持良好的用户体验。

4. **展开状态**：
   - 使用 `opened` 属性控制初始展开状态
   - 使用 `defaultOpeneds` 属性在 nav-menu 上批量设置展开状态
   - 使用 `uniqueOpened` 属性实现手风琴效果

5. **事件处理**：submenu 的点击事件会阻止冒泡，不会触发父级菜单项的选中事件。

## 调试技巧

如果 submenu 无法展开，请检查：

1. **属性绑定**：确保 `opened` 属性正确绑定
2. **样式加载**：确保组件样式已正确加载
3. **事件监听**：在浏览器控制台查看是否有事件触发
4. **DOM 结构**：检查生成的 DOM 是否包含 `is-opened` 类名

```javascript
// 调试代码示例
const submenu = document.querySelector("nv-submenu");
console.log("Opened:", submenu.opened);
submenu.addEventListener("submenu-open", (e) => {
  console.log("Submenu opened:", e.detail);
});
```

## CSS Parts

| Name          | Description    | CSS Selector            |
| ------------- | -------------- | ----------------------- |
| base          | 根属性容器     | `::part(base)`          |
| label         | 标题容器       | `::part(label)`         |
| label-content | 标题内容       | `::part(label-content)` |
| icon          | 图标容器       | `::part(icon)`          |
| arrow         | 展开箭头       | `::part(arrow)`         |
| list          | 子菜单列表容器 | `::part(list)`          |
