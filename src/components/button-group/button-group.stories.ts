import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../divider/index';
import '../button/index';
import readmeMd from './README.md?raw';

// 解析 README
const readmeHtml = marked.parse(readmeMd) as string;

const meta: Meta = {
  title: 'Components/ButtonGroup',
  component: 'nv-button-group',
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    size: {
      control: 'select',
      options: ['mini', 'small', 'medium', 'large', 'huge'],
      description: '按钮组尺寸'
    },
    activeKey: {
      control: 'text',
      description: '当前激活的按钮的 key'
    },
    vertical: {
      control: 'boolean',
      description: '是否垂直排列'
    },
    buttonWidth: {
      control: 'text',
      description: '按钮宽度（水平和垂直模式都支持。垂直模式下不设置时自动统一宽度，水平模式下不设置时保持自然宽度）'
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
          <h3 class="example-title">基础用法</h3>
          <p class="example-desc">基础的、简洁的按钮组</p>
          <div class="example-demo">
            ${ Basic.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">不同类型</h3>
          <p class="example-desc">按钮组支持不同类型的按钮组合，每个按钮可以设置不同的 type 属性</p>
          <div class="example-demo">
            ${ WithTypes.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">禁用状态</h3>
          <p class="example-desc">通过 disabled 属性可以禁用整个按钮组内的所有按钮</p>
          <div class="example-demo">
            ${ Disabled.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">带图标的按钮组</h3>
          <p class="example-desc">按钮组中的按钮可以包含图标，通过 icon 属性设置</p>
          <div class="example-demo">
            ${ WithIcons.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">不同尺寸</h3>
          <p class="example-desc">通过 size 属性统一控制按钮组内所有按钮的尺寸，支持 mini / small / medium / large / huge</p>
          <div class="example-demo">
            ${ WithSizes.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">激活状态</h3>
          <p class="example-desc">通过 active-key 属性控制当前激活的按钮，点击按钮会自动更新激活状态</p>
          <div class="example-demo">
            ${ ActiveKey.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">圆形图标按钮组</h3>
          <p class="example-desc">按钮组可以包含圆形图标按钮</p>
          <div class="example-demo">
            ${ CircleIcons.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">朴素按钮组</h3>
          <p class="example-desc">按钮组可以包含朴素按钮</p>
          <div class="example-demo">
            ${ PlainButtons.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">统一按钮宽度</h3>
          <p class="example-desc">通过 button-width 属性统一按钮宽度，水平和垂直模式都支持。不设置时自动以最宽按钮的宽度为准</p>
          <div class="example-demo">
            ${ ButtonWidth.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">垂直模式</h3>
          <p class="example-desc">设置 vertical 属性可以让按钮组垂直排列</p>
          <div class="example-demo">
            ${ Vertical.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">使用场景</h3>
          <p class="example-desc">展示按钮组在实际应用中的常见用法</p>
          <div class="example-demo">
            ${ UsageScenarios.render?.({} as any, {} as any) }
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
        .readme-content h3 {
          color: #303133;
          font-size: 18px;
          font-weight: 600;
          margin: 24px 0 12px 0;
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
    <nv-button-group
      ?disabled="${ args.disabled }"
      ?vertical="${ args.vertical }"
      .size="${ args.size }"
      .buttonWidth="${ args.buttonWidth }"
    >
      <nv-button>按钮1</nv-button>
      <nv-button>按钮2</nv-button>
      <nv-button>按钮3</nv-button>
    </nv-button-group>
  `,
  args: {
    disabled: false,
    size: 'medium',
    vertical: false,
    buttonWidth: ''
  }
};

export const Basic: Story = {
  render: () => html`
    <nv-button-group>
      <nv-button>按钮1</nv-button>
      <nv-button>按钮2</nv-button>
      <nv-button>按钮3</nv-button>
    </nv-button-group>
  `
};

export const WithTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <nv-button-group>
        <nv-button type="primary">主要</nv-button>
        <nv-button type="success">成功</nv-button>
        <nv-button type="info">信息</nv-button>
      </nv-button-group>
      <nv-button-group>
        <nv-button type="warning">警告</nv-button>
        <nv-button type="danger">危险</nv-button>
      </nv-button-group>
    </div>
  `
};

export const Disabled: Story = {
  render: () => html`
    <nv-button-group disabled>
      <nv-button>按钮1</nv-button>
      <nv-button>按钮2</nv-button>
      <nv-button>按钮3</nv-button>
    </nv-button-group>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <nv-button-group>
      <nv-button icon="edit">编辑</nv-button>
      <nv-button icon="delete">删除</nv-button>
      <nv-button icon="share">分享</nv-button>
    </nv-button-group>
  `
};

/**
 * 不同尺寸的按钮组 - 通过 button-group 的 size 属性统一控制内部按钮尺寸
 */
export const WithSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">迷你尺寸 (mini):</p>
        <nv-button-group size="mini">
          <nv-button>按钮1</nv-button>
          <nv-button>按钮2</nv-button>
          <nv-button>按钮3</nv-button>
        </nv-button-group>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">小型尺寸 (small):</p>
        <nv-button-group size="small">
          <nv-button>按钮1</nv-button>
          <nv-button>按钮2</nv-button>
          <nv-button>按钮3</nv-button>
        </nv-button-group>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">中等尺寸 (medium - 默认):</p>
        <nv-button-group size="medium">
          <nv-button>按钮1</nv-button>
          <nv-button>按钮2</nv-button>
          <nv-button>按钮3</nv-button>
        </nv-button-group>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">大型尺寸 (large):</p>
        <nv-button-group size="large">
          <nv-button>按钮1</nv-button>
          <nv-button>按钮2</nv-button>
          <nv-button>按钮3</nv-button>
        </nv-button-group>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">超大尺寸 (huge):</p>
        <nv-button-group size="huge">
          <nv-button>按钮1</nv-button>
          <nv-button>按钮2</nv-button>
          <nv-button>按钮3</nv-button>
        </nv-button-group>
      </div>
    </div>
  `
};

/**
 * 圆形图标按钮组
 */
export const CircleIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <nv-button-group>
        <nv-button circle icon="search"></nv-button>
        <nv-button circle icon="edit"></nv-button>
        <nv-button circle icon="delete"></nv-button>
        <nv-button circle icon="refresh"></nv-button>
      </nv-button-group>
      <nv-button-group>
        <nv-button type="primary" circle icon="search"></nv-button>
        <nv-button type="primary" circle icon="edit"></nv-button>
        <nv-button type="primary" circle icon="delete"></nv-button>
      </nv-button-group>
      <nv-button-group>
        <nv-button size="small" circle icon="search"></nv-button>
        <nv-button size="small" circle icon="setting"></nv-button>
        <nv-button size="small" circle icon="download"></nv-button>
      </nv-button-group>
    </div>
  `
};

/**
 * 激活状态 - 通过 active-key 属性控制当前激活的按钮
 */
export const ActiveKey: Story = {
  render: () => {
    // 创建一个容器来管理状态
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';

    // 基础示例
    const basicSection = document.createElement('div');
    basicSection.innerHTML = `
      <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">基础用法</h4>
      <p style="margin: 0 0 12px 0; color: #666; font-size: 14px;">为每个按钮设置 data-key 属性，通过 active-key 控制当前激活项</p>
      <nv-button-group id="basic-group" active-key="home">
        <nv-button data-key="home">首页</nv-button>
        <nv-button data-key="about">关于</nv-button>
        <nv-button data-key="contact">联系我们</nv-button>
      </nv-button-group>
      <p style="margin: 12px 0 0 0; color: #909399; font-size: 13px;">当前激活: <span id="basic-active" style="color: #409EFF; font-weight: 500;">home</span></p>
    `;
    container.appendChild(basicSection);

    // 标签页示例
    const tabSection = document.createElement('div');
    tabSection.innerHTML = `
      <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">标签页导航</h4>
      <nv-button-group id="tab-group" active-key="tab1" size="small">
        <nv-button data-key="tab1">用户管理</nv-button>
        <nv-button data-key="tab2">角色管理</nv-button>
        <nv-button data-key="tab3">权限管理</nv-button>
        <nv-button data-key="tab4">日志管理</nv-button>
      </nv-button-group>
      <div style="margin-top: 16px; padding: 16px; background: #f5f7fa; border-radius: 4px;">
        <div id="tab-content" style="color: #606266; font-size: 14px;">当前显示: 用户管理</div>
      </div>
    `;
    container.appendChild(tabSection);

    // 视图切换示例
    const viewSection = document.createElement('div');
    viewSection.innerHTML = `
      <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">视图切换</h4>
      <nv-button-group id="view-group" active-key="list">
        <nv-button data-key="list" icon="list"></nv-button>
        <nv-button data-key="grid" icon="table"></nv-button>
        <nv-button data-key="timeline" icon="timeline"></nv-button>
      </nv-button-group>
      <p style="margin: 12px 0 0 0; color: #909399; font-size: 13px;">当前视图: <span id="view-active" style="color: #409EFF; font-weight: 500;">列表视图</span></p>
    `;
    container.appendChild(viewSection);

    // 添加事件监听
    setTimeout(() => {
      const basicGroup = container.querySelector('#basic-group');
      const basicActive = container.querySelector('#basic-active');
      basicGroup?.addEventListener('nv-active-change', (e: any) => {
        if (basicActive) basicActive.textContent = e.detail.activeKey;
      });

      const tabGroup = container.querySelector('#tab-group');
      const tabContent = container.querySelector('#tab-content');
      const tabMap: Record<string, string> = {
        tab1: '用户管理',
        tab2: '角色管理',
        tab3: '权限管理',
        tab4: '日志管理'
      };
      tabGroup?.addEventListener('nv-active-change', (e: any) => {
        if (tabContent) tabContent.textContent = '当前显示: ' + tabMap[e.detail.activeKey];
      });

      const viewGroup = container.querySelector('#view-group');
      const viewActive = container.querySelector('#view-active');
      const viewMap: Record<string, string> = {
        list: '列表视图',
        grid: '网格视图',
        timeline: '时间线视图'
      };
      viewGroup?.addEventListener('nv-active-change', (e: any) => {
        if (viewActive) viewActive.textContent = viewMap[e.detail.activeKey];
      });
    }, 0);

    return container;
  }
};

/**
 * 朴素按钮组
 */
export const PlainButtons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <nv-button-group>
        <nv-button plain>默认</nv-button>
        <nv-button plain>主要</nv-button>
        <nv-button plain>成功</nv-button>
      </nv-button-group>
      <nv-button-group>
        <nv-button type="primary" plain>主要</nv-button>
        <nv-button type="success" plain>成功</nv-button>
        <nv-button type="info" plain>信息</nv-button>
      </nv-button-group>
      <nv-button-group>
        <nv-button type="warning" plain>警告</nv-button>
        <nv-button type="danger" plain>错误</nv-button>
        <nv-button type="danger" plain>危险</nv-button>
      </nv-button-group>
    </div>
  `
};

/**
 * 统一按钮宽度 - button-width 属性在水平和垂直模式下都支持
 */
export const ButtonWidth: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">水平模式 - 默认行为（按钮自然宽度）</h4>
        <p style="margin: 0 0 12px 0; color: #666; font-size: 13px;">水平模式下不设置 button-width 时，按钮保持自然宽度（按内容自适应）</p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <nv-button-group>
            <nv-button>短</nv-button>
            <nv-button>中等长度</nv-button>
            <nv-button>这是一个很长的按钮</nv-button>
          </nv-button-group>

          <nv-button-group>
            <nv-button type="primary">上传</nv-button>
            <nv-button type="success">下载文件</nv-button>
            <nv-button type="info">刷新</nv-button>
          </nv-button-group>
        </div>
      </div>

      <nv-divider style="margin: 16px 0;"></nv-divider>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">水平模式 - 自定义固定宽度</h4>
        <p style="margin: 0 0 12px 0; color: #666; font-size: 13px;">通过 button-width 属性可以手动设置统一的固定宽度</p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 12px;">button-width="100px"</p>
            <nv-button-group button-width="100px">
              <nv-button>按钮1</nv-button>
              <nv-button>按钮2</nv-button>
              <nv-button>按钮3</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 12px;">button-width="120px"</p>
            <nv-button-group button-width="120px">
              <nv-button type="primary" icon="upload">上传</nv-button>
              <nv-button type="success" icon="download">下载</nv-button>
              <nv-button type="info" icon="refresh">刷新</nv-button>
            </nv-button-group>
          </div>
        </div>
      </div>

      <nv-divider style="margin: 16px 0;"></nv-divider>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">垂直模式 - 自动统一宽度（默认行为）</h4>
        <p style="margin: 0 0 12px 0; color: #666; font-size: 13px;">垂直模式下不设置 button-width 时，自动以最宽按钮的宽度作为统一宽度</p>
        <div style="display: flex; gap: 32px; align-items: flex-start;">
          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 12px;">自动统一宽度</p>
            <nv-button-group vertical>
              <nv-button>短</nv-button>
              <nv-button>中等长度</nv-button>
              <nv-button>这是一个很长的按钮</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 12px;">带图标 - 自动统一</p>
            <nv-button-group vertical>
              <nv-button icon="upload">上传</nv-button>
              <nv-button icon="download">下载文件</nv-button>
              <nv-button icon="refresh">刷新</nv-button>
            </nv-button-group>
          </div>
        </div>
      </div>

      <nv-divider style="margin: 16px 0;"></nv-divider>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">垂直模式 - 自定义固定宽度</h4>
        <p style="margin: 0 0 12px 0; color: #666; font-size: 13px;">垂直模式下也可以手动设置固定宽度</p>
        <div style="display: flex; gap: 32px; align-items: flex-start;">
          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 12px;">button-width="150px"</p>
            <nv-button-group vertical button-width="150px">
              <nv-button>按钮1</nv-button>
              <nv-button>按钮2</nv-button>
              <nv-button>按钮3</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 12px;">button-width="180px"</p>
            <nv-button-group vertical button-width="180px">
              <nv-button type="primary" icon="home">首页</nv-button>
              <nv-button type="success" icon="user">用户</nv-button>
              <nv-button type="info" icon="setting">设置</nv-button>
            </nv-button-group>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * 垂直模式 - 设置 vertical 属性可以让按钮组垂直排列，适合侧边栏、工具面板等场景
 */
export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 18px; font-weight: 600;">基础用法</h4>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">设置 vertical 属性让按钮垂直排列，按钮宽度会自动统一为最宽按钮的宽度</p>
        <div style="display: flex; gap: 32px; align-items: flex-start;">
          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">默认样式</p>
            <nv-button-group vertical>
              <nv-button>按钮1</nv-button>
              <nv-button>按钮2</nv-button>
              <nv-button>按钮3</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">带类型</p>
            <nv-button-group vertical>
              <nv-button type="primary">主要</nv-button>
              <nv-button type="success">成功</nv-button>
              <nv-button type="warning">警告</nv-button>
              <nv-button type="danger">危险</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">带图标</p>
            <nv-button-group vertical>
              <nv-button icon="edit">编辑</nv-button>
              <nv-button icon="delete">删除</nv-button>
              <nv-button icon="share">分享</nv-button>
              <nv-button icon="download">下载</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">朴素样式</p>
            <nv-button-group vertical>
              <nv-button type="primary" plain>主要</nv-button>
              <nv-button type="success" plain>成功</nv-button>
              <nv-button type="info" plain>信息</nv-button>
            </nv-button-group>
          </div>
        </div>
      </div>

      <nv-divider></nv-divider>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 18px; font-weight: 600;">不同尺寸</h4>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">通过 size 属性控制垂直按钮组的尺寸</p>
        <div style="display: flex; gap: 32px; align-items: flex-start;">
          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">mini</p>
            <nv-button-group vertical size="mini">
              <nv-button icon="home">首页</nv-button>
              <nv-button icon="user">用户</nv-button>
              <nv-button icon="setting">设置</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">small</p>
            <nv-button-group vertical size="small">
              <nv-button icon="home">首页</nv-button>
              <nv-button icon="user">用户</nv-button>
              <nv-button icon="setting">设置</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">medium (默认)</p>
            <nv-button-group vertical size="medium">
              <nv-button icon="home">首页</nv-button>
              <nv-button icon="user">用户</nv-button>
              <nv-button icon="setting">设置</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">large</p>
            <nv-button-group vertical size="large">
              <nv-button icon="home">首页</nv-button>
              <nv-button icon="user">用户</nv-button>
              <nv-button icon="setting">设置</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">huge</p>
            <nv-button-group vertical size="huge">
              <nv-button icon="home">首页</nv-button>
              <nv-button icon="user">用户</nv-button>
              <nv-button icon="setting">设置</nv-button>
            </nv-button-group>
          </div>
        </div>
      </div>

      <nv-divider></nv-divider>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 18px; font-weight: 600;">禁用状态</h4>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">通过 disabled 属性禁用整个垂直按钮组</p>
        <div style="display: flex; gap: 32px; align-items: flex-start;">
          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">禁用状态</p>
            <nv-button-group vertical disabled>
              <nv-button icon="home">首页</nv-button>
              <nv-button icon="user">用户</nv-button>
              <nv-button icon="setting">设置</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 8px 0; color: #909399; font-size: 13px; font-weight: 500;">禁用 - 带类型</p>
            <nv-button-group vertical disabled>
              <nv-button type="primary">主要</nv-button>
              <nv-button type="success">成功</nv-button>
              <nv-button type="warning">警告</nv-button>
            </nv-button-group>
          </div>
        </div>
      </div>

      <nv-divider></nv-divider>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 18px; font-weight: 600;">实际应用场景</h4>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">垂直按钮组常用于侧边栏导航、工具面板、操作列表等场景</p>
        <div style="display: flex; gap: 48px; align-items: flex-start;">
          <div>
            <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; font-weight: 500;">📋 侧边栏导航</p>
            <nv-button-group vertical>
              <nv-button icon="home">仪表盘</nv-button>
              <nv-button icon="user">用户管理</nv-button>
              <nv-button icon="box">产品管理</nv-button>
              <nv-button icon="shopping-cart">订单管理</nv-button>
              <nv-button icon="setting">系统设置</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; font-weight: 500;">🎛️ 文件操作面板</p>
            <nv-button-group vertical size="small">
              <nv-button type="primary" icon="upload">上传文件</nv-button>
              <nv-button type="success" icon="download">下载</nv-button>
              <nv-button type="warning" icon="edit">重命名</nv-button>
              <nv-button type="info" icon="copy">复制</nv-button>
              <nv-button type="danger" icon="delete">删除</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; font-weight: 500;">📊 视图切换</p>
            <nv-button-group vertical>
              <nv-button icon="list" plain>列表视图</nv-button>
              <nv-button icon="table" plain>网格视图</nv-button>
              <nv-button icon="timeline" plain>时间线</nv-button>
              <nv-button icon="chart" plain>图表视图</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; font-weight: 500;">🎨 工具栏</p>
            <nv-button-group vertical size="small">
              <nv-button circle icon="search"></nv-button>
              <nv-button circle icon="refresh"></nv-button>
              <nv-button circle icon="setting"></nv-button>
              <nv-button circle icon="download"></nv-button>
              <nv-button circle icon="share"></nv-button>
            </nv-button-group>
          </div>
        </div>
      </div>

      <nv-divider></nv-divider>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 18px; font-weight: 600;">结合 Active 状态</h4>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">配合 active-key 属性，实现垂直导航菜单的激活效果</p>
        <div style="display: flex; gap: 48px; align-items: flex-start;">
          <div>
            <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; font-weight: 500;">导航菜单（带激活状态）</p>
            <nv-button-group vertical active-key="dashboard">
              <nv-button data-key="dashboard" icon="home">仪表盘</nv-button>
              <nv-button data-key="analytics" icon="chart">数据分析</nv-button>
              <nv-button data-key="reports" icon="file">报表中心</nv-button>
              <nv-button data-key="settings" icon="setting">系统设置</nv-button>
            </nv-button-group>
          </div>

          <div>
            <p style="margin: 0 0 12px 0; color: #333; font-size: 15px; font-weight: 500;">标签页（垂直）</p>
            <nv-button-group vertical active-key="tab2" size="small">
              <nv-button data-key="tab1" type="primary" plain>用户信息</nv-button>
              <nv-button data-key="tab2" type="primary" plain>账户安全</nv-button>
              <nv-button data-key="tab3" type="primary" plain>隐私设置</nv-button>
              <nv-button data-key="tab4" type="primary" plain>通知偏好</nv-button>
            </nv-button-group>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * 使用场景示例
 */
export const UsageScenarios: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">分页导航</h4>
        <nv-button-group>
          <nv-button icon="back">上一页</nv-button>
          <nv-button>1</nv-button>
          <nv-button>2</nv-button>
          <nv-button>3</nv-button>
          <nv-button icon="right">下一页</nv-button>
        </nv-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">操作按钮组</h4>
        <nv-button-group>
          <nv-button type="primary" icon="edit">编辑</nv-button>
          <nv-button type="success" icon="check">通过</nv-button>
          <nv-button type="warning" icon="warning">待定</nv-button>
          <nv-button type="danger" icon="delete">拒绝</nv-button>
        </nv-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">工具栏</h4>
        <nv-button-group>
          <nv-button size="small" circle icon="refresh"></nv-button>
          <nv-button size="small" circle icon="setting"></nv-button>
          <nv-button size="small" circle icon="search"></nv-button>
          <nv-button size="small" circle icon="download"></nv-button>
        </nv-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">状态切换</h4>
        <nv-button-group>
          <nv-button type="primary">全部</nv-button>
          <nv-button>进行中</nv-button>
          <nv-button>已完成</nv-button>
          <nv-button>已取消</nv-button>
        </nv-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">排序方式</h4>
        <nv-button-group>
          <nv-button icon="sort">按时间</nv-button>
          <nv-button icon="sort">按名称</nv-button>
          <nv-button icon="sort">按大小</nv-button>
        </nv-button-group>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #333; font-size: 16px;">垂直侧边栏菜单</h4>
        <nv-button-group vertical active-key="dashboard">
          <nv-button data-key="dashboard" icon="home">仪表盘</nv-button>
          <nv-button data-key="users" icon="user">用户管理</nv-button>
          <nv-button data-key="products" icon="box">产品管理</nv-button>
          <nv-button data-key="orders" icon="shopping-cart">订单管理</nv-button>
          <nv-button data-key="settings" icon="setting">系统设置</nv-button>
        </nv-button-group>
      </div>
    </div>
  `
};
