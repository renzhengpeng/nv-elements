import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import type { TableColumn } from './types';
import './index';
import '../tag/index';
import '../divider/index';
import { message } from '../message/index';
import readmeMd from './README.md?raw';

// 将 README 转换为 HTML
const readmeHtml = marked.parse(readmeMd) as string;

// 生成测试数据
function generateData(count: number) {
  const statuses = ['active', 'inactive', 'pending'];
  const roles = ['Admin', 'Editor', 'Viewer'];
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: statuses[i % 3],
    role: roles[i % 3],
    department: departments[i % 5],
    salary: Math.floor(10000 + Math.random() * 50000),
    created: new Date(2024, 0, 1 + (i % 365)).toISOString().split('T')[0],
  }));
}

const smallData = generateData(20);
const largeData = generateData(100000);
const massiveData = generateData(1000000);

const basicColumns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
  { prop: 'name', label: '姓名', minWidth: 120 },
  { prop: 'email', label: '邮箱', minWidth: 200 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'role', label: '角色', width: 100 },
  { prop: 'department', label: '部门', width: 120 },
  { prop: 'created', label: '创建日期', width: 120 },
];

const meta: Meta = {
  title: 'Components/Table',
  component: 'nv-table',
  argTypes: {
    height: { control: 'text', description: '表格高度' },
    stripe: { control: 'boolean', description: '是否显示斑马纹' },
    border: { control: 'boolean', description: '是否显示纵向边框' },
    showHeader: { control: 'boolean', description: '是否显示表头' },
    highlightCurrentRow: { control: 'boolean', description: '是否高亮当前行' },
    rowHeight: { control: 'number', description: '行高(px)' },
  },
};

export default meta;
type Story = StoryObj;

/* =============================
   Overview
   ============================= */

/**
 * Table 组件的完整文档和示例展示
 */
