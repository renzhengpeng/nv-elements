# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 组件说明

Dropdown 下拉菜单组件用于将一组操作或选项折叠到一个下拉菜单中，节省空间的同时提供良好的交互体验。支持多种触发方式、展开方向和定位策略。

## 属性

| 属性名       | 说明                         | 类型    | 可选值                                                                                                                          | 默认值   |
| ------------ | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- |
| disabled     | 是否禁用                     | boolean | —                                                                                                                               | false    |
| active       | 手动控制显示状态             | boolean | —                                                                                                                               | false    |
| trigger      | 触发下拉的行为               | string  | click / hover / contextmenu                                                                                                     | click    |
| placement    | 菜单弹出位置                 | string  | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | bottom   |
| align        | 是否与触发器宽度对齐         | boolean | —                                                                                                                               | false    |
| strategy     | 定位策略                     | string  | absolute / fixed                                                                                                                | absolute |
| auto-adjust  | 空间不足时是否自动调整位置   | boolean | —                                                                                                                               | false    |
| hide-on-click | 点击菜单项后是否隐藏菜单     | boolean | —                                                                                                                               | true     |
| show-timeout | hover 触发时显示延时（毫秒） | number  | —                                                                                                                               | 250      |
| hide-timeout | hover 触发时隐藏延时（毫秒） | number  | —                                                                                                                               | 150      |
| arrow        | 是否显示箭头                 | boolean | —                                                                                                                               | false    |
| placeholder  | 无 trigger slot 时的占位文本 | string  | —                                                                                                                               | 请选择   |
| distance     | 弹出层距离锚点的距离         | number  | —                                                                                                                               | 3        |

## 事件

| 事件名              | 说明                                       | 回调参数 / detail                                |
| ------------------- | ------------------------------------------ | ------------------------------------------------ |
| nv-command          | 点击带 command 的菜单项时触发               | command 值（string）                              |
| nv-menu-item-click  | 点击任意菜单项时触发（先于 nv-command）     | `{ target: HTMLElement, command: string \| null }` |
| nv-visible-change   | 下拉显示/隐藏状态变化时触发                 | 当前是否显示（boolean，true 为展开，false 为收起） |

菜单项可通过 `command` 或 `data-command` 属性设置命令值，点击时会将对应值通过 `nv-command` 的 detail 传出；无 command 时仍会触发 `nv-menu-item-click`，detail.command 为 null。

## 插槽

| 插槽名  | 说明                                           |
| ------- | ---------------------------------------------- |
| trigger | 触发下拉的元素（可选，不提供时使用默认触发器） |
| menu    | 下拉菜单内容                                   |

## CSS 变量

### 尺寸相关

| 变量名                         | 说明           | 默认值                         |
| ------------------------------ | -------------- | ------------------------------ |
| --nv-dropdown-padding          | 触发器内边距   | 8px var(--nv-padding-medium)   |
| --nv-dropdown-font-size        | 字体大小       | var(--nv-font-size-small)      |
| --nv-dropdown-border-radius    | 圆角           | var(--nv-border-radius-medium) |
| --nv-dropdown-min-width        | 触发器最小宽度 | 120px                          |
| --nv-dropdown-arrow-size       | 箭头图标大小   | 12px                           |
| --nv-dropdown-menu-padding     | 菜单内边距     | 4px 0                          |
| --nv-dropdown-menu-min-width   | 菜单最小宽度   | 120px                          |
| --nv-dropdown-item-padding     | 菜单项内边距   | 8px 12px                       |
| --nv-dropdown-item-line-height | 菜单项行高     | 1.5                            |
| --nv-dropdown-divider-margin   | 分隔线外边距   | 4px 0                          |

### 颜色相关

| 变量名                               | 说明               | 默认值                           |
| ------------------------------------ | ------------------ | -------------------------------- |
| --nv-dropdown-background             | 触发器背景色       | #fff                             |
| --nv-dropdown-border-color           | 触发器边框颜色     | var(--nv-neutral-color-border-1) |
| --nv-dropdown-border-color-hover     | 触发器悬停边框颜色 | var(--nv-neutral-color-font-4)   |
| --nv-dropdown-border-color-active    | 触发器激活边框颜色 | var(--nv-primary-color-1)        |
| --nv-dropdown-disabled-opacity       | 禁用状态透明度     | 0.6                              |
| --nv-dropdown-disabled-background    | 禁用状态背景色     | #f5f5f5                          |
| --nv-dropdown-menu-background        | 菜单背景色         | #fff                             |
| --nv-dropdown-menu-shadow            | 菜单阴影           | 0 2px 8px rgba(0, 0, 0, 0.15)    |
| --nv-dropdown-item-color             | 菜单项文字颜色     | rgba(0, 0, 0, 0.85)              |
| --nv-dropdown-item-hover-background  | 菜单项悬停背景色   | #f5f5f5                          |
| --nv-dropdown-item-active-background | 菜单项激活背景色   | #e6f7ff                          |
| --nv-dropdown-item-disabled-color    | 菜单项禁用文字颜色 | rgba(0, 0, 0, 0.25)              |
| --nv-dropdown-divider-background     | 分隔线背景色       | #f0f0f0                          |

### 其他

| 变量名                            | 说明         | 默认值 |
| --------------------------------- | ------------ | ------ |
| --nv-dropdown-transition-duration | 过渡动画时长 | 0.3s   |
| --nv-dropdown-menu-z-index        | 菜单层级     | 1050   |

## 使用示例

### 基础用法

```html
<nv-dropdown>
  <nv-button slot="trigger">下拉菜单</nv-button>
  <div slot="menu">
    <nv-option value="1" label="选项1"></nv-option>
    <nv-option value="2" label="选项2"></nv-option>
  </div>
</nv-dropdown>
```

### 事件使用

**监听菜单项点击与 command**

```javascript
dropdown.addEventListener('nv-menu-item-click', (e) => {
  const { target, command } = e.detail;
  console.log('点击的菜单项元素:', target, 'command:', command);
});

// 仅当菜单项设置了 command / data-command 时才会触发
dropdown.addEventListener('nv-command', (e) => {
  console.log('选中命令:', e.detail);
});
```

```html
<nv-dropdown>
  <nv-button slot="trigger">操作菜单</nv-button>
  <div slot="menu">
    <nv-option value="edit" label="编辑" command="edit"></nv-option>
    <nv-option value="delete" label="删除" command="delete"></nv-option>
  </div>
</nv-dropdown>
```

**监听下拉显示/隐藏**

```javascript
dropdown.addEventListener('nv-visible-change', (e) => {
  console.log('下拉是否显示:', e.detail);
});
```

**不同触发方式**

```html
<nv-dropdown trigger="hover">
  <span slot="trigger">悬停触发</span>
  <div slot="menu">
    <nv-option value="1" label="选项1"></nv-option>
  </div>
</nv-dropdown>
```

**自定义样式**

```html
<nv-dropdown
  style="
  --nv-dropdown-border-radius: 12px;
  --nv-dropdown-menu-background: #001529;
  --nv-dropdown-item-color: rgba(255, 255, 255, 0.85);
"
>
  <nv-button slot="trigger">深色主题</nv-button>
  <div slot="menu">
    <nv-option value="1" label="选项1"></nv-option>
  </div>
</nv-dropdown>
```

## CSS Parts

| Name    | Description         | CSS Selector      |
| ------- | ------------------- | ----------------- |
| base    | 根属性容器（Popup） | `::part(base)`    |
| trigger | 触发器容器          | `::part(trigger)` |
| menu    | 下拉菜单容器        | `::part(menu)`    |
