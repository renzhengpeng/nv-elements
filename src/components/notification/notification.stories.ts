import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../button/index';
import '../divider/index';
import { Notification } from './notification';
import readmeMd from './README.md?raw';

// 解析 README
const readmeHtml = marked.parse(readmeMd) as string;

const meta: Meta = {
  title: 'Components/Notification',
  component: 'nv-notification',
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'info', 'error'],
      description: '通知类型'
    },
    label: {
      control: 'text',
      description: '标题'
    },
    message: {
      control: 'text',
      description: '消息内容'
    },
    duration: {
      control: 'number',
      description: '显示时间，毫秒。设为 0 则不会自动关闭'
    },
    showClose: {
      control: 'boolean',
      description: '是否显示关闭按钮'
    },
    showIcon: {
      control: 'boolean',
      description: '是否显示图标'
    },
    icon: {
      control: 'text',
      description: '自定义图标名称'
    },
    closeIcon: {
      control: 'text',
      description: '自定义关闭图标名称'
    },
    zIndex: {
      control: 'number',
      description: '层级'
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
          <h3 class="example-title">不同类型</h3>
          <p class="example-desc">提供成功、信息、警告、错误四种类型</p>
          <div class="example-demo">
            ${ Types.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">带图标</h3>
          <p class="example-desc">设置 showIcon 属性可以显示图标</p>
          <div class="example-demo">
            ${ WithIcon.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">无标题</h3>
          <p class="example-desc">可以不设置标题</p>
          <div class="example-demo">
            ${ WithoutTitle.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">自定义显示时长</h3>
          <p class="example-desc">通过 duration 属性设置显示时长</p>
          <div class="example-demo">
            ${ Duration.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">完整示例</h3>
          <p class="example-desc">展示所有功能的综合示例</p>
          <div class="example-demo">
            ${ Complex.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">多个通知堆叠</h3>
          <p class="example-desc">多个通知会自动堆叠显示，不会重叠</p>
          <div class="example-demo">
            ${ Multiple.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">不同位置</h3>
          <p class="example-desc">支持四个角落的弹出位置</p>
          <div class="example-demo">
            ${ Positions.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">自定义 Slot</h3>
          <p class="example-desc">使用 label 和 content slot 自定义 HTML 内容</p>
          <div class="example-demo">
            ${ CustomSlots.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">自定义图标</h3>
          <p class="example-desc">通过 icon 属性或 icon slot 自定义图标</p>
          <div class="example-demo">
            ${ CustomIcon.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">直接使用元素</h3>
          <p class="example-desc">直接创建 nv-notification 元素，位置会自动设置默认值，不受页面内容影响</p>
          <div class="example-demo">
            ${ DirectElement.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">层级和自定义关闭图标</h3>
          <p class="example-desc">通过 zIndex 控制层级，通过 closeIcon 自定义关闭图标</p>
          <div class="example-demo">
            ${ ZIndexAndCloseIcon.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">事件监听</h3>
          <p class="example-desc">监听 nv-close 和 nv-after-close 事件</p>
          <div class="example-demo">
            ${ Events.render?.({} as any, {} as any) }
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
    <div>
      <nv-button
        @click="${ () => {
          Notification({
            type: args.type,
            label: args.label,
            message: args.message,
            duration: args.duration,
            closable: args.showClose,
            showIcon: args.showIcon
          });
        } }"
      >
        显示通知
      </nv-button>
    </div>
  `,
  args: {
    type: 'info',
    label: '通知标题',
    message: '这是一条通知消息',
    duration: 4500,
    showClose: true,
    showIcon: false
  }
};

export const Types: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        @click="${ () => Notification.success({ label: '成功', message: '这是一条成功通知' }) }"
      >
        成功
      </nv-button>
      <nv-button
        @click="${ () => Notification.info({ label: '信息', message: '这是一条信息通知' }) }"
      >
        信息
      </nv-button>
      <nv-button
        @click="${ () => Notification.warning({ label: '警告', message: '这是一条警告通知' }) }"
      >
        警告
      </nv-button>
      <nv-button
        @click="${ () => Notification.error({ label: '错误', message: '这是一条错误通知' }) }"
      >
        错误
      </nv-button>
    </div>
  `
};

export const WithIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        @click="${ () => Notification({ type: 'success', label: '成功', message: '这是一条成功通知', showIcon: true }) }"
      >
        成功（带图标）
      </nv-button>
      <nv-button
        @click="${ () => Notification({ type: 'info', label: '信息', message: '这是一条信息通知', showIcon: true }) }"
      >
        信息（带图标）
      </nv-button>
      <nv-button
        @click="${ () => Notification({ type: 'warning', label: '警告', message: '这是一条警告通知', showIcon: true }) }"
      >
        警告（带图标）
      </nv-button>
      <nv-button
        @click="${ () => Notification({ type: 'error', label: '错误', message: '这是一条错误通知', showIcon: true }) }"
      >
        错误（带图标）
      </nv-button>
    </div>
  `
};

export const WithoutTitle: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        @click="${ () => Notification({ type: 'info', message: '这是一条没有标题的通知' }) }"
      >
        无标题
      </nv-button>
      <nv-button
        @click="${ () => Notification({ type: 'info', message: '这是一条没有标题的通知（带图标）', showIcon: true }) }"
      >
        无标题（带图标）
      </nv-button>
    </div>
  `
};

export const Duration: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        @click="${ () => Notification({ type: 'info', label: '通知', message: '3秒后关闭', duration: 3000 }) }"
      >
        3秒关闭
      </nv-button>
      <nv-button
        @click="${ () => Notification({ type: 'info', label: '通知', message: '5秒后关闭', duration: 5000 }) }"
      >
        5秒关闭
      </nv-button>
      <nv-button
        @click="${ () => Notification({ type: 'info', label: '通知', message: '不会自动关闭', duration: 0 }) }"
      >
        不自动关闭
      </nv-button>
    </div>
  `
};

export const Complex: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        @click="${ () => Notification({
          type: 'success',
          label: '成功',
          message: '这是一条成功通知，包含详细的信息内容',
          showIcon: true,
          closable: true,
          duration: 4500
        }) }"
      >
        完整示例
      </nv-button>
    </div>
  `
};

export const Multiple: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        type="success"
        @click="${ () => {
          Notification.success({ label: '成功', message: '第一条成功通知', duration: 0 });
          setTimeout(() => Notification.success({ label: '成功', message: '第二条成功通知', duration: 0 }), 100);
          setTimeout(() => Notification.success({ label: '成功', message: '第三条成功通知', duration: 0 }), 200);
        } }"
      >
        连续显示3条通知
      </nv-button>
      <nv-button
        type="danger"
        @click="${ () => Notification.closeAll() }"
      >
        关闭所有通知
      </nv-button>
    </div>
  `
};

export const Positions: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        @click="${ () => Notification({
          label: '右上角',
          message: '这是右上角的通知',
          position: 'top-right',
          duration: 0
        }) }"
      >
        右上角
      </nv-button>
      <nv-button
        @click="${ () => Notification({
          label: '左上角',
          message: '这是左上角的通知',
          position: 'top-left',
          duration: 0
        }) }"
      >
        左上角
      </nv-button>
      <nv-button
        @click="${ () => Notification({
          label: '右下角',
          message: '这是右下角的通知',
          position: 'bottom-right',
          duration: 0
        }) }"
      >
        右下角
      </nv-button>
      <nv-button
        @click="${ () => Notification({
          label: '左下角',
          message: '这是左下角的通知',
          position: 'bottom-left',
          duration: 0
        }) }"
      >
        左下角
      </nv-button>
      <nv-button
        type="danger"
        @click="${ () => Notification.closeAll() }"
      >
        关闭所有
      </nv-button>
    </div>
  `
};

export const CustomSlots: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        type="primary"
        @click="${ () => {
          const notification = document.createElement('nv-notification');
          notification.type = 'success';
          notification.showIcon = true;
          notification.closable = true;
          notification.duration = 0;
          notification.label = ''; // 设置空 label 以触发标题容器渲染
          
          // 使用 label slot 自定义标题
          const labelContent = document.createElement('span');
          labelContent.slot = 'label';
          labelContent.innerHTML = '<strong style="color: #67c23a;">自定义标题</strong> <em style="color: #909399;">with HTML</em>';
          notification.appendChild(labelContent);
          
          // 使用 content slot 自定义内容
          const contentDiv = document.createElement('div');
          contentDiv.slot = 'content';
          contentDiv.innerHTML = '<p style="margin: 0 0 8px 0;">这是使用 <code style="background: #f5f7fa; padding: 2px 6px; border-radius: 2px;">slot</code> 自定义的内容</p><ul style="margin: 0; padding-left: 20px;"><li>支持任意 HTML</li><li>完全自定义样式</li><li>灵活度更高</li></ul>';
          notification.appendChild(contentDiv);
          
          document.body.appendChild(notification);
        } }"
      >
        自定义 HTML 内容
      </nv-button>

      <nv-button
        type="warning"
        @click="${ () => {
          const notification = document.createElement('nv-notification');
          notification.type = 'warning';
          notification.showIcon = true;
          notification.closable = true;
          notification.duration = 0;
          
          // 只使用 content slot，不设置 label
          const contentDiv = document.createElement('div');
          contentDiv.slot = 'content';
          contentDiv.innerHTML = '<div style="font-weight: bold; margin-bottom: 4px;">⚠️ 无标题通知</div><div>只使用 content slot，没有 label 的情况</div>';
          notification.appendChild(contentDiv);
          
          document.body.appendChild(notification);
        } }"
      >
        仅自定义内容
      </nv-button>

      <nv-button
        @click="${ () => {
          const notification = document.createElement('nv-notification');
          notification.type = 'info';
          notification.showIcon = true;
          notification.closable = true;
          notification.duration = 0;
          notification.label = ''; // 设置空 label 以触发标题容器渲染
          
          // 使用 label slot，保留默认 content
          const labelContent = document.createElement('span');
          labelContent.slot = 'label';
          labelContent.innerHTML = '🎉 <span style="color: #409eff; font-size: 16px;">庆祝通知</span>';
          notification.appendChild(labelContent);
          
          notification.message = '这是普通的文本内容，标题使用了自定义 HTML';
          
          document.body.appendChild(notification);
        } }"
      >
        混合使用
      </nv-button>
      
      <nv-button
        type="danger"
        @click="${ () => Notification.closeAll() }"
      >
        关闭所有
      </nv-button>
    </div>
  `
};

export const CustomIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        type="primary"
        @click="${ () => {
          Notification({
            label: '使用 icon 属性',
            message: '通过 icon 属性自定义图标名称',
            type: 'info',
            icon: 'menu',
            duration: 0
          });
        } }"
      >
        使用 icon 属性
      </nv-button>

      <nv-button
        type="success"
        @click="${ () => {
          const notification = document.createElement('nv-notification');
          notification.type = 'success';
          notification.label = '使用 icon slot';
          notification.message = '通过 icon slot 自定义图标内容';
          notification.duration = 0;
          
          // 使用 icon slot 自定义图标
          const iconContent = document.createElement('span');
          iconContent.slot = 'icon';
          iconContent.innerHTML = '🎉';
          iconContent.style.fontSize = '24px';
          notification.appendChild(iconContent);
          
          document.body.appendChild(notification);
        } }"
      >
        使用 icon slot (emoji)
      </nv-button>

      <nv-button
        type="warning"
        @click="${ () => {
          const notification = document.createElement('nv-notification');
          notification.type = 'warning';
          notification.label = '自定义 nv-icon';
          notification.message = '在 icon slot 中使用其他图标组件';
          notification.duration = 0;
          
          // 使用 icon slot 放置自定义 nv-icon
          const iconElement = document.createElement('nv-icon');
          iconElement.slot = 'icon';
          iconElement.setAttribute('name', 'setting');
          iconElement.style.fontSize = '20px';
          iconElement.style.color = '#e6a23c';
          notification.appendChild(iconElement);
          
          document.body.appendChild(notification);
        } }"
      >
        使用 icon slot (nv-icon)
      </nv-button>

      <nv-button
        @click="${ () => {
          Notification({
            label: '默认图标',
            message: '不设置 icon 属性时，根据 type 自动显示对应图标',
            type: 'error',
            duration: 0
          });
        } }"
      >
        默认图标 (根据 type)
      </nv-button>
      
      <nv-button
        type="danger"
        @click="${ () => Notification.closeAll() }"
      >
        关闭所有
      </nv-button>
    </div>
  `
};