export const Overview: Story = {
  name: '组件概览',
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => html`
    <div style="padding: 20px; max-width: 1200px;">
      <style>
        .readme-content {
          background: #fff;
          padding: 30px;
          border-radius: 4px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          margin-bottom: 40px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .readme-content h1 {
          font-size: 32px; font-weight: 600; margin: 0 0 16px;
          padding-bottom: 12px; border-bottom: 1px solid #eaecef;
        }
        .readme-content h2 {
          font-size: 24px; font-weight: 600; margin: 32px 0 16px;
          padding-bottom: 8px; border-bottom: 1px solid #eaecef;
        }
        .readme-content h3 {
          font-size: 18px; font-weight: 600; margin: 24px 0 12px;
        }
        .readme-content p { margin: 8px 0; }
        .readme-content code {
          background: #f6f8fa; padding: 2px 6px; border-radius: 3px;
          font-family: 'Consolas', 'Monaco', monospace; font-size: 0.9em;
        }
        .readme-content pre {
          background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto;
        }
        .readme-content pre code { background: none; padding: 0; }
        .readme-content table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        .readme-content table th,
        .readme-content table td { border: 1px solid #dfe2e5; padding: 8px 12px; text-align: left; }
        .readme-content table th { background: #f6f8fa; font-weight: 600; }
        .readme-content table tr:nth-child(even) { background: #f9f9f9; }
        .example-item { margin: 32px 0; }
        .example-title { font-size: 20px; font-weight: 600; margin: 0 0 8px; color: #333; }
        .example-desc { margin: 0 0 16px; color: #666; font-size: 14px; }
        .example-demo {
          padding: 20px; background: #fff;
          border-radius: 4px; border: 1px solid #e4e7ed;
        }
      </style>

      <!-- README 文档 -->
      <div class="readme-content">
        ${unsafeHTML(readmeHtml)}
      </div>

      <!-- 分隔线 -->
      <nv-divider style="margin: 40px 0;">
        <span style="color: #909399; font-size: 16px; font-weight: 500;">✨ 交互示例</span>
      </nv-divider>

      <!-- 示例区域 -->
      <div class="examples-section">

        <!-- 基础表格 -->
        <div class="example-item">
          <h3 class="example-title">基础表格</h3>
          <p class="example-desc">最基础的用法，通过 data 和 columns 属性渲染表格。</p>
          <div class="example-demo">
            ${Basic.render?.(Basic.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 斑马纹和边框 -->
        <div class="example-item">
          <h3 class="example-title">斑马纹和边框</h3>
          <p class="example-desc">stripe 属性开启斑马纹，border 属性开启纵向边框，提高数据可读性。</p>
          <div class="example-demo">
            ${StripeAndBorder.render?.(StripeAndBorder.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 排序 -->
        <div class="example-item">
          <h3 class="example-title">排序</h3>
          <p class="example-desc">在列配置中设置 <code>sortable: true</code>，点击表头触发三态排序：升序 → 降序 → 取消。</p>
          <div class="example-demo">
            ${Sortable.render?.(Sortable.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 多选 -->
        <div class="example-item">
          <h3 class="example-title">多选</h3>
          <p class="example-desc">列配置中设置 <code>type: 'selection'</code> 开启多选，支持全选/半选，搭配 <code>row-key</code> 可保证数据唯一性。</p>
          <div class="example-demo">
            ${Selection.render?.(Selection.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 单选 -->
        <div class="example-item">
          <h3 class="example-title">单选</h3>
          <p class="example-desc">列配置中设置 <code>type: 'radio'</code> 开启单选，每次只能选中一行。</p>
          <div class="example-demo">
            ${Radio.render?.(Radio.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 固定列 -->
        <div class="example-item">
          <h3 class="example-title">固定列</h3>
          <p class="example-desc">列配置中设置 <code>fixed: 'left'</code> 或 <code>fixed: 'right'</code>，在水平滚动时始终可见。</p>
          <div class="example-demo">
            ${FixedColumn.render?.(FixedColumn.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 多级表头 -->
        <div class="example-item">
          <h3 class="example-title">多级表头</h3>
          <p class="example-desc">列配置中通过 <code>children</code> 嵌套可实现多级表头分组。</p>
          <div class="example-demo">
            ${GroupingHeader.render?.(GroupingHeader.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 表头过滤 -->
        <div class="example-item">
          <h3 class="example-title">表头过滤</h3>
          <p class="example-desc">列配置中增加 <code>filters</code> 开启表头下拉过滤（单选/多选）功能。</p>
          <div class="example-demo">
            ${ColumnFilter.render?.(ColumnFilter.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 右键菜单 -->
        <div class="example-item">
          <h3 class="example-title">右键菜单</h3>
          <p class="example-desc">监听 <code>nv-row-contextmenu</code> 事件，携带 <code>{ row, rowIndex, column, columnIndex, cellValue, event }</code>，由外部自行实现菜单 UI。</p>
          <div class="example-demo">
            ${ContextMenu.render?.(ContextMenu.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 高亮当前行 -->
        <div class="example-item">
          <h3 class="example-title">高亮当前行</h3>
          <p class="example-desc">设置 <code>highlight-current-row</code>，点击行后高亮显示，再次点击取消。</p>
          <div class="example-demo">
            ${HighlightCurrentRow.render?.(HighlightCurrentRow.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 列宽拖动 -->
        <div class="example-item">
          <h3 class="example-title">列宽拖动</h3>
          <p class="example-desc">设置 <code>resizable</code> 属性后，可拖拽表头右边缘调整列宽。</p>
          <div class="example-demo">
            ${ColumnResizable.render?.(ColumnResizable.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 合计行 -->
        <div class="example-item">
          <h3 class="example-title">表尾合计行</h3>
          <p class="example-desc">设置 <code>show-summary</code> 属性展示表尾合计行。数字列自动求和，也可通过 <code>summary-method</code> 自定义内容。</p>
          <div class="example-demo">
            ${SummaryRow.render?.(SummaryRow.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 分页 -->
        <div class="example-item">
          <h3 class="example-title">分页</h3>
          <p class="example-desc">开启 <code>pagination</code>，内置底部分页栏模块支持大数据集的前后端分页。</p>
          <div class="example-demo">
            ${Pagination.render?.(Pagination.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 树形数据 -->
        <div class="example-item">
          <h3 class="example-title">树形数据</h3>
          <p class="example-desc">通过 <code>children</code> 字段展开子行并显示树形缩进，同时支持 <code>lazy</code> 异步懒加载层级。</p>
          <div class="example-demo">
            ${TreeData.render?.(TreeData.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 大数据量 -->
        <div class="example-item">
          <h3 class="example-title">10 万行数据（虚拟滚动）</h3>
          <p class="example-desc">基于虚拟滚动技术，只渲染可视区域内的行，轻松应对海量数据场景。</p>
          <div class="example-demo">
            ${LargeDataset.render?.(LargeDataset.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 顶部操作栏 -->
        <div class="example-item">
          <h3 class="example-title">顶部操作栏</h3>
          <p class="example-desc">设置 <code>show-toolbar</code> 显示顶部工具栏，内置列设置、密度切换与 CSV 导出功能。</p>
          <div class="example-demo">
            ${OperationBar.render?.(OperationBar.args as any, {} as any)}
          </div>
        </div>

        <nv-divider></nv-divider>

        <!-- 综合测试 -->
        <div class="example-item">
          <h3 class="example-title">全功能综合测试</h3>
          <p class="example-desc">结合以上绝大多数核心功能，进行复杂数据表格展示的整体兼容性集成测试。</p>
          <div class="example-demo">
            ${FullFeature.render?.(FullFeature.args as any, {} as any)}
          </div>
        </div>

      </div>
    </div>
  `,
};

/* =============================
   各功能 Story
   ============================= */

/** 基础表格 */
export const Basic: Story = {
  name: '基础表格',
  render: () => html`
    <nv-table .data="${smallData}" .columns="${basicColumns}" height="400px"></nv-table>
  `,
};

/** 斑马纹 + 边框 */
export const StripeAndBorder: Story = {
  name: '斑马纹和边框',
  render: () => html`
    <nv-table .data="${smallData}" .columns="${basicColumns}" height="400px" stripe border></nv-table>
  `,
};

/** 排序 */
export const Sortable: Story = {
  name: '排序',
  render: () => {
    const columns = [
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const, sortable: true },
      { prop: 'name', label: '姓名', minWidth: 150, sortable: true },
      { prop: 'salary', label: '薪资', width: 120, align: 'right' as const, sortable: true },
      { prop: 'department', label: '部门', width: 140 },
      { prop: 'role', label: '角色', width: 100 },
    ];
    return html`
      <p style="margin-bottom:12px;color:#666;">点击表头列名触发排序（三态：升序 → 降序 → 取消）</p>
      <nv-table
        .data="${smallData}"
        .columns="${columns}"
        height="400px"
        border
        @nv-sort-change="${(e: CustomEvent) => console.log('nv-sort-change:', e.detail)}"
      ></nv-table>
    `;
  },
};

