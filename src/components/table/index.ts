import { customElement, property, Component, unsafeCSS, css, state } from '../../based-on/index';
import type {
  TableColumn,
  ProcessedColumn,
  SortDirection,
  RowClickEventDetail,
  CellClickEventDetail,
  HeaderClickEventDetail,
  SortChangeEventDetail,
  SelectionChangeEventDetail,
} from './types';
import { PropertyValues } from 'lit';
import cssText from './style.scss?inline';
import template from './template';
// 导入子组件确保注册
import '../table-header/index';
import '../table-body/index';
import '../empty/index';

export type { TableColumn, ProcessedColumn, ColumnAlign, SortDirection, ColumnType } from './types';

@customElement('nv-table')
export class NvTable extends Component {
  static styles = css`${unsafeCSS(cssText)}`;

  @property({ type: Array })
  data: Record<string, unknown>[] = [];

  @property({ type: Array })
  columns: TableColumn[] = [];

  @property({ type: String })
  height: string = '';

  /** 流体高度：无 height 时生效，超出后出现滚动条 */
  @property({ type: String, attribute: 'max-height' })
  maxHeight: string = '';

  // ---- 分页 ----
  /** 是否开启内置分页 */
  @property({ type: Boolean })
  pagination: boolean = false;

  /** 每页条数 */
  @property({ type: Number, attribute: 'page-size' })
  pageSize: number = 10;

  /** 当前页（从 1 开始） */
  @property({ type: Number, attribute: 'current-page' })
  currentPage: number = 1;

  /** 每页条数选项 */
  @property({ type: Array, attribute: false })
  pageSizeOptions: number[] = [10, 20, 50, 100];

  /** 表格尺寸 */
  @property({ type: String })
  size: 'mini' | 'small' | 'medium' | 'large' | 'huge' = 'medium';

  @property({ type: Number, attribute: 'row-height' })
  rowHeight?: number;

  get actualRowHeight(): number {
    if (this.rowHeight !== undefined) return this.rowHeight;
    switch (this.size) {
      case 'huge': return 64;
      case 'large': return 56;
      case 'small': return 40;
      case 'mini': return 32;
      case 'medium': 
      default: return 48;
    }
  }

  @property({ type: Boolean })
  stripe: boolean = false;

  @property({ type: Boolean })
  border: boolean = false;

  @property({ type: Boolean })
  resizable: boolean = false;

  @property({ type: Boolean, attribute: 'show-header' })
  showHeader: boolean = true;

  @property({ type: String, attribute: 'empty-text' })
  emptyText: string = '暂无数据';

  @property({ type: Boolean, attribute: 'highlight-current-row' })
  highlightCurrentRow: boolean = false;

  /** 行唯一键字段名（用于多选/单选），默认使用行对象引用 */
  @property({ type: String, attribute: 'row-key' })
  rowKey: string = '';

  /** 行额外 CSS class 回调 */
  @property({ attribute: false })
  rowClassName?: (row: Record<string, unknown>, rowIndex: number) => string;

  /** 单元格额外 CSS class 回调 */
  @property({ attribute: false })
  cellClassName?: (cellValue: unknown, row: Record<string, unknown>, rowIndex: number) => string;

  // ---- 合计行 ----
  /** 是否显示表尾合计行 */
  @property({ type: Boolean, attribute: 'show-summary' })
  showSummary: boolean = false;

  /** 合计行首列文字，默认“合计” */
  @property({ type: String, attribute: 'sum-text' })
  sumText: string = '合计';

  /** 自定义合计方法，返回每列对应的文字数组 */
  @property({ attribute: false })
  summaryMethod?: (columns: ProcessedColumn[], data: Record<string, unknown>[]) => string[];

  // ---- 顶部操作栏 ----
  /** 是否显示顶部操作栏 */
  @property({ type: Boolean, attribute: 'show-toolbar' })
  showToolbar: boolean = false;

  /** 操作栏左侧标题 */
  @property({ type: String, attribute: 'toolbar-title' })
  toolbarTitle: string = '';

  /** 是否显示列设置按鎂 */
  @property({ type: Boolean, attribute: 'show-column-setting' })
  showColumnSetting: boolean = false;

  /** 是否显示密度切换按鎂 */
  @property({ type: Boolean, attribute: 'show-density' })
  showDensity: boolean = false;

