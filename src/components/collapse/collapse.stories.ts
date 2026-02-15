import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../divider/index';
import '../collapse-item/index';
import '../icon/index';
import readmeMd from './README.md?raw';

// 解析 README
const readmeHtml = marked.parse(readmeMd) as string;

const meta: Meta = {
  title: 'Components/Collapse',
  component: 'nv-collapse',
  argTypes: {
    accordion: {
      control: 'boolean',
      description: '是否手风琴模式'
    },
    asyncExpand: {
      control: 'boolean',
      description: '是否异步展开'
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
          <h3 class="example-title">基础用法（可多开）</h3>
          <p class="example-desc">默认可同时展开多个面板，通过 value 可指定初始展开项（数组）</p>
          <div class="example-demo">
            ${ Default.render?.(Default.args as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">手风琴模式</h3>
          <p class="example-desc">accordion 为 true 时，同时只能展开一个面板；value 为单个 name 字符串</p>
          <div class="example-demo">
            ${ Accordion.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">默认展开多项</h3>
          <p class="example-desc">通过 value 传入 name 数组，如 value='["1","3"]' 可默认展开第 1、3 项</p>
          <div class="example-demo">
            ${ DefaultExpanded.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">自定义标题（label 插槽）</h3>
          <p class="example-desc">使用 slot="label" 可完全自定义标题内容</p>
          <div class="example-demo">
            ${ LabelSlot.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">禁用某一项</h3>
          <p class="example-desc">在 nv-collapse-item 上设置 disabled，该面板不可展开</p>
          <div class="example-demo">
            ${ DisabledItem.render?.({} as any, {} as any) }
          </div>
        </div>

        <nv-divider></nv-divider>

        <div class="example-item">
          <h3 class="example-title">异步展开</h3>
          <p class="example-desc">设置 async-expand 后展开前触发 nv-before-expand，可用 resolve(true)/resolve(html)/reject(false)/reject(字符串) 控制是否展开及内容</p>
          <div class="example-demo">
            ${ AsyncExpand.render?.({} as any, {} as any) }
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
    <nv-collapse ?accordion="${ args.accordion }" @nv-change="${ (e: CustomEvent) => console.log('激活面板:', e.detail) }">
      <nv-collapse-item name="1" label="一致性 Consistency">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </nv-collapse-item>
      <nv-collapse-item name="2" label="反馈 Feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </nv-collapse-item>
      <nv-collapse-item name="3" label="效率 Efficiency">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </nv-collapse-item>
    </nv-collapse>
  `,
  args: {
    accordion: false
  }
};

export const Accordion: Story = {
  render: () => html`
    <nv-collapse accordion value="1" @nv-change="${ (e: CustomEvent) => console.log('激活面板:', e.detail) }">
      <nv-collapse-item name="1" label="一致性 Consistency">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      </nv-collapse-item>
      <nv-collapse-item name="2" label="反馈 Feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      </nv-collapse-item>
      <nv-collapse-item name="3" label="效率 Efficiency">
        <div>简化流程：设计简洁直观的操作流程；</div>
      </nv-collapse-item>
    </nv-collapse>
  `
};

/** 默认展开多项：value 为 name 数组 */
export const DefaultExpanded: Story = {
  render: () => html`
    <nv-collapse .value=${ ['1', '3'] } @nv-change="${ (e: CustomEvent) => console.log('激活面板:', e.detail) }">
      <nv-collapse-item name="1" label="面板 1">第一项内容，默认展开。</nv-collapse-item>
      <nv-collapse-item name="2" label="面板 2">第二项内容，默认收起。</nv-collapse-item>
      <nv-collapse-item name="3" label="面板 3">第三项内容，默认展开。</nv-collapse-item>
    </nv-collapse>
  `
};

/** 使用 label 插槽自定义标题 */
export const LabelSlot: Story = {
  render: () => html`
    <nv-collapse>
      <nv-collapse-item name="1" label="默认标题">
        使用 label 属性时的标题。
      </nv-collapse-item>
      <nv-collapse-item name="2">
        <span slot="label">自定义标题 <nv-icon name="info" style="vertical-align: middle;"></nv-icon></span>
        使用 slot="label" 可完全自定义标题内容，例如加入图标。
      </nv-collapse-item>
    </nv-collapse>
  `
};

/** 禁用某一项 */
export const DisabledItem: Story = {
  render: () => html`
    <nv-collapse>
      <nv-collapse-item name="1" label="可展开项">该项可正常展开/收起。</nv-collapse-item>
      <nv-collapse-item name="2" label="禁用项" disabled>该项被禁用，无法展开。</nv-collapse-item>
      <nv-collapse-item name="3" label="可展开项">该项可正常展开/收起。</nv-collapse-item>
    </nv-collapse>
  `
};

/** 异步展开：nv-before-expand、expandedBefore 缓存、resolve/reject 四种用法 */
export const AsyncExpand: Story = {
  render: () => {
    const cache = new Map<string, string>();

    const handleBeforeExpand = (e: CustomEvent<{
      name: string;
      expandedBefore: boolean;
      resolve: (v: true | string) => void;
      reject: (v: false | string) => void;
    }>) => {
      const { name, expandedBefore, resolve, reject } = e.detail;

      // 面板 1：resolve(true) — 展示原本 slot
      if (name === '1') {
        setTimeout(() => resolve(true), 500);
        return;
      }

      // 面板 2：演示 expandedBefore — 首次请求，再次展开用缓存（即时展开）
      if (name === '2') {
        if (expandedBefore && cache.has(name)) {
          resolve(cache.get(name)!);
          return;
        }
        setTimeout(() => {
          const html = '<p>这是<strong>异步加载</strong>的 HTML 内容。再次展开时会直接用缓存，无延迟。</p>';
          cache.set(name, html);
          resolve(html);
        }, 500);
        return;
      }

      // 面板 3：reject(false) — 不展开
      if (name === '3') {
        setTimeout(() => reject(false), 500);
        return;
      }

      // 面板 4：reject(字符串) — 展开并以错误样式展示
      if (name === '4') {
        setTimeout(() => reject('加载失败：网络错误，请稍后重试。'), 500);
        return;
      }
    };

    return html`
      <nv-collapse async-expand @nv-before-expand=${ handleBeforeExpand }>
        <nv-collapse-item name="1" label="resolve(true) — 展示原本内容">
          默认 slot 内容，约 0.5 秒后展开并显示这里。
        </nv-collapse-item>
        <nv-collapse-item name="2" label="expandedBefore 缓存 — 首次请求、再次即开">
          占位。首次展开约 0.5 秒后显示异步内容；收起后再展开会直接用缓存，无延迟。
        </nv-collapse-item>
        <nv-collapse-item name="3" label="reject(false) — 不展开">
          点击后不会展开（0.5 秒后 reject(false)）。
        </nv-collapse-item>
        <nv-collapse-item name="4" label="reject(字符串) — 展开并错误样式">
          占位，展开后显示错误提示内容。
        </nv-collapse-item>
      </nv-collapse>
    `;
  }
};
