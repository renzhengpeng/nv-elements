import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../icon/index';
import '../button/index';
import '../divider/index';
import '../message/index';
import { message } from '../message/message';
import readmeMd from './README.md?raw';

const meta: Meta = {
  title: 'Components/Input',
  component: 'nv-input',
  argTypes: {
    value: {
      control: 'text',
      description: '输入框的值'
    },
    placeholder: {
      control: 'text',
      description: '占位符'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    readonly: {
      control: 'boolean',
      description: '是否只读'
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'textarea', 'number', 'email', 'url', 'tel'],
      description: '输入框类型'
    },
    clearable: {
      control: 'boolean',
      description: '是否可清空'
    },
    showPassword: {
      control: 'boolean',
      description: '是否显示密码切换按钮'
    },
    maxlength: {
      control: 'number',
      description: '最大输入长度'
    },
    showWordLimit: {
      control: 'boolean',
      description: '是否显示字数统计'
    },
    wordLimitPosition: {
      control: 'select',
      options: ['inside', 'outside'],
      description: '字数统计显示位置'
    },
    max: {
      control: 'number',
      description: '数字输入框的最大值（仅当type为number时有效）'
    },
    min: {
      control: 'number',
      description: '数字输入框的最小值（仅当type为number时有效）'
    },
    prefixIcon: {
      control: 'text',
      description: '前置图标'
    },
    suffixIcon: {
      control: 'text',
      description: '后置图标'
    },
    size: {
      control: 'select',
      options: ['mini', 'small', 'medium', 'large', 'huge'],
      description: '输入框尺寸'
    }
  }
};

export default meta;
type Story = StoryObj;

// 将 README 转换为 HTML
const readmeHtml = marked.parse(readmeMd) as string;

/**
 * Input 组件的完整文档和示例展示
 */
export const Overview: Story = {
  render: () => {
    return html`
      <style>
        .readme-container {
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .readme-container h1 {
          font-size: 32px;
          font-weight: 600;
          margin: 0 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 1px solid #eaecef;
        }
        .readme-container h2 {
          font-size: 24px;
          font-weight: 600;
          margin: 32px 0 16px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid #eaecef;
        }
        .readme-container p {
          margin: 8px 0;
        }
        .readme-container code {
          background: #f6f8fa;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Consolas', 'Monaco', monospace;
          font-size: 0.9em;
        }
        .readme-container pre {
          background: #f6f8fa;
          padding: 16px;
          border-radius: 6px;
          overflow-x: auto;
        }
        .readme-container pre code {
          background: none;
          padding: 0;
        }
        .readme-container table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
        }
        .readme-container table th,
        .readme-container table td {
          border: 1px solid #dfe2e5;
          padding: 8px 12px;
          text-align: left;
        }
        .readme-container table th {
          background: #f6f8fa;
          font-weight: 600;
        }
        .readme-container table tr:nth-child(even) {
          background: #f9f9f9;
        }
        .story-section {
          margin: 32px 0;
        }
        .story-section h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #333;
        }
        .story-section p {
          margin: 0 0 12px 0;
          color: #666;
        }
      </style>

      <div class="readme-container">
        ${ unsafeHTML(readmeHtml) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>基础用法</h3>
        <p>最简单的输入框用法</p>
        ${ Basic.render?.(Basic.args as any, {} as any) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>带图标的输入框</h3>
        <p>可以为输入框添加前缀和后缀图标</p>
        ${ WithIcons.render?.(WithIcons.args as any, {} as any) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>可清空</h3>
        <p>使用 clearable 属性即可得到一个可清空的输入框</p>
        ${ Clearable.render?.(Clearable.args as any, {} as any) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>密码框</h3>
        <p>使用 show-password-toggle 属性即可得到一个可切换显示隐藏的密码框</p>
        ${ Password.render?.(Password.args as any, {} as any) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>文本域</h3>
        <p>用于输入多行文本信息</p>
        ${ Textarea.render?.(Textarea.args as any, {} as any) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>字数统计</h3>
        <p>通过 maxlength 和 show-word-limit 属性实现字数统计</p>
        ${ WordLimit.render?.(WordLimit.args as any, {} as any) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>不同类型</h3>
        <p>Input 支持多种输入类型</p>
        ${ DifferentTypes.render?.(DifferentTypes.args as any, {} as any) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>不同尺寸</h3>
        <p>提供五种不同尺寸的输入框</p>
        ${ Sizes.render?.(Sizes.args as any, {} as any) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>前置/后置元素</h3>
        <p>可以为输入框添加前置或后置元素</p>
        ${ WithPrependAppend.render?.(WithPrependAppend.args as any, {} as any) }
      </div>

      <nv-divider></nv-divider>

      <div class="story-section">
        <h3>表单关联</h3>
        <p>支持 name、form、required，与原生 form 提交、重置、校验一致</p>
        ${ FormAssociated.render?.(FormAssociated.args as any, {} as any) }
      </div>
    `;
  }
};