  /** 是否显示导出按鎂 */
  @property({ type: Boolean, attribute: 'show-export' })
  showExport: boolean = false;

  // ---- 内部 state ----

  @state()
  _processedColumns: ProcessedColumn[] = [];

  @state()
  _headerColumns: ProcessedColumn[] = [];

  @state()
  _currentRowIndex: number = -1;

  @state()
  _totalWidth: number = 0;

  @state()
  private _containerWidth: number = 0;

  /** Y 轴滚动条宽度，用于 header 右侧等宽占位，防止 header/body 错位 */
  @state()
  _yScrollbarWidth: number = 0;

  // ---- 排序 state ----
  @state()
  _sortProp: string = '';

  @state()
  _sortDirection: SortDirection = null;

  // ---- 多选 state ----
  @state()
  _selectedKeys: Set<unknown> = new Set();

  // ---- 单选 state ----
  @state()
  _radioKey: unknown = undefined;

  // ---- 过滤 state ----
  @state()
  _filterValues: Map<string, unknown[]> = new Map();

  // ---- 树形 state ----
  @property({ type: Object, attribute: 'tree-props' })
  treeProps?: { children?: string; hasChildren?: string };

  @property({ type: Boolean })
  lazy: boolean = false;

  @property({ attribute: false })
  load?: (
    row: Record<string, unknown>,
    resolve: (data: Record<string, unknown>[]) => void,
    reject: (err: string | Error | any) => void
  ) => void;

  @property({ type: Boolean, attribute: 'default-expand-all' })
  defaultExpandAll: boolean = false;

  @state()
  _expandedRowKeys: Set<unknown> = new Set();

  @state()
  _treeDataMap: Map<unknown, Record<string, unknown>[]> = new Map();

  @state()
  _loadingRowKeys: Set<unknown> = new Set();
  
  @state()
  _flattenedData: Record<string, unknown>[] = [];

  @state()
  _treeStates: Map<unknown, { level: number; isExpanded: boolean; isLeaf: boolean; loading: boolean; hasChildren: boolean }> = new Map();
  
  /** 行展开：已展开的行 key 集合（与树形半展开功能独立） */
  @state()
  _rowExpandedKeys: Set<unknown> = new Set();

  /** 用户拖拽调整过的列宽（prop → px） */
  @state()
  _resizedWidths: Map<string, number> = new Map();
  
  /** 拖拽过程中实时的临时列宽（prop -> px），用于表格 body 内容联动 */
  @state()
  _draggingWidths: Map<string, number> = new Map();

  /** 表尾合计行内容，每列对应一个字符串 */
  @state()
  _summaryData: string[] = [];

  // ---- 操作栏 state ----
  /** 列设置弹窗是否开启 */
  @state()
  _columnSettingOpen: boolean = false;

  /** 密度切换弹窗是否开启 */
  @state()
  _densityOpen: boolean = false;

  /** 列显隐状态（prop -> visible），用于列设置左右独立于原始 columns */
  @state()
  _columnVisible: Map<string, boolean> = new Map();

  private _isTreeInitialized = false;

  // ---- 右键菜单 state ----
  @state()
  _contextMenuActive: boolean = false;

  @state()
  _contextMenuX: number = 0;

  @state()
  _contextMenuY: number = 0;

  private _resizeObserver: ResizeObserver | null = null;
  private _observingBodyWrapper = false;

  // ====== 生命周期 ======

