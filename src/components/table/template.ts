import { html, classMap } from '../../based-on';
import { styleMap } from 'lit/directives/style-map.js';
import classNamesConfig from './classNames';
import type { NvTable } from './index';
import '../popup/index';
import '../pagination/index';
import '../checkbox/index';
import '../icon/index';

const DENSITY_OPTIONS: Array<{ label: string; value: NvTable['size'] }> = [
  { label: '极大', value: 'huge' },
  { label: '大', value: 'large' },
  { label: '中（默认）', value: 'medium' },
  { label: '小', value: 'small' },
  { label: '极小', value: 'mini' },
];

const renderToolbar = function(this: NvTable) {
  // 可配置的普通列（排除 type 列，如 selection/radio/index）
  const settableColumns = this.columns.filter(c => !c.type && c.prop);

  return html`
    <div class="nv-table__toolbar" part="toolbar">
      <!-- 左侧：标题 + 自定义 slot -->
      <div class="nv-table__toolbar-left">
        ${this.toolbarTitle ? html`<span class="nv-table__toolbar-title">${this.toolbarTitle}</span>` : ''}
        <slot name="toolbar"></slot>
      </div>

      <!-- 右侧：内置工具 + 自定义 slot -->
      <div class="nv-table__toolbar-right">
        <!-- 列设置 -->
        ${this.showColumnSetting ? html`
          <nv-popup
            style="--nv-popup-padding: 0;"
            data-popup="column-setting"
            placement="bottom-end"
            strategy="fixed"
            trigger="click"
            @nv-show="${() => {
              // 互斥操作：打开列设置时关掉密度设置
              this._columnSettingOpen = true;
              if (this._densityOpen) {
                this._densityOpen = false;
                (this.shadowRoot?.querySelector('nv-popup[data-popup="density"]') as any)?.hide();
              }
            }}"
            @nv-hide="${() => { this._columnSettingOpen = false; }}"
          >
            <button
              slot="anchor"
              class="nv-table__toolbar-btn ${this._columnSettingOpen ? 'is-active' : ''}"
              title="列设置"
            >
              <nv-icon name="setting"></nv-icon>
            </button>
            <div class="nv-table__col-setting-panel">
              <div class="nv-table__col-setting-header">
                <span>列设置</span>
                <button class="nv-table__col-setting-reset" @click="${() => {
                  const next = new Map(this._columnVisible);
                  settableColumns.forEach(c => next.set(c.prop, true));
                  this._columnVisible = next;
                }}">重置</button>
              </div>
              ${settableColumns.map(col => html`
                <label class="nv-table__col-setting-item">
                  <nv-checkbox
                    .checked="${this._columnVisible.get(col.prop) ?? true}"
                    @nv-change="${(e: CustomEvent) => {
                      const next = new Map(this._columnVisible);
                      next.set(col.prop, e.detail.checked);
                      this._columnVisible = next;
                    }}"
                  ></nv-checkbox>
                  <span>${col.label}</span>
                </label>
              `)}
            </div>
          </nv-popup>
        ` : ''}

        <!-- 密度切换 -->
        ${this.showDensity ? html`
          <nv-popup
            style="--nv-popup-padding: 0;"
            data-popup="density"
            placement="bottom-end"
            strategy="fixed"
            trigger="click"
            distance="6"
            @nv-show="${() => {
              // 互斥操作：打开密度设置时关掉列设置
              this._densityOpen = true;
              if (this._columnSettingOpen) {
                this._columnSettingOpen = false;
                (this.shadowRoot?.querySelector('nv-popup[data-popup="column-setting"]') as any)?.hide();
              }
            }}"
            @nv-hide="${() => { this._densityOpen = false; }}"
          >
            <button
              slot="anchor"
              class="nv-table__toolbar-btn ${this._densityOpen ? 'is-active' : ''}"
              title="密度"
            >
              <nv-icon name="menu"></nv-icon>
            </button>
            <div class="nv-table__density-panel">
              <div class="nv-table__density-header">密度</div>
              ${DENSITY_OPTIONS.map(opt => html`
                <div
                  class="nv-table__density-item ${this.size === opt.value ? 'is-active' : ''}"
                  @click="${(e: Event) => {
                    this.size = opt.value;
                    const popup = (e.target as HTMLElement).closest('nv-popup') as any;
                    popup?.hide();
                  }}"
                >${opt.label}</div>
              `)}
            </div>
          </nv-popup>
        ` : ''}

        <!-- 导出 CSV -->
        ${this.showExport ? html`
          <button class="nv-table__toolbar-btn" title="导出 CSV" @click="${() => this._exportCsv()}">
            <nv-icon name="download"></nv-icon>
          </button>
        ` : ''}

        <slot name="toolbar-right"></slot>
      </div>
    </div>
  `;
};

