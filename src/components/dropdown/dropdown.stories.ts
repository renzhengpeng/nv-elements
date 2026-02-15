import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../option/index';
import '../button/index';
import '../divider/index';
import readmeMd from './README.md?raw';
import '../icon/index';

const meta: Meta = {
  title: 'Components/Dropdown',
  component: 'nv-dropdown',
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    arrow: {
      control: 'boolean',
      description: '是否显示箭头'
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'contextmenu'],
      description: '触发方式'
    },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
      description: '下拉菜单的位置'
    },
    align: {
      control: 'boolean',
      description: '是否与目标节点左右对齐'
    },
    strategy: {
      control: 'select',
      options: ['absolute', 'fixed'],
      description: '定位策略'
    },
    autoAdjust: {
      control: 'boolean',
      description: '是否自动调整位置（当空间不足时自动翻转）'
    },
    placeholder: {
      control: 'text',
      description: '占位符'
    },
    hideOnClick: {
      control: 'boolean',
      description: '点击菜单项后是否隐藏'
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
      <p>Dropdown 下拉菜单的基本使用</p>
      ${ Basic.render?.(Basic.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>事件</h3>
      <p>监听 nv-command、nv-menu-item-click、nv-visible-change 等事件</p>
      ${ Events.render?.(Events.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>触发方式</h3>
      <p>支持 hover 和 click 两种触发方式</p>
      ${ TriggerTypes.render?.(TriggerTypes.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>弹出位置</h3>
      <p>支持多种弹出位置</p>
      ${ Placements.render?.(Placements.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>禁用状态</h3>
      <p>禁用整个下拉菜单或单个菜单项</p>
      ${ Disabled.render?.(Disabled.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>不同尺寸的按钮触发器</h3>
      <p>使用不同尺寸的按钮作为触发器</p>
      ${ ButtonSizes.render?.(ButtonSizes.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>与按钮组合</h3>
      <p>结合按钮使用下拉菜单</p>
      ${ WithButton.render?.(WithButton.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>定位策略</h3>
      <p>支持 absolute 和 fixed 两种定位策略</p>
      ${ Strategy.render?.(Strategy.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>自动调整位置</h3>
      <p>启用 autoAdjust 后，菜单会在空间不足时自动翻转</p>
      ${ AutoAdjust.render?.(AutoAdjust.args as any, {} as any) }
    </div>
    <nv-divider></nv-divider>
    <div class="story-section">
      <h3>自定义样式</h3>
      <p>通过 CSS 变量自定义下拉菜单样式</p>
      ${ CustomStyles.render?.(CustomStyles.args as any, {} as any) }
    </div>
  `
};

export const Default: Story = {
  render: (args) => html`
    <nv-dropdown
      .disabled=${ args.disabled }
      .trigger=${ args.trigger }
      .placement=${ args.placement }
      .align=${ args.align }
      placeholder="${ args.placeholder }"
      ?hide-on-click=${ args.hideOnClick }
    >
      <nv-button slot="trigger">下拉菜单</nv-button>
      <div slot="menu">
        <nv-option value="option1" label="选项1"></nv-option>
        <nv-option value="option2" label="选项2"></nv-option>
        <nv-option value="option3" label="选项3"></nv-option>
      </div>
    </nv-dropdown>
  `,
  args: {
    disabled: false,
    trigger: 'click',
    placement: 'bottom',
    align: false,
    strategy: 'absolute',
    autoAdjust: false,
    placeholder: '请选择',
    hideOnClick: true
  }
};

export const Basic: Story = {
  render: () => html`
    <nv-dropdown>
      <nv-button slot="trigger">下拉菜单</nv-button>
      <div slot="menu">
        <nv-option value="option1" label="选项1"></nv-option>
        <nv-option value="option2" label="选项2"></nv-option>
        <nv-option value="option3" label="选项3"></nv-option>
      </div>
    </nv-dropdown>
  `
};

export const Events: Story = {
  render: () => {
    const logElId = 'dropdown-events-log';
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <nv-dropdown
          @nv-command=${ (e: CustomEvent<string>) => {
            const log = document.getElementById(logElId);
            if (log) log.innerHTML += `<div>nv-command: ${ e.detail }</div>`;
          } }
          @nv-menu-item-click=${ (e: CustomEvent<{ target: HTMLElement; command: string | null }>) => {
            const log = document.getElementById(logElId);
            if (log) log.innerHTML += `<div>nv-menu-item-click: command=${ e.detail.command ?? 'null' }</div>`;
          } }
          @nv-visible-change=${ (e: CustomEvent<boolean>) => {
            const log = document.getElementById(logElId);
            if (log) log.innerHTML += `<div>nv-visible-change: ${ e.detail ? '展开' : '收起' }</div>`;
          } }
        >
          <nv-button slot="trigger" type="primary">操作菜单（查看下方事件日志）</nv-button>
          <div slot="menu">
            <nv-option value="edit" label="编辑" command="edit"></nv-option>
            <nv-option value="delete" label="删除" command="delete"></nv-option>
            <nv-option value="share" label="分享" command="share"></nv-option>
          </div>
        </nv-dropdown>
        <div>
          <div style="margin-bottom: 8px; color: #666; font-size: 14px;">事件日志：</div>
          <div id=${ logElId } style="padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 13px; font-family: monospace; min-height: 60px;"></div>
        </div>
      </div>
    `;
  }
};

export const TriggerTypes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <nv-dropdown .trigger=${ 'click' }>
        <nv-button slot="trigger">点击触发</nv-button>
        <div slot="menu">
          <nv-option value="option1" label="选项1"></nv-option>
          <nv-option value="option2" label="选项2"></nv-option>
        </div>
      </nv-dropdown>
      <nv-dropdown .trigger=${ 'hover' }>
        <nv-button slot="trigger">悬停触发</nv-button>
        <div slot="menu">
          <nv-option value="option1" label="选项1"></nv-option>
          <nv-option value="option2" label="选项2"></nv-option>
        </div>
      </nv-dropdown>
      <nv-dropdown .trigger=${ 'contextmenu' }>
        <nv-button slot="trigger">右键触发</nv-button>
        <div slot="menu">
          <nv-option value="option1" label="选项1"></nv-option>
          <nv-option value="option2" label="选项2"></nv-option>
        </div>
      </nv-dropdown>
    </div>
  `
};

export const Placements: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; padding: 100px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">顶部位置</h4>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <nv-dropdown placement="top">
            <nv-button slot="trigger">top</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown placement="top-start">
            <nv-button slot="trigger">top-start</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown placement="top-end">
            <nv-button slot="trigger">top-end</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">底部位置</h4>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <nv-dropdown placement="bottom">
            <nv-button slot="trigger">bottom</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown placement="bottom-start">
            <nv-button slot="trigger">bottom-start</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown placement="bottom-end">
            <nv-button slot="trigger">bottom-end</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">左侧位置</h4>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <nv-dropdown placement="left">
            <nv-button slot="trigger">left</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown placement="left-start">
            <nv-button slot="trigger">left-start</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown placement="left-end">
            <nv-button slot="trigger">left-end</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">右侧位置</h4>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <nv-dropdown placement="right">
            <nv-button slot="trigger">right</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown placement="right-start">
            <nv-button slot="trigger">right-start</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown placement="right-end">
            <nv-button slot="trigger">right-end</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>
    </div>
  `
};

export const Disabled: Story = {
  render: () => html`
    <nv-dropdown .disabled=${ true }>
      <nv-button slot="trigger">禁用下拉菜单</nv-button>
      <div slot="menu">
        <nv-option value="option1" label="选项1"></nv-option>
        <nv-option value="option2" label="选项2"></nv-option>
      </div>
    </nv-dropdown>
  `
};

export const WithArrow: Story = {
  render: () => html`
    <nv-dropdown .arrow=${ true }>
      <nv-button slot="trigger">带箭头</nv-button>
      <div slot="menu">
        <nv-option value="option1" label="选项1"></nv-option>
        <nv-option value="option2" label="选项2"></nv-option>
      </div>
    </nv-dropdown>
  `
};

export const WithDisabledOption: Story = {
  render: () => html`
    <nv-dropdown>
      <nv-button slot="trigger">禁用选项示例</nv-button>
      <div slot="menu">
        <nv-option value="option1" label="选项1"></nv-option>
        <nv-option value="option2" label="选项2（禁用）" .disabled=${ true }></nv-option>
        <nv-option value="option3" label="选项3"></nv-option>
        <nv-option value="option4" label="选项4（禁用）" .disabled=${ true }></nv-option>
        <nv-option value="option5" label="选项5"></nv-option>
      </div>
    </nv-dropdown>
  `
};

export const ButtonSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">不同尺寸的按钮触发器</h4>
        <p style="margin: 0 0 12px 0; color: #999; font-size: 14px;">
          通过使用不同尺寸的按钮作为触发器，可以适应不同的使用场景
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <nv-dropdown>
            <nv-button slot="trigger" size="mini">迷你尺寸</nv-button>
            <div slot="menu">
              <nv-option value="option1" label="选项1"></nv-option>
              <nv-option value="option2" label="选项2"></nv-option>
              <nv-option value="option3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown>
            <nv-button slot="trigger" size="small">小型尺寸</nv-button>
            <div slot="menu">
              <nv-option value="option1" label="选项1"></nv-option>
              <nv-option value="option2" label="选项2"></nv-option>
              <nv-option value="option3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown>
            <nv-button slot="trigger" size="medium">中等尺寸</nv-button>
            <div slot="menu">
              <nv-option value="option1" label="选项1"></nv-option>
              <nv-option value="option2" label="选项2"></nv-option>
              <nv-option value="option3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown>
            <nv-button slot="trigger" size="large">大型尺寸</nv-button>
            <div slot="menu">
              <nv-option value="option1" label="选项1"></nv-option>
              <nv-option value="option2" label="选项2"></nv-option>
              <nv-option value="option3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
          <nv-dropdown>
            <nv-button slot="trigger" size="huge">巨大尺寸</nv-button>
            <div slot="menu">
              <nv-option value="option1" label="选项1"></nv-option>
              <nv-option value="option2" label="选项2"></nv-option>
              <nv-option value="option3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>
    </div>
  `
};

export const WithButton: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <nv-dropdown>
        <nv-button slot="trigger" type="primary">
          下拉菜单 <nv-icon name="arrow-down"></nv-icon>
        </nv-button>
        <div slot="menu">
          <nv-option value="option1" label="选项1"></nv-option>
          <nv-option value="option2" label="选项2"></nv-option>
          <nv-option value="option3" label="选项3"></nv-option>
        </div>
      </nv-dropdown>
      <nv-dropdown>
        <nv-button slot="trigger" type="success">
          更多操作 <nv-icon name="arrow-down"></nv-icon>
        </nv-button>
        <div slot="menu">
          <nv-option value="edit" label="编辑"></nv-option>
          <nv-option value="delete" label="删除"></nv-option>
          <nv-option value="share" label="分享"></nv-option>
        </div>
      </nv-dropdown>
      <nv-dropdown>
        <nv-button slot="trigger" type="info" plain>
          操作菜单 <nv-icon name="arrow-down"></nv-icon>
        </nv-button>
        <div slot="menu">
          <nv-option value="option1" label="选项1"></nv-option>
          <nv-option value="option2" label="选项2"></nv-option>
          <nv-option value="option3" label="选项3"></nv-option>
        </div>
      </nv-dropdown>
    </div>
  `
};

export const AllPlacements: Story = {
  render: () => html`
    <div style="padding: 200px; min-height: 800px; position: relative;">
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #999; font-size: 14px;">
        <div style="margin-bottom: 8px;">所有位置示例</div>
        <div style="font-size: 12px;">点击按钮查看不同位置的菜单</div>
      </div>

      <!-- 顶部位置 -->
      <div style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%); display: flex; gap: 16px;">
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">top-start</div>
          <nv-dropdown placement="top-start">
            <nv-button slot="trigger" size="small">TS</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">top</div>
          <nv-dropdown placement="top">
            <nv-button slot="trigger" size="small">T</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">top-end</div>
          <nv-dropdown placement="top-end">
            <nv-button slot="trigger" size="small">TE</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>

      <!-- 左侧位置 -->
      <div style="position: absolute; top: 50%; left: 50px; transform: translateY(-50%); display: flex; flex-direction: column; gap: 16px;">
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">left-start</div>
          <nv-dropdown placement="left-start">
            <nv-button slot="trigger" size="small">LS</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">left</div>
          <nv-dropdown placement="left">
            <nv-button slot="trigger" size="small">L</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">left-end</div>
          <nv-dropdown placement="left-end">
            <nv-button slot="trigger" size="small">LE</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>

      <!-- 右侧位置 -->
      <div style="position: absolute; top: 50%; right: 50px; transform: translateY(-50%); display: flex; flex-direction: column; gap: 16px;">
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">right-start</div>
          <nv-dropdown placement="right-start">
            <nv-button slot="trigger" size="small">RS</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">right</div>
          <nv-dropdown placement="right">
            <nv-button slot="trigger" size="small">R</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">right-end</div>
          <nv-dropdown placement="right-end">
            <nv-button slot="trigger" size="small">RE</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>

      <!-- 底部位置 -->
      <div style="position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); display: flex; gap: 16px;">
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">bottom-start</div>
          <nv-dropdown placement="bottom-start">
            <nv-button slot="trigger" size="small">BS</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">bottom</div>
          <nv-dropdown placement="bottom">
            <nv-button slot="trigger" size="small">B</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; color: #666; font-size: 12px;">bottom-end</div>
          <nv-dropdown placement="bottom-end">
            <nv-button slot="trigger" size="small">BE</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>
    </div>
  `
};

export const HideOnClick: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">点击内容后隐藏（默认）</h4>
        <nv-dropdown hide-on-click>
          <nv-button slot="trigger" type="primary">点击内容后隐藏</nv-button>
          <div slot="menu">
            <nv-option value="option1" label="选项1"></nv-option>
            <nv-option value="option2" label="选项2"></nv-option>
            <nv-option value="option3" label="选项3"></nv-option>
          </div>
        </nv-dropdown>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">点击内容后不隐藏</h4>
        <nv-dropdown .hideOnClick=${ false }>
          <nv-button slot="trigger" type="primary">点击内容后不隐藏</nv-button>
          <div slot="menu">
            <nv-option value="option1" label="选项1"></nv-option>
            <nv-option value="option2" label="选项2"></nv-option>
            <nv-option value="option3" label="选项3"></nv-option>
          </div>
        </nv-dropdown>
      </div>
    </div>
  `
};

export const WithIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <nv-dropdown>
        <nv-button slot="trigger">
          <nv-icon name="user"></nv-icon>
          用户菜单
        </nv-button>
        <div slot="menu">
          <nv-option value="profile" label="个人资料"></nv-option>
          <nv-option value="settings" label="设置"></nv-option>
          <nv-option value="logout" label="退出登录"></nv-option>
        </div>
      </nv-dropdown>
      <nv-dropdown>
        <nv-button slot="trigger">
          <nv-icon name="setting"></nv-icon>
          设置菜单
        </nv-button>
        <div slot="menu">
          <nv-option value="general" label="常规设置"></nv-option>
          <nv-option value="privacy" label="隐私设置"></nv-option>
          <nv-option value="security" label="安全设置"></nv-option>
        </div>
      </nv-dropdown>
    </div>
  `
};

export const LongMenu: Story = {
  render: () => html`
    <nv-dropdown>
      <nv-button slot="trigger" type="primary">长菜单示例</nv-button>
      <div slot="menu">
        <nv-option value="option1" label="选项1"></nv-option>
        <nv-option value="option2" label="选项2"></nv-option>
        <nv-option value="option3" label="选项3"></nv-option>
        <nv-option value="option4" label="选项4"></nv-option>
        <nv-option value="option5" label="选项5"></nv-option>
        <nv-option value="option6" label="选项6"></nv-option>
        <nv-option value="option7" label="选项7"></nv-option>
        <nv-option value="option8" label="选项8"></nv-option>
        <nv-option value="option9" label="选项9"></nv-option>
        <nv-option value="option10" label="选项10"></nv-option>
      </div>
    </nv-dropdown>
  `
};

export const CustomStyles: Story = {
  render: () => html`
    <style>
      .custom-dropdown-demo {
        --nv-dropdown-border-radius: 12px;
        --nv-dropdown-border-color: #1890ff;
        --nv-dropdown-border-color-hover: #40a9ff;
        --nv-dropdown-border-color-active: #096dd9;
        --nv-dropdown-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --nv-dropdown-font-size: 16px;
        --nv-dropdown-padding: 12px 20px;
        color: #fff;
      }

      .custom-menu-demo {
        --nv-dropdown-menu-background: #001529;
        --nv-dropdown-border-radius: 8px;
        --nv-dropdown-menu-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        --nv-dropdown-item-color: rgba(255, 255, 255, 0.85);
        --nv-dropdown-item-hover-background: rgba(255, 255, 255, 0.08);
        --nv-dropdown-item-active-background: #1890ff;
      }

      .elegant-dropdown {
        --nv-dropdown-border-radius: 20px;
        --nv-dropdown-menu-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        --nv-dropdown-item-padding: 12px 20px;
        --nv-dropdown-transition-duration: 0.4s;
        --nv-dropdown-item-hover-background: #f0f5ff;
        --nv-dropdown-item-active-background: #e6f7ff;
      }
    </style>

    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">自定义触发器样式</h4>
        <p style="margin: 0 0 12px 0; color: #999; font-size: 14px;">
          通过 CSS 变量自定义触发器的颜色、圆角、内边距等
        </p>
        <nv-dropdown class="custom-dropdown-demo">
          <div slot="menu">
            <nv-option value="option1" label="选项1"></nv-option>
            <nv-option value="option2" label="选项2"></nv-option>
            <nv-option value="option3" label="选项3"></nv-option>
          </div>
        </nv-dropdown>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">自定义菜单样式（深色主题）</h4>
        <p style="margin: 0 0 12px 0; color: #999; font-size: 14px;">
          通过 CSS 变量实现深色主题菜单
        </p>
        <nv-dropdown class="custom-menu-demo">
          <nv-button slot="trigger" type="primary">深色菜单</nv-button>
          <div slot="menu">
            <nv-option value="option1" label="选项1"></nv-option>
            <nv-option value="option2" label="选项2"></nv-option>
            <nv-option value="option3" label="选项3"></nv-option>
            <nv-option value="option4" label="选项4"></nv-option>
          </div>
        </nv-dropdown>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">优雅风格</h4>
        <p style="margin: 0 0 12px 0; color: #999; font-size: 14px;">
          大圆角、柔和阴影、舒缓过渡
        </p>
        <nv-dropdown class="elegant-dropdown">
          <nv-button slot="trigger">优雅风格</nv-button>
          <div slot="menu">
            <nv-option value="option1" label="选项1"></nv-option>
            <nv-option value="option2" label="选项2"></nv-option>
            <nv-option value="option3" label="选项3"></nv-option>
          </div>
        </nv-dropdown>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">可用的 CSS 变量</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #fafafa;">
              <th style="padding: 8px; text-align: left; border: 1px solid #e8e8e8;">变量名</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #e8e8e8;">说明</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #e8e8e8;">默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid #e8e8e8;"><code>--nv-dropdown-padding</code></td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">触发器内边距</td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">8px var(--nv-padding-medium)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e8e8e8;"><code>--nv-dropdown-font-size</code></td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">字体大小</td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">var(--nv-font-size-small)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e8e8e8;"><code>--nv-dropdown-border-radius</code></td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">圆角</td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">var(--nv-border-radius-medium)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e8e8e8;"><code>--nv-dropdown-border-color</code></td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">边框颜色</td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">var(--nv-neutral-color-border-1)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e8e8e8;"><code>--nv-dropdown-menu-background</code></td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">菜单背景色</td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">#fff</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e8e8e8;"><code>--nv-dropdown-menu-shadow</code></td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">菜单阴影</td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">0 2px 8px rgba(0, 0, 0, 0.15)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e8e8e8;"><code>--nv-dropdown-item-hover-background</code></td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">菜单项悬停背景</td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">#f5f5f5</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #e8e8e8;"><code>--nv-dropdown-transition-duration</code></td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">过渡动画时长</td>
              <td style="padding: 8px; border: 1px solid #e8e8e8;">0.3s</td>
            </tr>
          </tbody>
        </table>
        <p style="margin: 12px 0 0 0; color: #999; font-size: 12px;">
          更多 CSS 变量请参考组件文档
        </p>
      </div>
    </div>
  `
};

export const Strategy: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">absolute 策略（默认）- 会被裁剪 ⚠️</h4>
        <p style="margin: 0 0 12px 0; color: #999; font-size: 14px;">
          在有 overflow: hidden 的容器内，菜单可能被裁剪
        </p>
        <div style="position: relative; height: 180px; overflow: hidden; border: 1px solid #ddd; padding: 20px;">
          <div style="padding-top: 30px;">
            <nv-dropdown placement="bottom" .strategy=${ 'absolute' }>
              <nv-button slot="trigger">absolute 定位</nv-button>
              <div slot="menu">
                <nv-option value="1" label="选项1"></nv-option>
                <nv-option value="2" label="选项2"></nv-option>
                <nv-option value="3" label="选项3"></nv-option>
                <nv-option value="4" label="选项4"></nv-option>
                <nv-option value="5" label="选项5"></nv-option>
              </div>
            </nv-dropdown>
          </div>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">fixed 策略 - 不会被裁剪 ✅</h4>
        <p style="margin: 0 0 12px 0; color: #999; font-size: 14px;">
          即使在有 overflow: hidden 的容器内，菜单也能完整显示
        </p>
        <div style="position: relative; height: 180px; overflow: hidden; border: 1px solid #ddd; padding: 20px;">
          <div style="padding-top: 30px;">
            <nv-dropdown placement="bottom" .strategy=${ 'fixed' }>
              <nv-button slot="trigger">fixed 定位</nv-button>
              <div slot="menu">
                <nv-option value="1" label="选项1"></nv-option>
                <nv-option value="2" label="选项2"></nv-option>
                <nv-option value="3" label="选项3"></nv-option>
                <nv-option value="4" label="选项4"></nv-option>
                <nv-option value="5" label="选项5"></nv-option>
              </div>
            </nv-dropdown>
          </div>
        </div>
      </div>
    </div>
  `
};

export const AutoAdjust: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">启用自动调整 - 空间不足时自动翻转</h4>
        <p style="margin: 0 0 12px 0; color: #999; font-size: 14px;">
          将页面滚动到顶部或底部，观察菜单位置的自动调整
        </p>
        <div style="padding: 20px;">
          <nv-dropdown placement="top" ?autoAdjust=${ true }>
            <nv-button slot="trigger">顶部弹出（自动调整）</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
              <nv-option value="4" label="选项4"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; color: #666;">禁用自动调整 - 可能被视口裁剪</h4>
        <p style="margin: 0 0 12px 0; color: #999; font-size: 14px;">
          将页面滚动到顶部，菜单可能会被裁剪
        </p>
        <div style="padding: 20px;">
          <nv-dropdown placement="top" ?autoAdjust=${ false }>
            <nv-button slot="trigger">顶部弹出（不调整）</nv-button>
            <div slot="menu">
              <nv-option value="1" label="选项1"></nv-option>
              <nv-option value="2" label="选项2"></nv-option>
              <nv-option value="3" label="选项3"></nv-option>
              <nv-option value="4" label="选项4"></nv-option>
            </div>
          </nv-dropdown>
        </div>
      </div>
    </div>
  `
};
