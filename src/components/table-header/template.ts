import { html, classMap } from '../../based-on';
import { styleMap } from 'lit/directives/style-map.js';
import classNamesConfig from './classNames';
import type { NvTableHeader } from './index';
import type { ProcessedColumn } from '../table/types';
import '../icon/index';
import '../checkbox/index';
import '../popup/index';

// 漏斗形 SVG 图标（图标库无 filter 图标，使用 inline SVG 替代）
const filterSvg = (color: string) => html`
  <svg width="12" height="12" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="${color}">
    <path d="M64 128h896l-352 448v320l-192-128V576z"/>
  </svg>
`;

const template = function(this: NvTableHeader) {
  const selectedCount = this.selectedKeys.size;
  const isAllSelected = this.totalCount > 0 && selectedCount >= this.totalCount;
  const isIndeterminate = selectedCount > 0 && selectedCount < this.totalCount;

  const renderColumn = (col: ProcessedColumn): ReturnType<typeof html> => {
    if (col.isGroup) {
      return html`
        <div
          class="${classMap({
            [classNamesConfig.elements.cell]: true,
            'nv-table-header__group': true,
            [classNamesConfig.modifiers.border]: this.border,
            [classNamesConfig.modifiers.fixedLeft]: col.fixed === 'left',
            [classNamesConfig.modifiers.fixedRight]: col.fixed === 'right',
            [classNamesConfig.modifiers.lastFixedLeft]: !!col.isLastFixedLeft,
            [classNamesConfig.modifiers.firstFixedRight]: !!col.isFirstFixedRight,
          })}"
          style="${styleMap({
            width: `${col.resolvedWidth}px`,
            minWidth: `${col.minWidth}px`,
            ...(col.fixed === 'left' ? { position: 'sticky', left: `${col.stickyLeft ?? 0}px`, zIndex: '2' } : {}),
            ...(col.fixed === 'right' ? { position: 'sticky', right: `${(col.stickyRight ?? 0) + this.yScrollbarWidth}px`, zIndex: '2' } : {}),
          })}"
        >
          <div class="nv-table-header__group-title">
            <div class="${classNamesConfig.elements.cellContent}" style="text-align: ${col.headerAlign};">
              ${col.original.renderHeader ? col.original.renderHeader(col.original, col.index) : col.label}
            </div>
          </div>
          <div class="nv-table-header__group-children">
            ${(col.children || []).map((child: ProcessedColumn) => renderColumn(child))}
          </div>
        </div>
      `;
    }

    const isSelection = col.type === 'selection';
    const isRadio = col.type === 'radio';
    const isSortable = !!col.original.sortable;
    const isCurrentSort = isSortable && this.sortProp === col.prop;
    const isAsc = isCurrentSort && this.sortDirection === 'ascending';
    const isDesc = isCurrentSort && this.sortDirection === 'descending';
    const hasFilter = !!col.original.filters?.length;
    const isFilterActive = hasFilter && (this.filterValues.get(col.prop)?.length ?? 0) > 0;
    const isFilterOpen = this._openFilterProp === col.prop;
    const tempSelected = this._tempFilterValues.get(col.prop) ?? new Set();
    const filterMultiple = col.original.filterMultiple !== false;

    // 拖拽中使用临时宽度，否则使用 resolvedWidth
    const displayWidth = this._draggingWidths.get(col.prop) ?? col.resolvedWidth;
    return html`
      <div
        class="${classMap({
          [classNamesConfig.elements.cell]: true,
          [classNamesConfig.modifiers.border]: this.border,
          [classNamesConfig.modifiers.sortable]: isSortable,
          [classNamesConfig.modifiers.fixedLeft]: col.fixed === 'left',
          [classNamesConfig.modifiers.fixedRight]: col.fixed === 'right',
          [classNamesConfig.modifiers.lastFixedLeft]: !!col.isLastFixedLeft,
          [classNamesConfig.modifiers.firstFixedRight]: !!col.isFirstFixedRight,
        })}"
        style="${styleMap({
          width: `${displayWidth}px`,
          minWidth: `${col.minWidth}px`,
          textAlign: col.headerAlign,
          ...(col.fixed === 'left' ? { position: 'sticky', left: `${col.stickyLeft ?? 0}px`, zIndex: '2' } : {}),
          ...(col.fixed === 'right' ? { position: 'sticky', right: `${(col.stickyRight ?? 0) + this.yScrollbarWidth}px`, zIndex: '2' } : {}),
        })}"
        @click="${(e: MouseEvent) => this._handleHeaderClick(col, col.index, e)}"
      >
        ${isSelection ? html`
          <nv-checkbox
            .checked="${isAllSelected}"
            .indeterminate="${isIndeterminate}"
            @nv-change="${(e: CustomEvent) => {
              e.stopPropagation();
              this._handleSelectAll({ target: { checked: e.detail.checked } } as unknown as Event);
            }}"
            @click="${(e: Event) => e.stopPropagation()}"
          ></nv-checkbox>
        ` : isRadio ? html`
          <span class="${classNamesConfig.elements.radioLabel}"></span>
        ` : html`
          <div class="${classNamesConfig.elements.cellContent}">
            ${col.original.renderHeader
              ? col.original.renderHeader(col.original, col.index)
              : col.label}
          </div>
          ${isSortable ? html`
            <span class="${classNamesConfig.elements.sortWrapper}">
              <nv-icon
                name="caret-top"
                size="12px"
                .color="${isAsc ? 'var(--nv-table-sort-active-color, #409eff)' : 'var(--nv-table-sort-icon-color, #c0c4cc)'}"
              ></nv-icon>
              <nv-icon
                name="caret-bottom"
                size="12px"
                .color="${isDesc ? 'var(--nv-table-sort-active-color, #409eff)' : 'var(--nv-table-sort-icon-color, #c0c4cc)'}"
              ></nv-icon>
            </span>
          ` : ''}
          ${hasFilter ? html`
            <nv-popup
              trigger="manual"
              placement="bottom-start"
              strategy="fixed"
              .active="${isFilterOpen}"
              @nv-hide="${() => { this._openFilterProp = ''; }}"
            >
              <span
                slot="anchor"
                class="nv-table-header__filter-icon${isFilterActive ? ' is-active' : ''}"
                @click="${(e: MouseEvent) => {
                  e.stopPropagation();
                  if (isFilterOpen) this._openFilterProp = '';
                  else this._openFilter(col.prop);
                }}"
              >
                ${filterSvg(isFilterActive ? 'var(--nv-table-sort-active-color, #409eff)' : 'var(--nv-table-sort-icon-color, #c0c4cc)')}
              </span>
              <div class="nv-table-header__filter-panel">
                <ul class="nv-table-header__filter-list">
                  ${(col.original.filters ?? []).map((item: { text: string; value: unknown }) => html`
                    <li
                      class="nv-table-header__filter-item${tempSelected.has(item.value) ? ' is-selected' : ''}"
                      @click="${() => this._toggleTempFilter(col.prop, item.value, filterMultiple)}"
                    >
                      ${filterMultiple ? html`
                        <nv-checkbox
                          .checked="${tempSelected.has(item.value)}"
                          style="pointer-events: none;"
                        ></nv-checkbox>
                      ` : ''}
                      <span>${item.text}</span>
                    </li>
                  `)}
                </ul>
                <div class="nv-table-header__filter-footer">
                  <button
                    class="nv-table-header__filter-btn nv-table-header__filter-btn--reset"
                    @click="${() => this._clearFilter(col.prop)}"
                  >重置</button>
                  <button
                    class="nv-table-header__filter-btn nv-table-header__filter-btn--confirm"
                    @click="${() => this._confirmFilter(col.prop)}"
                  >确认</button>
                </div>
              </div>
            </nv-popup>
          ` : ''}
          ${this.resizable && !col.type ? html`
            <div
              class="nv-table-header__resize-handle"
              @mousedown="${(e: MouseEvent) => this._handleResizeStart(col, e)}"
            ></div>
          ` : ''}
        `}
      </div>
    `;
  };

  return html`
    <div class="${classNamesConfig.block}" part="header" style="--nv-table-scrollbar-width: ${this.yScrollbarWidth}px;">
      <div class="${classNamesConfig.elements.row}">
        ${this.columns.map((col) => renderColumn(col))}
      </div>
    </div>
  `;
};

export default template;
