# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 组件说明

Select 选择器组件用于从多个选项中选择一个或多个值。支持搜索、多选、分组等功能。组件的高度使用全局高度变量（`--nv-global-height-*`），与 `nv-button`、`nv-input` 组件保持一致。

## 属性

| 属性名              | 说明                                                                                                                | 类型                   | 可选值                               | 默认值     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------ | ---------- |
| value               | 绑定值                                                                                                              | any                    | —                                    | —          |
| multiple            | 是否多选                                                                                                            | boolean                | —                                    | false      |
| max                 | 多选时最多可选项数量，不设置则不限制                                                                                | number                 | —                                    | —          |
| max-tag-count       | 多选时最多展示的 tag 数量，超出折叠为「+N」；为 `responsive` 时根据容器宽度动态计算                                 | number \| "responsive" | —                                    | —          |
| disabled            | 是否禁用                                                                                                            | boolean                | —                                    | false      |
| clearable           | 是否可以清空选项                                                                                                    | boolean                | —                                    | false      |
| placeholder         | 占位符                                                                                                              | string                 | —                                    | 请选择     |
| name                | 表单字段名称（用于表单提交）                                                                                        | string                 | —                                    | —          |
| form                | 关联的表单 id（与原生 form 属性一致，用于在表单外仍可参与提交与校验）                                               | string                 | —                                    | —          |
| required            | 是否必填（参与 form.reportValidity() / checkValidity()）                                                            | boolean                | —                                    | false      |
| autocomplete        | 自动完成提示（与原生 autocomplete 一致，如 "on" \| "off"）                                                          | string                 | —                                    | off        |
| no-data-text        | 无选项时的占位文案                                                                                                  | string                 | —                                    | 无数据     |
| no-match-text       | 可搜索时无匹配结果的占位文案                                                                                        | string                 | —                                    | 无匹配数据 |
| filterable          | 是否可搜索                                                                                                          | boolean                | —                                    | false      |
| virtual             | 是否启用虚拟滚动（为 true 时，选项数达到 virtual-threshold 才启用；为 false 时始终不使用虚拟滚动）                  | boolean                | —                                    | true       |
| virtual-threshold   | 启用虚拟滚动的选项数阈值，选项数 >= 该值且 virtual 为 true 时使用虚拟滚动（避免少量选项时浮层高度被固定、下方留白） | number                 | —                                    | 50         |
| dropdown-max-height | 下拉浮层最大高度，支持 CSS 值（如 "300px"、"50vh"）；不设置时使用变量默认值                                         | string                 | —                                    | —          |
| size                | 输入框尺寸                                                                                                          | string                 | mini / small / medium / large / huge | medium     |

## 事件

| 事件名            | 说明                                     | 回调参数                      |
| ----------------- | ---------------------------------------- | ----------------------------- |
| nv-change         | 选中值发生变化时触发                     | 目前的选中值                  |
| nv-visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| nv-clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                             |

## 插槽

| 插槽名  | 说明            |
| ------- | --------------- |
| default | Option 组件列表 |

## CSS 变量

### 尺寸相关 - 选择器本体

| 变量名                             | 说明           |
| ---------------------------------- | -------------- |
| `--nv-select-padding-{size}`       | 各尺寸内边距   |
| `--nv-select-font-size-default`    | 默认字体大小   |
| `--nv-select-font-size-{size}`     | 各尺寸字体大小 |
| `--nv-select-height-{size}`        | 各尺寸高度     |
| `--nv-select-border-radius-{size}` | 各尺寸圆角     |
| `--nv-select-icon-size`            | 图标尺寸       |
| `--nv-select-icon-margin-left`     | 图标左外边距   |

### 尺寸相关 - 下拉框

| 变量名                               | 说明           |
| ------------------------------------ | -------------- |
| `--nv-select-dropdown-max-height`    | 下拉框最大高度 |
| `--nv-select-dropdown-padding`       | 下拉框内边距   |
| `--nv-select-dropdown-border-radius` | 下拉框圆角     |
| `--nv-select-dropdown-box-shadow`    | 下拉框阴影     |

### 尺寸相关 - 选项

| 变量名                         | 说明         |
| ------------------------------ | ------------ |
| `--nv-select-option-height`    | 选项高度     |
| `--nv-select-option-padding`   | 选项内边距   |
| `--nv-select-option-font-size` | 选项字体大小 |

