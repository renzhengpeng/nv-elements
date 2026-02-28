import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, render } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import './index';
import '../divider/index';
import type { TableColumn } from './types';
import readmeMd from './README.md?raw';

const readmeHtml = marked.parse(readmeMd) as string;

/** 示例行类型 */
interface DemoRow {
  id: string;
  name: string;
  date: string;
  amount: number;
}

/** 20 列配置，便于边界测试（横向滚动、列宽等） */
const defaultColumns: TableColumn<DemoRow>[] = [
  { dataKey: 'name', key: 'name', title: '姓名', width: 120 },
  { dataKey: 'date', key: 'date', title: '日期', width: 120 },
  { dataKey: 'amount', key: 'amount', title: '金额', width: 100, align: 'right' },
  ...Array.from({ length: 17 }, (_, i) => ({
    dataKey: 'name' as const,
    key: `col${i + 4}`,
    title: `列${i + 4}`,
    width: 100
  }))
];

const defaultData: DemoRow[] = [
  { id: '1', name: '张三', date: '2024-01-01', amount: 100 },
  { id: '2', name: '李四', date: '2024-01-02', amount: 200 },
  { id: '3', name: '王五', date: '2024-01-03', amount: 300 },
  { id: '4', name: '赵六', date: '2024-01-04', amount: 400 },
  { id: '5', name: '钱七', date: '2024-01-05', amount: 500 }
];

function genLargeData(count: number): DemoRow[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `row-${i}`,
    name: `用户${i}`,
    date: `2024-${String(Math.floor(i / 28) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    amount: (i + 1) * 10
  }));
}

const meta: Meta = {
  title: 'Components/Table',
  component: 'nv-table',
  argTypes: {
    data: { table: { disable: true } },
    columns: { table: { disable: true } },
    height: { control: 'text', description: '表体高度' },
    virtual: { control: 'boolean', description: '是否启用虚拟滚动' },
    virtualThreshold: { control: 'number', description: '虚拟滚动阈值' },
    size: {
      control: 'select',
      description: '尺寸',
      options: ['mini', 'small', 'medium', 'large', 'huge']
    },
    stripe: { control: 'boolean', description: '斑马纹' },
    border: { control: 'boolean', description: '边框' },
    highlightCurrentRow: { control: 'boolean', description: '高亮当前行' },
    selectionMode: { control: 'select', description: '行选择模式', options: ['single', 'multiple'] },
    emptyText: { control: 'text', description: '空数据文案' }
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
  render: () => html`
    <div style="padding: 20px; max-width: 1200px;">
      <div class="readme-content" style="background: #fff; padding: 30px; border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); margin-bottom: 40px;">
        ${unsafeHTML(readmeHtml)}
      </div>
      <nv-divider style="margin: 40px 0;">
        <span style="color: #909399; font-size: 16px; font-weight: 500;">交互示例</span>
      </nv-divider>
      <div class="examples-section">
        <div class="example-item">
          <h3 class="example-title">基础表格</h3>
          <div class="example-demo">
            ${Basic.render?.({} as never, {} as never)}
          </div>
        </div>
        <nv-divider></nv-divider>
        <div class="example-item">
          <h3 class="example-title">带边框与斑马纹</h3>
          <div class="example-demo">
            ${WithBorderStripe.render?.({} as never, {} as never)}
          </div>
        </div>
        <nv-divider></nv-divider>
        <div class="example-item">
          <h3 class="example-title">五种尺寸</h3>
          <div class="example-demo">
            ${Sizes.render?.({} as never, {} as never)}
          </div>
        </div>
        <nv-divider></nv-divider>
        <div class="example-item">
          <h3 class="example-title">高亮当前行与排序</h3>
          <div class="example-demo">
            ${SortableAndHighlight.render?.({} as never, {} as never)}
          </div>
        </div>
        <nv-divider></nv-divider>
        <div class="example-item">
          <h3 class="example-title">单选与多选</h3>
          <p class="example-desc">设置 selection-mode 为 single 或 multiple，通过 selected-row-keys 受控选中项，监听 nv-selection-change 更新。</p>
          <div class="example-demo" style="display: flex; flex-direction: column; gap: 24px;">
            <div>
              <div style="margin-bottom: 8px; font-size: 14px; color: #909399;">单选 (single)</div>
              <table-selection-demo mode="single"></table-selection-demo>
            </div>
            <div>
              <div style="margin-bottom: 8px; font-size: 14px; color: #909399;">多选 (multiple)</div>
              <table-selection-demo mode="multiple"></table-selection-demo>
            </div>
          </div>
        </div>
        <nv-divider></nv-divider>
        <div class="example-item">
          <h3 class="example-title">虚拟滚动（约 2000 条）</h3>
          <p class="example-desc">仅渲染可视区域行，适合超大数据</p>
          <div class="example-demo">
            ${VirtualScroll.render?.({} as never, {} as never)}
          </div>
        </div>
        <nv-divider></nv-divider>
        <div class="example-item">
          <h3 class="example-title">大数据 + 全功能</h3>
          <p class="example-desc">5000 条数据：虚拟滚动、斑马纹、边框、高亮当前行、多选、排序、自定义单元格（金额格式）</p>
          <div class="example-demo">
            ${FullFeatured.render?.({} as never, {} as never)}
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
      </style>
    </div>
  `
};

export const Basic: Story = {
  render: () => {
    return html`
      <nv-table
        .columns=${defaultColumns}
        .data=${defaultData}
        height="200"
      ></nv-table>
    `;
  }
};

export const WithBorderStripe: Story = {
  render: () => html`
    <nv-table
      .columns=${defaultColumns}
      .data=${defaultData}
      height="200"
      border
      stripe
    ></nv-table>
  `
};

const SIZES: Array<'mini' | 'small' | 'medium' | 'large' | 'huge'> = ['mini', 'small', 'medium', 'large', 'huge'];

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
      ${SIZES.map(
        (size) => html`
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #909399;">size="${size}"</div>
            <nv-table
              .columns=${defaultColumns}
              .data=${defaultData}
              size=${size}
              height="120"
              border
            ></nv-table>
          </div>
        `
      )}
    </div>
  `
};