  protected $mounted() {
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width !== this._containerWidth) {
          this._containerWidth = width;
        }
      }
    });
    this._resizeObserver.observe(this);
    this._containerWidth = this.clientWidth;
    this._yScrollbarWidth = this._measureScrollbarWidth();

    // 监听全局 pointerdown 事件以提早关闭右键菜单
    document.addEventListener('pointerdown', this._handleDocumentClick);
  }

  protected $destroyed() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    this._observingBodyWrapper = false;
    document.removeEventListener('pointerdown', this._handleDocumentClick);
  }

  private _handleDocumentClick = (e: Event) => {
    if (!this._contextMenuActive) return;

    const path = e.composedPath();
    const isPopupClick = path.some(node => (node as HTMLElement).tagName === 'NV-POPUP');
    if (!isPopupClick) {
      this.closeContextMenu();
    }
  };

  protected willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('treeProps') && this.treeProps && this.defaultExpandAll && !this._isTreeInitialized) {
      this._isTreeInitialized = true;
      // TODO: initialize default expandable rows here if needed
    }

    // columns 或 showToolbar 变化时初始化列可见性
    if (
      (changedProperties.has('columns') || changedProperties.has('showToolbar')) &&
      this.showToolbar
    ) {
      this._initColumnVisible();
    }

    if (
      changedProperties.has('data') ||
      changedProperties.has('treeProps') ||
      changedProperties.has('currentPage') ||
      changedProperties.has('pageSize') ||
      changedProperties.has('_filterValues') ||
      changedProperties.has('_sortProp') ||
      changedProperties.has('_sortDirection') ||
      changedProperties.has('_expandedRowKeys') ||
      changedProperties.has('_treeDataMap') ||
      changedProperties.has('_loadingRowKeys')
    ) {
      if (this.treeProps) {
        this._computeTreeData();
      } else {
        this._flattenedData = this._pagedData;
      }
    }

    // 合计行：数据 / 列 / summaryMethod / showSummary / sumText 变化时重新计算
    if (
      this.showSummary && (
        changedProperties.has('data') ||
        changedProperties.has('columns') ||
        changedProperties.has('summaryMethod') ||
        changedProperties.has('sumText') ||
        changedProperties.has('showSummary') ||
        changedProperties.has('_processedColumns')
      )
    ) {
      this._computeSummary();
    }

    // 列显隐变化时派发事件
    if (changedProperties.has('_columnVisible') && this._columnVisible.size > 0) {
      const visibleMap: Record<string, boolean> = {};
      this._columnVisible.forEach((v, k) => { visibleMap[k] = v; });
      this.dispatch('nv-columns-change', { columns: this.columns, visibleMap });
    }
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (!this._observingBodyWrapper && this._resizeObserver) {
      const bodyWrapper = this.shadowRoot?.querySelector('.nv-table__body-wrapper') as HTMLElement | null;
      if (bodyWrapper) {
        this._resizeObserver.unobserve(this);
        this._resizeObserver.observe(bodyWrapper);
        this._observingBodyWrapper = true;
        this._containerWidth = bodyWrapper.clientWidth;
      }
    }
    if (
      changedProperties.has('columns') ||
      changedProperties.has('_containerWidth') ||
      changedProperties.has('_resizedWidths') ||
      changedProperties.has('_columnVisible')
    ) {
      this._computeProcessedColumns();
    }
    // data 变化时重置选中状态（可选）、同步 gutter
    if (changedProperties.has('data')) {
      this._syncScrollbarGutter();
    }
    this._syncScrollbarGutter();
  }

  // ====== 工具方法 ======

  private _measureScrollbarWidth(): number {
    const el = document.createElement('div');
    el.style.cssText = 'position:fixed;top:-9999px;width:100px;height:100px;overflow:scroll;visibility:hidden;pointer-events:none;';
    document.body.appendChild(el);
    const sw = el.offsetWidth - el.clientWidth;
    document.body.removeChild(el);
    return sw;
  }

  /** 计算表尾合计行数据 */
  private _computeSummary() {
    if (this.summaryMethod) {
      this._summaryData = this.summaryMethod(this._processedColumns, this.data);
      return;
    }
    // 默认逻辑：第一列显示 sumText，其余列求纴数接数求和
    this._summaryData = this._processedColumns.map((col, index) => {
      if (index === 0) return this.sumText;
      if (col.type) return ''; // selection/radio/index/expand 列不显示
      const values = this.data.map(row => Number(row[col.prop]));
      const hasValidNumber = values.some(v => !isNaN(v));
      if (!hasValidNumber) return '—';
      const sum = values.reduce((acc, v) => acc + (isNaN(v) ? 0 : v), 0);
      // 如果所有值都是整数，输出整数；否则保留两位小数
      return values.every(v => Number.isInteger(v) || isNaN(v))
        ? String(sum)
        : sum.toFixed(2);
    });
  }

  /** 初始化/同步列可见性 Map（仅针对非 type 的普通列） */
  private _initColumnVisible() {
    const getLeafCols = (cols: TableColumn[]): TableColumn[] => {
      const result: TableColumn[] = [];
      for (const col of cols) {
        if (col.children && col.children.length > 0) {
          result.push(...getLeafCols(col.children));
        } else {
          result.push(col);
        }
      }
      return result;
    };
    const leaves = getLeafCols(this.columns);
    const next = new Map(this._columnVisible);
    for (const col of leaves) {
      if (!col.type && col.prop && !next.has(col.prop)) {
        next.set(col.prop, col.visible !== false);
      }
    }
    this._columnVisible = next;
  }

  /** 导出当前排序数据为 CSV 文件 */
  _exportCsv(filename: string = 'table-export.csv') {
    const visibleCols = this._processedColumns.filter(c => !c.type);
    const header = visibleCols.map(c => `"${c.label}"`).join(',');
    const rows = this._sortedData.map(row =>
      visibleCols.map(c => {
        const val = row[c.prop] ?? '';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      }).join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private _computeTreeData() {
    const childrenKey = this.treeProps?.children || 'children';
    const hasChildrenKey = this.treeProps?.hasChildren || 'hasChildren';
    const newRowStates = new Map<unknown, { level: number; isExpanded: boolean; isLeaf: boolean; loading: boolean; hasChildren: boolean }>();

    const flatten = (nodes: Record<string, unknown>[], level: number): Record<string, unknown>[] => {
      let flatNodes: Record<string, unknown>[] = [];
      for (const node of nodes) {
        const key = this._getRowKey(node);
        const isExpanded = this._expandedRowKeys.has(key);
        const isLoading = this._loadingRowKeys.has(key);
        let children = node[childrenKey as never] as Record<string, unknown>[] | undefined;

        if (this.lazy && this._treeDataMap.has(key)) {
          children = this._treeDataMap.get(key);
        }

        const hasChildren = !!(this.lazy
          ? (node[hasChildrenKey as never] === true || (children && children.length > 0))
          : (children && children.length > 0));

        newRowStates.set(key, {
          level,
          isExpanded,
          isLeaf: !hasChildren,
          loading: isLoading,
          hasChildren
        });

        flatNodes.push(node);

        if (isExpanded && children && children.length > 0) {
          flatNodes.push(...flatten(children, level + 1));
        }
      }
      return flatNodes;
    };

    this._flattenedData = flatten(this._pagedData, 0);
    this._treeStates = newRowStates;
  }

  /** 处理行展开名变化（来自 table-body） */
  _handleExpandChange = (e: CustomEvent) => {
    const { row, rowIndex, expanded } = e.detail;
    const key = this._getRowKey(row);
    const newSet = new Set(this._rowExpandedKeys);
    if (expanded) {
      newSet.add(key);
    } else {
      newSet.delete(key);
    }
    this._rowExpandedKeys = newSet;

    // 峰装并向上派发 nv-expand-change 事件
    const expandedRows = this.data.filter(r => newSet.has(this._getRowKey(r)));
    this.dispatch('nv-expand-change', { row, rowIndex, expanded, expandedRows });
  };

  /** 切换行展开状态（行展开，与树形版就地复用 toggleRowExpansion 同名不同节点） */
  toggleExpandRow(row: Record<string, unknown>, expanded?: boolean) {
    const key = this._getRowKey(row);
    const newSet = new Set(this._rowExpandedKeys);
    const isExpanded = expanded ?? !newSet.has(key);
    if (isExpanded) {
      newSet.add(key);
    } else {
      newSet.delete(key);
    }
    this._rowExpandedKeys = newSet;
  }

  /** 获取当前所有已展开的行 */
  getExpandedRows(): Record<string, unknown>[] {
    return this.data.filter(r => this._rowExpandedKeys.has(this._getRowKey(r)));
  }

  /** 切换树形节点展开状态（用于树形 treeProps 场景） */
  toggleRowExpansion(row: Record<string, unknown>, expanded?: boolean) {
    const key = this._getRowKey(row);
    const newSet = new Set(this._expandedRowKeys);
    const isExpanded = expanded ?? !newSet.has(key);
    
    if (isExpanded) {
      newSet.add(key);
      const state = this._treeStates.get(key);
      const childrenKey = this.treeProps?.children || 'children';
      const hasStaticChildren = !!(row[childrenKey as never] && (row[childrenKey as never] as any[]).length > 0);
      
      if (this.lazy && state && state.hasChildren && !hasStaticChildren && !this._treeDataMap.has(key) && this.load) {
        const nextLoading = new Set(this._loadingRowKeys);
        nextLoading.add(key);
        this._loadingRowKeys = nextLoading;
        this.load(
          row,
          (data) => {
            const nextDataMap = new Map(this._treeDataMap);
            nextDataMap.set(key, data);
            this._treeDataMap = nextDataMap;

            const nextLoadingFinish = new Set(this._loadingRowKeys);
            nextLoadingFinish.delete(key);
            this._loadingRowKeys = nextLoadingFinish;
          },
          (err) => {
            // 支持 reject 以停止动画
            const nextLoadingFinish = new Set(this._loadingRowKeys);
            nextLoadingFinish.delete(key);
            this._loadingRowKeys = nextLoadingFinish;
            
            // 将节点收起
            const currentExpanded = new Set(this._expandedRowKeys);
            currentExpanded.delete(key);
            this._expandedRowKeys = currentExpanded;

            // 调用 Message API 弹出报错（如果该环境接入了 message 组件的话，我们可以使用自定义事件或由用户自己的 load 内部控制，
            // 按照需求，我们这里抛出一个 nv-load-error，同时我们尝试导入并调用 Message.error）
            this.dispatch('nv-load-error', { row, error: err });
            
            import('../message').then(({ message }) => {
              if (message && message.error) {
                const msg = typeof err === 'string' ? err : (err && err.message) ? err.message : '加载子节点失败';
                message.error(msg);
              }
            }).catch(() => {
              console.error('Failed to load child nodes:', err);
            });
          }
        );
      }
    } else {
      newSet.delete(key);
    }
    this._expandedRowKeys = newSet;
  }

  private _syncScrollbarGutter() {
    const nvTableBody = this.shadowRoot?.querySelector('nv-table-body') as (HTMLElement & { shadowRoot: ShadowRoot | null }) | null;
    const bodyScrollEl = nvTableBody?.shadowRoot?.querySelector('.nv-table-body') as HTMLElement | null;
    if (bodyScrollEl) {
      const sw = bodyScrollEl.offsetWidth - bodyScrollEl.clientWidth;
      if (sw !== this._yScrollbarWidth) {
        this._yScrollbarWidth = sw;
      }
    }
  }

  /** 获取行的唯一 key */
  _getRowKey(row: Record<string, unknown>): unknown {
    return this.rowKey ? row[this.rowKey] : row;
  }

  // ====== 列宽计算 ======

  private _computeProcessedColumns() {
    const availableWidth = Math.max(0, (this._containerWidth || this.clientWidth) - this._yScrollbarWidth);
    
    // 递归获取所有可见的叶子列
    const getLeafColumns = (cols: TableColumn[]): TableColumn[] => {
      let leaves: TableColumn[] = [];
      for (const col of cols) {
        // 如果启用了操作栏，优先读取 _columnVisible 中的状态
        const isVisible = this.showToolbar && this._columnVisible.size > 0 && col.prop
          ? (this._columnVisible.get(col.prop) ?? col.visible !== false)
          : col.visible !== false;
        if (!isVisible) continue;
        if (col.children && col.children.length > 0) {
          leaves.push(...getLeafColumns(col.children));
        } else {
          leaves.push(col);
        }
      }
      return leaves;
    };

    const visibleColumns = this.columns.filter(col => col.visible !== false);
    const leafColumns = getLeafColumns(visibleColumns);
    const defaultMinWidth = 80;

    // 固定宽和弹性宽分离计算（type 列固定宽度，不参与弹性分配）
    let fixedWidthTotal = 0;
    let flexColumnCount = 0;

    for (const col of leafColumns) {
      const isTypeCol = !!col.type && col.type !== 'index'; // selection/radio/expand 固定宽
      if (col.width || isTypeCol) {
        fixedWidthTotal += col.width ?? (col.type === 'index' ? 60 : 44);
      } else {
        flexColumnCount++;
      }
    }

    const remainingWidth = Math.max(0, availableWidth - fixedWidthTotal);
    const flexWidth = flexColumnCount > 0
      ? Math.max(defaultMinWidth, Math.floor(remainingWidth / flexColumnCount))
      : 0;

    // 计算叶子列（不含固定列 sticky 信息）
    const processed: ProcessedColumn[] = leafColumns.map((col, index) => {
      const isTypeCol = !!col.type && col.type !== 'index';
      const typeWidth = col.type === 'index' ? 60 : 44;
      // 拖拽调整过的列宽优先使用
      const draggedWidth = this._resizedWidths.get(col.prop || col.type || '');
      const resolvedWidth = draggedWidth ?? (col.width ?? (isTypeCol ? typeWidth : Math.max(col.minWidth ?? defaultMinWidth, flexWidth)));
      const fixed = col.fixed === true ? 'left' : (col.fixed || undefined) as 'left' | 'right' | undefined;
      return {
        type: col.type,
        prop: col.prop || col.type || '',
        label: col.label ?? '',
        minWidth: col.minWidth ?? (isTypeCol ? typeWidth : defaultMinWidth),
        align: col.align ?? (isTypeCol ? 'center' : 'left'),
        headerAlign: col.headerAlign ?? col.align ?? (isTypeCol ? 'center' : 'left'),
        resolvedWidth,
        index,
        className: col.className ?? '',
        original: col,
        fixed,
      };
    });

    // 计算固定列 sticky 偏移量
    let leftOffset = 0;
    let lastFixedLeftIdx = -1;
    for (let i = 0; i < processed.length; i++) {
      if (processed[i].fixed === 'left') {
        processed[i].stickyLeft = leftOffset;
        leftOffset += processed[i].resolvedWidth;
        lastFixedLeftIdx = i;
      }
    }
    if (lastFixedLeftIdx >= 0) {
      processed[lastFixedLeftIdx].isLastFixedLeft = true;
    }

    let rightOffset = 0;
    let firstFixedRightIdx = -1;
    for (let i = processed.length - 1; i >= 0; i--) {
      if (processed[i].fixed === 'right') {
        processed[i].stickyRight = rightOffset;
        rightOffset += processed[i].resolvedWidth;
        if (firstFixedRightIdx === -1) firstFixedRightIdx = i;
      }
    }
    if (firstFixedRightIdx >= 0) {
      processed[firstFixedRightIdx].isFirstFixedRight = true;
    }

    this._processedColumns = processed;
    this._totalWidth = processed.reduce((sum, col) => sum + col.resolvedWidth, 0);

    // 递归构建用于表头的树形结构
    let leafIndex = 0;
    const isColVisible = (col: TableColumn): boolean => {
      if (this.showToolbar && this._columnVisible.size > 0 && col.prop) {
        return this._columnVisible.get(col.prop) ?? col.visible !== false;
      }
      return col.visible !== false;
    };

    const buildProcessedTree = (cols: TableColumn[], parentFixed?: 'left' | 'right'): ProcessedColumn[] => {
      const result: ProcessedColumn[] = [];
      for (const col of cols) {
        if (!isColVisible(col)) continue;
        const fixed = (col.fixed === true ? 'left' : col.fixed) || parentFixed;
        if (col.children && col.children.length > 0) {
          const children = buildProcessedTree(col.children, fixed as any);
          if (children.length === 0) continue; // 子列全部隐藏时跳过此组
          const resolvedWidth = children.reduce((sum, c) => sum + c.resolvedWidth, 0);
          result.push({
            type: col.type,
            prop: col.prop || '',
            label: col.label ?? '',
            minWidth: 0,
            align: col.align ?? 'center',
            headerAlign: col.headerAlign ?? col.align ?? 'center',
            resolvedWidth,
            index: -1,
            className: col.className ?? '',
            original: col,
            fixed,
            isGroup: true,
            children
          } as ProcessedColumn);
        } else {
          const p = processed[leafIndex++];
          if (!p) continue; // 防御：索引越界时跳过
          if (fixed && !p.fixed) {
            p.fixed = fixed as any;
          }
          result.push(p);
        }
      }
      return result;
    };

    this._headerColumns = buildProcessedTree(this.columns);
  }

  // ====== 排序 ======

  /** 内部使用：过滤后再排序的数据 */
  get _sortedData(): Record<string, unknown>[] {
    // 先过滤
    let result = this.data;
    if (this._filterValues.size > 0) {
      result = result.filter(row => {
        for (const [prop, values] of this._filterValues.entries()) {
          if (!values || values.length === 0) continue;
          const col = this.columns.find(c => c.prop === prop);
          if (col?.filterMethod) {
            if (!values.some(v => col.filterMethod!(v, row as never))) return false;
          } else {
            if (!values.includes(row[prop])) return false;
          }
        }
        return true;
      });
    }
    // 再排序
    if (!this._sortProp || !this._sortDirection) return result;
    const col = this.columns.find(c => c.prop === this._sortProp);
    if (!col || col.sortable === 'custom') return result;
    const dir = this._sortDirection === 'ascending' ? 1 : -1;
    return [...result].sort((a, b) => {
      if (col.sortMethod) return col.sortMethod(a as never, b as never) * dir;
      const av = a[this._sortProp];
      const bv = b[this._sortProp];
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return (av < bv ? -1 : 1) * dir;
    });
  }

  /** 内部使用：分页后的数据（前端分页模式） */
  get _pagedData(): Record<string, unknown>[] {
    if (!this.pagination) return this._sortedData;
    const start = (this.currentPage - 1) * this.pageSize;
    return this._sortedData.slice(start, start + this.pageSize);
  }

  _handleSort(col: ProcessedColumn) {
    if (!col.original.sortable) return;
    const prop = col.prop;
    let dir: SortDirection;
    if (this._sortProp !== prop) {
      dir = 'ascending';
    } else {
      dir = this._sortDirection === null ? 'ascending'
        : this._sortDirection === 'ascending' ? 'descending'
        : null;
    }
    this._sortProp = dir === null ? '' : prop;
    this._sortDirection = dir;

    const detail: SortChangeEventDetail = { column: col.original, prop, order: dir };
    this.dispatch('nv-sort-change', detail);
  }

  // ====== 多选 ======

  /** 切换单行选中状态 */
  toggleRowSelection(row: Record<string, unknown>, selected?: boolean) {
    const key = this._getRowKey(row);
    const isSelected = this._selectedKeys.has(key);
    const newSelected = selected ?? !isSelected;
    const next = new Set(this._selectedKeys);
    if (newSelected) { next.add(key); } else { next.delete(key); }
    this._selectedKeys = next;
    this._emitSelectionChange();
  }

  /** 清空所有选中 */
  clearSelection() {
    this._selectedKeys = new Set();
    this._emitSelectionChange();
  }

  /** 全选/取消全选 */
  toggleAllSelection() {
    const allKeys = this._sortedData.map(r => this._getRowKey(r));
    const allSelected = allKeys.every(k => this._selectedKeys.has(k));
    if (allSelected) {
      this._selectedKeys = new Set();
    } else {
      this._selectedKeys = new Set(allKeys);
    }
    this._emitSelectionChange();
  }

  /** 获取当前选中行 */
  getSelectionRows(): Record<string, unknown>[] {
    return this._sortedData.filter(r => this._selectedKeys.has(this._getRowKey(r)));
  }

  private _emitSelectionChange() {
    const detail: SelectionChangeEventDetail = { selection: this.getSelectionRows() };
    this.dispatch('nv-selection-change', detail);
  }

  // ====== 单选 ======

  /** 设置当前单选行 */
  setCurrentRow(row: Record<string, unknown> | null) {
    this._radioKey = row ? this._getRowKey(row) : undefined;
    this.dispatch('nv-current-change', { currentRow: row });
  }

  // ====== 事件处理 ======

  _handleHeaderClick(e: CustomEvent<HeaderClickEventDetail>) {
    this.dispatch('nv-header-click', e.detail);
  }

  _handleHeaderSort(e: CustomEvent<{ column: ProcessedColumn }>) {
    this._handleSort(e.detail.column);
  }

  /** 监听来自 Header 的列宽调整结束事件 */
  _handleColumnResize(e: CustomEvent<{ prop: string; width: number }>) {
    const { prop, width } = e.detail;
    const next = new Map(this._resizedWidths);
    next.set(prop, width);
    
    // 拖动结束，清空临时状态
    const nextDragging = new Map(this._draggingWidths);
    nextDragging.delete(prop);
    this._draggingWidths = nextDragging;

    this._resizedWidths = next;
    // 派发给外部（如需要保存用户偏好设定）
    this.dispatch('nv-column-resize', { prop, width }, { composed: false });
  }

  /** 监听来自 Header 的拖拽过程中事件，实现 body 列宽实时联动 */
  _handleColumnResizing(e: CustomEvent<{ prop: string; width: number }>) {
    const { prop, width } = e.detail;
    // 强制生成全新的 Map 引用以确保 Lit 能够侦测到属性变化
    const next = new Map(this._draggingWidths);
    next.set(prop, width);
    this._draggingWidths = next;
    // 手动调用请求更新，以防由于 Map 浅比较依然不更新组件的问题
    this.requestUpdate('_draggingWidths');
  }

  _handleRowClick(e: CustomEvent<RowClickEventDetail>) {
    if (this.highlightCurrentRow) {
      this._currentRowIndex = e.detail.rowIndex;
    }
    this.dispatch('nv-row-click', e.detail);
  }

  _handleRowDblClick(e: CustomEvent<RowClickEventDetail>) {
    this.dispatch('nv-row-dblclick', e.detail);
  }

  _handleCellClick(e: CustomEvent<CellClickEventDetail>) {
    this.dispatch('nv-cell-click', e.detail);
  }

  async _handleCellContextMenu(e: CustomEvent<CellClickEventDetail>) {
    // 阻止浏览器默认右键菜单
    e.detail.event.preventDefault();
    // 触发用户监听的完整事件，即使用户没配 slot 也能收到事件
    this.dispatch('nv-row-contextmenu', e.detail);

    // 检查是否有 contextmenu slot 的内容传入，如果没有则只触发事件不弹窗
    const hasContextMenuSlot = !!this.querySelector('[slot="contextmenu"]');
    if (!hasContextMenuSlot) {
      return;
    }

    // 确保组件先将弹出层彻底关闭，以便下一次重新激活时 Popup 能检测到状态变化并刷新位置
    this._contextMenuActive = false;
    await this.updateComplete;

    // 记录鼠标位置，移动虚拟锚点并激活菜单
    const mouseEvent = e.detail.event as MouseEvent;
    this._contextMenuX = mouseEvent.clientX;
    this._contextMenuY = mouseEvent.clientY;
    this._contextMenuActive = true;
  }

  /** 关闭右键菜单 popup */
  closeContextMenu() {
    this._contextMenuActive = false;
  }

  _handleSelectionChange(e: CustomEvent<{ row: Record<string, unknown>; selected: boolean }>) {
    this.toggleRowSelection(e.detail.row, e.detail.selected);
    this.dispatch('nv-select', { row: e.detail.row, selected: e.detail.selected });
  }

  _handleSelectAll(e: CustomEvent<{ checked: boolean }>) {
    if (e.detail.checked) {
      const allKeys = new Set(this._sortedData.map(r => this._getRowKey(r)));
      this._selectedKeys = allKeys;
    } else {
      this._selectedKeys = new Set();
    }
    this._emitSelectionChange();
    this.dispatch('nv-select-all', { selection: this.getSelectionRows() });
  }

  _handleRadioChange(e: CustomEvent<{ row: Record<string, unknown> }>) {
    this._radioKey = this._getRowKey(e.detail.row);
    this.dispatch('nv-current-change', { currentRow: e.detail.row });
  }

  _handleToggleExpansion(e: CustomEvent<{ row: Record<string, unknown>; expanded: boolean }>) {
    this.toggleRowExpansion(e.detail.row, e.detail.expanded);
    this.dispatch('nv-expand-change', { row: e.detail.row, expanded: e.detail.expanded });
  }

  /** 分页：页码变化 */
  _handlePageChange(e: CustomEvent<number>) {
    this.currentPage = e.detail;
    this.dispatch('nv-page-change', { currentPage: this.currentPage, pageSize: this.pageSize });
  }

  /** 分页：每页条数变化 */
  _handlePageSizeChange(e: CustomEvent<number>) {
    this.pageSize = e.detail;
    this.currentPage = 1; // 切换每页数时回到第一页
    this.dispatch('nv-page-change', { currentPage: this.currentPage, pageSize: this.pageSize });
  }

  /** 表头过滤变化 */
  _handleFilterChange(e: CustomEvent<{ prop: string; values: unknown[] }>) {
    const { prop, values } = e.detail;
    const newMap = new Map(this._filterValues);
    if (!values || values.length === 0) {
      newMap.delete(prop);
    } else {
      newMap.set(prop, values);
    }
    this._filterValues = newMap;
    this.currentPage = 1; // 过滤变化时回到第一页
    this.dispatch('nv-filter-change', { prop, values, filters: Object.fromEntries(newMap) });
  }

  _handleBodyScroll(e: CustomEvent<{ scrollLeft: number; scrollTop: number }>) {
    const headerWrapper = this.shadowRoot?.querySelector('.nv-table__header-wrapper') as HTMLElement | null;
    if (headerWrapper) {
      headerWrapper.scrollLeft = e.detail.scrollLeft;
    }
    this._syncScrollbarGutter();
    this.dispatch('nv-scroll', e.detail);
  }

  render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nv-table': NvTable;
  }
}
