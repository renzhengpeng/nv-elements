import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../divider/index';
import '../button/index';
import { Message } from '../message/message';
import readmeMd from './README.md?raw';

// 解析 README
const readmeHtml = marked.parse(readmeMd) as string;

const meta: Meta = {
  title: 'Components/Popconfirm',
  component: 'nv-popconfirm',
  argTypes: {
    label: {
      control: 'text',
      description: '标题'
    },
    confirmButtonText: {
      control: 'text',
      description: '确认按钮文字'
    },
    cancelButtonText: {
      control: 'text',
      description: '取消按钮文字'
    },
    confirmButtonType: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: '确认按钮类型'
    },
    cancelButtonType: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: '取消按钮类型'
    },
    confirmTextButton: {
      control: 'boolean',
      description: '确认按钮是否为文字按钮'
    },
    cancelTextButton: {
      control: 'boolean',
      description: '取消按钮是否为文字按钮'
    },
    confirmButtonSize: {
      control: 'select',
      options: ['large', 'default', 'small'],
      description: '确认按钮尺寸'
    },
    cancelButtonSize: {
      control: 'select',
      options: ['large', 'default', 'small'],
      description: '取消按钮尺寸'
    },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
      description: '显示的位置'
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'manual'],
      description: '触发方式'
    },
    arrow: {
      control: 'boolean',
      description: '是否显示箭头'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用（禁用后无法通过触发器激活）'
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
          <h3 class="example-title">Placements</h3>
          <p class="example-desc">Placements 示例</p>
          <div class="example-demo">
            ${ Placements.render?.({} as any, {} as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Custom Buttons</h3>
          <p class="example-desc">Custom Buttons 示例</p>
          <div class="example-demo">
            ${ CustomButtons.render?.({} as any, {} as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Without Arrow</h3>
          <p class="example-desc">Without Arrow 示例</p>
          <div class="example-demo">
            ${ WithoutArrow.render?.({} as any, {} as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Different Triggers</h3>
          <p class="example-desc">Different Triggers 示例</p>
          <div class="example-demo">
            ${ DifferentTriggers.render?.({} as any, {} as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Long Title</h3>
          <p class="example-desc">Long Title 示例</p>
          <div class="example-demo">
            ${ LongTitle.render?.({} as any, {} as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">In Table</h3>
          <p class="example-desc">In Table 示例</p>
          <div class="example-demo">
            ${ InTable.render?.({} as any, {} as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Button Sizes</h3>
          <p class="example-desc">Button Sizes 示例</p>
          <div class="example-demo">
            ${ ButtonSizes.render?.({} as any, {} as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">With Disabled</h3>
          <p class="example-desc">With Disabled 示例</p>
          <div class="example-demo">
            ${ WithDisabled.render?.({} as any, {} as any) }
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
    <div style="padding: 100px; text-align: center;">
      <nv-popconfirm
        .label="${ args.title }"
        .confirmButtonText="${ args.confirmButtonText }"
        .cancelButtonText="${ args.cancelButtonText }"
        .confirmButtonType="${ args.confirmButtonType }"
        .cancelButtonType="${ args.cancelButtonType }"
        ?confirmTextButton=${ args.confirmTextButton }
        ?cancelTextButton=${ args.cancelTextButton }
        .confirmButtonSize="${ args.confirmButtonSize }"
        .cancelButtonSize="${ args.cancelButtonSize }"
        .placement="${ args.placement }"
        .trigger="${ args.trigger }"
        .arrow="${ args.arrow }"
        .disabled="${ args.disabled }"
        @confirm="${ () => {
          console.log('✅ 确认事件触发');
          Message.success({ message: '确认操作', duration: 2000, closable: true });
        } }"
        @cancel="${ () => {
          console.log('❌ 取消事件触发');
          Message.info({ message: '取消操作', duration: 2000, closable: true });
        } }"
      >
        <nv-button type="danger">删除</nv-button>
      </nv-popconfirm>
    </div>
  `,
  args: {
    label: '确定要删除吗？',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    confirmButtonType: 'primary',
    cancelButtonType: 'default',
    confirmTextButton: false,
    cancelTextButton: true,
    confirmButtonSize: 'small',
    cancelButtonSize: 'small',
    placement: 'top',
    trigger: 'click',
    arrow: true,
    disabled: false
  }
};

export const Placements: Story = {
  render: () => html`
    <div style="padding: 200px; display: flex; flex-direction: column; gap: 30px; align-items: center;">
      <!-- 顶部位置 -->
      <div style="display: flex; gap: 20px;">
        <nv-popconfirm
          .label="${ '确定删除吗？' }"
          .placement="${ 'top-start' }"
          @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
        >
          <nv-button>top-start</nv-button>
        </nv-popconfirm>
        <nv-popconfirm
          .label="${ '确定删除吗？' }"
          .placement="${ 'top' }"
          @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
        >
          <nv-button>top</nv-button>
        </nv-popconfirm>
        <nv-popconfirm
          .label="${ '确定删除吗？' }"
          .placement="${ 'top-end' }"
          @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
        >
          <nv-button>top-end</nv-button>
        </nv-popconfirm>
      </div>

      <!-- 左右位置 -->
      <div style="display: flex; gap: 100px; align-items: center;">
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <nv-popconfirm
            .label="${ '确定删除吗？' }"
            .placement="${ 'left-start' }"
            @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
          >
            <nv-button>left-start</nv-button>
          </nv-popconfirm>
          <nv-popconfirm
            .label="${ '确定删除吗？' }"
            .placement="${ 'left' }"
            @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
          >
            <nv-button>left</nv-button>
          </nv-popconfirm>
          <nv-popconfirm
            .label="${ '确定删除吗？' }"
            .placement="${ 'left-end' }"
            @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
          >
            <nv-button>left-end</nv-button>
          </nv-popconfirm>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <nv-popconfirm
            .label="${ '确定删除吗？' }"
            .placement="${ 'right-start' }"
            @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
          >
            <nv-button>right-start</nv-button>
          </nv-popconfirm>
          <nv-popconfirm
            .label="${ '确定删除吗？' }"
            .placement="${ 'right' }"
            @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
          >
            <nv-button>right</nv-button>
          </nv-popconfirm>
          <nv-popconfirm
            .label="${ '确定删除吗？' }"
            .placement="${ 'right-end' }"
            @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
          >
            <nv-button>right-end</nv-button>
          </nv-popconfirm>
        </div>
      </div>

      <!-- 底部位置 -->
      <div style="display: flex; gap: 20px;">
        <nv-popconfirm
          .label="${ '确定删除吗？' }"
          .placement="${ 'bottom-start' }"
          @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
        >
          <nv-button>bottom-start</nv-button>
        </nv-popconfirm>
        <nv-popconfirm
          .label="${ '确定删除吗？' }"
          .placement="${ 'bottom' }"
          @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
        >
          <nv-button>bottom</nv-button>
        </nv-popconfirm>
        <nv-popconfirm
          .label="${ '确定删除吗？' }"
          .placement="${ 'bottom-end' }"
          @confirm="${ () => Message.success({ message: '已确认', duration: 2000 }) }"
        >
          <nv-button>bottom-end</nv-button>
        </nv-popconfirm>
      </div>
    </div>
  `
};

export const CustomButtons: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 20px; justify-content: center;">
      <nv-popconfirm
        .label="${ '确定要执行此操作吗？' }"
        .confirmButtonText="${ '确定执行' }"
        .cancelButtonText="${ '我再想想' }"
        .confirmButtonType="${ 'danger' }"
        ?cancelTextButton=${ true }
        @confirm="${ () => Message.success({ message: '已执行危险操作', duration: 2000 }) }"
        @cancel="${ () => Message.info({ message: '已取消', duration: 2000 }) }"
      >
        <nv-button type="danger">危险操作</nv-button>
      </nv-popconfirm>

      <nv-popconfirm
        .label="${ '确定要保存更改吗？' }"
        .confirmButtonText="${ '保存' }"
        .cancelButtonText="${ '放弃' }"
        .confirmButtonType="${ 'success' }"
        ?cancelTextButton=${ true }
        @confirm="${ () => Message.success({ message: '保存成功', duration: 2000 }) }"
        @cancel="${ () => Message.warning({ message: '已放弃更改', duration: 2000 }) }"
      >
        <nv-button type="success">保存更改</nv-button>
      </nv-popconfirm>

      <nv-popconfirm
        .label="${ '确定要提交吗？' }"
        .confirmButtonText="${ '提交' }"
        .cancelButtonText="${ '取消' }"
        .confirmButtonType="${ 'warning' }"
        ?cancelTextButton=${ true }
        @confirm="${ () => Message.success({ message: '提交成功', duration: 2000 }) }"
        @cancel="${ () => Message.info({ message: '已取消', duration: 2000 }) }"
      >
        <nv-button type="warning">提交审核</nv-button>
      </nv-popconfirm>
    </div>
  `
};

export const WithoutArrow: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 20px; justify-content: center;">
      <nv-popconfirm
        .label="${ '确定要删除吗？' }"
        .arrow="${ false }"
        @confirm="${ () => Message.success({ message: '已删除', duration: 2000 }) }"
      >
        <nv-button type="danger">无箭头</nv-button>
      </nv-popconfirm>

      <nv-popconfirm
        .label="${ '确定要删除吗？' }"
        .arrow="${ true }"
        @confirm="${ () => Message.success({ message: '已删除', duration: 2000 }) }"
      >
        <nv-button type="danger">有箭头</nv-button>
      </nv-popconfirm>
    </div>
  `
};

export const DifferentTriggers: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 20px; justify-content: center; align-items: center;">
      <div style="text-align: center;">
        <nv-popconfirm
          .label="${ '点击触发确认' }"
          .trigger="${ 'click' }"
          @confirm="${ () => Message.success({ message: '点击确认', duration: 2000 }) }"
        >
          <nv-button>点击触发</nv-button>
        </nv-popconfirm>
        <div style="margin-top: 8px; font-size: 12px; color: #909399;">trigger="click"</div>
      </div>

      <div style="text-align: center;">
        <nv-popconfirm
          .label="${ '悬停触发确认' }"
          .trigger="${ 'hover' }"
          @confirm="${ () => Message.success({ message: '悬停确认', duration: 2000 }) }"
        >
          <nv-button>悬停触发</nv-button>
        </nv-popconfirm>
        <div style="margin-top: 8px; font-size: 12px; color: #909399;">trigger="hover"</div>
      </div>
    </div>
  `
};

export const LongTitle: Story = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <nv-popconfirm
        .label="${ '确定要删除这条重要的数据吗？删除后将无法恢复，请谨慎操作！' }"
        @confirm="${ () => Message.success({ message: '已删除', duration: 2000 }) }"
        @cancel="${ () => Message.info({ message: '已取消', duration: 2000 }) }"
      >
        <nv-button type="danger">删除重要数据</nv-button>
      </nv-popconfirm>
    </div>
  `
};

export const InTable: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f5f7fa;">
            <th style="padding: 12px; text-align: left; border: 1px solid #dcdfe6;">ID</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #dcdfe6;">名称</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #dcdfe6;">状态</th>
            <th style="padding: 12px; text-align: center; border: 1px solid #dcdfe6; width: 200px;">操作</th>
          </tr>
        </thead>
        <tbody>
          ${[1, 2, 3].map(id => html`
            <tr>
              <td style="padding: 12px; border: 1px solid #dcdfe6;">${id}</td>
              <td style="padding: 12px; border: 1px solid #dcdfe6;">数据项 ${id}</td>
              <td style="padding: 12px; border: 1px solid #dcdfe6;">正常</td>
              <td style="padding: 12px; border: 1px solid #dcdfe6; text-align: center;">
                <nv-button text size="small">编辑</nv-button>
                <nv-popconfirm
                  .label="${ `确定要删除数据项 ${id} 吗？` }"
                  @confirm="${ () => Message.success({ message: `已删除数据项 ${id}`, duration: 2000 }) }"
                >
                  <nv-button text size="small" style="color: #f56c6c;">删除</nv-button>
                </nv-popconfirm>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `
};

export const ButtonSizes: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; flex-direction: column; gap: 40px; align-items: center;">
      <div style="text-align: center;">
        <h4 style="margin-bottom: 16px;">大尺寸按钮（size="large"）</h4>
        <nv-popconfirm
          .label="${ '确定要删除吗？' }"
          .confirmButtonSize="${ 'large' }"
          .cancelButtonSize="${ 'large' }"
          @confirm="${ () => {
            console.log('✅ 确认事件触发 - 大尺寸按钮');
            Message.success({ message: '已删除', duration: 2000 });
          } }"
          @cancel="${ () => {
            console.log('❌ 取消事件触发');
            Message.info({ message: '已取消', duration: 2000 });
          } }"
        >
          <nv-button type="danger">删除</nv-button>
        </nv-popconfirm>
      </div>

      <div style="text-align: center;">
        <h4 style="margin-bottom: 16px;">默认尺寸按钮（size="default"）</h4>
        <nv-popconfirm
          .label="${ '确定要删除吗？' }"
          .confirmButtonSize="${ 'default' }"
          .cancelButtonSize="${ 'default' }"
          @confirm="${ () => {
            console.log('✅ 确认事件触发 - 默认尺寸按钮');
            Message.success({ message: '已删除', duration: 2000 });
          } }"
          @cancel="${ () => {
            console.log('❌ 取消事件触发');
            Message.info({ message: '已取消', duration: 2000 });
          } }"
        >
          <nv-button type="danger">删除</nv-button>
        </nv-popconfirm>
      </div>

      <div style="text-align: center;">
        <h4 style="margin-bottom: 16px;">小尺寸按钮（size="small"，默认）</h4>
        <nv-popconfirm
          .label="${ '确定要删除吗？' }"
          .confirmButtonSize="${ 'small' }"
          .cancelButtonSize="${ 'small' }"
          @confirm="${ () => {
            console.log('✅ 确认事件触发 - 小尺寸按钮');
            Message.success({ message: '已删除', duration: 2000 });
          } }"
          @cancel="${ () => {
            console.log('❌ 取消事件触发');
            Message.info({ message: '已取消', duration: 2000 });
          } }"
        >
          <nv-button type="danger">删除</nv-button>
        </nv-popconfirm>
      </div>

      <div style="text-align: center;">
        <h4 style="margin-bottom: 16px;">混合尺寸（确认大，取消小）</h4>
        <nv-popconfirm
          .label="${ '确定要删除吗？' }"
          .confirmButtonSize="${ 'large' }"
          .cancelButtonSize="${ 'small' }"
          .confirmButtonType="${ 'danger' }"
          @confirm="${ () => {
            console.log('✅ 确认事件触发 - 混合尺寸');
            Message.success({ message: '已删除', duration: 2000 });
          } }"
          @cancel="${ () => {
            console.log('❌ 取消事件触发');
            Message.info({ message: '已取消', duration: 2000 });
          } }"
        >
          <nv-button type="danger">删除</nv-button>
        </nv-popconfirm>
      </div>
    </div>
  `
};

export const WithDisabled: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 40px; justify-content: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <nv-popconfirm
          .label="${ '确定要删除吗？' }"
          .disabled=${ false }
          @confirm="${ () => {
            console.log('✅ 确认事件触发');
            Message.success({ message: '已删除', duration: 2000 });
          } }"
          @cancel="${ () => {
            console.log('❌ 取消事件触发');
            Message.info({ message: '已取消', duration: 2000 });
          } }"
        >
          <nv-button type="danger">正常状态</nv-button>
        </nv-popconfirm>
        <div style="margin-top: 12px; font-size: 12px; color: #67c23a;">✅ disabled=false（可点击）</div>
      </div>

      <div style="text-align: center;">
        <nv-popconfirm
          .label="${ '确定要删除吗？' }"
          .disabled=${ true }
          @confirm="${ () => {
            console.log('✅ 确认事件触发');
            Message.success({ message: '已删除', duration: 2000 });
          } }"
          @cancel="${ () => {
            console.log('❌ 取消事件触发');
            Message.info({ message: '已取消', duration: 2000 });
          } }"
        >
          <nv-button type="danger">禁用状态</nv-button>
        </nv-popconfirm>
        <div style="margin-top: 12px; font-size: 12px; color: #f56c6c;">❌ disabled=true（点击无效）</div>
      </div>

      <div style="text-align: center;">
        <nv-popconfirm
          .label="${ '确定要删除吗？' }"
          .disabled=${ true }
          .trigger="${ 'hover' }"
          @confirm="${ () => {
            console.log('✅ 确认事件触发');
            Message.success({ message: '已删除', duration: 2000 });
          } }"
        >
          <nv-button type="danger">禁用状态（悬停）</nv-button>
        </nv-popconfirm>
        <div style="margin-top: 12px; font-size: 12px; color: #f56c6c;">❌ disabled=true（悬停无效）</div>
      </div>

      <div style="text-align: center;">
        <nv-popconfirm
          .label="${ '按钮禁用 ≠ Popconfirm禁用' }"
          .disabled=${ false }
          @confirm="${ () => {
            console.log('✅ 确认事件触发');
            Message.success({ message: '已删除', duration: 2000 });
          } }"
        >
          <nv-button type="danger" .disabled=${ true }>按钮禁用</nv-button>
        </nv-popconfirm>
        <div style="margin-top: 12px; font-size: 12px; color: #909399;">
          ⚠️ 按钮禁用（按钮不可点击）<br/>
          但 Popconfirm 未禁用（如果按钮可点，弹窗会出现）
        </div>
      </div>
    </div>
  `
};
