import { html, classMap } from '../../based-on';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import classNamesConfig from './classNames';
import type { NvTableBody } from './index';
import '../checkbox/index';
import '../radio/index';
import '../tooltip/index';
import '../icon/index';

/** 渲染单行所有的单元格，供虚拟滚动和全量渲染两个分支复用 */
const renderRowCells = function(this: NvTableBody, row: Record<string, unknown>, rowIndex: number, firstDataColIndex: number, isStripe: boolean, isCurrent: boolean) {
  return this.columns.map((col, colIndex) => {
    const cellValue = col.type ? undefined : row[col.prop];
    const isSelection = col.type === 'selection';
    const isRadio = col.type === 'radio';
    const isExpand = col.type === 'expand';
    const rowKeyValue = this.rowKey ? row[this.rowKey] : row;
    const isChecked = isSelection
      ? this.selectedKeys.has(rowKeyValue)
      : isRadio
      ? this.radioKey === rowKeyValue
      : false;
    const isExpanded = isExpand ? this.expandedKeys.has(rowKeyValue) : false;

    const colCellClass = col.className || '';
    const dynCellClass = this.cellClassName
      ? this.cellClassName(cellValue, row, rowIndex)
      : (col.original.cellClassName ? col.original.cellClassName(cellValue, row, rowIndex, col.original) : '');

    const useTooltip = !!col.original.showOverflowTooltip && !isSelection && !isRadio && !isExpand;

    const cellContent = isSelection ? html`
      <nv-checkbox
        .checked="${isChecked}"
        @nv-change="${(e: CustomEvent) => {
          e.stopPropagation();
          this._dispatchSelectionChange(row, e.detail.checked, e);
        }}"
        @click="${(e: Event) => e.stopPropagation()}"
      ></nv-checkbox>
    ` : isRadio ? html`
      <nv-radio
        .checked="${isChecked}"
        @nv-change="${(e: Event) => {
          e.stopPropagation();
          this._dispatchRadioChange(row, e);
        }}"
        @click="${(e: Event) => e.stopPropagation()}"
      ></nv-radio>
    ` : isExpand ? html`
      <span
        class="nv-table-body__expand-icon ${isExpanded ? 'is-expanded' : ''}"
        @click="${(e: Event) => {
          e.stopPropagation();
          this._dispatchExpandChange(row, rowIndex, !isExpanded, e);
        }}"
      >
        <nv-icon name="caret-right"></nv-icon>
      </span>
    ` : col.original.renderCell
      ? col.original.renderCell(cellValue, row, rowIndex, col.original)
      : (cellValue ?? '');

    return html`
      <div
        class="${classMap({
          [classNamesConfig.elements.cell]: true,
          [classNamesConfig.modifiers.border]: this.border,
          [colCellClass]: !!colCellClass,
          [dynCellClass]: !!dynCellClass,
          [classNamesConfig.modifiers.fixedLeft]: col.fixed === 'left',
          [classNamesConfig.modifiers.fixedRight]: col.fixed === 'right',
          [classNamesConfig.modifiers.lastFixedLeft]: !!col.isLastFixedLeft,
          [classNamesConfig.modifiers.firstFixedRight]: !!col.isFirstFixedRight,
          'nv-table-body__cell--overflow-tooltip': useTooltip,
          'nv-table-body__cell--expand': isExpand,
        })}"
        style="${styleMap({
          width: `${this.draggingWidths?.get(col.prop) ?? col.resolvedWidth}px`,
          minWidth: `${col.minWidth}px`,
          textAlign: col.align,
          ...(col.fixed === 'left' || col.fixed === 'right' ? {
            position: 'sticky',
            ...(col.fixed === 'left' ? { left: `${col.stickyLeft ?? 0}px` } : { right: `${col.stickyRight ?? 0}px` }),
            zIndex: '1',
            // 固定列必须有不透明背景，否则溻动时与其他列重叠
            backgroundColor: isCurrent
              ? 'var(--nv-table-row-current-background-color, #ecf5ff)'
              : isStripe
              ? 'var(--nv-table-row-stripe-background-color, #fafafa)'
              : 'var(--nv-table-background-color, #ffffff)',
          } : {}),
        })}"
        @click="${(e: MouseEvent) => {
          if (isSelection) {
            this._dispatchSelectionChange(row, !isChecked, e);
          } else if (isRadio) {
            this._dispatchRadioChange(row, e);
          } else if (isExpand) {
            // expand 点击已在图标上处理
          } else {
            this._dispatchCellClick(row, rowIndex, col, colIndex, cellValue, e);
          }
        }}"
        @contextmenu="${(e: MouseEvent) => this._dispatchCellContextMenu(row, rowIndex, col, colIndex, cellValue, e)}"
      >
        ${(() => {
          const isTreeCol = this.treeStates && colIndex === firstDataColIndex;
          const treeState = isTreeCol ? this.treeStates?.get(this.rowKey ? row[this.rowKey as never] : row) : null;
          return html`
            ${isTreeCol && treeState ? html`
              <span class="nv-table-body__tree-indent" style="display:inline-block;width:${treeState.level * 24}px;flex-shrink:0;"></span>
              ${treeState.loading ? html`
                <span class="nv-table-body__tree-expand-icon is-loading" style="margin-right:8px;cursor:not-allowed;display:inline-flex;align-items:center;">
                  <nv-icon name="loading"></nv-icon>
                </span>
              ` : treeState.hasChildren ? html`
                <span class="nv-table-body__tree-expand-icon" @click="${(e: Event) => {
                    e.stopPropagation();
                    this.dispatchEvent(new CustomEvent('nv-toggle-expansion', { detail: { row, expanded: !treeState.isExpanded }, bubbles: true, composed: true }));
                  }}" style="margin-right:8px;cursor:pointer;display:inline-flex;align-items:center;transition:transform 0.2s;transform:${treeState.isExpanded ? 'rotate(90deg)' : 'rotate(0)'}">
                  <nv-icon name="caret-right"></nv-icon>
                </span>
              ` : html`
                <span class="nv-table-body__tree-expand-icon is-placeholder" style="margin-right:8px;display:inline-block;width:14px;height:14px;flex-shrink:0;"></span>
              `}
            ` : ''}
            ${useTooltip ? html`
              <nv-tooltip
                .content="${String(cellValue ?? '')}"
                placement="top"
                style="display:block;overflow:hidden;"
              >
                <div class="${classNamesConfig.elements.cellContent} nv-table-body__cell-text">${cellContent}</div>
              </nv-tooltip>
            ` : html`
              <div class="${classNamesConfig.elements.cellContent}">${cellContent}</div>
            `}
          `;
        })()}
      </div>
    `;
  });
};