export const Default: Story = {
  render: (args) => html`
    <nv-input
      value="${ args.value }"
      placeholder="${ args.placeholder }"
      ?disabled="${ args.disabled }"
      ?readonly="${ args.readonly }"
      type="${ args.type }"
      ?clearable="${ args.clearable }"
      .showPasswordToggle="${ args.showPasswordToggle }"
      maxlength="${ args.maxlength }"
      ?show-word-limit="${ args.showWordLimit }"
      prefix-icon="${ args.prefixIcon }"
      suffix-icon="${ args.suffixIcon }"
      max="${ args.max }"
      min="${ args.min }"
      size="${ args.size }"
    ></nv-input>
  `,
  args: {
    value: '',
    placeholder: '请输入内容',
    disabled: false,
    readonly: false,
    type: 'text',
    clearable: false,
    showPasswordToggle: false,
    maxlength: undefined,
    showWordLimit: false,
    prefixIcon: '',
    suffixIcon: '',
    max: undefined,
    min: undefined,
    size: 'medium'
  }
};

export const Basic: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <nv-input placeholder="请输入内容"></nv-input>
      <nv-input value="只读输入框" readonly></nv-input>
      <nv-input value="禁用输入框" disabled></nv-input>
    </div>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <nv-input placeholder="前置图标" prefix-icon="user"></nv-input>
      <nv-input placeholder="后置图标" suffix-icon="search"></nv-input>
      <nv-input placeholder="前后都有图标" prefix-icon="s-home" suffix-icon="setting"></nv-input>
    </div>
  `
};

export const Clearable: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <nv-input value="可清空" clearable></nv-input>
    </div>
  `
};

export const Password: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <nv-input type="password" placeholder="请输入密码" show-password-toggle></nv-input>
    </div>
  `
};

export const Textarea: Story = {
  render: () => html`
    <div style="width: 300px;">
      <nv-input type="textarea" placeholder="请输入内容" rows="4"></nv-input>
    </div>
  `
};

export const WordLimit: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <div>
        <div style="margin-bottom: 8px; color: #666; font-size: 12px;">外部显示（默认）</div>
        <nv-input maxlength="20" show-word-limit placeholder="最多输入20个字符"></nv-input>
      </div>
      <div>
        <div style="margin-bottom: 8px; color: #666; font-size: 12px;">内部显示</div>
        <nv-input maxlength="20" show-word-limit word-limit-position="inside" placeholder="最多输入20个字符"></nv-input>
      </div>
      <div>
        <div style="margin-bottom: 8px; color: #666; font-size: 12px;">Textarea 外部显示</div>
        <nv-input type="textarea" maxlength="100" show-word-limit placeholder="最多输入100个字符" rows="4"></nv-input>
      </div>
      <div>
        <div style="margin-bottom: 8px; color: #666; font-size: 12px;">Textarea 内部显示</div>
        <nv-input type="textarea" maxlength="100" show-word-limit word-limit-position="inside" placeholder="最多输入100个字符" rows="4"></nv-input>
      </div>
    </div>
  `
};

