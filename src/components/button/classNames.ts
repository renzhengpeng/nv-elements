/*
 * @Descripttion: button组件的所有css class配置
 * @creater: zhengpeng.ren
 * @since: 2024-05-29 17:49:38
 * @LastAuthor: zhengpeng.ren
 * @lastTime: 2024-08-23 16:23:54
 */
const BLOCK = 'nv-button';

 const classNames = {
  block: BLOCK,
  elements: {
    title: `${ BLOCK }__title`
  },
  modifiers: {
    default: `${ BLOCK }--default`,
    primary: `${ BLOCK }--primary`,
    disabled: 'is-disabled',
    success: `${ BLOCK }--success`,
    info: `${ BLOCK }--info`,
    warning: `${ BLOCK }--warning`,
    danger: `${ BLOCK }--danger`,
    text: `${ BLOCK }--text`,
    link: `${ BLOCK }--link`,
    plain: 'is-plain',
    round: 'is-round',
    circle: 'is-circle',
    loading: 'is-loading',
    active: 'is-active'
  }
};

export default classNames;
