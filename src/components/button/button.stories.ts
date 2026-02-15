import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../icon/index';
import '../button-group/index';
import '../divider/index';
import readmeMd from './README.md?raw';

const meta: Meta = {
  title: 'Components/Button',
  component: 'nv-button',
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'success', 'info', 'warning', 'danger'],
      description: '按钮类型'
    },
    size: {
      control: 'select',
      options: ['mini', 'small', 'medium', 'large', 'huge'],
      description: '按钮尺寸'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    loading: {
      control: 'boolean',
      description: '是否加载中'
    },
    active: {
      control: 'boolean',
      description: '是否处于激活状态'
    },
    plain: {
      control: 'boolean',
      description: '是否为朴素按钮'
    },
    text: {
      control: 'boolean',
      description: '是否为文字按钮'
    },
    link: {
      control: 'boolean',
      description: '是否为链接按钮'
    },
    round: {
      control: 'boolean',
      description: '是否圆角'
    },
    circle: {
      control: 'boolean',
      description: '是否圆形'
    },
    icon: {
      control: 'text',
      description: '图标名称'
    }
  }
};

export default meta;
type Story = StoryObj;

// 将 README 转换为 HTML
const readmeHtml = marked.parse(readmeMd) as string;

/**
 * Button 组件的完整文档和示例展示
 */
