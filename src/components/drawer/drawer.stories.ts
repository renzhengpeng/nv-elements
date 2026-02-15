import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../divider/index';
import '../button/index';
import '../icon/index';
import readmeMd from './README.md?raw';

// 解析 README
const readmeHtml = marked.parse(readmeMd) as string;

const meta: Meta = {
  title: 'Components/Drawer',
  component: 'nv-drawer',
  argTypes: {
    visible: {
      control: 'boolean',
      description: '是否显示抽屉'
    },
    label: {
      control: 'text',
      description: '抽屉标题'
    },
    direction: {
      control: 'select',
      options: ['rtl', 'ltr', 'ttb', 'btt'],
      description: '抽屉的方向'
    },
    size: {
      control: 'text',
      description: '抽屉的尺寸（宽度或高度）'
    },
    showClose: {
      control: 'boolean',
      description: '是否显示关闭按钮'
    },
    closeOnClickModal: {
      control: 'boolean',
      description: '是否可以通过点击遮罩层关闭抽屉'
    },
    closeOnPressEscape: {
      control: 'boolean',
      description: '是否可以通过按下 ESC 关闭抽屉'
    },
    lockScroll: {
      control: 'boolean',
      description: '是否在抽屉出现时将 body 滚动锁定'
    },
    mask: {
      control: 'boolean',
      description: '是否显示遮罩层'
    },
    customClass: {
      control: 'text',
      description: '抽屉的自定义类名'
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
          <h3 class="example-title">Left</h3>
          <p class="example-desc">Left 示例</p>
          <div class="example-demo">
            ${ Left.render?.(Left.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Top</h3>
          <p class="example-desc">Top 示例</p>
          <div class="example-demo">
            ${ Top.render?.(Top.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Bottom</h3>
          <p class="example-desc">Bottom 示例</p>
          <div class="example-demo">
            ${ Bottom.render?.(Bottom.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Custom Width</h3>
          <p class="example-desc">Custom Width 示例</p>
          <div class="example-demo">
            ${ CustomWidth.render?.(CustomWidth.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">No mask</h3>
          <p class="example-desc">No mask 示例</p>
          <div class="example-demo">
            ${ NoMask.render?.(NoMask.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">No Close Button</h3>
          <p class="example-desc">No Close Button 示例</p>
          <div class="example-demo">
            ${ NoCloseButton.render?.(NoCloseButton.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Disable Click Modal</h3>
          <p class="example-desc">Disable Click Modal 示例</p>
          <div class="example-demo">
            ${ DisableClickModal.render?.(DisableClickModal.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Disable Press Escape</h3>
          <p class="example-desc">Disable Press Escape 示例</p>
          <div class="example-demo">
            ${ DisablePressEscape.render?.(DisablePressEscape.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Custom Header</h3>
          <p class="example-desc">Custom Header 示例</p>
          <div class="example-demo">
            ${ CustomHeader.render?.(CustomHeader.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">With Footer</h3>
          <p class="example-desc">With Footer 示例</p>
          <div class="example-demo">
            ${ WithFooter.render?.(WithFooter.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">Long Content</h3>
          <p class="example-desc">Long Content 示例</p>
          <div class="example-demo">
            ${ LongContent.render?.(LongContent.args || { }, { } as any) }
          </div>
        </div>


        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">No Lock Scroll</h3>
          <p class="example-desc">No Lock Scroll 示例</p>
          <div class="example-demo">
            ${ NoLockScroll.render?.(NoLockScroll.args || { }, { } as any) }
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
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">打开抽屉</nv-button>
      <nv-drawer
        .visible="${ args.visible }"
        label="${ args.label }"
        direction="${ args.direction }"
        .size="${ args.size }"
        .showClose="${ args.showClose }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这是一段内容</p>
        <p>这是另一段内容</p>
      </nv-drawer>
    `;
  },
  args: {
    visible: false,
    label: '标题',
    direction: 'rtl',
    size: '30%',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    lockScroll: true,
    mask: true,
    customClass: ''
  }
};

export const Left: Story = {
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">从左侧打开</nv-button>
      <nv-drawer
        .visible="${ args.visible ?? false }"
        label="${ args.label ?? '标题' }"
        direction="${ args.direction ?? 'ltr' }"
        .size="${ args.size ?? '30%' }"
        .showClose="${ args.showClose ?? true }"
        .closeOnClickModal="${ args.closeOnClickModal ?? true }"
        .closeOnPressEscape="${ args.closeOnPressEscape ?? true }"
        .lockScroll="${ args.lockScroll ?? true }"
        .mask="${ args.mask ?? true }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这是从左侧打开的抽屉</p>
      </nv-drawer>
    `;
  },
  args: {
    visible: false,
    label: '标题',
    direction: 'ltr',
    size: '30%',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    lockScroll: true,
    mask: true,
    customClass: ''
  }
};

export const Top: Story = {
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">从顶部打开</nv-button>
      <nv-drawer
        .visible="${ args.visible ?? false }"
        label="${ args.label ?? '标题' }"
        direction="${ args.direction ?? 'ttb' }"
        .size="${ args.size ?? '200px' }"
        .showClose="${ args.showClose ?? true }"
        .closeOnClickModal="${ args.closeOnClickModal ?? true }"
        .closeOnPressEscape="${ args.closeOnPressEscape ?? true }"
        .lockScroll="${ args.lockScroll ?? true }"
        .mask="${ args.mask ?? true }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这是从顶部打开的抽屉</p>
      </nv-drawer>
    `;
  },
  args: {
    visible: false,
    label: '标题',
    direction: 'ttb',
    size: '200px',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    lockScroll: true,
    mask: true,
    customClass: ''
  }
};

export const Bottom: Story = {
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">从底部打开</nv-button>
      <nv-drawer
        .visible="${ args.visible ?? false }"
        label="${ args.label ?? '标题' }"
        direction="${ args.direction ?? 'btt' }"
        .size="${ args.size ?? '200px' }"
        .showClose="${ args.showClose ?? true }"
        .closeOnClickModal="${ args.closeOnClickModal ?? true }"
        .closeOnPressEscape="${ args.closeOnPressEscape ?? true }"
        .lockScroll="${ args.lockScroll ?? true }"
        .mask="${ args.mask ?? true }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这是从底部打开的抽屉</p>
      </nv-drawer>
    `;
  },
  args: {
    visible: false,
    label: '标题',
    direction: 'btt',
    size: '200px',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    lockScroll: true,
    mask: true,
    customClass: ''
  }
};

export const CustomWidth: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">打开 50% 尺寸的抽屉</nv-button>
      <nv-drawer
        .visible="${ false }"
        label="50% 尺寸"
        .size="${ '50%' }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这个抽屉的宽度是 50%</p>
        <p>可以根据需要设置不同的尺寸</p>
      </nv-drawer>

      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }" style="margin-left: 10px;">打开 400px 尺寸的抽屉</nv-button>
      <nv-drawer
        .visible="${ false }"
        label="400px 尺寸"
        .size="${ '400px' }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这个抽屉的宽度是固定的 400px</p>
      </nv-drawer>
    `;
  }
};

export const NoMask: Story = {
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">打开无遮罩的抽屉</nv-button>
      <nv-drawer
        .visible="${ args.visible }"
        label="${ args.label }"
        direction="${ args.direction }"
        .size="${ args.size }"
        .showClose="${ args.showClose }"
        .closeOnClickModal="${ args.closeOnClickModal }"
        .closeOnPressEscape="${ args.closeOnPressEscape }"
        .lockScroll="${ args.lockScroll }"
        .mask="${ args.mask }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这个抽屉没有遮罩层</p>
        <p>可以与页面内容交互</p>
      </nv-drawer>
    `;
  },
  args: {
    visible: false,
    label: '无遮罩层',
    direction: 'rtl',
    size: '30%',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    lockScroll: true,
    mask: false,
    customClass: ''
  }
};

export const NoCloseButton: Story = {
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">打开抽屉（无关闭按钮）</nv-button>
      <nv-drawer
        .visible="${ args.visible }"
        label="${ args.label }"
        direction="${ args.direction }"
        .size="${ args.size }"
        .showClose="${ args.showClose }"
        .closeOnClickModal="${ args.closeOnClickModal }"
        .closeOnPressEscape="${ args.closeOnPressEscape }"
        .lockScroll="${ args.lockScroll }"
        .mask="${ args.mask }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这个抽屉没有关闭按钮</p>
        <p>只能通过点击遮罩层或按 ESC 键关闭</p>
      </nv-drawer>
    `;
  },
  args: {
    visible: false,
    label: '无关闭按钮',
    direction: 'rtl',
    size: '30%',
    showClose: false,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    lockScroll: true,
    mask: true,
    customClass: ''
  }
};

export const DisableClickModal: Story = {
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">打开抽屉（不可点击遮罩关闭）</nv-button>
      <nv-drawer
        .visible="${ args.visible }"
        label="${ args.label }"
        direction="${ args.direction }"
        .size="${ args.size }"
        .showClose="${ args.showClose }"
        .closeOnClickModal="${ args.closeOnClickModal }"
        .closeOnPressEscape="${ args.closeOnPressEscape }"
        .lockScroll="${ args.lockScroll }"
        .mask="${ args.mask }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这个抽屉不能通过点击遮罩层关闭</p>
        <p>只能通过关闭按钮或按 ESC 键关闭</p>
      </nv-drawer>
    `;
  },
  args: {
    visible: false,
    label: '不可点击遮罩关闭',
    direction: 'rtl',
    size: '30%',
    showClose: true,
    closeOnClickModal: false,
    closeOnPressEscape: true,
    lockScroll: true,
    mask: true,
    customClass: ''
  }
};

export const DisablePressEscape: Story = {
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">打开抽屉（不可按 ESC 关闭）</nv-button>
      <nv-drawer
        .visible="${ args.visible }"
        label="${ args.label }"
        direction="${ args.direction }"
        .size="${ args.size }"
        .showClose="${ args.showClose }"
        .closeOnClickModal="${ args.closeOnClickModal }"
        .closeOnPressEscape="${ args.closeOnPressEscape }"
        .lockScroll="${ args.lockScroll }"
        .mask="${ args.mask }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这个抽屉不能通过按 ESC 键关闭</p>
        <p>只能通过关闭按钮或点击遮罩层关闭</p>
      </nv-drawer>
    `;
  },
  args: {
    visible: false,
    label: '不可按 ESC 关闭',
    direction: 'rtl',
    size: '30%',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: false,
    lockScroll: true,
    mask: true,
    customClass: ''
  }
};

export const CustomHeader: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">打开自定义头部的抽屉</nv-button>
      <nv-drawer
        .visible="${ false }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <div slot="header" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <div style="display: flex; align-items: center;">
            <nv-icon name="setting" style="margin-right: 8px;"></nv-icon>
            <span style="font-size: 18px; font-weight: 500;">自定义标题</span>
          </div>
          <nv-button size="small" text @click="${ (e: Event) => {
            const path = e.composedPath();
            const drawer = path.find((el: any) => el.tagName === 'NV-DRAWER') as any;
            if (drawer) {
              drawer.visible = false;
            }
          } }">
            <nv-icon name="close"></nv-icon>
          </nv-button>
        </div>
        <p>这是一个自定义头部的抽屉</p>
        <p>可以在头部放置任何内容</p>
      </nv-drawer>
    `;
  }
};

export const WithFooter: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">打开抽屉</nv-button>
      <nv-drawer
        .visible="${ false }"
        label="提交信息"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这是一段内容</p>
        <p>请确认是否提交</p>
        <div slot="footer">
          <nv-button @click="${ (e: Event) => {
            const path = e.composedPath();
            const drawer = path.find((el: any) => el.tagName === 'NV-DRAWER') as any;
            if (drawer) {
              drawer.visible = false;
            }
          } }">取消</nv-button>
          <nv-button type="primary" @click="${ (e: Event) => {
            const path = e.composedPath();
            const drawer = path.find((el: any) => el.tagName === 'NV-DRAWER') as any;
            if (drawer) {
              drawer.visible = false;
            }
          } }">确定</nv-button>
        </div>
      </nv-drawer>
    `;
  }
};

export const LongContent: Story = {
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const drawer = button.nextElementSibling as any;
        if (drawer && drawer.tagName === 'NV-DRAWER') {
          drawer.visible = true;
        }
      } }">打开长内容抽屉</nv-button>
      <nv-drawer
        .visible="${ args.visible }"
        label="${ args.label }"
        direction="${ args.direction }"
        .size="${ args.size }"
        .showClose="${ args.showClose }"
        .closeOnClickModal="${ args.closeOnClickModal }"
        .closeOnPressEscape="${ args.closeOnPressEscape }"
        .lockScroll="${ args.lockScroll }"
        .mask="${ args.mask }"
        @close="${ (e: Event) => {
          const drawer = e.target as any;
          if (drawer) {
            drawer.visible = false;
          }
        } }"
      >
        <p>这是一段很长的内容，用于测试滚动效果。</p>
        ${ Array.from({ length: 30 }, (_, i) => html`<p>第 ${ i + 1 } 段内容</p>`) }
      </nv-drawer>
    `;
  },
  args: {
    visible: false,
    label: '长内容滚动',
    direction: 'rtl',
    size: '30%',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    lockScroll: true,
    mask: true,
    customClass: ''
  }
};

export const NoLockScroll: Story = {
  render: (args) => {
    return html`
      <div style="height: 150vh; padding: 20px;">
        <nv-button @click="${ (e: Event) => {
          const button = e.target as HTMLElement;
          const drawer = button.nextElementSibling as any;
          if (drawer && drawer.tagName === 'NV-DRAWER') {
            drawer.visible = true;
          }
        } }">打开抽屉（不锁定滚动）</nv-button>
        <nv-drawer
          .visible="${ args.visible }"
          label="${ args.label }"
          direction="${ args.direction }"
          .size="${ args.size }"
          .showClose="${ args.showClose }"
          .closeOnClickModal="${ args.closeOnClickModal }"
          .closeOnPressEscape="${ args.closeOnPressEscape }"
          .lockScroll="${ args.lockScroll }"
          .mask="${ args.mask }"
          @close="${ (e: Event) => {
            const drawer = e.target as any;
            if (drawer) {
              drawer.visible = false;
            }
          } }"
        >
          <p>这个抽屉打开时不会锁定页面滚动</p>
          <p>可以滚动背景页面</p>
        </nv-drawer>
        <p style="margin-top: 20px;">向下滚动查看效果...</p>
      </div>
    `;
  },
  args: {
    visible: false,
    label: '不锁定页面滚动',
    direction: 'rtl',
    size: '30%',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    lockScroll: false,
    mask: true,
    customClass: ''
  }
};
