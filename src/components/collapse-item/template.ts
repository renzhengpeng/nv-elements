/*
 * @Descripttion: collapse-item组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import classNamesConfig from './classNames';
import { NvCollapseItem } from './index.ts';
import '../icon/index';

interface Context {
  _handleClick: () => void;
}

const template = function(this: NvCollapseItem, context: Context) {
  const { _handleClick } = context;

  const hasLabelSlot = this._hasLabelSlot;
  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.active]: this.isActive,
    [classNamesConfig.modifiers.disabled]: this.disabled,
    [classNamesConfig.modifiers.loading]: this.loading
  });

  return html`
    <div part="base" class=${ classMapResult }>
      <div part="header" class=${ classNamesConfig.elements.header } @click=${ _handleClick }>
        <span part="label" class=${ classNamesConfig.elements.label }>
          ${ hasLabelSlot
            ? html`<slot name="label"></slot>`
            : html`${ this.label }` }
        </span>
        <span part="icons" class=${ classNamesConfig.elements.icons }>
          ${ this.loading
            ? html`<nv-icon part="loading" name="loading" class=${ classNamesConfig.elements.loading }></nv-icon>`
            : null }
          <nv-icon
            part="icon"
            name="arrow-right"
            class=${ classNamesConfig.elements.icon }
          ></nv-icon>
        </span>
      </div>
      <div part="wrapper" class=${ classNamesConfig.elements.wrapper }>
        <div part="content" class=${ classNamesConfig.elements.content }>
          ${ this.loadedContent
            ? this.contentIsError
              ? html`<div part="content-error" class="${ classNamesConfig.elements.contentError }">${ unsafeHTML(this.loadedContent) }</div>`
              : unsafeHTML(this.loadedContent)
            : html`<slot></slot>`
          }
        </div>
      </div>
    </div>
  `;
};

export default template;