export const Overview: Story = {
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
    actions: { disable: true }
  },
  render: () => {
    return html`
      <div style="padding: 20px; max-width: 1200px;">
        <style>
          .readme-content {
            background: #fff;
            padding: 30px;
            border-radius: 4px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
            margin-bottom: 40px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .readme-content h1 {
            font-size: 32px;
            font-weight: 600;
            margin: 0 0 16px 0;
            padding-bottom: 12px;
            border-bottom: 1px solid #eaecef;
          }
          .readme-content h2 {
            font-size: 24px;
            font-weight: 600;
            margin: 32px 0 16px 0;
            padding-bottom: 8px;
            border-bottom: 1px solid #eaecef;
          }
          .readme-content h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 24px 0 12px 0;
          }
          .readme-content p {
            margin: 8px 0;
          }
          .readme-content code {
            background: #f6f8fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.9em;
          }
          .readme-content pre {
            background: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
          }
          .readme-content pre code {
            background: none;
            padding: 0;
          }
          .readme-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
          }
          .readme-content table th,
          .readme-content table td {
            border: 1px solid #dfe2e5;
            padding: 8px 12px;
            text-align: left;
          }
          .readme-content table th {
            background: #f6f8fa;
            font-weight: 600;
          }
          .readme-content table tr:nth-child(even) {
            background: #f9f9f9;
          }
          .example-item {
            margin: 32px 0;
          }
          .example-title {
            font-size: 20px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #333;
          }
          .example-desc {
            margin: 0 0 16px 0;
            color: #666;
            font-size: 14px;
          }
          .example-demo {
            padding: 20px;
            background: #fff;
            border-radius: 4px;
            border: 1px solid #e4e7ed;
          }
        </style>

        <!-- README 文档 -->
        <div class="readme-content">
          ${ unsafeHTML(readmeHtml) }
        </div>

        <!-- 分隔线 -->
        <nv-divider style="margin: 40px 0;">
          <span style="color: #909399; font-size: 16px; font-weight: 500;">✨ 交互示例</span>
        </nv-divider>

        <!-- 示例区域 -->
        <div class="examples-section">

          <!-- 基础用法 -->
          <div class="example-item">
            <h3 class="example-title">基础用法</h3>
            <p class="example-desc">基础的、简洁的按钮</p>
            <div class="example-demo">
              ${ Default.render?.(Default.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 不同类型 -->
          <div class="example-item">
            <h3 class="example-title">不同类型</h3>
            <p class="example-desc">Button 组件提供了 7 种不同类型的按钮样式</p>
            <div class="example-demo">
              ${ Types.render?.(Types.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 文本按钮 -->
          <div class="example-item">
            <h3 class="example-title">文本按钮</h3>
            <p class="example-desc">文本按钮通过 text 属性设置，可与不同 type 组合使用，文字颜色由 type 决定，hover 时显示浅灰色背景</p>
            <div class="example-demo">
              ${ TextButton.render?.(TextButton.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 链接按钮 -->
          <div class="example-item">
            <h3 class="example-title">链接按钮</h3>
            <p class="example-desc">链接按钮通过 link 属性设置，可与不同 type 组合使用，文字颜色由 type 决定，hover 和 active 时颜色变化但不显示背景</p>
            <div class="example-demo">
              ${ LinkButton.render?.(LinkButton.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 朴素按钮 -->
          <div class="example-item">
            <h3 class="example-title">朴素按钮</h3>
            <p class="example-desc">朴素按钮通过 plain 属性设置，具有透明背景</p>
            <div class="example-demo">
              ${ Plain.render?.(Plain.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 不同尺寸 -->
          <div class="example-item">
            <h3 class="example-title">不同尺寸</h3>
            <p class="example-desc">提供 mini、small、medium、large、huge 五种尺寸</p>
            <div class="example-demo">
              ${ Sizes.render?.(Sizes.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 禁用状态 -->
          <div class="example-item">
            <h3 class="example-title">禁用状态</h3>
            <p class="example-desc">通过 disabled 属性设置按钮为禁用状态</p>
            <div class="example-demo">
              ${ Disabled.render?.(Disabled.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 加载状态 -->
          <div class="example-item">
            <h3 class="example-title">加载状态</h3>
            <p class="example-desc">通过 loading 属性显示加载中状态，常用于异步操作</p>
            <div class="example-demo">
              ${ Loading.render?.(Loading.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 圆角按钮 -->
          <div class="example-item">
            <h3 class="example-title">圆角按钮</h3>
            <p class="example-desc">通过 round 属性创建圆角按钮</p>
            <div class="example-demo">
              ${ Round.render?.(Round.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 圆形按钮 -->
          <div class="example-item">
            <h3 class="example-title">圆形按钮</h3>
            <p class="example-desc">通过 circle 属性创建圆形按钮，通常用于图标按钮</p>
            <div class="example-demo">
              ${ Circle.render?.(Circle.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 带图标的按钮 -->
          <div class="example-item">
            <h3 class="example-title">带图标的按钮</h3>
            <p class="example-desc">通过 icon 属性为按钮添加图标</p>
            <div class="example-demo">
              ${ WithIcon.render?.(WithIcon.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 圆形图标按钮 -->
          <div class="example-item">
            <h3 class="example-title">圆形图标按钮</h3>
            <p class="example-desc">结合 circle 和 icon 属性创建圆形图标按钮</p>
            <div class="example-demo">
              ${ CircleWithIcon.render?.(CircleWithIcon.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 按钮组 -->
          <div class="example-item">
            <h3 class="example-title">按钮组</h3>
            <p class="example-desc">使用 nv-button-group 组件将多个按钮组合在一起</p>
            <div class="example-demo">
              ${ ButtonGroups.render?.(ButtonGroups.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 组合示例 -->
          <div class="example-item">
            <h3 class="example-title">组合示例</h3>
            <p class="example-desc">展示不同属性的组合效果</p>
            <div class="example-demo">
              ${ Combinations.render?.(Combinations.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 尺寸对比 -->
          <div class="example-item">
            <h3 class="example-title">尺寸对比</h3>
            <p class="example-desc">不同尺寸在各个类型中的表现</p>
            <div class="example-demo">
              ${ SizeComparison.render?.(SizeComparison.args as any, {} as any) }
            </div>
          </div>

          <nv-divider></nv-divider>

          <!-- 使用场景 -->
          <div class="example-item">
            <h3 class="example-title">使用场景</h3>
            <p class="example-desc">展示按钮在实际应用中的常见用法</p>
            <div class="example-demo">
              ${ UsageScenarios.render?.(UsageScenarios.args as any, {} as any) }
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

/**
 * 默认按钮示例，可以在控制面板中调整各种属性
 */
export const Default: Story = {
  render: (args) => html`
    <nv-button
      type=${ args.type }
      size=${ args.size }
      ?disabled=${ args.disabled }
      ?loading=${ args.loading }
      ?plain=${ args.plain }
      ?round=${ args.round }
      ?circle=${ args.circle }
      icon=${ args.icon }
    >
      ${ args.children || '按钮' }
    </nv-button>
  `,
  args: {
    type: 'default',
    size: 'medium',
    disabled: false,
    loading: false,
    plain: false,
    round: false,
    circle: false,
    icon: '',
    children: '按钮'
  }
};

/**
 * 不同类型的按钮，包括 default、primary、success、info、warning、danger 和 text
 */
export const Types: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button type="default">默认按钮</nv-button>
      <nv-button type="primary">主要按钮</nv-button>
      <nv-button type="success">成功按钮</nv-button>
      <nv-button type="info">信息按钮</nv-button>
      <nv-button type="warning">警告按钮</nv-button>
      <nv-button type="danger">危险按钮</nv-button>
    </div>
  `
};