const template = function(this: NvTableBody) {
  const totalWidth = this.columns.reduce((sum, col) => sum + (this.draggingWidths?.get(col.prop) ?? col.resolvedWidth), 0);
  
  const firstDataColIndex = this.columns.findIndex(c => !c.type);

  // 如果有展开列，则切换为全量渲染（不使用虚拟滚动）
  const expandCol = this.columns.find(c => c.type === 'expand');
  const useFullRender = !!expandCol;

  if (useFullRender) {
    // ===== 全量渲染分支（有展开列时） =====
    return html`
      <div
        class="${classNamesConfig.block}"
        part="body"
        ${ref(this.scrollRef)}
        @scroll="${this._handleScroll}"
      >
        <div style="${styleMap({ minWidth: `${totalWidth}px` })}">
          ${this.data.map((row, rowIndex) => {
            if (!row) return '';

            const rowKeyValue = this.rowKey ? row[this.rowKey] : row;
            const isStripe = this.stripe && rowIndex % 2 === 1;
            const isCurrent = this.highlightCurrentRow && rowIndex === this.currentRowIndex;
            const extraRowClass = this.rowClassName ? this.rowClassName(row, rowIndex) : '';
            const isExpanded = this.expandedKeys.has(rowKeyValue);

            return html`
              <div
                class="${classMap({
                  [classNamesConfig.elements.row]: true,
                  [classNamesConfig.modifiers.stripe]: isStripe,
                  [classNamesConfig.modifiers.current]: isCurrent,
                  [extraRowClass]: !!extraRowClass,
                })}"
                style="${styleMap({
                  height: `${this.rowHeight}px`,
                  minWidth: `${totalWidth}px`,
                  backgroundColor: isCurrent
                    ? 'var(--nv-table-row-current-background-color, #ecf5ff)'
                    : isStripe
                    ? 'var(--nv-table-row-stripe-background-color, #fafafa)'
                    : 'var(--nv-table-background-color, #ffffff)',
                })}"
                @click="${(e: MouseEvent) => this._dispatchRowClick(row, rowIndex, e)}"
                @dblclick="${(e: MouseEvent) => this._dispatchRowDblClick(row, rowIndex, e)}"
              >
                ${renderRowCells.call(this, row, rowIndex, firstDataColIndex, isStripe, isCurrent)}
              </div>
              <div class="nv-table-body__expand-row ${isExpanded ? 'is-expanded' : ''}" style="${styleMap({ minWidth: `${totalWidth}px` })}">
                <div class="nv-table-body__expand-content">
                  ${expandCol?.original.renderCell ? expandCol.original.renderCell(undefined, row, rowIndex, expandCol.original) : ''}
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  // ===== 虚拟滚动分支（无展开列时，与原逻辑一致） =====
  const virtualizer = this.virtualizerController.getVirtualizer();
  
  virtualizer.setOptions({
    ...virtualizer.options,
    count: this.data.length,
    estimateSize: () => this.rowHeight,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return html`
    <div
      class="${classNamesConfig.block}"
      part="body"
      ${ref(this.scrollRef)}
      @scroll="${this._handleScroll}"
    >
      <div style="${styleMap({ position: 'relative', height: `${totalSize}px`, minWidth: `${totalWidth}px` })}">
        ${virtualItems.map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const row = this.data[rowIndex];
          if (!row) return '';

          const isStripe = this.stripe && rowIndex % 2 === 1;
          const isCurrent = this.highlightCurrentRow && rowIndex === this.currentRowIndex;
          const extraRowClass = this.rowClassName ? this.rowClassName(row, rowIndex) : '';

          return html`
            <div
              class="${classMap({
                [classNamesConfig.elements.row]: true,
                [classNamesConfig.modifiers.stripe]: isStripe,
                [classNamesConfig.modifiers.current]: isCurrent,
                [extraRowClass]: !!extraRowClass,
              })}"
              style="${styleMap({
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                minWidth: `${totalWidth}px`,
              })}"
              @click="${(e: MouseEvent) => this._dispatchRowClick(row, rowIndex, e)}"
              @dblclick="${(e: MouseEvent) => this._dispatchRowDblClick(row, rowIndex, e)}"
            >
              ${renderRowCells.call(this, row, rowIndex, firstDataColIndex, isStripe, isCurrent)}
            </div>
          `;
        })}
      </div>
    </div>
  `;
};

export default template;