/** 多选 */
export const Selection: Story = {
  name: '多选',
  render: () => {
    const columns = [
      { type: 'selection' as const, prop: '', label: '' },
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
      { prop: 'name', label: '姓名', minWidth: 150 },
      { prop: 'email', label: '邮筱', minWidth: 200 },
      { prop: 'role', label: '角色', width: 100 },
    ];
    return html`
      <p style="margin-bottom:12px;color:#666;">支持全选/半选，打开控制台查看事件</p>
      <nv-table
        .data="${smallData}"
        .columns="${columns}"
        height="400px"
        row-key="id"
        border
        @nv-selection-change="${(e: CustomEvent) => console.log('nv-selection-change:', e.detail.selection.length, '行')}"
        @nv-select="${(e: CustomEvent) => console.log('nv-select:', e.detail)}"
        @nv-select-all="${(e: CustomEvent) => console.log('nv-select-all:', e.detail)}"
      ></nv-table>
    `;
  },
};

/** 单选 */
export const Radio: Story = {
  name: '单选',
  render: () => {
    const columns = [
      { type: 'radio' as const, prop: '', label: '' },
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
      { prop: 'name', label: '姓名', minWidth: 150 },
      { prop: 'email', label: '邮筱', minWidth: 200 },
      { prop: 'role', label: '角色', width: 100 },
    ];
    return html`
      <p style="margin-bottom:12px;color:#666;">点击行单选，打开控制台查看事件</p>
      <nv-table
        .data="${smallData}"
        .columns="${columns}"
        height="400px"
        row-key="id"
        border
        @nv-current-change="${(e: CustomEvent) => console.log('nv-current-change:', e.detail)}"
      ></nv-table>
    `;
  },
};

/** 固定列 */
export const FixedColumn: Story = {
  name: '固定列',
  render: () => {
    const columns = [
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const, fixed: 'left' as const },
      { prop: 'name', label: '姓名', width: 120, fixed: 'left' as const },
      { prop: 'email', label: '邮筱', minWidth: 200 },
      { prop: 'status', label: '状态', width: 100 },
      { prop: 'role', label: '角色', width: 120 },
      { prop: 'department', label: '部门', width: 140 },
      { prop: 'salary', label: '薪资', width: 120 },
      { prop: 'created', label: '创建日期', width: 140, fixed: 'right' as const },
    ];
    return html`
      <p style="margin-bottom:12px;color:#666;">ID、姓名固定在左侧，创建日期固定在右侧，横向滚动时保持可见</p>
      <nv-table
        .data="${smallData}"
        .columns="${columns}"
        height="400px"
        border
        style="width: 600px;"
      ></nv-table>
    `;
  },
};

/** 状态标签渲染（提取到顶层，避免 render 内嵌套 html 模板影响 Storybook source 解析） */
const renderStatusTag = (val: unknown) => {
  const type = val === 'active' ? 'success' : val === 'inactive' ? 'danger' : 'warning';
  return html`<nv-tag type="${type}" size="small">${val}</nv-tag>`;
};

/** 自定义单元格渲染 */
export const CustomCellRender: Story = {
  name: '自定义单元格渲染',
  render: () => {
    const columns = [
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
      { prop: 'name', label: '姓名', minWidth: 150 },
      { prop: 'email', label: '邮箱', minWidth: 200 },
      {
        prop: 'status',
        label: '状态',
        width: 120,
        align: 'center' as const,
        renderCell: renderStatusTag,
      },
      { prop: 'role', label: '角色', width: 120 },
    ];
    return html`
      <nv-table .data="${smallData}" .columns="${columns}" height="400px" border></nv-table>
    `;
  },
};

/** 右键菜单（contextmenu slot） */
export const ContextMenu: Story = {
  name: '右键菜单',
  render: () => {
    let currentRowData: any = null;
    const tableId = 'ctx-demo-table';

    const getTable = () => document.getElementById(tableId) as any;

    return html`
      <style>
        .ctx-menu {
          list-style: none;
          margin: 0;
          padding: 4px 0;
          background: #fff;
          border-radius: 4px;
          // box-shadow: 0 2px 12px rgba(0,0,0,.15);
          min-width: 140px;
          font-size: 14px;
        }
        .ctx-menu li {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          color: #333;
          cursor: pointer;
          user-select: none;
        }
        .ctx-menu li:hover { background: #f5f7fa; }
        .ctx-menu li.danger { color: #f56c6c; }
        .ctx-menu li.danger:hover { background: #fef0f0; }
        .ctx-menu-sep { height: 1px; background: #ebeef5; margin: 4px 0; }
      </style>
      <p style="margin-bottom:12px;color:#666;">在任意行上 <strong>右键</strong>，会弹出自定义菜单</p>
      <nv-table
        id="${tableId}"
        .data="${smallData}"
        .columns="${basicColumns}"
        height="400px"
        border
        @nv-row-contextmenu="${(e: CustomEvent) => {
          currentRowData = e.detail.row;
          console.log('nv-row-contextmenu:', e.detail);
        }}"
      >
        <ul slot="contextmenu" class="ctx-menu"
          @click="${(e: MouseEvent) => {
            const li = (e.target as HTMLElement).closest('li');
            if (!li) return;
            const action = (li as HTMLElement).dataset['action'];
            if (action === 'copy') {
              message.info('复制: ' + currentRowData?.name);
            } else if (action === 'edit') {
              message.info('编辑: ' + currentRowData?.name);
            } else if (action === 'delete') {
              message.info('删除: ' + currentRowData?.name);
            }
            getTable()?.closeContextMenu();
          }}"
        >
          <li data-action="copy">📋 复制</li>
          <li data-action="edit">✏️ 编辑</li>
          <div class="ctx-menu-sep"></div>
          <li data-action="delete" class="danger">🗑️ 删除</li>
        </ul>
      </nv-table>
    `;
  },
};