export const SortableAndHighlight: Story = {
  render: () => {
    const sortableColumns: TableColumn<DemoRow>[] = [
      { dataKey: 'name', title: '姓名', width: 120, sortable: true },
      { dataKey: 'date', title: '日期', width: 120, sortable: true },
      { dataKey: 'amount', title: '金额', width: 100, align: 'right', sortable: true }
    ];
    return html`
      <nv-table
        .columns=${sortableColumns}
        .data=${defaultData}
        height="200"
        border
        highlight-current-row
        @nv-sort=${(e: CustomEvent) => console.log('nv-sort', e.detail)}
        @nv-row-click=${(e: CustomEvent) => console.log('nv-row-click', e.detail)}
        @nv-current-change=${(e: CustomEvent) => console.log('nv-current-change', e.detail)}
      ></nv-table>
    `;
  }
};

export const Empty: Story = {
  render: () => html`
    <nv-table
      .columns=${defaultColumns}
      .data=${[]}
      height="200"
      border
      empty-text="没有数据"
    ></nv-table>
  `
};

const LARGE_COUNT = 2000;
const largeData = genLargeData(LARGE_COUNT);

export const VirtualScroll: Story = {
  render: () => html`
    <nv-table
      .columns=${defaultColumns}
      .data=${largeData}
      height="400"
      virtual
      virtual-threshold=${100}
      border
      stripe
    ></nv-table>
  `
};

/** 选择演示用包装：受控 selectedRowKeys + nv-selection-change */
class TableSelectionDemo extends HTMLElement {
  selectedKeys: string[] = [];
  mode: 'single' | 'multiple' = 'multiple';
  connectedCallback() {
    this.mode = (this.getAttribute('mode') as 'single' | 'multiple') || 'multiple';
    this.render();
  }
  render() {
    render(
      html`
        <nv-table
          selection-mode=${this.mode}
          .columns=${defaultColumns}
          .data=${defaultData}
          .selectedRowKeys=${this.selectedKeys}
          height="200"
          border
          @nv-selection-change=${(e: CustomEvent<{ selectedRowKeys: string[]; selectedRows: unknown[] }>) => {
            this.selectedKeys = e.detail.selectedRowKeys;
            this.render();
          }}
        ></nv-table>
      `,
      this
    );
  }
}
if (!customElements.get('table-selection-demo')) {
  customElements.define('table-selection-demo', TableSelectionDemo);
}

export const SelectionSingle: Story = {
  render: () => html`<table-selection-demo mode="single"></table-selection-demo>`
};

export const SelectionMultiple: Story = {
  render: () => html`<table-selection-demo mode="multiple"></table-selection-demo>`
};

