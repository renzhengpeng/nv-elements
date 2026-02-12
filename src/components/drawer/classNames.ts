/*
 * @Descripttion: drawer组件的所有css class配置
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
const BLOCK = 'nv-drawer';

const classNames = {
  block: BLOCK,
  elements: {
    wrapper: `${ BLOCK }__wrapper`,
    drawer: `${ BLOCK }__drawer`,
    header: `${ BLOCK }__header`,
    headerContent: `${ BLOCK }__header-content`,
    close: `${ BLOCK }__close`,
    body: `${ BLOCK }__body`,
    footer: `${ BLOCK }__footer`
  },
  modifiers: {
    mask: 'is-modal'
  }
};

export default classNames;