export const DirectElement: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        type="primary"
        @click="${ () => {
          const notification = document.createElement('nv-notification');
          notification.type = 'success';
          notification.label = '直接使用元素';
          notification.message = '这是直接创建的 nv-notification 元素，位置会自动设置默认值';
          notification.showIcon = true;
          notification.closable = true;
          notification.duration = 0;
          notification.position = 'top-right';
          document.body.appendChild(notification);
        } }"
      >
        直接使用元素（右上）
      </nv-button>
      
      <nv-button
        @click="${ () => {
          const notification = document.createElement('nv-notification');
          notification.type = 'info';
          notification.label = '左下角';
          notification.message = '即使不通过 Notification() 函数创建，位置也不会受页面内容影响';
          notification.showIcon = true;
          notification.closable = true;
          notification.duration = 0;
          notification.position = 'bottom-left';
          document.body.appendChild(notification);
        } }"
      >
        直接使用元素（左下）
      </nv-button>
      
      <nv-button
        type="danger"
        @click="${ () => {
          document.querySelectorAll('nv-notification').forEach(el => el.remove());
        } }"
      >
        清除所有
      </nv-button>
    </div>
  `
};

export const ZIndexAndCloseIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <nv-button
        type="primary"
        @click="${ () => {
          Notification({
            label: '高层级通知',
            message: 'zIndex 设置为 3000',
            type: 'info',
            zIndex: 3000,
            duration: 0
          });
        } }"
      >
        高层级 (zIndex: 3000)
      </nv-button>

      <nv-button
        @click="${ () => {
          Notification({
            label: '低层级通知',
            message: 'zIndex 设置为 1000',
            type: 'warning',
            zIndex: 1000,
            duration: 0
          });
        } }"
      >
        低层级 (zIndex: 1000)
      </nv-button>

      <nv-button
        type="success"
        @click="${ () => {
          Notification({
            label: '自定义关闭图标',
            message: '使用 delete 图标作为关闭按钮',
            type: 'success',
            closeIcon: 'delete',
            duration: 0
          });
        } }"
      >
        自定义关闭图标
      </nv-button>

      <nv-button
        type="danger"
        @click="${ () => Notification.closeAll() }"
      >
        关闭所有
      </nv-button>
    </div>
  `
};