const renderHeader = function(this: NvTable) {
  return html`
    <div class="${classNamesConfig.elements.headerWrapper}" part="header">
      <div class="${classNamesConfig.elements.headerInner}" style="min-width: ${this._totalWidth}px;">
        <nv-table-header
          .columns="${this._headerColumns}"
          .border="${this.border}"
          .sortProp="${this._sortProp}"
          .sortDirection="${this._sortDirection}"
          .selectedKeys="${this._selectedKeys}"
          .totalCount="${this._sortedData.length}"
          .filterValues="${this._filterValues}"
          .yScrollbarWidth="${this._yScrollbarWidth}"
          .resizable="${this.resizable}"
          @nv-header-click="${this._handleHeaderClick}"
          @nv-header-sort="${this._handleHeaderSort}"
          @nv-select-all="${this._handleSelectAll}"
          @nv-filter-change="${this._handleFilterChange}"
          @nv-column-resizing="${this._handleColumnResizing}"
          @nv-column-resize="${this._handleColumnResize}"
        ></nv-table-header>
      </div>
      ${this._yScrollbarWidth > 0 ? html`
        <div class="${classNamesConfig.elements.headerGutter}" style="width: ${this._yScrollbarWidth}px;"></div>
      ` : ''}
    </div>
  `;
};