/**
 * 文本按钮，通过 text 属性设置，可以与不同 type 组合使用
 * 文字颜色由 type 决定，hover 时显示浅灰色背景
 */
export const TextButton: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button text>默认文本</nv-button>
      <nv-button type="primary" text>主要文本</nv-button>
      <nv-button type="success" text>成功文本</nv-button>
      <nv-button type="info" text>信息文本</nv-button>
      <nv-button type="warning" text>警告文本</nv-button>
      <nv-button type="danger" text>危险文本</nv-button>
    </div>
  `
};

/**
 * 链接按钮，通过 link 属性设置，可以与不同 type 组合使用
 * 文字颜色由 type 决定，hover 和 active 时颜色变化但不显示背景
 */
export const LinkButton: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button link>默认链接</nv-button>
      <nv-button type="primary" link>主要链接</nv-button>
      <nv-button type="success" link>成功链接</nv-button>
      <nv-button type="info" link>信息链接</nv-button>
      <nv-button type="warning" link>警告链接</nv-button>
      <nv-button type="danger" link>危险链接</nv-button>
    </div>
  `
};

/**
 * 朴素按钮，通过 plain 属性设置
 */
export const Plain: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button plain>默认按钮</nv-button>
      <nv-button type="primary" plain>主要按钮</nv-button>
      <nv-button type="success" plain>成功按钮</nv-button>
      <nv-button type="info" plain>信息按钮</nv-button>
      <nv-button type="warning" plain>警告按钮</nv-button>
      <nv-button type="danger" plain>危险按钮</nv-button>
    </div>
  `
};

/**
 * 不同尺寸的按钮，从 mini 到 huge
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button size="mini">迷你按钮</nv-button>
      <nv-button size="small">小型按钮</nv-button>
      <nv-button size="medium">中等按钮</nv-button>
      <nv-button size="large">大型按钮</nv-button>
      <nv-button size="huge">巨大按钮</nv-button>
    </div>
  `
};

/**
 * 禁用状态的按钮
 */
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button disabled>禁用按钮</nv-button>
      <nv-button type="primary" disabled>主要按钮</nv-button>
      <nv-button type="success" disabled>成功按钮</nv-button>
      <nv-button type="info" plain disabled>朴素按钮</nv-button>
      <nv-button text disabled>文本按钮</nv-button>
    </div>
  `
};

/**
 * 加载中状态的按钮
 */
export const Loading: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button loading>加载中</nv-button>
      <nv-button type="primary" loading>提交中</nv-button>
      <nv-button type="success" loading>保存中</nv-button>
      <nv-button type="warning" plain loading>处理中</nv-button>
    </div>
  `
};

/**
 * 圆角按钮，通过 round 属性设置
 */
export const Round: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button round>圆角按钮</nv-button>
      <nv-button type="primary" round>主要按钮</nv-button>
      <nv-button type="success" round>成功按钮</nv-button>
      <nv-button type="info" plain round>朴素按钮</nv-button>
    </div>
  `
};

/**
 * 圆形按钮，通过 circle 属性设置，通常用于图标按钮
 */
export const Circle: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button circle>+</nv-button>
      <nv-button type="primary" circle>✓</nv-button>
      <nv-button type="success" circle>✓</nv-button>
      <nv-button type="info" circle>i</nv-button>
      <nv-button type="warning" circle>!</nv-button>
      <nv-button type="danger" circle>×</nv-button>
    </div>
  `
};