### 尺寸相关 - 标签（多选模式）

| 变量名                              | 说明                 |
| ----------------------------------- | -------------------- |
| `--nv-select-tag-height-{size}`     | 各尺寸标签高度       |
| `--nv-select-tag-padding`           | 标签内边距           |
| `--nv-select-tag-margin`            | 标签外边距           |
| `--nv-select-tag-font-size`         | 标签字体大小         |
| `--nv-select-tag-border-radius`     | 标签圆角             |
| `--nv-select-tag-close-size`        | 标签关闭按钮尺寸     |
| `--nv-select-tag-close-margin-left` | 标签关闭按钮左外边距 |

### 颜色相关 - 选择器本体

| 变量名                                  | 说明                 |
| --------------------------------------- | -------------------- |
| `--nv-select-border-color`              | 边框颜色             |
| `--nv-select-border-color-hover`        | hover状态边框颜色    |
| `--nv-select-border-color-focus`        | focus状态边框颜色    |
| `--nv-select-border-color-disabled`     | disabled状态边框颜色 |
| `--nv-select-background-color`          | 背景颜色             |
| `--nv-select-background-color-disabled` | disabled状态背景颜色 |
| `--nv-select-font-color`                | 文本颜色             |
| `--nv-select-font-color-disabled`       | disabled状态文本颜色 |
| `--nv-select-font-color-placeholder`    | 占位文本颜色         |
| `--nv-select-icon-color`                | 图标颜色             |
| `--nv-select-icon-color-hover`          | hover状态图标颜色    |

### 颜色相关 - 下拉框

| 变量名                                  | 说明           |
| --------------------------------------- | -------------- |
| `--nv-select-dropdown-background-color` | 下拉框背景颜色 |
| `--nv-select-dropdown-border-color`     | 下拉框边框颜色 |

### 颜色相关 - 选项

| 变量名                                         | 说明                     |
| ---------------------------------------------- | ------------------------ |
| `--nv-select-option-font-color`                | 选项文本颜色             |
| `--nv-select-option-font-color-hover`          | hover状态选项文本颜色    |
| `--nv-select-option-background-color-hover`    | hover状态选项背景颜色    |
| `--nv-select-option-font-color-selected`       | 选中状态选项文本颜色     |
| `--nv-select-option-background-color-selected` | 选中状态选项背景颜色     |
| `--nv-select-option-font-color-disabled`       | disabled状态选项文本颜色 |

### 颜色相关 - 标签（多选模式）

| 变量名                              | 说明                      |
| ----------------------------------- | ------------------------- |
| `--nv-select-tag-background-color`  | 标签背景颜色              |
| `--nv-select-tag-font-color`        | 标签文本颜色              |
| `--nv-select-tag-border-color`      | 标签边框颜色              |
| `--nv-select-tag-close-color`       | 标签关闭按钮颜色          |
| `--nv-select-tag-close-color-hover` | hover状态标签关闭按钮颜色 |

### 颜色相关 - 空状态

| 变量名                         | 说明           |
| ------------------------------ | -------------- |
| `--nv-select-empty-font-color` | 空状态文本颜色 |
| `--nv-select-empty-padding`    | 空状态内边距   |

> 注：`{size}` 表示 mini/small/medium/large/huge 五个尺寸

## CSS Parts

| Name             | Description                | CSS Selector               |
| ---------------- | -------------------------- | -------------------------- |
| base             | 根容器元素                 | `::part(base)`             |
| wrapper          | 选择器包装层               | `::part(wrapper)`          |
| tags             | 多选标签容器               | `::part(tags)`             |
| tag              | 单个标签元素               | `::part(tag)`              |
| tag-count        | 多选折叠时的「+N」数量标识 | `::part(tag-count)`        |
| input            | 输入框容器或搜索输入框     | `::part(input)`            |
| suffix           | 后缀图标容器               | `::part(suffix)`           |
| clear            | 清空图标元素               | `::part(clear)`            |
| arrow            | 箭头图标元素               | `::part(arrow)`            |
| dropdown         | 下拉面板容器               | `::part(dropdown)`         |
| dropdown-content | 下拉面板内容容器           | `::part(dropdown-content)` |

## Option CSS Parts

| Name | Description | CSS Selector   |
| ---- | ----------- | -------------- |
| base | 根容器元素  | `::part(base)` |