const template = function(this: NvTable) {
  // height 优先，fallback 到 maxHeight
  const wrapperStyle = this.height
    ? `height: ${this.height};`
    : this.maxHeight ? `max-height: ${this.maxHeight};` : '';

  return html`
    <div
      class="${classMap({
        [classNamesConfig.elements.wrapper]: true,
        [classNamesConfig.modifiers.border]: this.border,
        'nv-table--fluid': !this.height && !!this.maxHeight,
        [`nv-table--${this.size}`]: !!this.size,
      })}"
      style="${wrapperStyle}"
    >
      ${this.showToolbar ? renderToolbar.call(this) : ''}
      ${this.data.length > 0 ? html`
        ${this.showHeader ? renderHeader.call(this) : ''}
        <div
          class="${classNamesConfig.elements.bodyWrapper}"
          part="body"
          @pointerdown="${() => {
            const header = this.shadowRoot?.querySelector('nv-table-header') as any;
            header?.closeFilter?.();
            // 点击 body 区域时关闭操作栏 popup
            if (this._columnSettingOpen) {
              this._columnSettingOpen = false;
              (this.shadowRoot?.querySelector('nv-popup[data-popup="column-setting"]') as any)?.hide();
            }
            if (this._densityOpen) {
              this._densityOpen = false;
              (this.shadowRoot?.querySelector('nv-popup[data-popup="density"]') as any)?.hide();
            }
            // 点击 body 区域时关闭 pagination 下拉菜单
            const pagination = this.shadowRoot?.querySelector('nv-pagination');
            if (pagination) {
              const select = pagination.shadowRoot?.querySelector('nv-select') as any;
              if (select && select.visible) {
                select.visible = false;
              }
            }
          }}"
        >
          <nv-table-body
            .data="${this._flattenedData}"
            .columns="${this._processedColumns}"
            .rowHeight="${this.actualRowHeight}"
            .stripe="${this.stripe}"
            .border="${this.border}"
            .highlightCurrentRow="${this.highlightCurrentRow}"
            .currentRowIndex="${this._currentRowIndex}"
            .selectedKeys="${this._selectedKeys}"
            .radioKey="${this._radioKey}"
            .rowKey="${this.rowKey}"
            .rowClassName="${this.rowClassName}"
            .cellClassName="${this.cellClassName}"
            .treeStates="${this._treeStates}"
            .draggingWidths="${this._draggingWidths}"
            .expandedKeys="${this._rowExpandedKeys}"
            @nv-row-click="${this._handleRowClick}"
            @nv-row-dblclick="${this._handleRowDblClick}"
            @nv-cell-click="${this._handleCellClick}"
            @nv-cell-contextmenu="${this._handleCellContextMenu}"
            @nv-body-scroll="${this._handleBodyScroll}"
            @nv-row-selection-change="${this._handleSelectionChange}"
            @nv-radio-change="${this._handleRadioChange}"
            @nv-toggle-expansion="${this._handleToggleExpansion}"
            @nv-expand-change="${this._handleExpandChange}"
          ></nv-table-body>
        </div>
        <!-- 表尾合计行 -->
        ${this.showSummary && this._summaryData.length > 0 ? html`
          <div class="nv-table__summary-wrapper" part="summary">
            <div class="nv-table__summary-inner" style="min-width: ${this._totalWidth}px;">
              ${this._processedColumns.map((col, index) => html`
                <div
                  class="nv-table__summary-cell ${col.fixed === 'left' ? 'is-fixed-left' : ''} ${col.fixed === 'right' ? 'is-fixed-right' : ''} ${col.isLastFixedLeft ? 'is-last-fixed-left' : ''} ${col.isFirstFixedRight ? 'is-first-fixed-right' : ''}"
                  style="${styleMap({
                    width: `${this._draggingWidths.get(col.prop) ?? this._resizedWidths.get(col.prop) ?? col.resolvedWidth}px`,
                    minWidth: `${col.minWidth}px`,
                    textAlign: col.align,
                    ...(col.fixed === 'left' || col.fixed === 'right' ? {
                      position: 'sticky',
                      ...(col.fixed === 'left' ? { left: `${col.stickyLeft ?? 0}px` } : { right: `${col.stickyRight ?? 0}px` }),
                      zIndex: '1',
                      backgroundColor: 'var(--nv-table-header-background-color, #f5f7fa)',
                    } : {}),
                  })}"
                >
                  <div class="nv-table__summary-cell-content">
                    ${this._summaryData[index] ?? ''}
                  </div>
                </div>
              `)}
            </div>
            ${this._yScrollbarWidth > 0 ? html`
              <div style="width: ${this._yScrollbarWidth}px; flex-shrink: 0; background: var(--nv-table-header-background-color, #f5f7fa);"></div>
            ` : ''}
          </div>
        ` : ''}
        <!-- 分页栏 -->
        ${this.pagination ? html`
          <div class="nv-table__pagination" part="pagination">
            <nv-pagination
              .total="${this._sortedData.length}"
              .currentPage="${this.currentPage}"
              .pageSize="${this.pageSize}"
              .pageSizes="${this.pageSizeOptions}"
              show-jumper
              @nv-current-change="${this._handlePageChange}"
              @nv-size-change="${this._handlePageSizeChange}"
            ></nv-pagination>
          </div>
        ` : ''}
      ` : html`
        ${this.showHeader ? renderHeader.call(this) : ''}
        <div class="${classNamesConfig.elements.empty}">
          <slot name="empty">
            <nv-empty description="${this.emptyText}"></nv-empty>
          </slot>
        </div>
      `}
    </div>

    <!-- 右键菜单 popup：虚拟锚点定位到鼠标位置，slot="contextmenu" 承载自定义内容 -->
    <nv-popup
      style="--nv-popup-padding: 0;"
      part="contextmenu"
      trigger="manual"
      placement="bottom-start"
      strategy="fixed"
      distance="0"
      .active="${this._contextMenuActive}"
      @nv-hide="${() => { this._contextMenuActive = false; }}"
    >
      <!-- 虚拟锚点：fixed 定位，随右键坐标移动 -->
      <div
        slot="anchor"
        style="${styleMap({
          position: 'fixed',
          left: `${this._contextMenuX}px`,
          top: `${this._contextMenuY}px`,
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: '0',
        })}"
      ></div>
      <!-- 用户自定义菜单内容 -->
      <slot name="contextmenu"></slot>
    </nv-popup>
  `;
};

export default template;