/**
 * 带图标的按钮
 */
export const WithIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <nv-button icon="search">搜索</nv-button>
      <nv-button type="primary" icon="upload">上传</nv-button>
      <nv-button type="success" icon="check">确认</nv-button>
      <nv-button type="warning" icon="warning">警告</nv-button>
      <nv-button type="danger" icon="delete">删除</nv-button>
      <nv-button type="info" icon="download">下载</nv-button>
    </div>
  `
};

/**
 * 圆形图标按钮组合 - 展示所有尺寸的圆形图标按钮
 */
export const CircleWithIcon: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 100px; color: #666; font-weight: 500;">迷你 (mini):</span>
        <nv-button size="mini" circle icon="search"></nv-button>
        <nv-button size="mini" type="primary" circle icon="edit"></nv-button>
        <nv-button size="mini" type="success" circle icon="check"></nv-button>
        <nv-button size="mini" type="info" circle icon="info"></nv-button>
        <nv-button size="mini" type="warning" circle icon="warning"></nv-button>
        <nv-button size="mini" type="danger" circle icon="delete"></nv-button>
        <nv-button size="mini" circle icon="plus"></nv-button>
        <nv-button size="mini" circle icon="close"></nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 100px; color: #666; font-weight: 500;">小型 (small):</span>
        <nv-button size="small" circle icon="search"></nv-button>
        <nv-button size="small" type="primary" circle icon="edit"></nv-button>
        <nv-button size="small" type="success" circle icon="check"></nv-button>
        <nv-button size="small" type="info" circle icon="info"></nv-button>
        <nv-button size="small" type="warning" circle icon="warning"></nv-button>
        <nv-button size="small" type="danger" circle icon="delete"></nv-button>
        <nv-button size="small" circle icon="plus"></nv-button>
        <nv-button size="small" circle icon="close"></nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 100px; color: #666; font-weight: 500;">中等 (medium):</span>
        <nv-button size="medium" circle icon="search"></nv-button>
        <nv-button size="medium" type="primary" circle icon="edit"></nv-button>
        <nv-button size="medium" type="success" circle icon="check"></nv-button>
        <nv-button size="medium" type="info" circle icon="info"></nv-button>
        <nv-button size="medium" type="warning" circle icon="warning"></nv-button>
        <nv-button size="medium" type="danger" circle icon="delete"></nv-button>
        <nv-button size="medium" circle icon="plus"></nv-button>
        <nv-button size="medium" circle icon="close"></nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 100px; color: #666; font-weight: 500;">大型 (large):</span>
        <nv-button size="large" circle icon="search"></nv-button>
        <nv-button size="large" type="primary" circle icon="edit"></nv-button>
        <nv-button size="large" type="success" circle icon="check"></nv-button>
        <nv-button size="large" type="info" circle icon="info"></nv-button>
        <nv-button size="large" type="warning" circle icon="warning"></nv-button>
        <nv-button size="large" type="danger" circle icon="delete"></nv-button>
        <nv-button size="large" circle icon="plus"></nv-button>
        <nv-button size="large" circle icon="close"></nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 100px; color: #666; font-weight: 500;">巨大 (huge):</span>
        <nv-button size="huge" circle icon="search"></nv-button>
        <nv-button size="huge" type="primary" circle icon="edit"></nv-button>
        <nv-button size="huge" type="success" circle icon="check"></nv-button>
        <nv-button size="huge" type="info" circle icon="info"></nv-button>
        <nv-button size="huge" type="warning" circle icon="warning"></nv-button>
        <nv-button size="huge" type="danger" circle icon="delete"></nv-button>
        <nv-button size="huge" circle icon="plus"></nv-button>
        <nv-button size="huge" circle icon="close"></nv-button>
      </div>
    </div>
  `
};

/**
 * 组合示例：展示不同属性的组合效果
 */
