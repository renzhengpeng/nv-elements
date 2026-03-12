import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../button/index';
import '../divider/index';
import readmeMd from './README.md?raw';

const meta: Meta = {
  title: 'Components/Modal',
  component: 'nv-modal',
  argTypes: {
    visible: {
      control: 'boolean',
      description: '是否显示对话框'
    },
    label: {
      control: 'text',
      description: '对话框标题'
    },
    width: {
      control: 'text',
      description: '对话框宽度'
    },
    showClose: {
      control: 'boolean',
      description: '是否显示关闭按钮'
    },
    closeOnClickModal: {
      control: 'boolean',
      description: '是否可以通过点击遮罩层关闭对话框'
    },
    center: {
      control: 'boolean',
      description: '是否居中显示'
    }
  }
};

export default meta;
type Story = StoryObj;

const readmeHtml = marked.parse(readmeMd) as string;
const commonStyles = `
  .readme-container { padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; line-height: 1.6; color: #333; }
  .readme-container h1 { font-size: 32px; font-weight: 600; margin: 0 0 16px 0; padding-bottom: 12px; border-bottom: 1px solid #eaecef; }
  .readme-container h2 { font-size: 24px; font-weight: 600; margin: 32px 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #eaecef; }
  .readme-container table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  .readme-container table th, .readme-container table td { border: 1px solid #dfe2e5; padding: 8px 12px; text-align: left; }
  .readme-container table th { background: #f6f8fa; font-weight: 600; }
  .story-section { margin: 32px 0; }
  .story-section h3 { font-size: 20px; font-weight: 600; margin: 0 0 16px 0; color: #333; }
  .story-section p { margin: 0 0 12px 0; color: #666; }
`;

export const Overview: Story = {
  render: () => html`
    <style>${ commonStyles }</style>
    <div class="readme-container">${ unsafeHTML(readmeHtml) }</div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>基础用法</h3>
      <p>Modal 的基本使用</p>
      ${ Default.render?.(Default.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>自定义底部</h3>
      <p>使用 footer 插槽自定义底部内容</p>
      ${ WithFooter.render?.(WithFooter.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>自定义标题</h3>
      <p>使用 header 插槽自定义标题内容</p>
      ${ CustomHeader.render?.(CustomHeader.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>居中显示</h3>
      <p>设置 center 属性使对话框居中显示</p>
      ${ CenterModal.render?.({} as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>自定义宽度</h3>
      <p>通过 width 属性设置对话框宽度</p>
      ${ CustomWidth.render?.({} as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>禁用关闭按钮</h3>
      <p>设置 showClose 为 false 隐藏关闭按钮</p>
      ${ NoCloseButton.render?.({} as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>禁用遮罩层关闭</h3>
      <p>设置 closeOnClickModal 为 false 禁用点击遮罩层关闭</p>
      ${ DisableModalClose.render?.({} as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>禁用 ESC 关闭</h3>
      <p>设置 closeOnPressEscape 为 false 禁用 ESC 键关闭</p>
      ${ DisableEscClose.render?.({} as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>事件监听</h3>
      <p>监听对话框的各种事件</p>
      ${ WithEvents.render?.({} as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>嵌套内容</h3>
      <p>在对话框中嵌套表单等复杂内容</p>
      ${ NestedContent.render?.({} as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>自定义类名</h3>
      <p>通过 customClass 属性为 Dialog 的根元素添加特定的 class</p>
      ${ CustomClass.render?.({} as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>不锁定滚动条</h3>
      <p>设置 lockScroll 为 false，当弹窗出现时，页面的滚动条不会被锁定</p>
      ${ LockScroll.render?.({} as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>插入至 Body</h3>
      <p>设置 appendToBody，弹窗将插入至 body 元素上，脱离原所在的包含块</p>
      ${ AppendToBody.render?.({} as any, {} as any) }
    </div>
  `
};

export const Default: Story = {
  render: (args) => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开对话框</nv-button>
      <nv-modal
        .visible="${ args.visible }"
        label="${ args.label }"
        width="${ args.width }"
        .showClose="${ args.showClose }"
        .closeOnClickModal="${ args.closeOnClickModal }"
        ?center="${ args.center }"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>这是一段内容</p>
        <p>这是另一段内容</p>
      </nv-modal>
    `;
  },
  args: {
    visible: false,
    label: '提示',
    width: '50%',
    showClose: true,
    closeOnClickModal: true,
    center: false
  }
};

export const WithFooter: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开对话框</nv-button>
      <nv-modal
        .visible="${ false }"
        label="提示"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>这是一段内容</p>
        <div slot="footer">
          <nv-button @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">取消</nv-button>
          <nv-button type="primary" @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">确定</nv-button>
        </div>
      </nv-modal>
    `;
  }
};

