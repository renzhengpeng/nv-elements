/*
 * @Descripttion: radio组件html模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import classNamesConfig from './classNames';
import { NvRadio } from './index.ts';

interface Context {
  _handleChange: (event: Event) => void;
  _handleFocus: (event: Event) => void;
  _handleBlur: (event: Event) => void;
}

const template = function(this: NvRadio, context: Context) {
  const { _handleChange, _handleFocus, _handleBlur } = context;

  // 获取按钮位置类（从 host 元素获取）
  const buttonFirstClass = this.classList.contains('is-button-first') ? classNamesConfig.modifiers['button-first'] : '';
  const buttonMiddleClass = this.classList.contains('is-button-middle') ? classNamesConfig.modifiers['button-middle'] : '';
  const buttonLastClass = this.classList.contains('is-button-last') ? classNamesConfig.modifiers['button-last'] : '';

  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.checked]: this.checked,
    [classNamesConfig.modifiers.disabled]: this.disabled,
    [classNamesConfig.modifiers.border]: this.border,
    [classNamesConfig.modifiers.button]: this.type === 'button',
    [classNamesConfig.modifiers['button-first']]: !!buttonFirstClass,
    [classNamesConfig.modifiers['button-middle']]: !!buttonMiddleClass,
    [classNamesConfig.modifiers['button-last']]: !!buttonLastClass,
    [this.size]: true
  });

  // button 类型时不显示 input 图标
  const showInput = this.type === 'radio';

  return html`
    <label part="base" class=${ classMapResult }>
      <input
        type="radio"
        class="${ classNamesConfig.block }__original"
        name=${ this.name }
        value=${ this.value }
        ?checked=${ this.checked }
        ?disabled=${ this.disabled }
        @change=${ _handleChange }
        @focus=${ _handleFocus }
        @blur=${ _handleBlur }
      />
      ${ showInput
        ? html`<span part="input" class="${ classNamesConfig.block }__input"></span>`
        : null
      }
      ${ this.label != null && this.label !== ''
        ? html`<span part="label" class="${ classNamesConfig.block }__label">
            <slot></slot>
            ${ this.label }
          </span>`
        : html`<slot></slot>`
      }
    </label>
  `;
};

export default template;
