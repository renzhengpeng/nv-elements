import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import { sourceCode } from '../../utils/story-helpers';
import './index';
import '../menu-item/index';
import '../submenu/index';
import '../icon/index';
import '../divider/index';

// 导入 README 内容
import readmeMd from './README.md?raw';

// 解析 README
const readmeHtml = marked.parse(readmeMd) as string;

const meta: Meta = {
  title: 'Components/NavMenu',
  component: 'nv-nav-menu', 
  argTypes: {
    defaultActive: {
      control: 'text',
      description: '当前激活菜单的 index'
    },
    activeIndex: {
      control: 'text',
      description: '当前激活菜单的 index（受控）'
    },
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单模式'
    },
    collapse: {
      control: 'boolean',
      description: '是否折叠（仅在 vertical 模式有效）'
    },
    uniqueOpened: {
      control: 'boolean',
      description: '是否只保持一个子菜单的展开'
    },
    size: {
      control: 'select',
      options: ['mini', 'small', 'medium', 'large', 'huge'],
      description: '菜单尺寸'
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: '子菜单触发方式（折叠模式下强制为 hover）'
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
      <!-- README 文档 -->
      <div class="readme-content" style="background: #fff; padding: 30px; border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 40px;">
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
          <p class="example-desc">最简单的水平导航菜单</p>
          <div class="example-demo">
            ${ Default.render?.({ defaultActive: '1', activeIndex: '', mode: 'horizontal', collapse: false, size: 'medium' }, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 垂直菜单 -->
        <div class="example-item">
          <h3 class="example-title">垂直菜单</h3>
          <p class="example-desc">适合侧边栏的垂直导航</p>
          <div class="example-demo">
            ${ Vertical.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 禁用状态 -->
        <div class="example-item">
          <h3 class="example-title">禁用状态</h3>
          <p class="example-desc">菜单项可以设置为禁用状态</p>
          <div class="example-demo">
            ${ WithDisabled.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 带图标 -->
        <div class="example-item">
          <h3 class="example-title">带图标的菜单</h3>
          <p class="example-desc">使用 nv-icon 组件添加图标</p>
          <div class="example-demo">
            ${ WithIcons.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 图标插槽 -->
        <div class="example-item">
          <h3 class="example-title">自定义图标</h3>
          <p class="example-desc">使用插槽自定义图标样式</p>
          <div class="example-demo">
            ${ WithIconSlot.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 垂直带图标 -->
        <div class="example-item">
          <h3 class="example-title">垂直菜单 + 图标</h3>
          <p class="example-desc">垂直模式下的图标菜单</p>
          <div class="example-demo">
            ${ VerticalWithIcons.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 带子菜单 -->
        <div class="example-item">
          <h3 class="example-title">带子菜单</h3>
          <p class="example-desc">支持多级嵌套子菜单</p>
          <div class="example-demo">
            ${ WithSubmenu.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 嵌套子菜单 -->
        <div class="example-item">
          <h3 class="example-title">嵌套子菜单</h3>
          <p class="example-desc">子菜单可以无限层级嵌套</p>
          <div class="example-demo">
            ${ NestedSubmenu.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 手风琴模式 -->
        <div class="example-item">
          <h3 class="example-title">手风琴模式</h3>
          <p class="example-desc">只保持一个子菜单展开</p>
          <div class="example-demo">
            ${ UniqueOpened.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 水平下拉菜单 -->
        <div class="example-item">
          <h3 class="example-title">水平下拉菜单</h3>
          <p class="example-desc">水平模式下的子菜单以下拉形式展示</p>
          <div class="example-demo">
            ${ HorizontalWithDropdown.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 水平下拉大菜单 -->
        <div class="example-item">
          <h3 class="example-title">水平下拉大菜单</h3>
          <p class="example-desc">支持更复杂的下拉菜单结构</p>
          <div class="example-demo">
            ${ HorizontalDropdownLarge.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 不同尺寸 -->
        <div class="example-item">
          <h3 class="example-title">不同尺寸</h3>
          <p class="example-desc">提供 mini、small、medium、large、huge 五种尺寸</p>
          <div class="example-demo">
            ${ DifferentSizes.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 折叠模式 -->
        <div class="example-item">
          <h3 class="example-title">折叠模式</h3>
          <p class="example-desc">垂直模式下可以折叠菜单，只显示图标</p>
          <div class="example-demo">
            ${ Collapsed.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 折叠模式 + 嵌套菜单 -->
        <div class="example-item">
          <h3 class="example-title">折叠模式 + 嵌套菜单</h3>
          <p class="example-desc">折叠状态下的多级嵌套子菜单</p>
          <div class="example-demo">
            ${ CollapsedWithNestedMenu.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 触发方式 -->
        <div class="example-item">
          <h3 class="example-title">触发方式</h3>
          <p class="example-desc">支持 click 和 hover 两种触发方式</p>
          <div class="example-demo">
            ${ TriggerMode.render?.({} as any, {} as any) }
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
        .readme-content h4 {
          color: #606266;
          font-size: 16px;
          font-weight: 600;
          margin: 20px 0 8px 0;
        }
        .readme-content p {
          color: #606266;
          line-height: 1.8;
          font-size: 15px;
          margin: 12px 0;
        }
        .readme-content ul,
        .readme-content ol {
          margin: 12px 0;
          padding-left: 24px;
          color: #606266;
          line-height: 1.8;
        }
        .readme-content li {
          margin: 6px 0;
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
          background: #f5f7fa;
          padding: 16px;
          border-radius: 4px;
          overflow-x: auto;
          margin: 16px 0;
          border-left: 4px solid #409EFF;
        }
        .readme-content pre code {
          background: transparent;
          padding: 0;
          color: #303133;
          font-size: 14px;
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
        .readme-content table code {
          background: #f5f7fa;
          padding: 2px 6px;
          border-radius: 3px;
          color: #e96900;
        }
        .readme-content blockquote {
          margin: 16px 0;
          padding: 12px 16px;
          background: #ecf5ff;
          border-left: 4px solid #409EFF;
          border-radius: 4px;
          color: #606266;
        }
        .readme-content hr {
          margin: 24px 0;
          border: none;
          border-top: 1px solid #e4e7ed;
        }
        
        /* 示例区域样式 */
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
    <nv-nav-menu
      defaultActive="${ args.defaultActive }"
      activeIndex="${ args.activeIndex }"
      mode="${ args.mode }"
      ?collapse="${ args.collapse }"
      @nv-select="${ (e: CustomEvent) => console.log('Selected:', e.detail) }"
    >
      <nv-menu-item index="1">首页</nv-menu-item>
      <nv-menu-item index="2">关于我们</nv-menu-item>
      <nv-menu-item index="3">产品</nv-menu-item>
      <nv-menu-item index="4">联系我们</nv-menu-item>
    </nv-nav-menu>
  `,
  args: {
    defaultActive: '1',
    activeIndex: '',
    mode: 'horizontal',
    collapse: false,
    size: 'medium'
  },
  parameters: {
    docs: {
      source: {
        code: sourceCode`
<nv-nav-menu defaultActive="1" mode="horizontal">
  <nv-menu-item index="1">首页</nv-menu-item>
  <nv-menu-item index="2">关于我们</nv-menu-item>
  <nv-menu-item index="3">产品</nv-menu-item>
  <nv-menu-item index="4">联系我们</nv-menu-item>
</nv-nav-menu>`
      }
    }
  }
};

export const Vertical: Story = {
  render: () => html`
    <nv-nav-menu mode="vertical" defaultActive="1" style="width: 200px;">
      <nv-menu-item index="1">首页</nv-menu-item>
      <nv-menu-item index="2">关于我们</nv-menu-item>
      <nv-menu-item index="3">产品</nv-menu-item>
      <nv-menu-item index="4">联系我们</nv-menu-item>
    </nv-nav-menu>
  `
};

export const WithDisabled: Story = {
  render: () => html`
    <nv-nav-menu defaultActive="1">
      <nv-menu-item index="1">首页</nv-menu-item>
      <nv-menu-item index="2" disabled>关于我们（禁用）</nv-menu-item>
      <nv-menu-item index="3">产品</nv-menu-item>
      <nv-menu-item index="4">联系我们</nv-menu-item>
    </nv-nav-menu>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <nv-nav-menu defaultActive="1">
      <nv-menu-item index="1">
        <nv-icon slot="icon" name="s-home"></nv-icon>
        首页
      </nv-menu-item>
      <nv-menu-item index="2">
        <nv-icon slot="icon" name="user"></nv-icon>
        关于我们
      </nv-menu-item>
      <nv-menu-item index="3">
        <nv-icon slot="icon" name="s-goods"></nv-icon>
        产品
      </nv-menu-item>
      <nv-menu-item index="4">
        <nv-icon slot="icon" name="message"></nv-icon>
        联系我们
      </nv-menu-item>
    </nv-nav-menu>
  `
};

export const WithIconSlot: Story = {
  render: () => html`
    <nv-nav-menu defaultActive="1" mode="vertical" style="width: 200px;">
      <nv-menu-item index="1">
        <nv-icon slot="icon" name="s-home" size="18px"></nv-icon>
        首页
      </nv-menu-item>
      <nv-menu-item index="2">
        <nv-icon slot="icon" name="user" size="18px"></nv-icon>
        关于我们
      </nv-menu-item>
      <nv-menu-item index="3">
        <nv-icon slot="icon" name="s-goods" size="18px"></nv-icon>
        产品
      </nv-menu-item>
      <nv-menu-item index="4">
        <nv-icon slot="icon" name="message" size="18px"></nv-icon>
        联系我们
      </nv-menu-item>
    </nv-nav-menu>
  `
};

export const VerticalWithIcons: Story = {
  render: () => html`
    <nv-nav-menu mode="vertical" defaultActive="1" style="width: 200px;">
      <nv-menu-item index="1">
        <nv-icon slot="icon" name="s-home"></nv-icon>
        首页
      </nv-menu-item>
      <nv-menu-item index="2">
        <nv-icon slot="icon" name="user"></nv-icon>
        关于我们
      </nv-menu-item>
      <nv-menu-item index="3">
        <nv-icon slot="icon" name="s-goods"></nv-icon>
        产品
      </nv-menu-item>
      <nv-menu-item index="4">
        <nv-icon slot="icon" name="message"></nv-icon>
        联系我们
      </nv-menu-item>
    </nv-nav-menu>
  `
};

export const WithSubmenu: Story = {
  render: () => html`
    <nv-nav-menu 
      mode="vertical" 
      defaultActive="1-1" 
      style="width: 240px;"
      @nv-select=${ (e: CustomEvent) => console.log('Selected:', e.detail) }
      @nv-open=${ (e: CustomEvent) => console.log('Opened:', e.detail) }
      @nv-close=${ (e: CustomEvent) => console.log('Closed:', e.detail) }
    >
      <nv-submenu index="1" label="导航一">
        <nv-icon slot="icon" name="location"></nv-icon>
        <nv-menu-item index="1-1">选项1</nv-menu-item>
        <nv-menu-item index="1-2">选项2</nv-menu-item>
        <nv-menu-item index="1-3">选项3</nv-menu-item>
      </nv-submenu>
      <nv-submenu index="2" label="导航二">
        <nv-icon slot="icon" name="setting"></nv-icon>
        <nv-menu-item index="2-1">选项1</nv-menu-item>
        <nv-menu-item index="2-2">选项2</nv-menu-item>
      </nv-submenu>
      <nv-menu-item index="3">
        <nv-icon slot="icon" name="s-home"></nv-icon>
        导航三
      </nv-menu-item>
    </nv-nav-menu>
  `
};

export const NestedSubmenu: Story = {
  render: () => html`
    <nv-nav-menu 
      mode="vertical" 
      defaultActive="1-1-1" 
      .defaultOpeneds=${ ['1', '1-1'] }
      style="width: 240px;"
    >
      <nv-submenu index="1" label="导航一">
        <nv-icon slot="icon" name="location"></nv-icon>
        <nv-submenu index="1-1" label="选项1">
          <nv-menu-item index="1-1-1">子选项1</nv-menu-item>
          <nv-menu-item index="1-1-2">子选项2</nv-menu-item>
        </nv-submenu>
        <nv-menu-item index="1-2">选项2</nv-menu-item>
      </nv-submenu>
      <nv-submenu index="2" label="导航二">
        <nv-icon slot="icon" name="setting"></nv-icon>
        <nv-menu-item index="2-1">选项1</nv-menu-item>
        <nv-menu-item index="2-2">选项2</nv-menu-item>
      </nv-submenu>
    </nv-nav-menu>
  `
};

export const UniqueOpened: Story = {
  render: () => html`
    <nv-nav-menu 
      mode="vertical" 
      defaultActive="1-1" 
      uniqueOpened
      style="width: 240px;"
    >
      <nv-submenu index="1" label="导航一">
        <nv-icon slot="icon" name="location"></nv-icon>
        <nv-menu-item index="1-1">选项1</nv-menu-item>
        <nv-menu-item index="1-2">选项2</nv-menu-item>
      </nv-submenu>
      <nv-submenu index="2" label="导航二">
        <nv-icon slot="icon" name="setting"></nv-icon>
        <nv-menu-item index="2-1">选项1</nv-menu-item>
        <nv-menu-item index="2-2">选项2</nv-menu-item>
      </nv-submenu>
      <nv-submenu index="3" label="导航三">
        <nv-icon slot="icon" name="s-goods"></nv-icon>
        <nv-menu-item index="3-1">选项1</nv-menu-item>
        <nv-menu-item index="3-2">选项2</nv-menu-item>
      </nv-submenu>
    </nv-nav-menu>
  `
};

export const HorizontalWithDropdown: Story = {
  render: () => html`
    <nv-nav-menu defaultActive="1-1">
      <nv-menu-item index="1">
        <nv-icon slot="icon" name="s-home"></nv-icon>
        首页
      </nv-menu-item>
      <nv-submenu index="2" label="产品">
        <nv-icon slot="icon" name="s-goods"></nv-icon>
        <nv-menu-item index="2-1">产品 A</nv-menu-item>
        <nv-menu-item index="2-2">产品 B</nv-menu-item>
        <nv-menu-item index="2-3">产品 C</nv-menu-item>
        <nv-submenu index="2-4" label="更多产品">
          <nv-menu-item index="2-4-1">产品 D</nv-menu-item>
          <nv-menu-item index="2-4-2">产品 E</nv-menu-item>
        </nv-submenu>
      </nv-submenu>
      <nv-submenu index="3" label="解决方案">
        <nv-icon slot="icon" name="setting"></nv-icon>
        <nv-menu-item index="3-1">企业方案</nv-menu-item>
        <nv-menu-item index="3-2">个人方案</nv-menu-item>
        <nv-menu-item index="3-3">教育方案</nv-menu-item>
      </nv-submenu>
      <nv-menu-item index="4">
        <nv-icon slot="icon" name="user"></nv-icon>
        关于我们
      </nv-menu-item>
      <nv-menu-item index="5">
        <nv-icon slot="icon" name="message"></nv-icon>
        联系我们
      </nv-menu-item>
    </nv-nav-menu>
  `
};

export const HorizontalDropdownLarge: Story = {
  render: () => html`
    <nv-nav-menu defaultActive="1" size="large">
      <nv-menu-item index="1">
        <nv-icon slot="icon" name="s-home"></nv-icon>
        首页
      </nv-menu-item>
      <nv-submenu index="2" label="产品中心">
        <nv-icon slot="icon" name="s-goods"></nv-icon>
        <nv-menu-item index="2-1">
          <nv-icon slot="icon" name="s-goods"></nv-icon>
          硬件产品
        </nv-menu-item>
        <nv-menu-item index="2-2">
          <nv-icon slot="icon" name="s-platform"></nv-icon>
          软件产品
        </nv-menu-item>
        <nv-menu-item index="2-3">
          <nv-icon slot="icon" name="s-cooperation"></nv-icon>
          服务产品
        </nv-menu-item>
      </nv-submenu>
      <nv-submenu index="3" label="解决方案">
        <nv-icon slot="icon" name="setting"></nv-icon>
        <nv-submenu index="3-1" label="行业方案">
          <nv-menu-item index="3-1-1">金融行业</nv-menu-item>
          <nv-menu-item index="3-1-2">教育行业</nv-menu-item>
          <nv-menu-item index="3-1-3">医疗行业</nv-menu-item>
        </nv-submenu>
        <nv-submenu index="3-2" label="企业规模">
          <nv-menu-item index="3-2-1">大型企业</nv-menu-item>
          <nv-menu-item index="3-2-2">中小企业</nv-menu-item>
          <nv-menu-item index="3-2-3">初创企业</nv-menu-item>
        </nv-submenu>
      </nv-submenu>
      <nv-menu-item index="4">
        <nv-icon slot="icon" name="user"></nv-icon>
        关于我们
      </nv-menu-item>
    </nv-nav-menu>
  `
};

export const DifferentSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h4 style="margin: 0 0 10px 0;">Mini</h4>
        <nv-nav-menu defaultActive="1" size="mini">
          <nv-menu-item index="1">
            <nv-icon slot="icon" name="s-home"></nv-icon>
            首页
          </nv-menu-item>
          <nv-menu-item index="2">
            <nv-icon slot="icon" name="user"></nv-icon>
            关于我们
          </nv-menu-item>
          <nv-menu-item index="3">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            产品
          </nv-menu-item>
        </nv-nav-menu>
      </div>
      
      <div>
        <h4 style="margin: 0 0 10px 0;">Small</h4>
        <nv-nav-menu defaultActive="1" size="small">
          <nv-menu-item index="1">
            <nv-icon slot="icon" name="s-home"></nv-icon>
            首页
          </nv-menu-item>
          <nv-menu-item index="2">
            <nv-icon slot="icon" name="user"></nv-icon>
            关于我们
          </nv-menu-item>
          <nv-menu-item index="3">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            产品
          </nv-menu-item>
        </nv-nav-menu>
      </div>
      
      <div>
        <h4 style="margin: 0 0 10px 0;">Medium (默认)</h4>
        <nv-nav-menu defaultActive="1" size="medium">
          <nv-menu-item index="1">
            <nv-icon slot="icon" name="s-home"></nv-icon>
            首页
          </nv-menu-item>
          <nv-menu-item index="2">
            <nv-icon slot="icon" name="user"></nv-icon>
            关于我们
          </nv-menu-item>
          <nv-menu-item index="3">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            产品
          </nv-menu-item>
        </nv-nav-menu>
      </div>
      
      <div>
        <h4 style="margin: 0 0 10px 0;">Large</h4>
        <nv-nav-menu defaultActive="1" size="large">
          <nv-menu-item index="1">
            <nv-icon slot="icon" name="s-home"></nv-icon>
            首页
          </nv-menu-item>
          <nv-menu-item index="2">
            <nv-icon slot="icon" name="user"></nv-icon>
            关于我们
          </nv-menu-item>
          <nv-menu-item index="3">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            产品
          </nv-menu-item>
        </nv-nav-menu>
      </div>
      
      <div>
        <h4 style="margin: 0 0 10px 0;">Huge</h4>
        <nv-nav-menu defaultActive="1" size="huge">
          <nv-menu-item index="1">
            <nv-icon slot="icon" name="s-home"></nv-icon>
            首页
          </nv-menu-item>
          <nv-menu-item index="2">
            <nv-icon slot="icon" name="user"></nv-icon>
            关于我们
          </nv-menu-item>
          <nv-menu-item index="3">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            产品
          </nv-menu-item>
        </nv-nav-menu>
      </div>
    </div>
  `
};

export const Collapsed: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px;">
      <nv-nav-menu 
        mode="vertical" 
        defaultActive="1"
        collapse
        style="width: 64px;"
      >
        <nv-menu-item index="1">
          <nv-icon slot="icon" name="s-home"></nv-icon>
          首页
        </nv-menu-item>
        <nv-submenu index="2" label="产品">
          <nv-icon slot="icon" name="s-goods"></nv-icon>
          <nv-menu-item index="2-1">产品 A</nv-menu-item>
          <nv-menu-item index="2-2">产品 B</nv-menu-item>
          <nv-menu-item index="2-3">产品 C</nv-menu-item>
        </nv-submenu>
        <nv-submenu index="3" label="解决方案">
          <nv-icon slot="icon" name="setting"></nv-icon>
          <nv-menu-item index="3-1">企业方案</nv-menu-item>
          <nv-menu-item index="3-2">个人方案</nv-menu-item>
        </nv-submenu>
        <nv-menu-item index="4">
          <nv-icon slot="icon" name="user"></nv-icon>
          关于我们
        </nv-menu-item>
        <nv-menu-item index="5">
          <nv-icon slot="icon" name="message"></nv-icon>
          联系我们
        </nv-menu-item>
      </nv-nav-menu>
      <div style="flex: 1; padding: 20px; background: #f5f7fa; border-radius: 4px;">
        <h3 style="margin-top: 0;">折叠模式</h3>
        <p style="color: #606266; line-height: 1.8;">
          折叠模式下，菜单只显示图标，鼠标悬停时会弹出完整内容。
        </p>
        <ul style="color: #606266; line-height: 1.8;">
          <li>仅在垂直模式下有效</li>
          <li>建议为所有菜单项配置图标</li>
          <li>鼠标悬停菜单项显示tooltip提示</li>
          <li>鼠标悬停子菜单自动弹出完整菜单</li>
          <li>支持多级嵌套</li>
        </ul>
      </div>
    </div>
  `
};

export const CollapsedWithNestedMenu: Story = {
  render: () => html`
    <nv-nav-menu 
      mode="vertical" 
      defaultActive="1-1-1"
      collapse
      style="width: 64px;"
    >
      <nv-menu-item index="1">
        <nv-icon slot="icon" name="s-home"></nv-icon>
        首页
      </nv-menu-item>
      <nv-submenu index="2" label="导航一">
        <nv-icon slot="icon" name="location"></nv-icon>
        <nv-submenu index="2-1" label="子导航1">
          <nv-icon slot="icon" name="setting"></nv-icon>
          <nv-menu-item index="2-1-1">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            选项1
          </nv-menu-item>
          <nv-menu-item index="2-1-2">
            <nv-icon slot="icon" name="s-platform"></nv-icon>
            选项2
          </nv-menu-item>
        </nv-submenu>
        <nv-menu-item index="2-2">
          <nv-icon slot="icon" name="message"></nv-icon>
          选项3
        </nv-menu-item>
      </nv-submenu>
      <nv-submenu index="3" label="导航二">
        <nv-icon slot="icon" name="s-goods"></nv-icon>
        <nv-menu-item index="3-1">
          <nv-icon slot="icon" name="s-cooperation"></nv-icon>
          选项1
        </nv-menu-item>
        <nv-menu-item index="3-2">
          <nv-icon slot="icon" name="s-data"></nv-icon>
          选项2
        </nv-menu-item>
      </nv-submenu>
      <nv-menu-item index="4">
        <nv-icon slot="icon" name="user"></nv-icon>
        关于我们
      </nv-menu-item>
    </nv-nav-menu>
  `
};

export const TriggerMode: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px;">
      <div>
        <h4 style="margin: 0 0 10px 0;">点击触发（trigger="click"）</h4>
        <p style="margin: 0 0 10px 0; color: #606266; font-size: 14px;">
          垂直模式下，子菜单需要点击才能展开/收起。点击文档空白处会自动关闭已展开的子菜单。
        </p>
        <nv-nav-menu 
          mode="vertical" 
          defaultActive="1"
          trigger="click"
          style="width: 200px;"
        >
          <nv-menu-item index="1">
            <nv-icon slot="icon" name="s-home"></nv-icon>
            首页
          </nv-menu-item>
          <nv-submenu index="2" label="产品中心">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            <nv-menu-item index="2-1">硬件产品</nv-menu-item>
            <nv-menu-item index="2-2">软件产品</nv-menu-item>
            <nv-menu-item index="2-3">服务产品</nv-menu-item>
          </nv-submenu>
          <nv-submenu index="3" label="解决方案">
            <nv-icon slot="icon" name="setting"></nv-icon>
            <nv-menu-item index="3-1">金融行业</nv-menu-item>
            <nv-menu-item index="3-2">教育行业</nv-menu-item>
            <nv-menu-item index="3-3">医疗行业</nv-menu-item>
          </nv-submenu>
          <nv-menu-item index="4">
            <nv-icon slot="icon" name="user"></nv-icon>
            关于我们
          </nv-menu-item>
        </nv-nav-menu>
      </div>

      <div>
        <h4 style="margin: 0 0 10px 0;">悬停触发（trigger="hover"，默认）</h4>
        <p style="margin: 0 0 10px 0; color: #606266; font-size: 14px;">
          垂直模式下，鼠标悬停即可展开子菜单
        </p>
        <nv-nav-menu 
          mode="vertical" 
          defaultActive="1"
          trigger="hover"
          style="width: 200px;"
        >
          <nv-menu-item index="1">
            <nv-icon slot="icon" name="s-home"></nv-icon>
            首页
          </nv-menu-item>
          <nv-submenu index="2" label="产品中心">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            <nv-menu-item index="2-1">硬件产品</nv-menu-item>
            <nv-menu-item index="2-2">软件产品</nv-menu-item>
            <nv-menu-item index="2-3">服务产品</nv-menu-item>
          </nv-submenu>
          <nv-submenu index="3" label="解决方案">
            <nv-icon slot="icon" name="setting"></nv-icon>
            <nv-menu-item index="3-1">金融行业</nv-menu-item>
            <nv-menu-item index="3-2">教育行业</nv-menu-item>
            <nv-menu-item index="3-3">医疗行业</nv-menu-item>
          </nv-submenu>
          <nv-menu-item index="4">
            <nv-icon slot="icon" name="user"></nv-icon>
            关于我们
          </nv-menu-item>
        </nv-nav-menu>
      </div>

      <div>
        <h4 style="margin: 0 0 10px 0;">水平模式 - 悬停触发（trigger="hover"，默认）</h4>
        <p style="margin: 0 0 10px 0; color: #606266; font-size: 14px;">
          水平模式下，鼠标悬停即可展开子菜单
        </p>
        <nv-nav-menu 
          mode="horizontal" 
          defaultActive="1"
          trigger="hover"
        >
          <nv-menu-item index="1">
            <nv-icon slot="icon" name="s-home"></nv-icon>
            首页
          </nv-menu-item>
          <nv-submenu index="2" label="产品中心">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            <nv-menu-item index="2-1">硬件产品</nv-menu-item>
            <nv-menu-item index="2-2">软件产品</nv-menu-item>
            <nv-menu-item index="2-3">服务产品</nv-menu-item>
          </nv-submenu>
          <nv-submenu index="3" label="解决方案">
            <nv-icon slot="icon" name="setting"></nv-icon>
            <nv-menu-item index="3-1">金融行业</nv-menu-item>
            <nv-menu-item index="3-2">教育行业</nv-menu-item>
            <nv-menu-item index="3-3">医疗行业</nv-menu-item>
          </nv-submenu>
          <nv-menu-item index="4">
            <nv-icon slot="icon" name="user"></nv-icon>
            关于我们
          </nv-menu-item>
        </nv-nav-menu>
      </div>

      <div>
        <h4 style="margin: 0 0 10px 0;">水平模式 - 点击触发（trigger="click"）</h4>
        <p style="margin: 0 0 10px 0; color: #606266; font-size: 14px;">
          水平模式下，点击才能展开子菜单。点击文档空白处会自动关闭已展开的子菜单。
        </p>
        <nv-nav-menu 
          mode="horizontal" 
          defaultActive="1"
          trigger="click"
        >
          <nv-menu-item index="1">
            <nv-icon slot="icon" name="s-home"></nv-icon>
            首页
          </nv-menu-item>
          <nv-submenu index="2" label="产品中心">
            <nv-icon slot="icon" name="s-goods"></nv-icon>
            <nv-menu-item index="2-1">硬件产品</nv-menu-item>
            <nv-menu-item index="2-2">软件产品</nv-menu-item>
            <nv-menu-item index="2-3">服务产品</nv-menu-item>
          </nv-submenu>
          <nv-submenu index="3" label="解决方案">
            <nv-icon slot="icon" name="setting"></nv-icon>
            <nv-menu-item index="3-1">金融行业</nv-menu-item>
            <nv-menu-item index="3-2">教育行业</nv-menu-item>
            <nv-menu-item index="3-3">医疗行业</nv-menu-item>
          </nv-submenu>
          <nv-menu-item index="4">
            <nv-icon slot="icon" name="user"></nv-icon>
            关于我们
          </nv-menu-item>
        </nv-nav-menu>
      </div>
    </div>
  `
};