export const Combinations: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 120px; color: #666;">圆角 + 朴素:</span>
        <nv-button type="primary" plain round>主要按钮</nv-button>
        <nv-button type="success" plain round>成功按钮</nv-button>
        <nv-button type="warning" plain round>警告按钮</nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 120px; color: #666;">图标 + 文字:</span>
        <nv-button icon="search">搜索</nv-button>
        <nv-button type="primary" icon="upload">上传</nv-button>
        <nv-button type="success" icon="check">确认</nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 120px; color: #666;">不同尺寸 + 图标:</span>
        <nv-button size="mini" icon="search">迷你</nv-button>
        <nv-button size="small" icon="search">小型</nv-button>
        <nv-button size="medium" icon="search">中等</nv-button>
        <nv-button size="large" icon="search">大型</nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 120px; color: #666;">加载 + 圆角:</span>
        <nv-button type="primary" loading round>提交中</nv-button>
        <nv-button type="success" loading round>保存中</nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 120px; color: #666;">朴素 + 图标:</span>
        <nv-button type="primary" plain icon="search">搜索</nv-button>
        <nv-button type="success" plain icon="download">下载</nv-button>
        <nv-button type="warning" plain icon="upload">上传</nv-button>
      </div>
    </div>
  `
};

/**
 * 按钮组示例：使用 nv-button-group 组件将多个按钮组合在一起
 */
export const ButtonGroups: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">基础按钮组</h4>
        <nv-button-group>
          <nv-button>左边</nv-button>
          <nv-button>中间</nv-button>
          <nv-button>右边</nv-button>
        </nv-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">主要按钮组</h4>
        <nv-button-group>
          <nv-button type="primary">选项一</nv-button>
          <nv-button type="primary">选项二</nv-button>
          <nv-button type="primary">选项三</nv-button>
        </nv-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">带图标的按钮组</h4>
        <nv-button-group>
          <nv-button type="primary" icon="back">上一页</nv-button>
          <nv-button type="primary" icon="right">下一页</nv-button>
        </nv-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">图标按钮组</h4>
        <nv-button-group>
          <nv-button icon="edit"></nv-button>
          <nv-button icon="delete"></nv-button>
          <nv-button icon="search"></nv-button>
          <nv-button icon="refresh"></nv-button>
        </nv-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">不同类型的按钮组</h4>
        <nv-button-group>
          <nv-button type="success">通过</nv-button>
          <nv-button type="warning">待定</nv-button>
          <nv-button type="danger">拒绝</nv-button>
        </nv-button-group>
      </div>
    </div>
  `
};

/**
 * 实际使用场景：展示按钮在真实应用中的组合
 */
export const UsageScenarios: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">表单操作</h4>
        <div style="display: flex; gap: 8px;">
          <nv-button type="primary">提交</nv-button>
          <nv-button>取消</nv-button>
          <nv-button text>重置</nv-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">确认对话框</h4>
        <div style="display: flex; gap: 8px;">
          <nv-button type="primary">确认</nv-button>
          <nv-button>取消</nv-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">数据操作</h4>
        <div style="display: flex; gap: 8px;">
          <nv-button type="primary" icon="plus">新建</nv-button>
          <nv-button type="success" icon="edit">编辑</nv-button>
          <nv-button type="danger" icon="delete">删除</nv-button>
          <nv-button type="info" icon="download">导出</nv-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">工具栏</h4>
        <div style="display: flex; gap: 8px;">
          <nv-button size="small" circle icon="refresh"></nv-button>
          <nv-button size="small" circle icon="setting"></nv-button>
          <nv-button size="small" circle icon="search"></nv-button>
          <nv-button size="small" circle icon="download"></nv-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">加载状态</h4>
        <div style="display: flex; gap: 8px;">
          <nv-button type="primary" loading>保存中...</nv-button>
          <nv-button type="success" icon="upload">上传文件</nv-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">禁用状态</h4>
        <div style="display: flex; gap: 8px;">
          <nv-button type="primary" disabled>已禁用</nv-button>
          <nv-button type="success" disabled icon="check">已禁用</nv-button>
          <nv-button text disabled>已禁用</nv-button>
        </div>
      </div>
    </div>
  `
};

/**
 * 尺寸对比：不同尺寸在各个类型中的表现
 */
export const SizeComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 80px; color: #666;">默认:</span>
        <nv-button size="mini">迷你</nv-button>
        <nv-button size="small">小型</nv-button>
        <nv-button size="medium">中等</nv-button>
        <nv-button size="large">大型</nv-button>
        <nv-button size="huge">巨大</nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 80px; color: #666;">主要:</span>
        <nv-button type="primary" size="mini">迷你</nv-button>
        <nv-button type="primary" size="small">小型</nv-button>
        <nv-button type="primary" size="medium">中等</nv-button>
        <nv-button type="primary" size="large">大型</nv-button>
        <nv-button type="primary" size="huge">巨大</nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 80px; color: #666;">朴素:</span>
        <nv-button type="primary" plain size="mini">迷你</nv-button>
        <nv-button type="primary" plain size="small">小型</nv-button>
        <nv-button type="primary" plain size="medium">中等</nv-button>
        <nv-button type="primary" plain size="large">大型</nv-button>
        <nv-button type="primary" plain size="huge">巨大</nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 80px; color: #666;">圆角:</span>
        <nv-button type="success" round size="mini">迷你</nv-button>
        <nv-button type="success" round size="small">小型</nv-button>
        <nv-button type="success" round size="medium">中等</nv-button>
        <nv-button type="success" round size="large">大型</nv-button>
        <nv-button type="success" round size="huge">巨大</nv-button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span style="width: 80px; color: #666;">圆形:</span>
        <nv-button type="info" circle size="mini" icon="search"></nv-button>
        <nv-button type="info" circle size="small" icon="search"></nv-button>
        <nv-button type="info" circle size="medium" icon="search"></nv-button>
        <nv-button type="info" circle size="large" icon="search"></nv-button>
        <nv-button type="info" circle size="huge" icon="search"></nv-button>
      </div>
    </div>
  `
};

