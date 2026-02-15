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
  title: 'Components/Pagination',
  component: 'nv-pagination', 
  argTypes: {
    currentPage: {
      control: 'number',
      description: '当前页数'
    },
    pageSize: {
      control: 'number',
      description: '每页显示条目个数'
    },
    total: {
      control: 'number',
      description: '总条目数'
    },
    pagerCount: {
      control: 'number',
      description: '页码按钮的数量'
    },
    size: {
      control: 'select',
      options: ['mini', 'small', 'medium', 'large', 'huge'],
      description: '分页尺寸'
    },
    type: {
      control: 'select',
      options: ['default', 'link'],
      description: '页码按钮类型'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    background: {
      control: 'boolean',
      description: '是否显示背景色'
    },
    showJumper: {
      control: 'boolean',
      description: '是否显示快速跳转器'
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
          <h3 class="example-title">按钮类型</h3>
          <p class="example-desc">支持 default（默认有边框）和 link（无边框和背景色）两种类型</p>
          <div class="example-demo">
            ${ ButtonTypes.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">带背景色</h3>
          <p class="example-desc">设置 background 属性可以显示背景色</p>
          <div class="example-demo">
            ${ WithBackground.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">不同尺寸</h3>
          <p class="example-desc">提供 mini、small、medium、large、huge 五种尺寸</p>
          <div class="example-demo">
            ${ Sizes.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">大数据量</h3>
          <p class="example-desc">支持大数据量的分页</p>
          <div class="example-demo">
            ${ LargeTotal.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">快速跳转</h3>
          <p class="example-desc">通过输入页码快速跳转到指定页</p>
          <div class="example-demo">
            ${ WithJumper.render?.({} as any, {} as any) }
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
    <nv-pagination
      currentPage="${ args.currentPage }"
      pageSize="${ args.pageSize }"
      total="${ args.total }"
      pagerCount="${ args.pagerCount }"
      size="${ args.size }"
      type="${ args.type }"
      ?disabled="${ args.disabled }"
      ?background="${ args.background }"
      ?show-jumper="${ args.showJumper }"
      @nv-current-change="${ (e: CustomEvent) => console.log('Page changed:', e.detail) }"
      @nv-size-change="${ (e: CustomEvent) => console.log('Size changed:', e.detail) }"
    ></nv-pagination>
  `,
  args: {
    currentPage: 1,
    pageSize: 10,
    total: 100,
    pagerCount: 7,
    size: 'medium',
    type: 'default',
    disabled: false,
    background: false,
    showJumper: false
  }
};

export const ButtonTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">默认类型（有边框）</h4>
        <nv-pagination currentPage="3" pageSize="10" total="100" type="default"></nv-pagination>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">链接类型（无边框和背景色）</h4>
        <nv-pagination currentPage="3" pageSize="10" total="100" type="link"></nv-pagination>
      </div>
    </div>
  `
};

export const WithBackground: Story = {
  render: () => html`
    <nv-pagination currentPage="1" pageSize="10" total="100" background></nv-pagination>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">迷你尺寸</h4>
        <nv-pagination currentPage="1" pageSize="10" total="100" size="mini"></nv-pagination>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">小型尺寸</h4>
        <nv-pagination currentPage="1" pageSize="10" total="100" size="small"></nv-pagination>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">中等尺寸</h4>
        <nv-pagination currentPage="1" pageSize="10" total="100" size="medium"></nv-pagination>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">大型尺寸</h4>
        <nv-pagination currentPage="1" pageSize="10" total="100" size="large"></nv-pagination>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">巨大尺寸</h4>
        <nv-pagination currentPage="1" pageSize="10" total="100" size="huge"></nv-pagination>
      </div>
    </div>
  `
};

export const LargeTotal: Story = {
  render: () => html`
    <nv-pagination currentPage="50" pageSize="10" total="1000" pagerCount="7"></nv-pagination>
  `
};

export const WithJumper: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">基础跳转器</h4>
        <nv-pagination currentPage="1" pageSize="10" total="100" show-jumper></nv-pagination>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">带背景色</h4>
        <nv-pagination currentPage="1" pageSize="10" total="100" show-jumper background></nv-pagination>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">带分页大小选择器</h4>
        <nv-pagination currentPage="1" pageSize="10" total="100" show-jumper></nv-pagination>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">不同尺寸</h4>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <nv-pagination currentPage="1" pageSize="10" total="100" show-jumper size="mini"></nv-pagination>
          <nv-pagination currentPage="1" pageSize="10" total="100" show-jumper size="small"></nv-pagination>
          <nv-pagination currentPage="1" pageSize="10" total="100" show-jumper size="medium"></nv-pagination>
          <nv-pagination currentPage="1" pageSize="10" total="100" show-jumper size="large"></nv-pagination>
          <nv-pagination currentPage="1" pageSize="10" total="100" show-jumper size="huge"></nv-pagination>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">完整功能</h4>
        <nv-pagination currentPage="5" pageSize="20" total="500" show-jumper></nv-pagination>
      </div>
    </div>
  `
};
