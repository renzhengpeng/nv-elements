const BLOCK = 'nv-table';

const classNames = {
  block: BLOCK,
  elements: {
    wrapper: `${BLOCK}__wrapper`,
    headerWrapper: `${BLOCK}__header-wrapper`,
    headerInner: `${BLOCK}__header-inner`,
    headerGutter: `${BLOCK}__header-gutter`,
    bodyWrapper: `${BLOCK}__body-wrapper`,
    empty: `${BLOCK}__empty`,
  },
  modifiers: {
    stripe: 'is-stripe',
    border: 'is-border',
  }
};

export default classNames;