export const DifferentTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <nv-input type="text" placeholder="文本输入框"></nv-input>
      <nv-input type="number" placeholder="数字输入框"></nv-input>
      <nv-input type="email" placeholder="邮箱输入框"></nv-input>
      <nv-input type="url" placeholder="URL输入框"></nv-input>
      <nv-input type="tel" placeholder="电话输入框"></nv-input>
    </div>
  `
};

export const NumberWithMinMax: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <nv-input type="number" min="0" max="100" placeholder="请输入0-100之间的数字"></nv-input>
      <nv-input type="number" min="-10" max="10" placeholder="请输入-10到10之间的数字"></nv-input>
      <nv-input type="number" min="0" placeholder="最小值为0"></nv-input>
      <nv-input type="number" max="1000" placeholder="最大值为1000"></nv-input>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <div>
        <div style="margin-bottom: 8px; color: #666; font-size: 12px;">迷你尺寸</div>
        <nv-input size="mini" placeholder="请输入内容"></nv-input>
      </div>
      <div>
        <div style="margin-bottom: 8px; color: #666; font-size: 12px;">小型尺寸</div>
        <nv-input size="small" placeholder="请输入内容"></nv-input>
      </div>
      <div>
        <div style="margin-bottom: 8px; color: #666; font-size: 12px;">中等尺寸</div>
        <nv-input size="medium" placeholder="请输入内容"></nv-input>
      </div>
      <div>
        <div style="margin-bottom: 8px; color: #666; font-size: 12px;">大型尺寸</div>
        <nv-input size="large" placeholder="请输入内容"></nv-input>
      </div>
      <div>
        <div style="margin-bottom: 8px; color: #666; font-size: 12px;">巨大尺寸</div>
        <nv-input size="huge" placeholder="请输入内容"></nv-input>
      </div>
    </div>
  `
};

export const WithPrependAppend: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <nv-input placeholder="前置内容">
        <div slot="prepend">Http://</div>
      </nv-input>
      <nv-input placeholder="后置内容">
        <div slot="append">.com</div>
      </nv-input>
      <nv-input placeholder="前后都有内容">
        <div slot="prepend">https://</div>
        <div slot="append">.com</div>
      </nv-input>
      <nv-input placeholder="前置按钮">
        <nv-button slot="prepend" size="small">搜索</nv-button>
      </nv-input>
      <nv-input placeholder="后置按钮">
        <nv-button slot="append" size="small">提交</nv-button>
      </nv-input>
    </div>
  `
};

export const CombinedFeatures: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <nv-input
        placeholder="带图标和清空功能"
        prefix-icon="user"
        clearable
        value="示例内容"
      ></nv-input>
      <nv-input
        placeholder="密码输入框"
        type="password"
        show-password-toggle
        prefix-icon="lock"
      ></nv-input>
      <nv-input
        placeholder="带字数统计"
        maxlength="50"
        show-word-limit
        value="这是一段示例文本"
      ></nv-input>
      <nv-input
        type="textarea"
        placeholder="多行文本输入"
        rows="4"
        maxlength="200"
        show-word-limit
      ></nv-input>
    </div>
  `
};