export const CustomHeader: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开对话框</nv-button>
      <nv-modal
        .visible="${ false }"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <div slot="header">
          <h2 style="margin: 0;">自定义标题</h2>
        </div>
        <p>这是一段内容</p>
      </nv-modal>
    `;
  }
};

export const CenterModal: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开居中对话框</nv-button>
      <nv-modal
        .visible="${ false }"
        label="居中对话框"
        center
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p style="text-align: center;">这是一个居中显示的对话框</p>
        <div slot="footer" style="text-align: center;">
          <nv-button @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">关闭</nv-button>
        </div>
      </nv-modal>
    `;
  }
};

export const CustomWidth: Story = {
  render: () => {
    return html`
      <div style="display: flex; gap: 12px;">
        <nv-button @click="${ (e: Event) => {
          const button = e.target as HTMLElement;
          const modal = button.parentElement?.querySelector('#modal-30') as any;
          if (modal) {
            modal.visible = true;
          }
        } }">30% 宽度</nv-button>
        <nv-button @click="${ (e: Event) => {
          const button = e.target as HTMLElement;
          const modal = button.parentElement?.querySelector('#modal-600') as any;
          if (modal) {
            modal.visible = true;
          }
        } }">600px 宽度</nv-button>
        <nv-button @click="${ (e: Event) => {
          const button = e.target as HTMLElement;
          const modal = button.parentElement?.querySelector('#modal-80') as any;
          if (modal) {
            modal.visible = true;
          }
        } }">80% 宽度</nv-button>
      </div>
      <nv-modal
        id="modal-30"
        .visible="${ false }"
        label="30% 宽度"
        width="30%"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>这是一个 30% 宽度的对话框</p>
      </nv-modal>
      <nv-modal
        id="modal-600"
        .visible="${ false }"
        label="600px 宽度"
        width="600px"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>这是一个 600px 宽度的对话框</p>
      </nv-modal>
      <nv-modal
        id="modal-80"
        .visible="${ false }"
        label="80% 宽度"
        width="80%"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>这是一个 80% 宽度的对话框</p>
      </nv-modal>
    `;
  }
};

export const NoCloseButton: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开无关闭按钮对话框</nv-button>
      <nv-modal
        .visible="${ false }"
        label="无关闭按钮"
        .showClose="${ false }"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>这个对话框没有关闭按钮，只能通过底部按钮或点击遮罩层关闭</p>
        <div slot="footer">
          <nv-button type="primary" @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">确定</nv-button>
        </div>
      </nv-modal>
    `;
  }
};

export const DisableModalClose: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开对话框</nv-button>
      <nv-modal
        .visible="${ false }"
        label="禁用遮罩层关闭"
        .closeOnClickModal="${ false }"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>点击遮罩层无法关闭此对话框，只能通过关闭按钮或底部按钮关闭</p>
        <div slot="footer">
          <nv-button type="primary" @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">确定</nv-button>
        </div>
      </nv-modal>
    `;
  }
};

export const DisableEscClose: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开对话框</nv-button>
      <nv-modal
        .visible="${ false }"
        label="禁用 ESC 关闭"
        .closeOnPressEscape="${ false }"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>按 ESC 键无法关闭此对话框</p>
        <div slot="footer">
          <nv-button type="primary" @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">确定</nv-button>
        </div>
      </nv-modal>
    `;
  }
};

export const WithEvents: Story = {
  render: () => {
    const handleShow = () => console.log('Modal 显示');
    const handleAfterShow = () => console.log('Modal 显示动画完成');
    const handleHide = () => console.log('Modal 隐藏');
    const handleAfterHide = () => console.log('Modal 隐藏动画完成');
    const handleClose = () => console.log('Modal 关闭');

    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开对话框（查看控制台）</nv-button>
      <nv-modal
        .visible="${ false }"
        label="事件监听"
        @nv-show="${ handleShow }"
        @nv-after-show="${ handleAfterShow }"
        @nv-hide="${ handleHide }"
        @nv-after-hide="${ handleAfterHide }"
        @nv-close="${ (e: Event) => {
          handleClose();
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>打开和关闭对话框时，会在控制台输出事件信息</p>
        <ul>
          <li>nv-show: 模态框弹出时触发</li>
          <li>nv-after-show: 模态框弹出且过渡效果完成后触发</li>
          <li>nv-hide: 模态框隐藏时触发</li>
          <li>nv-after-hide: 模态框隐藏且过渡效果完成后触发</li>
          <li>nv-close: 模态框关闭时触发</li>
        </ul>
        <div slot="footer">
          <nv-button type="primary" @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">确定</nv-button>
        </div>
      </nv-modal>
    `;
  }
};

