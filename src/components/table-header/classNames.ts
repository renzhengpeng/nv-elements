const BLOCK = 'nv-table-header';

const classNames = {
  block: BLOCK,
  elements: {
    row: `${BLOCK}__row`,
    cell: `${BLOCK}__cell`,
    cellContent: `${BLOCK}__cell-content`,
    sortWrapper: `${BLOCK}__sort-wrapper`,
    checkbox: `${BLOCK}__checkbox`,
    radioLabel: `${BLOCK}__radio-label`,
  },
  modifiers: {
    border: 'is-border',
    sortable: 'is-sortable',
    fixedLeft: 'is-fixed-left',
    fixedRight: 'is-fixed-right',
    lastFixedLeft: 'is-last-fixed-left',
    firstFixedRight: 'is-first-fixed-right',
  }
};

export default classNames;
