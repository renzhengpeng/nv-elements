/*
 * @Descripttion: pagination组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import { repeat as litRepeat } from 'lit/directives/repeat.js';
import classNamesConfig from './classNames';
import { NvPagination } from './index.ts';
import '../icon/index';
import '../button/index';
import '../select/index';
import '../option/index';
import '../input/index';

const template = function(this: NvPagination) {
  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.disabled]: this.disabled,
    [classNamesConfig.modifiers.background]: this.background
  });

  const pages = this._getPages();
  const prevDisabled = this.currentPage <= 1;
  const nextDisabled = this.currentPage >= this.totalPages;
  const showPageSizes = this.pageSizes && this.pageSizes.length > 0;

  return html`
    <div part="base" class=${ classMapResult }>
      ${
        showPageSizes
          ? html`
            <nv-select
              part="sizes"
              class="${ classNamesConfig.elements.sizes }"
              .value=${ String(this.pageSize) }
              .size=${ this.size }
              .disabled=${ this.disabled }
              @nv-change=${ this._handlePageSizeChange }
            >
              ${ litRepeat(this.pageSizes, (size) => size, (size) => html`
                <nv-option value="${ size }" label="${ size } 条/页"></nv-option>
              `) }
            </nv-select>
          `
          : ''
      }
      <nv-button
        part="prev"
        class="${ classNamesConfig.elements.btnPrev }"
        .size=${ this.size }
        .disabled=${ prevDisabled || this.disabled }
        ?link=${ this.type === 'link' }
        @click=${ this._handlePrev }
      >
        <nv-icon name="arrow-left"></nv-icon>
      </nv-button>
      <div part="pager" class=${ classNamesConfig.elements.pager }>
        ${ litRepeat(pages, (page) => page, (page) => {
          if (page === -1) {
            // 省略号不是按钮，使用 span 元素，尺寸跟随 size 属性
            return html`
              <span part="more" class="${ classNamesConfig.elements.more } ${ this.size }">
                <nv-icon name="more"></nv-icon>
              </span>
            `;
          }
          const isActive = page === this.currentPage;
          return html`
            <nv-button
              part="number"
              class=${ classNamesConfig.elements.number }
              .size=${ this.size }
              .disabled=${ this.disabled }
              ?active=${ isActive }
              ?link=${ this.type === 'link' }
              @click=${ () => this._handlePageClick(page) }
            >
              ${ page }
            </nv-button>
          `;
        }) }
      </div>
      <nv-button
        part="next"
        class="${ classNamesConfig.elements.btnNext }"
        .size=${ this.size }
        .disabled=${ nextDisabled || this.disabled }
        ?link=${ this.type === 'link' }
        @click=${ this._handleNext }
      >
        <nv-icon name="arrow-right"></nv-icon>
      </nv-button>
      ${
        this.showJumper
          ? html`
            <div part="jumper" class=${ classNamesConfig.elements.jumper }>
              <span class="${ classNamesConfig.elements.jumperText }">跳至</span>
              <nv-input
                part="jumper-input"
                class="${ classNamesConfig.elements.jumperInput }"
                type="number"
                .size=${ this.size }
                min=${ 1 }
                max=${ this.totalPages }
                .value=${ this.jumperValue }
                .disabled=${ this.disabled }
                @nv-input=${ this._handleJumperInput }
                @keydown=${ this._handleJumperKeydown }
              ></nv-input>
              <span class="${ classNamesConfig.elements.jumperText }">页</span>
            </div>
          `
          : ''
      }
    </div>
  `;
};

export default template;
