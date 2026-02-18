/*
 * @Descripttion: upload组件的所有css class配置
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
const BLOCK = 'nv-upload';

const classNames = {
  block: BLOCK,
  elements: {
    trigger: `${ BLOCK }__trigger`,
    fileInput: `${ BLOCK }__file-input`,
    dragArea: `${ BLOCK }__drag-area`,
    fileList: `${ BLOCK }__file-list`,
    fileItem: `${ BLOCK }__file-item`,
    fileThumb: `${ BLOCK }__file-thumb`,
    fileThumbMask: `${ BLOCK }__file-thumb-mask`,
    fileName: `${ BLOCK }__file-name`,
    fileStatus: `${ BLOCK }__file-status`,
    fileRemove: `${ BLOCK }__file-remove`
  },
  modifiers: {
    disabled: 'is-disabled',
    drag: 'is-drag',
    fileNameSuccess: `${ BLOCK }__file-name--success`,
    fileNameFail: `${ BLOCK }__file-name--fail`,
    fileItemRemoving: `${ BLOCK }__file-item--removing`,
    fileItemEntering: `${ BLOCK }__file-item--entering`
  }
};

export default classNames;