/**
 * 激活状态 - 用于表示按钮被选中或当前激活
 */
export const ActiveState: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h3 style="margin: 0 0 12px 0; color: #303133;">基础激活状态</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <nv-button>普通按钮</nv-button>
          <nv-button active>激活按钮</nv-button>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0; color: #303133;">不同类型的激活状态</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <nv-button type="default" active>Default</nv-button>
          <nv-button type="primary" active>Primary</nv-button>
          <nv-button type="success" active>Success</nv-button>
          <nv-button type="info" active>Info</nv-button>
          <nv-button type="warning" active>Warning</nv-button>
          <nv-button type="danger" active>Danger</nv-button>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0; color: #303133;">朴素按钮的激活状态</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <nv-button type="default" plain active>Default</nv-button>
          <nv-button type="primary" plain active>Primary</nv-button>
          <nv-button type="success" plain active>Success</nv-button>
          <nv-button type="info" plain active>Info</nv-button>
          <nv-button type="warning" plain active>Warning</nv-button>
          <nv-button type="danger" plain active>Danger</nv-button>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0; color: #303133;">模拟分页按钮组</h3>
        <p style="margin: 0 0 12px 0; color: #909399; font-size: 14px;">
          常用于分页、标签页等需要显示选中状态的场景
        </p>
        <div style="display: flex; gap: 4px;">
          <nv-button size="small">1</nv-button>
          <nv-button size="small">2</nv-button>
          <nv-button size="small" active>3</nv-button>
          <nv-button size="small">4</nv-button>
          <nv-button size="small">5</nv-button>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 12px 0; color: #303133;">交互式示例</h3>
        <p style="margin: 0 0 12px 0; color: #909399; font-size: 14px;">
          点击按钮切换激活状态
        </p>
        <div id="interactive-buttons" style="display: flex; gap: 8px;">
          <nv-button>选项 1</nv-button>
          <nv-button>选项 2</nv-button>
          <nv-button>选项 3</nv-button>
          <nv-button>选项 4</nv-button>
        </div>
        <script>
          (function() {
            const container = document.getElementById('interactive-buttons');
            if (container) {
              const buttons = container.querySelectorAll('nv-button');
              buttons.forEach((button, index) => {
                button.addEventListener('click', () => {
                  buttons.forEach(btn => btn.removeAttribute('active'));
                  button.setAttribute('active', '');
                });
              });
            }
          })();
        </script>
      </div>
    </div>
  `
};
