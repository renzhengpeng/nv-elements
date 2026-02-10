/*
 * @Descripttion: tabs组件的所有css class配置
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import getRootCssVariable from '../../tools/getRootCssVariable.ts';

const BLOCK = getRootCssVariable('--nv-elements-namespace-tabs-block');
// const BLOCK_CONNECTOR = getRootCssVariable('--nv-elements-block-connector');
const ELEMENT_CONNECTOR = getRootCssVariable('--nv-elements-element-connector');
// const MODIFIER_CONNECTOR = getRootCssVariable('--nv-elements-modifier-connector');
const COMMON_PREFIX = '--nv-elements-namespace-tabs-';

const header = getRootCssVariable(`${ COMMON_PREFIX }element-header`);
const navWrap = getRootCssVariable(`${ COMMON_PREFIX }element-nav-wrap`);
const navScroll = getRootCssVariable(`${ COMMON_PREFIX }element-nav-scroll`);
const nav = getRootCssVariable(`${ COMMON_PREFIX }element-nav`);
const item = getRootCssVariable(`${ COMMON_PREFIX }element-item`);
const itemLabel = getRootCssVariable(`${ COMMON_PREFIX }element-item-label`);
const itemClose = getRootCssVariable(`${ COMMON_PREFIX }element-item-close`);
const itemEditInput = getRootCssVariable(`${ COMMON_PREFIX }element-item-edit-input`);
const itemAdd = getRootCssVariable(`${ COMMON_PREFIX }element-item-add`);
const content = getRootCssVariable(`${ COMMON_PREFIX }element-content`);

const classNames = {
  block: BLOCK,
  modifiers: {
    card: 'is-card',
    'border-card': 'is-border-card',
    top: 'is-top',
    bottom: 'is-bottom',
    left: 'is-left',
    right: 'is-right'
  },
  elements: {
    [header]: `${ BLOCK }${ ELEMENT_CONNECTOR }${ header }`,
    [navWrap]: `${ BLOCK }${ ELEMENT_CONNECTOR }${ navWrap }`,
    [navScroll]: `${ BLOCK }${ navScroll }`,
    [nav]: `${ BLOCK }${ ELEMENT_CONNECTOR }${ nav }`,
    [item]: `${ BLOCK }${ ELEMENT_CONNECTOR }${ item }`,
    [itemLabel]: `${ BLOCK }${ ELEMENT_CONNECTOR }${ itemLabel }`,
    [itemClose]: `${ BLOCK }${ ELEMENT_CONNECTOR }${ itemClose }`,
    [itemEditInput]: `${ BLOCK }${ ELEMENT_CONNECTOR }${ itemEditInput }`,
    [itemAdd]: `${ BLOCK }${ ELEMENT_CONNECTOR }${ itemAdd }`,
    [content]: `${ BLOCK }${ ELEMENT_CONNECTOR }${ content }`
  }
};

export default classNames;
