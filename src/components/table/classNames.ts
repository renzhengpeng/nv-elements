/*
 * @Descripttion: table 组件的所有 css class 配置
 * @creater: zhengpeng.ren
 * @since: 2025-02-18
 */
const BLOCK = 'nv-table';

const classNames = {
  block: BLOCK,
  elements: {
    wrapper: `${BLOCK}__wrapper`,
    headerWrapper: `${BLOCK}__header-wrapper`,
    bodyWrapper: `${BLOCK}__body-wrapper`,
    bodyWrapperVirtual: `${BLOCK}__body-wrapper--virtual`,
    header: `${BLOCK}__header`,
    body: `${BLOCK}__body`,
    bodyInner: `${BLOCK}__body-inner`,
    bodyVirtual: `${BLOCK}__body--virtual`,
    row: `${BLOCK}__row`,
    cell: `${BLOCK}__cell`,
    headerCell: `${BLOCK}__header-cell`,
    sortable: `${BLOCK}__sortable`,
    sortIcon: `${BLOCK}__sort-icon`,
    empty: `${BLOCK}__empty`,
    emptyText: `${BLOCK}__empty-text`
  },
  modifiers: {
    stripe: 'is-stripe',
    border: 'is-border',
    highlightCurrentRow: 'is-current-row',
    alignLeft: 'is-left',
    alignCenter: 'is-center',
    alignRight: 'is-right',
    sortAsc: 'is-asc',
    sortDesc: 'is-desc',
    mini: 'is-mini',
    small: 'is-small',
    medium: 'is-medium',
    large: 'is-large',
    huge: 'is-huge'
  }
};

export default classNames;
