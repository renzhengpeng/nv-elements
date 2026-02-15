/*
 * @Descripttion: menu-item组件的所有css class配置
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
const BLOCK = 'nv-menu-item';

const classNames = {
  block: BLOCK,
  elements: {
    content: `${ BLOCK }__content`,
    icon: `${ BLOCK }__icon`,
    label: `${ BLOCK }__label`
  },
  modifiers: {
    active: 'is-active',
    disabled: 'is-disabled'
  }
};

export default classNames;
