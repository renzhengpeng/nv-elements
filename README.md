<!--
 * @Descripttion:
 * @creater: zhengpeng.ren
 * @since: 2024-05-27 10:05:51
 * @LastAuthor: zhengpeng.ren
 * @lastTime: 2024-12-19
-->
# nv-elements

> Lightweight component library based on Lit

## 简介

`nv-elements` 是一个基于 [Lit](https://lit.dev/) 构建的轻量级 Web Components 组件库。它提供了丰富的 UI 组件，支持多种构建格式（UMD、CJS、ES），可以轻松集成到任何现代前端项目中。

### 特性

- 🎨 **基于 Lit** - 使用 Lit 构建，性能优异，体积小巧
- 📦 **多种构建格式** - 支持 UMD、CJS、ES 三种格式，满足不同场景需求
- 🎯 **TypeScript 支持** - 完整的 TypeScript 类型定义
- 🎨 **主题定制** - 丰富的 CSS 变量，支持主题定制
- 🚀 **现代化构建** - 使用 Vite + TypeScript + SASS 构建
- 📱 **组件丰富** - 提供按钮、输入框、下拉菜单、图标等常用组件
- ✨ **按需引入** - 支持按需引入组件，减小打包体积

### 组件列表

- **Button** - 按钮组件
- **ButtonGroup** - 按钮组组件
- **Input** - 输入框组件
- **Icon** - 图标组件
- **Dropdown** - 下拉菜单组件
- **Popover** - 弹出层组件
- **Row** - 行布局组件
- **Col** - 列布局组件
- **Link** - 链接组件

## 开发

### 环境要求

- Node.js >= 14.0.0
- Yarn >= 1.22.0

### 安装依赖

```bash
yarn install
```

### 启动开发服务器

```bash
yarn start
# 或
yarn run storybook
```

Storybook 开发服务器将在 <http://localhost:6006> 启动。页面会自动重载，你可以在控制台看到任何 lint 错误。

### 构建

#### 构建所有格式

```bash
yarn run build
```

这将构建 UMD、CJS 和 ES 三种格式。

#### 单独构建

```bash
# 构建 UMD 格式（输出到 dist 文件夹）
yarn run build:umd

# 构建 CommonJS 格式（输出到 lib 文件夹）
yarn run build:cmd

# 构建 ES Module 格式（输出到 es 文件夹）
yarn run build:es
```

### 代码检查

```bash
yarn run lint
```

## 使用

### 安装

```bash
yarn add nv-elements
# 或
npm install nv-elements
```

### 引入方式

#### 方式一：按需引入（推荐）

按需引入可以减少打包体积，只引入需要的组件。

##### ES Module 方式

```javascript
// 按需引入单个组件
import { NvButton } from 'nv-elements/es/components/button';
import 'nv-elements/es/components/button/style.css';

// 按需引入多个组件
import { NvButton } from 'nv-elements/es/components/button';
import { NvInput } from 'nv-elements/es/components/input';
import 'nv-elements/es/components/button/style.css';
import 'nv-elements/es/components/input/style.css';
```

##### CommonJS 方式

```javascript
// 按需引入单个组件
const { NvButton } = require('nv-elements/lib/components/button');
require('nv-elements/lib/components/button/style.css');

// 按需引入多个组件
const { NvButton } = require('nv-elements/lib/components/button');
const { NvInput } = require('nv-elements/lib/components/input');
require('nv-elements/lib/components/button/style.css');
require('nv-elements/lib/components/input/style.css');
```

#### 方式二：全量引入

如果项目中使用了大部分组件，可以选择全量引入。

```javascript
// ES Module
// 引入组件库样式
import "nv-elements/es/styles/style.css";
// 引入组件库（注册所有自定义元素）
import "nv-elements";

// CommonJS
require('nv-elements/lib/styles/style.css');
require('nv-elements');
```

#### 方式三：UMD 方式（浏览器）

```html
<link rel="stylesheet" href="path/to/nv-elements/dist/style.css">
<script src="path/to/nv-elements/dist/index.js"></script>
```

### 使用组件

#### HTML 中使用

```html
<nv-button type="primary">点击我</nv-button>
<nv-input placeholder="请输入内容"></nv-input>
<nv-link type="primary" href="https://example.com">链接</nv-link>
```

#### React/Vue 中使用

```javascript
// React
function App() {
  return (
    <div>
      <nv-button type="primary">按钮</nv-button>
    </div>
  );
}

// Vue
<template>
  <nv-button type="primary">按钮</nv-button>
</template>
```

#### 原生 JavaScript 中使用

```javascript
import { NvButton } from 'nv-elements/es/components/button';
import 'nv-elements/es/components/button/style.css';

// 直接使用自定义元素
const button = document.createElement('nv-button');
button.setAttribute('type', 'primary');
button.textContent = '按钮';
document.body.appendChild(button);
```

### 样式引入

#### 按需引入样式

```javascript
// 只引入需要的组件样式
import 'nv-elements/es/components/button/style.css';
import 'nv-elements/es/components/input/style.css';
```

#### 全量引入样式

```javascript
// 引入全局样式（包含变量和全局样式）
import 'nv-elements/es/styles/style.css';
```

## 全局 CSS 变量

组件库提供了丰富的 CSS 变量，你可以通过覆盖这些变量来自定义主题。各组件的专属 CSS 变量请参考官网文档中的组件说明。

### 颜色变量

#### 主色

```css
--nv-primary-color-white: #FFFFFF;
--nv-primary-color-1: #409EFF;
--nv-primary-color-2: #53A8FF;
--nv-primary-color-3: #66B1FF;
--nv-primary-color-4: #79BBFF;
--nv-primary-color-5: #8CC5FF;
--nv-primary-color-6: #A0CFFF;
--nv-primary-color-7: #B3D8FF;
--nv-primary-color-8: #C6E2FF;
--nv-primary-color-9: #D9ECFF;
--nv-primary-color-10: #ECF5FF;
--nv-primary-color-1-active: #3A8EE6;
```

#### 辅助色

```css
/* 成功色 */
--nv-secondary-color-success-1: #67C23A;
--nv-secondary-color-success-2: #c2e7b0;
--nv-secondary-color-success-3: #e1f3d8;
--nv-secondary-color-success-4: #f0f9eb;
--nv-secondary-color-success-1-hover: #85CE61;
--nv-secondary-color-success-1-active: #5DAF34;
--nv-secondary-color-success-1-disabled: #B3E19D;
--nv-secondary-color-success-2-disabled: #a4da89;

/* 警告色 */
--nv-secondary-color-warning-1: #E6A23C;
--nv-secondary-color-warning-2: #f5dab1;
--nv-secondary-color-warning-3: #faecd8;
--nv-secondary-color-warning-4: #fdf6ec;
--nv-secondary-color-warning-1-hover: #EBB563;
--nv-secondary-color-warning-1-active: #CF9236;
--nv-secondary-color-warning-1-disabled: #f3d19e;
--nv-secondary-color-warning-2-disabled: #f0c78a;

/* 危险色 */
--nv-secondary-color-danger-1: #F56C6C;
--nv-secondary-color-danger-2: #fbc4c4;
--nv-secondary-color-danger-3: #fde2e2;
--nv-secondary-color-danger-4: #fef0f0;
--nv-secondary-color-danger-1-hover: #F78989;
--nv-secondary-color-danger-1-active: #DD6161;
--nv-secondary-color-danger-1-disabled: #fab6b6;
--nv-secondary-color-danger-2-disabled: #f9a7a7;

/* 信息色 */
--nv-secondary-color-info-1: #909399;
--nv-secondary-color-info-2: #d3d4d6;
--nv-secondary-color-info-3: #e9e9eb;
--nv-secondary-color-info-4: #f4f4f5;
--nv-secondary-color-info-1-hover: #A6A9AD;
--nv-secondary-color-info-1-active: #82848A;
--nv-secondary-color-info-1-disabled: #c8c9cc;
--nv-secondary-color-info-2-disabled: #bcbec2;
```

#### 中性色

```css
/* 文字颜色 */
--nv-neutral-color-font-1: #303133; /* 主要文字 */
--nv-neutral-color-font-2: #606266; /* 常规文字 */
--nv-neutral-color-font-3: #909399; /* 次要文字 */
--nv-neutral-color-font-4: #C0C4CC; /* 占位文字 */

/* 边框颜色 */
--nv-neutral-color-border-1: #DCDFE6; /* 一级边框 */
--nv-neutral-color-border-2: #E4E7ED; /* 二级边框 */
--nv-neutral-color-border-3: #EBEEF5; /* 三级边框 */
--nv-neutral-color-border-4: #F2F6FC; /* 四级边框 */

/* 基础颜色 */
--nv-neutral-color-white: #FFFFFF;
--nv-neutral-color-black: #000000;
```

#### 组件背景色

```css
/* 常规状态 */
--nv-element-bg-color-primary: #409EFF;
--nv-element-bg-color-success: #67C23A;
--nv-element-bg-color-warning: #E6A23C;
--nv-element-bg-color-info: #909399;

/* 禁用状态 */
--nv-element-bg-color-primary-disabled: #409EFF;
--nv-element-bg-color-success-disabled: #67C23A;
--nv-element-bg-color-warning-disabled: #E6A23C;
--nv-element-bg-color-info-disabled: #909399;

/* Hover 状态 */
--nv-element-bg-color-primary-hover: #409EFF;
--nv-element-bg-color-success-hover: #67C23A;
--nv-element-bg-color-warning-hover: #E6A23C;
--nv-element-bg-color-info-hover: #909399;

/* Active 状态 */
--nv-element-bg-color-primary-active: #409EFF;
--nv-element-bg-color-success-active: #67C23A;
--nv-element-bg-color-warning-active: #E6A23C;
--nv-element-bg-color-info-active: #909399;
```

### 字体变量

#### 字体大小

```css
--nv-font-size-default: 14px;
--nv-font-size-mini: 12px;
--nv-font-size-small: 14px;
--nv-font-size-medium: 16px;
--nv-font-size-large: 18px;
--nv-font-size-huge: 20px;
```

#### 字体颜色

```css
--nv-font-color-dark: #303133;
--nv-font-color-regular: #606266;
--nv-font-color-info: #909399;
--nv-font-color-info-secondary: #BCBEC2;
--nv-font-color-placeholder: #C0C4CC;
--nv-font-color-white: #FFFFFF;
--nv-font-color-primary: #409EFF;
--nv-font-color-primary-secondary: #8CC5FF;
--nv-font-color-success: #67C23A;
--nv-font-color-success-secondary: #A4DA89;
--nv-font-color-warning: #E6A23C;
--nv-font-color-warning-secondary: #F0C78A;
--nv-font-color-danger: #F56C6C;
--nv-font-color-danger-secondary: #F9A7A7;
```

### 尺寸变量

#### 圆角尺寸

```css
--nv-border-radius-step-size: 1px;
--nv-border-radius-mini: 2px;
--nv-border-radius-small: 3px; /* 计算值 */
--nv-border-radius-medium: 4px; /* 计算值 */
--nv-border-radius-large: 5px; /* 计算值 */
--nv-border-radius-huge: 6px; /* 计算值 */
```

#### 内边距尺寸

```css
--nv-padding-step-size: 2px;
--nv-padding-mini: 5px;
--nv-padding-small: 7px; /* 计算值 */
--nv-padding-medium: 9px; /* 计算值 */
--nv-padding-large: 11px; /* 计算值 */
--nv-padding-huge: 13px; /* 计算值 */
```

#### 高度尺寸

```css
--nv-global-height-step: 4px;
--nv-global-height-mini: 24px;
--nv-global-height-small: 28px; /* 计算值 */
--nv-global-height-medium: 32px; /* 计算值 */
--nv-global-height-large: 36px; /* 计算值 */
--nv-global-height-huge: 40px; /* 计算值 */
```

### 自定义主题示例

你可以通过覆盖 CSS 变量来自定义主题：

```css
:root {
  /* 自定义主色 */
  --nv-primary-color-1: #your-primary-color;

  /* 自定义辅助色 */
  --nv-secondary-color-success-1: #your-success-color;
  --nv-secondary-color-warning-1: #your-warning-color;
  --nv-secondary-color-danger-1: #your-danger-color;

  /* 自定义字体 */
  --nv-font-size-default: 16px;
  --nv-font-color-dark: #your-text-color;

  /* 自定义尺寸 */
  --nv-border-radius-mini: 4px;
  --nv-padding-mini: 8px;
  --nv-global-height-mini: 28px;
}
```

**注意：** 标注为"计算值"的变量会根据基础变量和步进值自动计算，修改基础变量即可影响所有相关尺寸。

## 技术栈

- **Lit** - Web Components 框架
- **TypeScript** - 类型系统
- **Vite** - 构建工具
- **SASS** - CSS 预处理器
- **ESLint** - 代码检查工具

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 版本信息

当前版本：`1.0.0`

## 许可证

[MIT License](LICENSE)

## 贡献

欢迎提交 Issue 和 Pull Request！
