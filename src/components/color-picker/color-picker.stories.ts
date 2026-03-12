import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../divider/index';
import readmeMd from './README.md?raw';

// 解析 README
const readmeHtml = marked.parse(readmeMd) as string;

const meta: Meta = {
  title: 'Components/ColorPicker',
  component: 'nv-color-picker',
  argTypes: {
    value: {
      control: 'color',
      description: '当前选中的颜色值（hex格式）'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    showAlpha: {
      control: 'boolean',
      description: '是否显示alpha通道'
    },
    colorFormat: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl'],
      description: '颜色格式'
    },
    size: {
      control: 'select',
      options: ['mini', 'small', 'medium', 'large', 'huge'],
      description: '尺寸'
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rectangle'],
      description: '形状'
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框'
    },
    eyeDropper: {
      control: 'boolean',
      description: '是否启用吸管工具'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
    actions: { disable: true }
  },
  render: () => {
    return html`
    <div style="padding: 20px; max-width: 1200px;">
      <div class="readme-content" style="background: #fff; padding: 30px; border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 40px;">
        ${ unsafeHTML(readmeHtml) }
      </div>

      <nv-divider style="margin: 40px 0;">
        <span style="color: #909399; font-size: 16px; font-weight: 500;">✨ 交互示例</span>
      </nv-divider>

      <div class="examples-section">
        <div class="example-item">
          <h3 class="example-title">With Alpha</h3>
          <p class="example-desc">With Alpha 示例</p>
          <div class="example-demo">
            ${ WithAlpha.render?.({} as any, {} as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">With Predefine</h3>
          <p class="example-desc">With Predefine 示例</p>
          <div class="example-demo">
            ${ WithPredefine.render?.({} as any, {} as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Disabled</h3>
          <p class="example-desc">Disabled 示例</p>
          <div class="example-demo">
            ${ Disabled.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Sizes</h3>
          <p class="example-desc">不同尺寸示例</p>
          <div class="example-demo">
            ${ Sizes.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Shapes</h3>
          <p class="example-desc">不同形状示例</p>
          <div class="example-demo">
            ${ Shapes.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Bordered</h3>
          <p class="example-desc">带边框示例</p>
          <div class="example-demo">
            ${ Bordered.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Color Formats</h3>
          <p class="example-desc">颜色格式切换和输入</p>
          <div class="example-demo">
            ${ ColorFormats.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Eye Dropper</h3>
          <p class="example-desc">吸管工具（需要浏览器支持 EyeDropper API）</p>
          <div class="example-demo">
            ${ EyeDropper.render?.({} as any, {} as any) }
          </div>
        </div>
      </div>

      <style>
        .readme-content h1 {
          margin-top: 0;
          font-size: 28px;
          font-weight: 600;
          color: #303133;
          padding-bottom: 16px;
          border-bottom: 2px solid #e4e7ed;
        }
        .readme-content h2 {
          color: #303133;
          font-size: 20px;
          font-weight: 600;
          margin: 30px 0 16px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #e4e7ed;
        }
        .readme-content p {
          color: #606266;
          line-height: 1.8;
          font-size: 15px;
          margin: 12px 0;
        }
        .readme-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        .readme-content table thead {
          background: #f5f7fa;
        }
        .readme-content table th {
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #e4e7ed;
          color: #303133;
          font-weight: 600;
        }
        .readme-content table td {
          padding: 12px;
          border-bottom: 1px solid #e4e7ed;
          color: #606266;
        }
        .readme-content table tbody tr:last-child td {
          border-bottom: none;
        }
        .readme-content code {
          background: #f5f7fa;
          padding: 2px 6px;
          border-radius: 3px;
          color: #e96900;
          font-size: 13px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
        }

        .examples-section {
          background: #fff;
          border-radius: 4px;
          padding: 30px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .example-item {
          margin: 30px 0;
        }

        .example-item:first-child {
          margin-top: 0;
        }

        .example-item:last-child {
          margin-bottom: 0;
        }

        .example-title {
          font-size: 20px;
          font-weight: 600;
          color: #303133;
          margin: 0 0 8px 0;
        }

        .example-desc {
          font-size: 14px;
          color: #909399;
          margin: 0 0 20px 0;
          line-height: 1.6;
        }

        .example-demo {
          padding: 24px;
          background: #fafafa;
          border: 1px solid #ebebeb;
          border-radius: 4px;
        }
      </style>
    </div>
  `;
  }
};

export const Default: Story = {
  render: (args) => html`
    <nv-color-picker
      value="${ args.value }"
      ?disabled="${ args.disabled }"
      ?show-alpha="${ args.showAlpha }"
      ?bordered="${ args.bordered }"
      color-format="${ args.colorFormat }"
      size="${ args.size }"
      shape="${ args.shape }"
      @change="${ (e: CustomEvent) => console.log('Color changed:', e.detail) }"
    ></nv-color-picker>
  `,
  args: {
    value: '#409EFF',
    disabled: false,
    showAlpha: false,
    bordered: false,
    colorFormat: 'hex',
    size: 'medium',
    shape: 'rectangle'
  }
};

export const WithAlpha: Story = {
  render: () => html`
    <nv-color-picker value="#409EFF" show-alpha></nv-color-picker>
  `
};

export const WithPredefine: Story = {
  render: () => html`
    <nv-color-picker
      value="#409EFF"
      .predefine="${ ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'] }"
    ></nv-color-picker>
  `
};

export const Disabled: Story = {
  render: () => html`
    <nv-color-picker value="#409EFF" disabled></nv-color-picker>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
      <div style="text-align: center;">
        <nv-color-picker value="#409EFF" size="mini"></nv-color-picker>
        <div style="margin-top: 8px; font-size: 12px; color: #909399;">Mini</div>
      </div>
      <div style="text-align: center;">
        <nv-color-picker value="#67C23A" size="small"></nv-color-picker>
        <div style="margin-top: 8px; font-size: 12px; color: #909399;">Small</div>
      </div>
      <div style="text-align: center;">
        <nv-color-picker value="#E6A23C" size="medium"></nv-color-picker>
        <div style="margin-top: 8px; font-size: 12px; color: #909399;">Medium</div>
      </div>
      <div style="text-align: center;">
        <nv-color-picker value="#F56C6C" size="large"></nv-color-picker>
        <div style="margin-top: 8px; font-size: 12px; color: #909399;">Large</div>
      </div>
      <div style="text-align: center;">
        <nv-color-picker value="#909399" size="huge"></nv-color-picker>
        <div style="margin-top: 8px; font-size: 12px; color: #909399;">Huge</div>
      </div>
    </div>
  `
};

export const Bordered: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 40px;">
      <div style="text-align: center;">
        <nv-color-picker value="#409EFF" size="medium"></nv-color-picker>
        <div style="margin-top: 8px; font-size: 12px; color: #909399;">无边框 (默认)</div>
      </div>
      <div style="text-align: center;">
        <nv-color-picker value="#67C23A" size="medium" bordered></nv-color-picker>
        <div style="margin-top: 8px; font-size: 12px; color: #909399;">有边框</div>
      </div>
    </div>
  `
};

export const ColorFormats: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <p style="margin: 0 0 12px 0; color: #606266;">
          点击面板中的格式按钮（HEX/RGB/HSL/HSV）可以切换颜色格式显示。
          输入框支持直接输入颜色值，支持以下格式：
        </p>
        <ul style="margin: 0; padding-left: 20px; color: #909399; font-size: 14px;">
          <li>HEX: #409EFF 或 #409EFFAA (带透明度)</li>
          <li>RGB: rgb(64, 158, 255) 或 rgba(64, 158, 255, 1.00) - 显示时始终使用 rgba 格式</li>
          <li>HSL: hsl(210, 100%, 63%) 或 hsla(210, 100%, 63%, 1.00) - 显示时始终使用 hsla 格式</li>
          <li>HSV: hsv(210, 75%, 100%) 或 hsva(210, 75%, 100%, 1.00) - 显示时始终使用 hsva 格式</li>
        </ul>
      </div>
      <div style="display: flex; gap: 20px;">
        <nv-color-picker value="#409EFF" color-format="hex"></nv-color-picker>
        <nv-color-picker value="#67C23A" color-format="rgb"></nv-color-picker>
        <nv-color-picker value="#E6A23C" color-format="hsl"></nv-color-picker>
        <nv-color-picker value="#F56C6C" color-format="hsv"></nv-color-picker>
      </div>
    </div>
  `
};