/** 高亮当前行 */
export const HighlightCurrentRow: Story = {
  name: '高亮当前行',
  render: () => html`
    <p style="margin-bottom:12px;color:#666;">点击任意行进行高亮，再次点击取消</p>
    <nv-table
      .data="${smallData}"
      .columns="${basicColumns}"
      height="400px"
      highlight-current-row
      @nv-row-click="${(e: CustomEvent) => console.log('行点击:', e.detail)}"
    ></nv-table>
  `,
};

/** 空状态 */
export const EmptyState: Story = {
  name: '空状态',
  render: () => html`
    <nv-table .data="${[]}" .columns="${basicColumns}" height="300px" border></nv-table>
  `,
};

/** 大数据量（10 万行） */
export const LargeDataset: Story = {
  name: '10万行数据',
  render: () => html`
    <p style="margin-bottom:12px;color:#666;">100,000 行数据，虚拟滚动渲染</p>
    <nv-table .data="${largeData}" .columns="${basicColumns}" height="500px" stripe></nv-table>
  `,
};

/** 行展开（type=expand） */
export const RowExpand: Story = {
  name: '行展开',
  render: () => {
    const expandTableId = 'row-expand-table';
    const columns = [
      {
        type: 'expand' as const,
        prop: 'expand',
        label: '',
        width: 48,
        // renderCell 用于渲染展开面板内容
        renderCell: (_val: unknown, row: any) => html`
          <div style="display:flex;gap:24px;flex-wrap:wrap;">
            <div><span style="color:#909399;">姓名：</span><b>${row.name}</b></div>
            <div><span style="color:#909399;">部门：</span>${row.department}</div>
            <div><span style="color:#909399;">状态：</span>${row.status}</div>
            <div><span style="color:#909399;">薪资：</span>¥${row.salary?.toLocaleString()}</div>
            <div><span style="color:#909399;">角色：</span>${row.role}</div>
            <div><span style="color:#909399;">入职日期：</span>${row.created}</div>
          </div>
        `,
      },
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
      { prop: 'name', label: '姓名', width: 140 },
      { prop: 'department', label: '部门', width: 150 },
      { prop: 'role', label: '角色', width: 120 },
      { prop: 'status', label: '状态', width: 100 },
    ];

    const expandData = generateData(20);

    return html`
      <p style="margin-bottom:12px;color:#666;line-height:1.8;">
        设置列类型 <code>type: 'expand'</code>，通过 <code>renderCell</code> 返回展开面板内容。<br/>
        点击展开图标展开/折叠该行；支持多行同时展开。
      </p>
      <div style="margin-bottom:12px;">
        <button
          style="padding:4px 12px;border:1px solid #dcdfe6;border-radius:4px;background:#fff;cursor:pointer;font-size:13px;margin-right:8px;"
          @click="${() => {
            const table = document.getElementById(expandTableId) as any;
            const rows = expandData.slice(0, 3);
            rows.forEach((r: any) => table?.toggleExpandRow(r, true));
          }}"
        >展开前 3 行</button>
        <button
          style="padding:4px 12px;border:1px solid #dcdfe6;border-radius:4px;background:#fff;cursor:pointer;font-size:13px;"
          @click="${() => {
            const table = document.getElementById(expandTableId) as any;
            const expanded = table?.getExpandedRows() ?? [];
            expanded.forEach((r: any) => table?.toggleExpandRow(r, false));
          }}"
        >收起全部</button>
      </div>
      <nv-table
        id="${expandTableId}"
        .data="${expandData}"
        .columns="${columns}"
        row-key="id"
        border
        height="500px"
        @nv-expand-change="${(e: CustomEvent) => {
          const { row, expanded, expandedRows } = e.detail;
          message.info(`${row.name} ${expanded ? '展开' : '收起'}，当前共展开 ${expandedRows.length} 行`);
        }}"
      ></nv-table>
    `;
  },
};

/** 百万级数据（100 万行） */
export const OneMillionRows: Story = {
  name: '100万行数据',
  render: () => html`
    <p style="margin-bottom:12px;color:#666;">1,000,000 行数据，虚拟滚动渲染</p>
    <nv-table .data="${massiveData}" .columns="${basicColumns}" height="600px" stripe border></nv-table>
  `,
};

