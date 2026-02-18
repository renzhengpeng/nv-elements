/*
 * @Descripttion: upload组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import { repeat as litRepeat } from 'lit/directives/repeat.js';
import classNamesConfig from './classNames';
import { NvUpload } from './index.ts';
import '../icon/index';

interface Context {
  _handleFileSelect: (event: Event) => void;
  _handleRemove: (index: number) => void;
  _handleDragOver: (event: DragEvent) => void;
  _handleDrop: (event: DragEvent) => void;
  _handleDragAreaClick: () => void;
  _fileList: Array<{
    id: number;
    name: string;
    url?: string;
    thumbUrl?: string;
    status: 'ready' | 'uploading' | 'success' | 'fail';
    file?: File;
  }>;
  _removingIndex: number | null;
  _enteringIds: Set<number>;
}

const template = function(this: NvUpload, context: Context) {
  const { _handleFileSelect, _handleRemove, _handleDragOver, _handleDrop, _handleDragAreaClick, _fileList, _removingIndex, _enteringIds } = context;

  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.disabled]: this.disabled,
    [classNamesConfig.modifiers.drag]: this.drag
  });

  return html`
    <div part="base" class=${ classMapResult }>
      ${ this.drag
        ? html`
            <div
              part="drag-area"
              class=${ classNamesConfig.elements.dragArea }
              @dragover=${ _handleDragOver }
              @drop=${ _handleDrop }
              @click=${ _handleDragAreaClick }
            >
              <slot></slot>
              <input
                type="file"
                class="${ classNamesConfig.elements.fileInput }"
                ?multiple=${ this.multiple }
                accept="${ this.accept }"
                ?disabled=${ this.disabled }
                @change=${ _handleFileSelect }
              />
            </div>
          `
        : html`
            <label part="trigger" class=${ classNamesConfig.elements.trigger }>
              <slot></slot>
              <input
                type="file"
                class="${ classNamesConfig.elements.fileInput }"
                ?multiple=${ this.multiple }
                accept="${ this.accept }"
                ?disabled=${ this.disabled }
                @change=${ _handleFileSelect }
              />
            </label>
          ` }
      ${ _fileList.length > 0
        ? html`
            <ul part="list" class=${ classNamesConfig.elements.fileList }>
              ${ litRepeat(_fileList, (item) => item.id, (item, i) => {
                const isImage = item.thumbUrl || (item.url && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(item.name));
                const imageUrl = item.thumbUrl || item.url;

                return html`
                  <li
                    part="item"
                    class="${ classNamesConfig.elements.fileItem }${ _removingIndex === i ? ` ${ classNamesConfig.modifiers.fileItemRemoving }` : '' }${ _enteringIds.has(item.id) ? ` ${ classNamesConfig.modifiers.fileItemEntering }` : '' }"
                  >
                    ${ isImage && imageUrl
                      ? html`
                          <div part="thumb" class=${ classNamesConfig.elements.fileThumb }>
                            <img src=${ imageUrl } alt=${ item.name } />
                            ${ item.status === 'uploading'
                              ? html`<div class=${ classNamesConfig.elements.fileThumbMask }>
                                <span>上传中...</span>
                              </div>`
                              : '' }
                          </div>
                        `
                      : '' }
                    <span
                      part="name"
                      class=${ classMap({
                        [classNamesConfig.elements.fileName]: true,
                        [classNamesConfig.modifiers.fileNameSuccess]: item.status === 'success',
                        [classNamesConfig.modifiers.fileNameFail]: item.status === 'fail'
                      }) }
                    >${ item.name }</span>
                    <span part="status" class=${ classNamesConfig.elements.fileStatus }>
                      ${ item.status === 'uploading'
                        ? html`<span>上传中...</span>`
                        : item.status === 'success'
                          ? html`<nv-icon name="check" style="color: #67C23A;"></nv-icon>`
                          : '' }
                    </span>
                    <button
                      part="remove"
                      class=${ classNamesConfig.elements.fileRemove }
                      @click=${ () => _handleRemove(i) }
                    >
                      <nv-icon name="close"></nv-icon>
                    </button>
                  </li>
                `;
              }) }
            </ul>
          `
        : '' }
      <slot name="tip"></slot>
    </div>
  `;
};

export default template;
