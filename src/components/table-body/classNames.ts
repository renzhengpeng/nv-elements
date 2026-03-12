const BLOCK = 'nv-table-body';

const classNames = {
  block: BLOCK,
  elements: {
    row: `${BLOCK}__row`,
    cell: `${BLOCK}__cell`,
    cellContent: `${BLOCK}__cell-content`,
    checkbox: `${BLOCK}__checkbox`,
    radio: `${BLOCK}__radio`,
  },
  modifiers: {
    stripe: 'is-stripe',
    current: 'is-current',
    hover: 'is-hover',
    border: 'is-border',
    fixedLeft: 'is-fixed-left',
    fixedRight: 'is-fixed-right',
    lastFixedLeft: 'is-last-fixed-left',
    firstFixedRight: 'is-first-fixed-right',
  }
};

export default classNames;