/** 大数据量 + 全部功能：虚拟滚动、斑马纹、边框、高亮当前行、多选、排序、自定义单元格 */
const FULL_FEATURED_COUNT = 5000;
const fullFeaturedRawData = genLargeData(FULL_FEATURED_COUNT);

/** 20 列配置，便于边界测试 */
const fullFeaturedColumns: TableColumn<DemoRow>[] = [
  { dataKey: 'name', key: 'name', title: '姓名', width: 120, sortable: true },
  { dataKey: 'date', key: 'date', title: '日期', width: 130, sortable: true },
  {
    dataKey: 'amount',
    key: 'amount',
    title: '金额',
    width: 120,
    align: 'right',
    sortable: true,
    cellRenderer: ({ cellData }) => html`<span style="color: #e6a23c; font-weight: 500;">¥ ${Number(cellData).toLocaleString()}</span>`
  },
  ...Array.from({ length: 17 }, (_, i) => ({
    dataKey: 'name' as const,
    key: `col${i + 4}`,
    title: `列${i + 4}`,
    width: 100,
    sortable: true
  }))
];

type SortOrder = 'ascending' | 'descending' | null;

class TableFullFeaturedDemo extends HTMLElement {
  sortedData: DemoRow[] = [];
  selectedKeys: string[] = [];
  sortColumnKey: string = '';
  sortOrder: SortOrder = null;
  currentRow: DemoRow | null = null;

  connectedCallback() {
    this.sortedData = [...fullFeaturedRawData];
    this.render();
  }

  private sortData(columnKey: string, order: SortOrder) {
    if (!order) {
      this.sortedData = [...fullFeaturedRawData];
      return;
    }
    const key = columnKey as keyof DemoRow;
    this.sortedData = [...fullFeaturedRawData].sort((a, b) => {
      const va = a[key];
      const vb = b[key];
      if (typeof va === 'number' && typeof vb === 'number') return order === 'ascending' ? va - vb : vb - va;
      const sa = String(va ?? '');
      const sb = String(vb ?? '');
      return order === 'ascending' ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
  }

  render() {
    render(
      html`
        <div class="full-featured-demo">
          <div class="full-featured-toolbar">
            <span>已选 <strong>${this.selectedKeys.length}</strong> 条</span>
            ${this.currentRow
              ? html`<span class="current-row">当前行：${this.currentRow.name} · ${this.currentRow.date}</span>`
              : null}
          </div>
          <nv-table
            .columns=${fullFeaturedColumns}
            .data=${this.sortedData}
            .selectedRowKeys=${this.selectedKeys}
            height="450"
            virtual
            virtual-threshold=${100}
            border
            stripe
            highlight-current-row
            selection-mode="multiple"
            row-key="id"
            @nv-sort=${(e: CustomEvent<{ columnKey: string; order: SortOrder }>) => {
              this.sortColumnKey = e.detail.columnKey;
              this.sortOrder = e.detail.order;
              this.sortData(this.sortColumnKey, this.sortOrder);
              this.render();
            }}
            @nv-selection-change=${(e: CustomEvent<{ selectedRowKeys: string[]; selectedRows: unknown[] }>) => {
              this.selectedKeys = e.detail.selectedRowKeys;
              this.render();
            }}
            @nv-row-click=${(e: CustomEvent<{ row: DemoRow; index: number }>) => {
              this.currentRow = e.detail.row;
              this.render();
            }}
            @nv-current-change=${(e: CustomEvent<{ currentRow: DemoRow | null }>) => {
              this.currentRow = e.detail.currentRow ?? null;
              this.render();
            }}
          ></nv-table>
        </div>
        <style>
          .full-featured-demo {
            padding: 12px;
            background: #fff;
            border-radius: 4px;
          }
          .full-featured-toolbar {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 12px;
            font-size: 14px;
            color: #606266;
          }
          .full-featured-toolbar .current-row {
            color: #409eff;
          }
        </style>
      `,
      this
    );
  }
}
if (!customElements.get('table-full-featured-demo')) {
  customElements.define('table-full-featured-demo', TableFullFeaturedDemo);
}

export const FullFeatured: Story = {
  parameters: {
    docs: {
      description: {
        story: `大数据（${FULL_FEATURED_COUNT} 条）+ 虚拟滚动、斑马纹、边框、高亮当前行、多选（含全选）、列排序、自定义单元格渲染（金额格式）。`
      }
    }
  },
  render: () => html`<table-full-featured-demo></table-full-featured-demo>`
};
