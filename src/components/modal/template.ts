/*
 * @Descripttion: modal组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import { NvModal } from './index.ts';
import classNamesConfig from './classNames';
import '../icon/index';

interface Context {
  _handleClose: () => void;
  _handleModalClick: (event: Event) => void;
  _handleTransitionEnd: (event: TransitionEvent) => void;
  _hasHeaderSlot: () => boolean;
  _hasFooterSlot: () => boolean;
}

const template = function(this: NvModal, context: Context) {
  const { _handleClose, _handleModalClick, _handleTransitionEnd, _hasHeaderSlot } = context;

  const hasHeaderSlot = _hasHeaderSlot();

  return html`
    <div part="base mask" class="${ classMap({
      [classNamesConfig.elements.wrapper]: true,
      'is-center': this.center
    }) }"
         @click=${ _handleModalClick }>
      <div part="panel" class="${ classMap({
        [classNamesConfig.elements.dialog]: true,
        [this.customClass]: !!this.customClass
      }) }"
           @transitionend=${ _handleTransitionEnd }
           style="width: ${ this.width };">
        ${ hasHeaderSlot
          ? html`
              <div part="header" class=${ classNamesConfig.elements.header }>
                <slot name="header"></slot>
              </div>
            `
          : (this.label || this.showClose)
            ? html`
                <div part="header" class=${ classNamesConfig.elements.header }>
                  <div class=${ classNamesConfig.elements.headerContent }>
                    ${ this.label }
                  </div>
                  ${ this.showClose
                    ? html`
                        <button part="close" class=${ classNamesConfig.elements.close }
                                @click=${ _handleClose }>
                          <nv-icon name="close"></nv-icon>
                        </button>
                      `
                    : '' }
                </div>
              `
            : '' }

        <div part="body" class=${ classNamesConfig.elements.body }>
          <slot></slot>
        </div>

        <div part="footer" class=${ classNamesConfig.elements.footer }>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  `;
};

export default template;
