/*
 * @Descripttion: collapse-item组件的所有css class配置
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
const BLOCK = 'nv-collapse-item';

const classNames = {
  block: BLOCK,
  elements: {
    header: `${ BLOCK }__header`,
    label: `${ BLOCK }__label`,
    icons: `${ BLOCK }__icons`,
    icon: `${ BLOCK }__icon`,
    loading: `${ BLOCK }__loading`,
    wrapper: `${ BLOCK }__wrapper`,
    content: `${ BLOCK }__content`,
    contentError: `${ BLOCK }__content-error`
  },
  modifiers: {
    active: 'is-active',
    disabled: 'is-disabled',
    loading: 'is-loading'
  }
};

export default classNames;

