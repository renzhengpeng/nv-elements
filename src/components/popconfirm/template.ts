/*
 * @Descripttion: popconfirm组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html } from '../../based-on';
import classNamesConfig from './classNames';
import { NvPopconfirm } from './index.ts';

interface Context {
  _handleConfirm: (event: Event) => void;
  _handleCancel: (event: Event) => void;
}

const template = function(this: NvPopconfirm, context: Context) {
  const { _handleConfirm, _handleCancel } = context;

  return html`
    <nv-popup
      part="base"
      .placement=${ this.placement }
      .arrow=${ this.arrow }
      .trigger=${ this.trigger }
      .distance=${ this.distance }
      .disabled=${ this.disabled }
    >
      <div part="trigger" slot="anchor">
        <slot></slot>
      </div>

      <div part="body" class=${ classNamesConfig.block }>
        <div part="label" class=${ classNamesConfig.elements.label }>
          <slot name="label">${ this.label }</slot>
        </div>
        <div part="actions" class=${ classNamesConfig.elements.actions }>
          <nv-button
            .type=${ this.cancelButtonType }
            ?text=${ this.cancelTextButton }
            .size=${ this.cancelButtonSize }
            @click=${ _handleCancel }
          >
            ${ this.cancelButtonText }
          </nv-button>
          <nv-button
            .type=${ this.confirmButtonType }
            ?text=${ this.confirmTextButton }
            .size=${ this.confirmButtonSize }
            @click=${ _handleConfirm }
          >
            ${ this.confirmButtonText }
          </nv-button>
        </div>
      </div>
    </nv-popup>
  `;
};

export default template;
