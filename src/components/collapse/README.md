# Collapse 折叠面板

通过折叠面板收纳内容区域。

## 组件说明

Collapse 折叠面板组件用于将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收起其内容。内部由 `nv-collapse-item` 子项组成，每个子项需设置 `name`（唯一标识）和 `label`（标题），内容放在默认插槽中。

## 属性

| 属性名        | 说明           | 类型           | 可选值 | 默认值 |
| ------------- | -------------- | -------------- | ------ | ------ |
| value         | 当前激活的面板。手风琴模式为单个 name 字符串，非手风琴为 name 数组 | string / array | —      | —      |
| accordion     | 是否手风琴模式（同时仅展开一个面板） | boolean        | —      | false  |
| async-expand  | 是否异步展开。为 true 时展开前触发 nv-before-expand，由 resolve/reject 决定是否展开及内容 | boolean        | —      | false  |

### Collapse-Item 属性

| 属性名   | 说明         | 类型    | 可选值 | 默认值 |
| -------- | ------------ | ------- | ------ | ------ |
| name           | 唯一标识，用于 value 匹配与 nv-change 回调 | string  | —      | —      |
| label          | 面板标题     | string  | —      | —      |
| disabled       | 是否禁用该面板 | boolean | —      | false  |
| loaded-content | 异步加载后展示的内容（由 nv-before-expand 的 resolve/reject 设置，通常不手动写） | string  | —      | —      |
| content-is-error | 当前内容是否为错误态（reject 传入字符串时为 true） | boolean | —      | false  |

## 插槽

- **默认插槽**：放置 `nv-collapse-item` 子项。
- **Collapse-Item 的 label 插槽**：自定义标题内容，若使用插槽则 `label` 属性不展示。

## 事件

| 事件名             | 说明                   | 回调参数                    |
| ------------------ | ---------------------- | --------------------------- |
| nv-change          | 当前激活面板改变时触发 | activeNames: array / string |
| nv-before-expand   | 展开前触发。async-expand 时 detail 为 `{ name, expandedBefore, resolve, reject }`，见下文。 | — |
| nv-after-expand    | 展开动画结束后触发     | detail: `{ name }`          |
| nv-before-collapse | 收起前触发             | detail: `{ name }`         |
| nv-after-collapse  | 收起动画结束后触发     | detail: `{ name }`         |

### nv-before-expand 用法说明

- **detail.expandedBefore**：当前 item 是否曾经展开过（至少展开过一次则为 true）。可根据此决定是否发起异步请求（例如首次展开请求接口，再次展开直接用缓存）。
- **resolve(value)**  
  - `resolve(true)`：展开并展示该面板的默认 slot 内容。  
  - `resolve(html片段或字符串)`：展开并将该内容渲染到内容区域（支持 HTML 字符串）。  
- **reject(value)**  
  - `reject(false)`：不展开。  
  - `reject(html片段或字符串)`：展开并将该内容以醒目错误样式（红底红字等）展示在内容区域。

## 使用示例

**基础用法（可多开）**

```html
<nv-collapse>
  <nv-collapse-item name="1" label="面板 1">内容一</nv-collapse-item>
  <nv-collapse-item name="2" label="面板 2">内容二</nv-collapse-item>
</nv-collapse>
```

**手风琴模式（仅展开一项）**

```html
<nv-collapse accordion value="1">
  <nv-collapse-item name="1" label="面板 1">内容一</nv-collapse-item>
  <nv-collapse-item name="2" label="面板 2">内容二</nv-collapse-item>
</nv-collapse>
```

**默认展开多项**

```html
<nv-collapse value='["1","3"]'>
  <nv-collapse-item name="1" label="面板 1">内容一</nv-collapse-item>
  <nv-collapse-item name="2" label="面板 2">内容二</nv-collapse-item>
  <nv-collapse-item name="3" label="面板 3">内容三</nv-collapse-item>
</nv-collapse>
```

**自定义标题（label 插槽）**

```html
<nv-collapse-item name="1">
  <span slot="label">自定义标题 <nv-icon name="info"></nv-icon></span>
  面板内容
</nv-collapse-item>
```

**禁用某一项**

```html
<nv-collapse-item name="2" label="禁用项" disabled>该项不可展开</nv-collapse-item>
```

**异步展开（展开前加载）**

设置 `async-expand` 后，展开前会触发 `nv-before-expand`。detail 包含 `name`、`expandedBefore`（是否曾展开过）、`resolve`、`reject`。可根据 `expandedBefore` 决定是否发起请求（首次请求接口，再次用缓存）：

```javascript
const cache = new Map();

collapse.addEventListener('nv-before-expand', (e) => {
  const { name, expandedBefore, resolve, reject } = e.detail;

  // 已展开过且有缓存：直接展示，不请求
  if (expandedBefore && cache.has(name)) {
    resolve(cache.get(name));
    return;
  }

  fetch('/api/content?name=' + name)
    .then(r => r.json())
    .then(data => {
      const html = '<p>' + data.text + '</p>';
      cache.set(name, html);
      resolve(html);
    })
    .catch(err => {
      reject('加载失败：' + err.message);  // 展开并显示错误样式
      // 或 reject(false) 不展开
    });
});
```

```html
<nv-collapse async-expand>
  <nv-collapse-item name="1" label="异步面板 1">占位内容</nv-collapse-item>
</nv-collapse>
```

- `resolve(true)`：展开并展示该面板默认 slot 内容。  
- `resolve(html或字符串)`：展开并将该内容渲染到内容区。  
- `reject(false)`：不展开。  
- `reject(字符串)`：展开并将该内容以错误样式展示。

## CSS 变量

| 变量名                           | 说明             | 默认值 |
| -------------------------------- | ---------------- | ------ |
| --nv-collapse-header-background  | 面板标题背景颜色 | —      |
| --nv-collapse-content-background | 面板内容背景颜色 | —      |

## CSS Parts

| Name | Description | CSS Selector   |
| ---- | ----------- | -------------- |
| base | 根容器元素  | `::part(base)` |

## Collapse-Item CSS Parts

| Name         | Description | CSS Selector           |
| ------------ | ----------- | ---------------------- |
| base         | 根容器元素  | `::part(base)`         |
| header       | 头部区域    | `::part(header)`       |
| label        | 标题内容    | `::part(label)`        |
| icon         | 展开图标    | `::part(icon)`         |
| wrapper      | 内容包装器  | `::part(wrapper)`      |
| content      | 内容区域    | `::part(content)`      |
| content-error | 错误态内容包裹（reject 传入字符串时） | `::part(content-error)` |