export const Events: Story = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: flex-start;">
      <div style="flex: 1; min-width: 200px;">
        <nv-button
          type="primary"
          @click="${ () => {
            const notification = Notification({
              label: '监听事件',
              message: '打开控制台查看事件日志',
              type: 'info',
              duration: 3000
            });

            notification.addEventListener('nv-close', (e) => {
              console.log('🔔 nv-close 事件触发', (e as CustomEvent).detail);
              const log = document.getElementById('event-log');
              if (log) {
                log.innerHTML += '<div style="color: #409eff;">✓ nv-close 事件触发</div>';
              }
            });

            notification.addEventListener('nv-after-close', (e) => {
              console.log('✅ nv-after-close 事件触发', (e as CustomEvent).detail);
              const log = document.getElementById('event-log');
              if (log) {
                log.innerHTML += '<div style="color: #67c23a;">✓ nv-after-close 事件触发（动画完成）</div>';
              }
            });
          } }"
        >
          显示通知（3秒后自动关闭）
        </nv-button>
        
        <nv-button
          type="danger"
          @click="${ () => {
            const log = document.getElementById('event-log');
            if (log) log.innerHTML = '';
          } }"
        >
          清空日志
        </nv-button>
      </div>
      
      <div 
        id="event-log" 
        style="flex: 1; min-width: 300px; padding: 12px; background: #f5f7fa; border-radius: 4px; font-family: monospace; font-size: 12px; max-height: 200px; overflow-y: auto;"
      >
        <div style="color: #909399;">事件日志将显示在这里...</div>
      </div>
    </div>
  `
};