/** 多级表头 */
export const GroupingHeader: Story = {
  name: '多级表头',
  render: () => {
    const columns = [
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const, fixed: 'left' as const },
      { 
        label: '个人信息', 
        children: [
          { prop: 'name', label: '姓名', minWidth: 120 },
          { prop: 'email', label: '邮箱', minWidth: 200 },
        ]
      },
      {
        label: '工作信息',
        children: [
          {
            label: '所在组',
            children: [
              { prop: 'department', label: '部门', minWidth: 120 },
              { prop: 'role', label: '角色', width: 100 },
            ]
          },
          { prop: 'status', label: '状态', width: 100 },
          { prop: 'salary', label: '薪资(暂无数据)', width: 120 }
        ]
      }
    ];
    return html`
      <p style="margin-bottom:12px;color:#666;">配置列对象的 <code>children</code> 字段实现多层级表头，使用 Flexbox 自动高度拉伸对齐，支持组合固定列。</p>
      <nv-table
        .data="${smallData}"
        .columns="${columns}"
        height="400px"
        border
      ></nv-table>
    `;
  },
};

/** 分页 */
export const Pagination: Story = {
  name: '分页',
  render: () => {
    const columns = [
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
      { prop: 'name', label: '姓名', minWidth: 120 },
      { prop: 'department', label: '部门', minWidth: 120 },
      { prop: 'role', label: '角色', width: 100 },
      { prop: 'status', label: '状态', width: 100 },
    ];
    return html`
      <p style="margin-bottom:12px;color:#666;">内置分页，设置 <code>pagination</code> 属性即可，支持 <code>page-size</code> 和 <code>current-page</code></p>
      <nv-table
        .data="${smallData}"
        .columns="${columns}"
        height="360px"
        border
        pagination
        page-size="5"
        @nv-page-change="${(e: CustomEvent) => console.log('页码变化:', e.detail)}"
      ></nv-table>
    `;
  },
};

/** 表头过滤 */
export const ColumnFilter: Story = {
  name: '表头过滤',
  render: () => {
    const columns = [
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
      { prop: 'name', label: '姓名', minWidth: 120 },
      {
        prop: 'department',
        label: '部门',
        minWidth: 120,
        filters: [
          { text: 'Engineering', value: 'Engineering' },
          { text: 'Design', value: 'Design' },
          { text: 'Marketing', value: 'Marketing' },
          { text: 'Sales', value: 'Sales' },
          { text: 'HR', value: 'HR' },
        ],
      },
      {
        prop: 'role',
        label: '角色',
        width: 100,
        filterMultiple: false,
        filters: [
          { text: 'Admin', value: 'Admin' },
          { text: 'Editor', value: 'Editor' },
          { text: 'Viewer', value: 'Viewer' },
        ],
      },
      { prop: 'status', label: '状态', width: 100 },
    ];
    return html`
      <p style="margin-bottom:12px;color:#666;">点击列头的 <strong>漏斗图标</strong> 弹出过滤面板，支持多选和单选两种模式</p>
      <nv-table
        .data="${smallData}"
        .columns="${columns}"
        height="400px"
        border
        @nv-filter-change="${(e: CustomEvent) => console.log('过滤变化:', e.detail)}"
      ></nv-table>
    `;
  },
};

/** 流体高度（max-height） */
export const FluidHeight: Story = {
  name: '流体高度',
  render: () => html`
    <p style="margin-bottom:12px;color:#666;">不设 <code>height</code>，设置 <code>max-height</code>，内容不足时自适应，超出时出现滚动条</p>
    <nv-table
      .data="${generateData(3)}"
      .columns="${basicColumns}"
      max-height="400px"
      border
    ></nv-table>
    <p style="margin-top:24px;color:#666;">数据较多时（15 行）：</p>
    <nv-table
      .data="${generateData(15)}"
      .columns="${basicColumns}"
      max-height="300px"
      border
    ></nv-table>
  `,
};

/** 尺寸属性 (size) */
export const TableSize: Story = {
  name: '尺寸',
  render: () => {
    const renderTable = (size: string, title: string) => html`
      <h3 style="margin: 16px 0 8px; font-size: 16px;">${title} <code>size="${size}"</code></h3>
      <nv-table
        .data="${generateData(2)}"
        .columns="${basicColumns}"
        size="${size}"
        border
      ></nv-table>
    `;
    return html`
      <p style="margin-bottom:12px;color:#666;">通过 <code>size</code> 属性设置表格整体尺寸比例，自小到大影响内边距、行高及表头高。</p>
      ${renderTable('huge', '巨大')}
      ${renderTable('large', '大')}
      ${renderTable('medium', '默认中等')}
      ${renderTable('small', '小')}
      ${renderTable('mini', '迷你')}
    `;
  },
};