export const Shapes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px;">
      <div>
        <h4 style="margin: 0 0 16px 0; color: #303133;">Circle (圆形)</h4>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="text-align: center;">
            <nv-color-picker value="#409EFF" shape="circle" size="mini"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Mini</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#67C23A" shape="circle" size="small"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Small</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#E6A23C" shape="circle" size="medium"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Medium</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#F56C6C" shape="circle" size="large"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Large</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#909399" shape="circle" size="huge"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Huge</div>
          </div>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 16px 0; color: #303133;">Square (正方形)</h4>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="text-align: center;">
            <nv-color-picker value="#409EFF" shape="square" size="mini"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Mini</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#67C23A" shape="square" size="small"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Small</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#E6A23C" shape="square" size="medium"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Medium</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#F56C6C" shape="square" size="large"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Large</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#909399" shape="square" size="huge"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Huge</div>
          </div>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 16px 0; color: #303133;">Rectangle (矩形)</h4>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="text-align: center;">
            <nv-color-picker value="#409EFF" shape="rectangle" size="mini"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Mini</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#67C23A" shape="rectangle" size="small"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Small</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#E6A23C" shape="rectangle" size="medium"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Medium</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#F56C6C" shape="rectangle" size="large"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Large</div>
          </div>
          <div style="text-align: center;">
            <nv-color-picker value="#909399" shape="rectangle" size="huge"></nv-color-picker>
            <div style="margin-top: 8px; font-size: 12px; color: #909399;">Huge</div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const EyeDropper: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <p style="margin: 0 0 12px 0; color: #606266;">
          吸管工具允许你从屏幕上任意位置取色。点击颜色面板中的吸管图标即可使用。
        </p>
        <p style="margin: 0 0 12px 0; color: #909399; font-size: 14px;">
          注意：此功能需要浏览器支持 EyeDropper API（Chrome 95+, Edge 95+）
        </p>
      </div>
      <div style="display: flex; gap: 20px; align-items: center;">
        <div style="text-align: center;">
          <nv-color-picker value="#409EFF" .eyeDropper="${true}"></nv-color-picker>
          <div style="margin-top: 8px; font-size: 12px; color: #909399;">启用吸管（默认）</div>
        </div>
        <div style="text-align: center;">
          <nv-color-picker value="#67C23A" .eyeDropper="${false}"></nv-color-picker>
          <div style="margin-top: 8px; font-size: 12px; color: #909399;">禁用吸管</div>
        </div>
      </div>
    </div>
  `
};
