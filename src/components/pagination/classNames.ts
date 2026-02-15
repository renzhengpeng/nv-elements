/*
 * @Descripttion: pagination组件的所有css class配置
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
const BLOCK = 'nv-pagination';

const classNames = {
  block: BLOCK,
  elements: {
    sizes: `${ BLOCK }__sizes`,
    btnPrev: `${ BLOCK }__btn-prev`,
    btnNext: `${ BLOCK }__btn-next`,
    pager: `${ BLOCK }__pager`,
    number: `${ BLOCK }__number`,
    more: `${ BLOCK }__more`,
    jumper: `${ BLOCK }__jumper`,
    jumperInput: `${ BLOCK }__jumper-input`,
    jumperText: `${ BLOCK }__jumper-text`
  },
  modifiers: {
    disabled: 'disabled',
    background: 'background'
  }
};

export default classNames;