/** 树形数据与懒加载 */
export const TreeData: Story = {
  name: '树形数据',
  render: () => {
    const columns = [
      { prop: 'name', label: '名称', minWidth: 180 },
      { prop: 'type', label: '类型', width: 100 },
      { prop: 'date', label: '修改时间', width: 120 },
    ];
    
    const data = [
      { id: '1', name: 'src', type: '文件夹', date: '2024-01-01', children: [
        { id: '1-1', name: 'components', type: '文件夹', date: '2024-01-02', children: [
          { id: '1-1-1', name: 'table', type: '文件夹', date: '2024-01-03' },
          { id: '1-1-2', name: 'button', type: '文件夹', date: '2024-01-04' }
        ]},
        { id: '1-2', name: 'utils', type: '文件夹', date: '2024-01-05', children: [
          { id: '1-2-1', name: 'index.ts', type: '文件', date: '2024-01-06' }
        ]}
      ]},
      { id: '2', name: 'public', type: '文件夹', date: '2024-02-01', children: [
        { id: '2-1', name: 'favicon.ico', type: '文件', date: '2024-02-02' }
      ]},
      { id: '3', name: 'package.json', type: '文件', date: '2024-03-01' },
      { id: '4', name: '懒加载文件夹', type: '文件夹', date: '2024-04-01', hasChildren: true },
      { id: '5', name: '错误的懒加载', type: '文件夹', date: '2024-04-05', hasChildren: true },
    ];

    return html`
      <p style="margin-bottom:12px;color:#666;">
        通过设置 <code>tree-props</code> 开启树形数据属性；数据带有 <code>children</code> 字段即可自动支持树形缩进和展开嵌套。<br>
        同时支持 <code>lazy</code> 配合 <code>load</code> 方法对带 <code>hasChildren: true</code> 标记的节点进行动态懒加载。这里节点 "懒加载文件夹" 模拟了这一特性（点击后 1 秒内加载）。
      </p>
      <nv-table
        .data="${data}"
        .columns="${columns}"
        border
        max-height="400px"
        row-key="id"
        .treeProps="${{ children: 'children', hasChildren: 'hasChildren' }}"
        lazy
        .load="${(row: any, resolve: any, reject: any) => {
          setTimeout(() => {
            if (row.id === '5') {
              reject({ message: '网络异常：获取文件列表失败' });
            } else {
              resolve([
                { id: row.id + '-1', name: '动态加载文件-1', type: '文件', date: '2024-04-02' },
                { id: row.id + '-2', name: '动态加载文件-2', type: '文件', date: '2024-04-03' }
              ]);
            }
          }, 1000);
        }}"
      ></nv-table>
    `;
  },
};