export const NestedContent: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开对话框</nv-button>
      <nv-modal
        .visible="${ false }"
        label="嵌套内容"
        width="600px"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <div style="padding: 12px 0;">
          <h4 style="margin: 0 0 12px 0;">表单示例</h4>
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 4px;">用户名：</label>
            <input type="text" style="width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px;" placeholder="请输入用户名" />
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 4px;">邮箱：</label>
            <input type="email" style="width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px;" placeholder="请输入邮箱" />
          </div>
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 4px;">描述：</label>
            <textarea style="width: 100%; padding: 8px; border: 1px solid #dcdfe6; border-radius: 4px; resize: vertical;" rows="4" placeholder="请输入描述"></textarea>
          </div>
        </div>
        <div slot="footer">
          <nv-button @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">取消</nv-button>
          <nv-button type="primary" @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              alert('提交成功');
              modal.visible = false;
            }
          } }">提交</nv-button>
        </div>
      </nv-modal>
    `;
  }
};

export const CustomClass: Story = {
  render: () => {
    return html`
      <style>
        .my-custom-modal .nv-modal__dialog {
          border: 2px dashed #409EFF;
          background-color: #f0f9eb;
        }
        .my-custom-modal .nv-modal__header-content {
          color: #67C23A;
        }
      </style>
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开自定义样式对话框</nv-button>
      <nv-modal
        .visible="${ false }"
        label="自定义样式"
        customClass="my-custom-modal"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>这个对话框使用了 customClass="my-custom-modal" 添加了自定义的 CSS 类，并在外部加上了对应的样式覆盖。</p>
        <div slot="footer">
          <nv-button type="primary" @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">确定</nv-button>
        </div>
      </nv-modal>
    `;
  }
};

export const LockScroll: Story = {
  render: () => {
    return html`
      <nv-button @click="${ (e: Event) => {
        const button = e.target as HTMLElement;
        const modal = button.nextElementSibling as any;
        if (modal && modal.tagName === 'NV-MODAL') {
          modal.visible = true;
        }
      } }">打开不锁定滚动的对话框</nv-button>
      <nv-modal
        .visible="${ false }"
        label="不锁定滚动"
        .lockScroll="${ false }"
        @nv-close="${ (e: Event) => {
          const modal = e.target as any;
          if (modal) {
            modal.visible = false;
          }
        } }"
      >
        <p>打开此对话框时，你可以尝试滚动浏览器背后的页面，它不会被锁定（通常需要页面足够长）。默认情况下，对话框打开会锁定背面页面滚动。</p>
        <div slot="footer">
          <nv-button type="primary" @click="${ (e: Event) => {
            const path = e.composedPath();
            const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
            if (modal) {
              modal.visible = false;
            }
          } }">确定</nv-button>
        </div>
      </nv-modal>
    `;
  }
};

export const AppendToBody: Story = {
  render: () => {
    return html`
      <div style="width: 100%; height: 150px; overflow: hidden; border: 1px solid #dcdfe6; padding: 20px; box-sizing: border-box; background: #fafafa; position: relative;">
        <p style="margin-top: 0;">这个虚线框是一个具有 <code>overflow: hidden</code> 属性的容器。</p>
        <nv-button @click="${ (e: Event) => {
          const button = e.target as HTMLElement;
          const modal = button.nextElementSibling as any;
          if (modal && modal.tagName === 'NV-MODAL') {
            modal.visible = true;
          }
        } }">打开插入 Body 的对话框</nv-button>
        <nv-modal
          .visible="${ false }"
          label="插入到 Body"
          .appendToBody="${ true }"
          @nv-close="${ (e: Event) => {
            const modal = e.target as any;
            if (modal) {
              modal.visible = false;
            }
          } }"
        >
          <p>虽然我写在拥有 overflow: hidden 的局部容器里，但因为设置了 <code>appendToBody=true</code>，我的 DOM 节点被追加到了 body 最外面，所以我不会被父容器裁剪掉。</p>
          <div slot="footer">
            <nv-button type="primary" @click="${ (e: Event) => {
              const path = e.composedPath();
              const modal = path.find((el: any) => el.tagName === 'NV-MODAL') as any;
              if (modal) {
                modal.visible = false;
              }
            } }">确定</nv-button>
          </div>
        </nv-modal>
      </div>
    `;
  }
};
