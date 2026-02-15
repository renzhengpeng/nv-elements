# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 组件说明

Notification 通知组件用于显示全局的通知提醒消息，从页面角落滑出。支持多种类型和位置。

## 属性

| 属性名     | 说明                                  | 类型    | 可选值                                            | 默认值    |
| ---------- | ------------------------------------- | ------- | ------------------------------------------------- | --------- |
| type       | 主题样式                              | string  | success / warning / info / error                  | info      |
| label      | 标题                                  | string  | —                                                 | —         |
| message    | 说明文字                              | string  | —                                                 | —         |
| show-icon  | 是否显示图标                          | boolean | —                                                 | true      |
| icon       | 自定义图标名称                        | string  | —                                                 | —         |
| closable   | 是否显示关闭按钮                      | boolean | —                                                 | true      |
| close-icon | 自定义关闭图标名称                    | string  | —                                                 | close     |
| duration   | 显示时间，毫秒。设为 0 则不会自动关闭 | number  | —                                                 | 4500      |
| position   | 自定义弹出位置                        | string  | top-right / top-left / bottom-right / bottom-left | top-right |
| z-index    | 层级                                  | number  | —                                                 | 2000      |

## Slots

| Name    | Description                                      |
| ------- | ------------------------------------------------ |
| label   | 自定义标题内容                                   |
| content | 自定义消息内容                                   |
| icon    | 自定义图标，优先级高于 icon 属性和默认类型图标   |

**注意事项：**
- 当设置了 `label` 属性时，标题会被包裹在带有 `part="label"` 的 div 中，应用默认标题样式
- 当没有 `label` 属性时，`label` slot 会直接渲染，不带包裹元素
- 如果想使用 `label` slot 并保留标题样式，建议设置一个占位的 `label` 属性（如 `label=""` 或 `label=" "`）
- 图标优先级：`icon` slot > `icon` 属性 > 根据 `type` 自动映射的默认图标

**使用示例：**

```javascript
// 使用 label 和 content slot
const notification = document.createElement('nv-notification');
notification.type = 'success';
notification.showIcon = true;
notification.label = ''; // 设置空 label 以触发标题容器渲染

// 使用 label slot 自定义标题（会被包裹在标题容器中）
const labelContent = document.createElement('span');
labelContent.slot = 'label';
labelContent.innerHTML = '<strong>自定义标题</strong>';
notification.appendChild(labelContent);

// 使用 content slot 自定义内容
const contentDiv = document.createElement('div');
contentDiv.slot = 'content';
contentDiv.innerHTML = '<p>支持任意 HTML 内容</p>';
notification.appendChild(contentDiv);

document.body.appendChild(notification);

// 使用 icon slot 自定义图标
const notification2 = document.createElement('nv-notification');
notification2.type = 'warning';
notification2.label = '自定义图标';
notification2.message = '使用 icon slot';

const iconContent = document.createElement('span');
iconContent.slot = 'icon';
iconContent.innerHTML = '🎉';
iconContent.style.fontSize = '24px';
notification2.appendChild(iconContent);

document.body.appendChild(notification2);
```

## 事件

| 事件名         | 说明                     | 回调参数                       |
| -------------- | ------------------------ | ------------------------------ |
| nv-close       | 关闭通知时触发           | event.detail: { instance }     |
| nv-after-close | 关闭动画完成后触发       | event.detail: { instance }     |

**使用示例：**

```javascript
const notification = Notification({
  label: '通知标题',
  message: '这是一条通知消息',
  duration: 0
});

// 监听关闭事件
notification.addEventListener('nv-close', (e) => {
  console.log('通知开始关闭', e.detail.instance);
});

// 监听关闭完成事件
notification.addEventListener('nv-after-close', (e) => {
  console.log('通知关闭完成', e.detail.instance);
});
```

## CSS 变量

### 布局相关

| 变量名 | 说明 |
| ------ | ---- |
| `--nv-notification-border-radius` | 通知圆角 |
| `--nv-notification-width` | 通知宽度 |
| `--nv-notification-padding` | 通知内边距 |
| `--nv-notification-main-padding-right` | 主体右内边距 |
| `--nv-notification-box-shadow` | 通知阴影 |

### 尺寸相关

| 变量名 | 说明 |
| ------ | ---- |
| `--nv-notification-icon-font-size` | 图标字体大小 |
| `--nv-notification-label-font-size` | 标题字体大小 |
| `--nv-notification-content-font-size` | 内容字体大小 |
| `--nv-notification-closebtn-font-size` | 关闭按钮字体大小 |
| `--nv-notification-icon-width` | 图标宽度 |
| `--nv-notification-icon-height` | 图标高度 |
| `--nv-notification-icon-margin-right` | 图标右外边距 |
| `--nv-notification-label-margin-bottom` | 标题下外边距 |
| `--nv-notification-label-line-height` | 标题行高 |
| `--nv-notification-content-line-height` | 内容行高 |
| `--nv-notification-closebtn-top` | 关闭按钮上偏移 |
| `--nv-notification-closebtn-right` | 关闭按钮右偏移 |
| `--nv-notification-closebtn-width` | 关闭按钮宽度 |
| `--nv-notification-closebtn-height` | 关闭按钮高度 |

### 颜色相关

| 变量名 | 说明 |
| ------ | ---- |
| `--nv-notification-background-color` | 通知背景颜色 |
| `--nv-notification-border-color` | 通知边框颜色 |
| `--nv-notification-label-font-color` | 标题文本颜色 |
| `--nv-notification-content-font-color` | 内容文本颜色 |
| `--nv-notification-icon-color-success` | success类型图标颜色 |
| `--nv-notification-icon-color-info` | info类型图标颜色 |
| `--nv-notification-icon-color-warning` | warning类型图标颜色 |
| `--nv-notification-icon-color-error` | error类型图标颜色 |
| `--nv-notification-closebtn-color` | 关闭按钮颜色 |
| `--nv-notification-closebtn-color-hover` | hover状态关闭按钮颜色 |

## CSS Parts

| Name    | Description  | CSS Selector      |
| ------- | ------------ | ----------------- |
| base    | 根属性容器   | `::part(base)`    |
| icon    | 图标容器     | `::part(icon)`    |
| group   | 内容与操作组 | `::part(group)`   |
| main    | 主体内容区域 | `::part(main)`    |
| label   | 标题区域     | `::part(label)`   |
| content | 消息内容区域 | `::part(content)` |
| close   | 关闭按钮     | `::part(close)`   |
