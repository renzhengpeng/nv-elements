# Empty 空状态

空状态时的占位提示。

## 组件说明

Empty 空状态组件用于数据为空时的占位提示。

## 属性

| 属性名      | 说明            | 类型   | 可选值                               | 默认值   |
| ----------- | --------------- | ------ | ------------------------------------ | -------- |
| description | 文本描述        | string | —                                    | 暂无数据 |
| image       | 图片地址        | string | —                                    | —        |
| image-size  | 图片大小(CSS值) | string | —                                    | —        |
| size        | 尺寸            | string | mini / small / medium / large / huge | medium   |

## 插槽

| 插槽名      | 说明           |
| ----------- | -------------- |
| default     | 自定义底部内容 |
| image       | 自定义图片     |
| description | 自定义描述文字 |

## CSS 变量

| 变量名                                  | 说明                | 默认值  |
| --------------------------------------- | ------------------- | ------- |
| --nv-empty-padding                      | 默认组件内边距      | 40px 0  |
| --nv-empty-image-width                  | 默认图片宽度        | 80px    |
| --nv-empty-image-margin-bottom          | 默认图片下边距      | 15px    |
| --nv-empty-description-color            | 描述文字颜色        | #909399 |
| --nv-empty-description-font-size        | 默认描述文字大小    | 14px    |
| --nv-empty-description-line-height      | 描述文字行高        | 1       |
| **Mini 尺寸**                           |                     |         |
| --nv-empty-padding-mini                 | mini 组件内边距     | 20px 0  |
| --nv-empty-image-width-mini             | mini 图片宽度       | 48px    |
| --nv-empty-image-margin-bottom-mini     | mini 图片下边距     | 8px     |
| --nv-empty-description-font-size-mini   | mini 描述文字大小   | 12px    |
| **Small 尺寸**                          |                     |         |
| --nv-empty-padding-small                | small 组件内边距    | 30px 0  |
| --nv-empty-image-width-small            | small 图片宽度      | 64px    |
| --nv-empty-image-margin-bottom-small    | small 图片下边距    | 12px    |
| --nv-empty-description-font-size-small  | small 描述文字大小  | 13px    |
| **Medium 尺寸**                         |                     |         |
| --nv-empty-padding-medium               | medium 组件内边距   | 40px 0  |
| --nv-empty-image-width-medium           | medium 图片宽度     | 80px    |
| --nv-empty-image-margin-bottom-medium   | medium 图片下边距   | 15px    |
| --nv-empty-description-font-size-medium | medium 描述文字大小 | 14px    |
| **Large 尺寸**                          |                     |         |
| --nv-empty-padding-large                | large 组件内边距    | 50px 0  |
| --nv-empty-image-width-large            | large 图片宽度      | 96px    |
| --nv-empty-image-margin-bottom-large    | large 图片下边距    | 18px    |
| --nv-empty-description-font-size-large  | large 描述文字大小  | 15px    |
| **Huge 尺寸**                           |                     |         |
| --nv-empty-padding-huge                 | huge 组件内边距     | 60px 0  |
| --nv-empty-image-width-huge             | huge 图片宽度       | 120px   |
| --nv-empty-image-margin-bottom-huge     | huge 图片下边距     | 20px    |
| --nv-empty-description-font-size-huge   | huge 描述文字大小   | 16px    |
| **SVG 样式**                            |                     |         |
| --nv-empty-svg-ellipse-fill             | SVG 椭圆填充色      | #f5f5f5 |
| --nv-empty-svg-g-fill                   | SVG 图形组填充色    | #ffffff |
| --nv-empty-svg-g-stroke                 | SVG 图形组描边色    | #eee    |
| --nv-empty-svg-g-stroke-width           | SVG 图形组描边宽度  | 0.5     |
| --nv-empty-svg-path-fill                | SVG 路径填充色      | #fafafa |

## CSS Parts

| Name        | Description  | CSS Selector          |
| ----------- | ------------ | --------------------- |
| base        | 根容器元素   | `::part(base)`        |
| image       | 图片容器元素 | `::part(image)`       |
| description | 描述文字容器 | `::part(description)` |
