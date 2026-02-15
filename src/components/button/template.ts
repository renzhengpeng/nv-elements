/*
 * @Descripttion: button组件html模板
 * @creater: zhengpeng.ren
 * @since: 2024-05-29 15:05:04
 * @LastAuthor: zhengpeng.ren
 * @lastTime: 2024-08-23 16:23:37
 */
import { html, classMap } from '../../based-on';
import classNamesConfig from './classNames';
import { NvButton } from './index.ts';
import '../icon/index';

interface Context {
  _handleClick: () => void;
}

const template = function(this: NvButton, context: Context) {
  const { _handleClick } = context;
  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.default]: this.type === 'default',
    [classNamesConfig.modifiers.primary]: this.type === 'primary',
    [classNamesConfig.modifiers.disabled]: this.disabled || this.loading,
    [classNamesConfig.modifiers.success]: this.type === 'success',
    [classNamesConfig.modifiers.info]: this.type === 'info',
    [classNamesConfig.modifiers.warning]: this.type === 'warning',
    [classNamesConfig.modifiers.danger]: this.type === 'danger',
    [classNamesConfig.modifiers.text]: this.text,
    [classNamesConfig.modifiers.link]: this.link,
    [classNamesConfig.modifiers.plain]: this.plain,
    [classNamesConfig.modifiers.round]: this.round,
    [classNamesConfig.modifiers.circle]: this.circle,
    [classNamesConfig.modifiers.loading]: this.loading,
    [classNamesConfig.modifiers.active]: this.active,
    [this.size]: true
  });

  return html`
    <button
      part="base button"
      class=${ classMapResult }
      @click=${ _handleClick }
    >
      ${
        this.loading
          ? html`<nv-icon name="loading"></nv-icon>`
          : null
      }
      ${
        this.icon
          ? html`<nv-icon name=${ this.icon }></nv-icon>`
          : null
      }
      ${
        // 仅有图标（或 loading）没有其他内容时，不渲染 slot wrapper，让图标居中
        this._hasDefaultSlotContent
          ? html`
            <span class="nv-button-slot-wrapper">
              <slot></slot>
            </span>
          `
          : null
      }
    </button>
  `;
};
export default template;
