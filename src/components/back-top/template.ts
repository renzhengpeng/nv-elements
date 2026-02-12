/*
 * @Descripttion: back-top组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import classNamesConfig from './classNames';
import { NvBackTop } from './index.ts';

interface Context {
  _handleClick: () => void;
  _visible: boolean;
}

const template = function(this: NvBackTop, context: Context) {
  const { _handleClick, _visible } = context;

  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.visible]: _visible
  });

  const style = `right: ${ this.right }; bottom: ${ this.bottom };`;

  if (!_visible) {
    return html``;
  }

  const buttonStyle = '--nv-button-length-of-side-medium: var(--nv-back-top-width, 40px);';

  return html`
    <div part="base" class=${ classMapResult } style="${ style }" @click=${ _handleClick }>
      <slot>
        <nv-button
          part="button"
          circle
          size="medium"
          style="${ buttonStyle }"
          icon=${ this.icon }
        >
        </nv-button>
      </slot>
    </div>
  `;
};

export default template;