/** 表单关联：name、form、required，与原生 form 提交、重置、校验一致 */
export const FormAssociated: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <form
        id="input-form-demo"
        style="display: flex; flex-direction: column; gap: 12px;"
        @submit=${ (e: SubmitEvent) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          if (form.reportValidity()) {
            const fd = new FormData(form);
            message.success({ message: '表单校验通过，FormData: ' + JSON.stringify(Object.fromEntries(fd)), showIcon: true });
          } else {
            message.error({ message: '请填写必填项', showIcon: true });
          }
        } }
      >
        <label style="font-size: 14px; color: #606266;">用户名（必填）</label>
        <nv-input
          form="input-form-demo"
          name="username"
          required
          placeholder="请输入用户名"
          autocomplete="off"
        ></nv-input>
        <label style="font-size: 14px; color: #606266;">备注（选填）</label>
        <nv-input
          form="input-form-demo"
          name="remark"
          placeholder="请输入备注"
        ></nv-input>
        <div style="display: flex; gap: 8px;">
          <button type="submit" style="padding: 6px 16px; cursor: pointer;">提交（会触发校验）</button>
          <button type="reset" style="padding: 6px 16px; cursor: pointer;">重置</button>
        </div>
      </form>
      <p style="font-size: 12px; color: #909399; margin: 0;">支持 name、form、required；提交时参与 form.reportValidity()，重置时通过 formResetCallback 恢复默认值。</p>
    </div>
  `
};

/** 综合测试：多功能叠加使用 */
export const ComprehensiveTest: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
      <h3 style="margin: 0; font-size: 16px; color: #303133;">综合功能测试</h3>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">前缀图标 + 清空 + 字数限制（外部）</label>
        <nv-input
          placeholder="请输入用户名"
          prefix-icon="user"
          clearable
          maxlength="20"
          show-word-limit
          word-limit-position="outside"
          value="测试用户"
        ></nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">后缀图标 + 清空 + 字数限制（内部）</label>
        <nv-input
          placeholder="请输入邮箱"
          suffix-icon="message"
          clearable
          maxlength="30"
          show-word-limit
          word-limit-position="inside"
          value="test@example.com"
        ></nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">密码框 + 前缀图标 + 清空 + 字数限制</label>
        <nv-input
          type="password"
          placeholder="请输入密码"
          prefix-icon="lock"
          .showPassword="${true}"
          clearable
          maxlength="16"
          show-word-limit
          word-limit-position="outside"
          value="password123"
        ></nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">前置内容 + 前缀图标 + 清空</label>
        <nv-input
          placeholder="请输入网址"
          prefix-icon="link"
          clearable
          value="example.com"
        >
          <span slot="prepend">https://</span>
        </nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">后置内容 + 后缀图标 + 清空</label>
        <nv-input
          placeholder="请输入价格"
          suffix-icon="money"
          clearable
          value="99.99"
        >
          <span slot="append">.00</span>
        </nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">前后置按钮 + 清空</label>
        <nv-input
          placeholder="请输入搜索内容"
          clearable
          value="搜索关键词"
        >
          <nv-button slot="prepend" size="small">选择</nv-button>
          <nv-button slot="append" size="small" type="primary">搜索</nv-button>
        </nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">文本域 + 清空 + 字数限制（外部）</label>
        <nv-input
          type="textarea"
          placeholder="请输入描述信息"
          rows="4"
          clearable
          maxlength="200"
          show-word-limit
          word-limit-position="outside"
          value="这是一段测试文本，用于展示文本域的多功能叠加效果。"
        ></nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">文本域 + 清空 + 字数限制（内部）</label>
        <nv-input
          type="textarea"
          placeholder="请输入备注"
          rows="3"
          clearable
          maxlength="100"
          show-word-limit
          word-limit-position="inside"
          value="内部字数统计示例"
        ></nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">禁用状态 + 多功能</label>
        <nv-input
          placeholder="禁用状态"
          prefix-icon="user"
          suffix-icon="message"
          clearable
          maxlength="20"
          show-word-limit
          disabled
          value="禁用状态测试"
        ></nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">只读状态 + 多功能</label>
        <nv-input
          placeholder="只读状态"
          prefix-icon="lock"
          clearable
          maxlength="20"
          show-word-limit
          readonly
          value="只读状态测试"
        ></nv-input>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 14px; color: #606266;">不同尺寸 + 多功能</label>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <nv-input
            size="small"
            placeholder="小尺寸"
            prefix-icon="user"
            clearable
            maxlength="15"
            show-word-limit
            value="小尺寸"
          ></nv-input>
          <nv-input
            size="medium"
            placeholder="中等尺寸"
            prefix-icon="user"
            clearable
            maxlength="15"
            show-word-limit
            value="中等尺寸"
          ></nv-input>
          <nv-input
            size="large"
            placeholder="大尺寸"
            prefix-icon="user"
            clearable
            maxlength="15"
            show-word-limit
            value="大尺寸"
          ></nv-input>
        </div>
      </div>
    </div>
  `
};