/** 行自定义 className */
export const RowClassName: Story = {
  name: '自定义行 className',
  render: () => {
    const columns = [
      { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
      { prop: 'name', label: '姓名', minWidth: 120 },
      { prop: 'status', label: '状态', width: 100 },
    ];
    return html`
      <style>
        .row-active { background-color: #f0f9eb !important; }
        .row-inactive { background-color: #fef0f0 !important; }
        .row-pending { background-color: #fdf6ec !important; }
      </style>
      <p style="margin-bottom:12px;color:#666;">通过 <code>rowClassName</code> 回调对不同状态行设置不同背景色</p>
      <nv-table
        .data="${generateData(10)}"
        .columns="${columns}"
        height="400px"
        border
        .rowClassName="${(row: Record<string, unknown>) => {
          if (row['status'] === 'active') return 'row-active';
          if (row['status'] === 'inactive') return 'row-inactive';
          return 'row-pending';
        }}"
      ></nv-table>
    `;
  },
};

/** 列宽拖动 */
export const ColumnResizable: Story = {
  name: '列宽拖动',
  render: () => {
    const columns: TableColumn[] = [
      { label: '日期', prop: 'date', minWidth: 150 },
      { label: '姓名', prop: 'name', minWidth: 120 },
      { label: '地址', prop: 'address', minWidth: 200 },
      { label: '标签', prop: 'tag', minWidth: 100 },
    ];
    return html`
      <p style="margin-bottom:12px;color:#666;">设置 <code>resizable</code> 属性后，表头单元格右侧会出现拖拽手柄，拖动可改变列宽。</p>
      <nv-table .data="${smallData}" .columns="${columns}" border resizable></nv-table>
    `;
  },
};

/** 表尾合计行 */
export const SummaryRow: Story = {
  name: '表尾合计行',
  render: () => {
    const data = [
      { date: '2024-01-01', name: '张三', amount: 1200, count: 5 },
      { date: '2024-01-02', name: '李四', amount: 650, count: 3 },
      { date: '2024-01-03', name: '王五', amount: 980.5, count: 7 },
      { date: '2024-01-04', name: '赵六', amount: 2300, count: 12 },
      { date: '2024-01-05', name: '孙七', amount: 440.25, count: 2 },
    ];
    const columns: TableColumn[] = [
      { prop: 'date', label: '日期', width: 140 },
      { prop: 'name', label: '姓名', width: 100 },
      { prop: 'amount', label: '金额（元）', minWidth: 140, align: 'right' as const },
      { prop: 'count', label: '数量', minWidth: 100, align: 'right' as const },
    ];
    return html`
      <p style="margin-bottom:12px;color:#666;">
        设置 <code>show-summary</code> 属性展示表尾合计行，数字列自动求和，非数字列显示"—"。
        首列文字可通过 <code>sum-text</code> 自定义。
      </p>
      <nv-table
        .data="${data}"
        .columns="${columns}"
        border
        show-summary
        sum-text="合计"
        style="margin-bottom:24px;"
      ></nv-table>

      <p style="margin-bottom:12px;color:#666;">通过 <code>summary-method</code> 完全自定义合计行内容：</p>
      <nv-table
        .data="${data}"
        .columns="${columns}"
        border
        show-summary
        .summaryMethod="${(_cols: any[], rows: any[]) => {
          const totalAmount = rows.reduce((s, r) => s + r.amount, 0);
          const totalCount = rows.reduce((s, r) => s + r.count, 0);
          return ['汇总', `共 ${rows.length} 条`, `¥ ${totalAmount.toFixed(2)}`, String(totalCount)];
        }}"
      ></nv-table>
    `;
  },
};

/** 顶部操作栏 */
export const OperationBar: Story = {
  name: '顶部操作栏',
  render: () => {
    const columns: TableColumn[] = [
      { prop: 'id', label: 'ID', width: 70, align: 'center' as const },
      { prop: 'name', label: '姓名', minWidth: 120 },
      { prop: 'email', label: '邮箱', minWidth: 200 },
      { prop: 'department', label: '部门', width: 130 },
      { prop: 'status', label: '状态', width: 100 },
      { prop: 'created', label: '创建日期', width: 120 },
    ];

    return html`
      <!-- ① 完整功能 + 自定义 Slot -->
      <p style="margin-bottom:8px;color:#333;font-weight:600;">① 开启全部内置功能 + 自定义 Slot</p>
      <p style="margin-bottom:12px;color:#666;font-size:13px;">
        <code>show-toolbar</code> 开启操作栏，通过
        <code>show-column-setting</code>、<code>show-density</code>、<code>show-export</code>
        单独开启各内置按钮。左侧通过 <code>toolbar</code> slot 插入自定义内容，右侧通过 <code>toolbar-right</code> slot 追加按钮。
      </p>
      <nv-table
        id="tb-full"
        .data="${smallData}"
        .columns="${columns}"
        height="340px"
        show-toolbar
        toolbar-title="用户列表"
        show-column-setting
        show-density
        show-export
        border
        @nv-columns-change="${(e: CustomEvent) => {
          console.log('[nv-columns-change] visibleMap:', e.detail.visibleMap);
          const output = document.getElementById('col-status');
          if (output) {
            const visible = Object.entries(e.detail.visibleMap)
              .filter(([, v]) => v)
              .map(([k]) => k)
              .join(', ');
            output.textContent = '当前可见列：' + visible;
          }
        }}"
      >
        <span slot="toolbar" style="color:#666;font-size:13px;">共 ${smallData.length} 条</span>
        <button
          slot="toolbar-right"
          style="height:28px;padding:0 10px;border:1px solid #dcdfe6;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;"
          @click="${() => alert('自定义按钮被点击')}"
        >+ 新建</button>
      </nv-table>
      <p id="col-status" style="margin-top:8px;font-size:12px;color:#909399;min-height:18px;"></p>

      <!-- ② 按需启用功能 -->
      <p style="margin:24px 0 8px;color:#333;font-weight:600;">② 按需启用各功能</p>
      <p style="margin-bottom:12px;color:#666;font-size:13px;">
        通过 <code>show-column-setting</code>、<code>show-density</code>、<code>show-export</code>
        单独控制每个按钮的显隐，以下示例只开启列设置和导出，隐藏密度切换。
      </p>
      <nv-table
        .data="${smallData}"
        .columns="${columns}"
        height="300px"
        show-toolbar
        toolbar-title="精简工具栏"
        show-column-setting
        show-export
        border
      >
        <span slot="toolbar" style="color:#909399;font-size:13px;">（仅列设置和导出，无密度切换）</span>
      </nv-table>

      <!-- ③ 只有标题和自定义内容 -->
      <p style="margin:24px 0 8px;color:#333;font-weight:600;">③ 纯自定义工具栏</p>
      <p style="margin-bottom:12px;color:#666;font-size:13px;">
        将三个内置按钮都关闭，只保留标题和自定义 slot 内容，实现完全自定义布局。
      </p>
      <nv-table
        .data="${smallData.slice(0, 5)}"
        .columns="${columns}"
        show-toolbar
        toolbar-title="简单列表"
        border
      >
        <span slot="toolbar" style="font-size:13px;color:#67c23a;">● 在线</span>
        <button
          slot="toolbar-right"
          style="height:28px;padding:0 10px;border:1px solid #67c23a;border-radius:6px;background:#f0f9eb;color:#67c23a;cursor:pointer;font-size:13px;"
        >刷新数据</button>
      </nv-table>
    `;
  },
};
/**
 * 综合测试 (Full Feature)
 * 包含：固定表头、固定列、多级表头、排序、过滤、多选、单选、
 * 自定义渲染、列操作栏、分页、表尾合计等，用于测试兼容性
 */
export const FullFeature: Story = {
  name: '综合测试 (Full Feature)',
  render: () => {
    // 列配置，包含各种复杂功能
    const columns: TableColumn[] = [
      { type: 'selection', prop: '', label: '', fixed: 'left' },
      { prop: 'id', label: 'ID', width: 80, align: 'center', sortable: true, fixed: 'left' },
      {
        prop: 'basic_info',
        label: '基本信息',
        children: [
          { prop: 'name', label: '姓名', minWidth: 150, sortable: true },
          { prop: 'email', label: '邮箱', minWidth: 200 },
          {
            prop: 'department',
            label: '所在组',
            minWidth: 130,
            filters: [
              { text: 'Engineering', value: 'Engineering' },
              { text: 'Design', value: 'Design' },
              { text: 'Marketing', value: 'Marketing' },
            ],
          },
        ],
      },
      {
        prop: 'work_status',
        label: '工作状态',
        children: [
          { prop: 'role', label: '角色', width: 120 },
          {
            prop: 'status',
            label: '状态',
            width: 120,
            align: 'center',
            renderCell: (val: unknown) => {
              const type = val === 'active' ? 'success' : val === 'inactive' ? 'danger' : 'warning';
              return html`<nv-tag type="${type}" size="small">${val}</nv-tag>`;
            },
          },
        ],
      },
      { prop: 'salary', label: '薪资', width: 120, align: 'right', sortable: true },
      { prop: 'created', label: '入职日期', width: 130, sortable: true },
      {
        prop: 'operations',
        label: '操作',
        width: 140,
        fixed: 'right',
        align: 'center',
        renderCell: (_val: unknown, row: any) => html`
          <button
            style="color:#409eff;border:none;background:none;cursor:pointer;padding:0 5px;"
            @click="${(e: Event) => {
              e.stopPropagation(); // 阻止触发行点击(单选)
              message.info('编辑: ' + row.name);
            }}"
          >编辑</button>
          <button
            style="color:#f56c6c;border:none;background:none;cursor:pointer;padding:0 5px;"
            @click="${(e: Event) => {
              e.stopPropagation();
              message.info('删除: ' + row.name);
            }}"
          >删除</button>
        `,
      },
    ];

    // 造点带具体数字的金额用于合计计算
    const fullData = generateData(1000).map(item => ({
      ...item,
      salary: item.salary, // generateData 里本身有 salary
    }));

    // ================== 右键菜单逻辑 ==================
    let currentRowData: any = null;
    const tableId = 'full-feature-table';
    const getTable = () => document.getElementById(tableId) as any;

    return html`
      <style>
        /* 利用新增的 CSS Part 覆盖 popup 默认内置 padding，让菜单贴边 */
        #${tableId}::part(contextmenu) {
          padding: 0;
        }
        
        /* 复制右键菜单故事中的通用样式 */
        .ctx-menu {
          list-style: none;
          margin: 0;
          padding: 4px 0;
          background: #fff;
          border-radius: 4px;
          min-width: 140px;
          font-size: 14px;
        }
        .ctx-menu li {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          color: #333;
          cursor: pointer;
          user-select: none;
        }
        .ctx-menu li:hover { background: #f5f7fa; }
        .ctx-menu li.danger { color: #f56c6c; }
        .ctx-menu li.danger:hover { background: #fef0f0; }
        .ctx-menu-sep { height: 1px; background: #ebeef5; margin: 4px 0; }
      </style>
      <p style="margin-bottom:12px;color:#666;line-height:1.6;">
        这是一个 <b>综合性极强</b> 的用例，结合了：<br/>
        1. <strong>顶部工具栏</strong> 显隐控制与导出<br/>
        2. <strong>固定列</strong>（左侧多选+ID，右侧操作栏） + <strong>固定表头</strong> + <strong>多级表头</strong><br/>
        3. <strong>列排序</strong>（ID、姓名、薪资、入职日期）与 <strong>列过滤</strong>（所在组）<br/>
        4. <strong>虚拟滚动</strong>（每页 200 条）、<strong>分页</strong>（共 1000 条，与前端排序/过滤兼容）<br/>
        5. <strong>自定义单元格</strong>（状态标签、操作按钮）<br/>
        6. <strong>表尾合计行</strong>（汇总薪资）<br/>
        7. <strong>交互事件</strong>（行的单击单选、右键菜单）
      </p>

      <nv-table
        id="${tableId}"
        .data="${fullData}"
        .columns="${columns}"
        height="500px"
        row-height="48"
        border
        stripe
        highlight-current-row
        row-key="id"
        
        show-toolbar
        toolbar-title="全功能综合测试"
        show-column-setting
        show-density
        show-export
        
        pagination
        page-size="200"

        show-summary
        sum-text="总计"
        
        @nv-selection-change="${(e: CustomEvent) => console.log('综合测试 selection:', e.detail.selection.length)}"
        @nv-current-change="${(e: CustomEvent) => console.log('综合测试 current:', e.detail.row?.name)}"
        @nv-sort-change="${(e: CustomEvent) => console.log('综合测试 sort:', e.detail)}"
        @nv-filter-change="${(e: CustomEvent) => console.log('综合测试 filter:', e.detail)}"
        @nv-row-contextmenu="${(e: CustomEvent) => {
          currentRowData = e.detail.row;
          console.log('综合测试 contextmenu:', currentRowData.name);
        }}"
      >
        <!-- 工具栏插槽 -->
        <span slot="toolbar" style="color:#909399;font-size:13px;margin-left:12px;">（共 ${fullData.length} 条数据）</span>
        <button
          slot="toolbar-right"
          style="height:28px;padding:0 12px;border:1px solid #dcdfe6;border-radius:4px;background:#fff;cursor:pointer;font-size:13px;margin-right:8px;"
          @click="${() => message.info('新建员工')}"
        >
          新增一行
        </button>

        <!-- 右键菜单插槽 -->
        <ul slot="contextmenu" class="ctx-menu"
          @click="${(e: MouseEvent) => {
            const li = (e.target as HTMLElement).closest('li');
            if (!li) return;
            const action = (li as HTMLElement).dataset['action'];
            if (action === 'copy') {
              message.info('复制: ' + currentRowData?.name);
            } else if (action === 'edit') {
              message.info('编辑: ' + currentRowData?.name);
            } else if (action === 'delete') {
              message.info('删除: ' + currentRowData?.name);
            }
            getTable()?.closeContextMenu();
          }}"
        >
          <li data-action="copy">📋 复制</li>
          <li data-action="edit">✏️ 编辑</li>
          <div class="ctx-menu-sep"></div>
          <li data-action="delete" class="danger">🗑️ 删除</li>
        </ul>
      </nv-table>
    `;
  },
};
