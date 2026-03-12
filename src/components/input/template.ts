/*
 * @Descripttion: input组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 * @LastAuthor: zhengpeng.ren
 * @lastTime: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import classNamesConfig from './classNames';
import { NvInput } from './index.ts';

const template = function(this: NvInput, context: any) {
  const {
    _handleInput,
    _handleFocus,
    _handleBlur,
    _handleClear,
    _handlePasswordToggle,
    _handleChange
  } = context;

  const wrapperClassMap = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.disabled]: this.disabled,
    [classNamesConfig.modifiers.focus]: this.isFocused || false,
    [classNamesConfig.modifiers.clearable]: this.clearable,
    [classNamesConfig.modifiers.showPassword]: this.type === 'password' && this.showPasswordToggle,
    [classNamesConfig.modifiers.prefix]: !!this.prefixIcon,
    [classNamesConfig.modifiers.suffix]: !!this.suffixIcon || (this.clearable && this.value) || (this.type === 'password' && this.showPasswordToggle),
    [classNamesConfig.modifiers.readonly]: this.readonly,
    [this.size]: true,
    'has-prepend-button': this.prependIsButton,
    'has-append-button': this.appendIsButton,
    'word-limit-inside': this.showWordLimit && this.wordLimitPosition === 'inside'
  });

  const inputType = this.type === 'password' && this._passwordVisible
    ? 'text'
    : this.type;
  const showClearIcon = this.clearable && this.value && !this.disabled;
  const showPasswordIcon = this.type === 'password' && this.showPasswordToggle && !this.disabled;

  return html`
    <div part="base" class=${ wrapperClassMap }>
      ${ this.hasPrepend
        ? this.prependIsButton
          ? html`<slot name="prepend" @slotchange=${ this._handlePrependSlotChange }></slot>`
          : html`
            <div part="prepend" class=${ classNamesConfig.elements.prepend }>
              <slot name="prepend" @slotchange=${ this._handlePrependSlotChange }></slot>
            </div>
          `
        : html`<slot name="prepend" @slotchange=${ this._handlePrependSlotChange } style="display:none"></slot>` }
      <div part="wrapper" class=${ classNamesConfig.elements.wrapper }>
        ${ this.prefixIcon
          ? html`
            <span part="prefix" class=${ classNamesConfig.elements.prefix }>
              <nv-icon name=${ this.prefixIcon } class=${ classNamesConfig.elements.icon }></nv-icon>
            </span>
          `
          : '' }
        ${ this.type === 'textarea'
          ? html`
            <textarea
              part="input"
              class=${ classNamesConfig.elements.inner }
              .value=${ this.value }
              placeholder=${ this.placeholder }
              ?disabled=${ this.disabled }
              ?readonly=${ this.readonly }
              ?autofocus=${ this.autofocus }
              name=${ this.name }
              tabindex=${ this.tabindex || '' }
              maxlength=${ this.maxlength || '' }
              rows=${ this.rows }
              @input=${ _handleInput }
              @focus=${ _handleFocus }
              @blur=${ _handleBlur }
              @change=${ _handleChange }
            ></textarea>
          `
          : html`
            <input
              part="input"
              class=${ classNamesConfig.elements.inner }
              type=${ inputType }
              .value=${ this.value }
              placeholder=${ this.placeholder }
              ?disabled=${ this.disabled }
              ?readonly=${ this.readonly }
              ?autofocus=${ this.autofocus }
              name=${ this.name }
              autocomplete=${ this.autocomplete }
              tabindex=${ this.tabindex || '' }
              maxlength=${ this.maxlength || '' }
              max=${ this.type === 'number' && this.max !== undefined ? this.max : '' }
              min=${ this.type === 'number' && this.min !== undefined ? this.min : '' }
              @input=${ _handleInput }
              @focus=${ _handleFocus }
              @blur=${ _handleBlur }
              @change=${ _handleChange }
            />
          ` }
        ${ this.suffixIcon
          ? html`
            <span part="suffix" class=${ classNamesConfig.elements.suffix }>
              <nv-icon name=${ this.suffixIcon } class=${ classNamesConfig.elements.icon }></nv-icon>
            </span>
          `
          : '' }
        ${ showClearIcon
          ? html`
            <span part="clear" class=${ classNamesConfig.elements.clearIcon } @click=${ _handleClear }>
              <nv-icon name="close" class=${ classNamesConfig.elements.icon }></nv-icon>
            </span>
          `
          : '' }
        ${ showPasswordIcon
          ? html`
            <span part="password" class=${ classNamesConfig.elements.passwordIcon } @click=${ _handlePasswordToggle }>
              ${ this._passwordVisible
                ? html`<nv-icon name="view" class=${ classNamesConfig.elements.icon }></nv-icon>`
                : html`
                  <svg class=${ classNamesConfig.elements.icon } viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                    <path d="m641.28 278.613-42.026 42.027c-26.667-10.454-55.894-16.64-87.254-16.64-129.28 0-244.693 75.306-296.746 193.386a343.467 343.467 0 0 0 71.04 100.907L235.093 649.6C185.387 598.613 150.827 529.707 128 497.387 186.24 374.827 334.72 240 512 240c46.72 0 91.52 13.653 129.28 38.613zm78.613 78.507c57.174 46.293 98.454 109.547 125.44 140.267-54.72 113.813-199.146 230.613-333.333 230.613-39.787 0-77.867-10.347-111.467-28.054l48.96-48.96a254.827 254.827 0 0 0 62.507 13.014c129.28 0 244.693-75.307 296.746-193.494a342.187 342.187 0 0 0-42.666-66.24l53.866-53.866v.053s-.053.64-.053.64zm-147.626 44.907a127.573 127.573 0 0 1 35.52 86.826c0 70.614-57.387 128-128 128a127.573 127.573 0 0 1-86.827-35.52l179.307-179.306v.053zm-39.147-39.04L351.04 544.853a127.947 127.947 0 0 1 32.533-91.626 128 128 0 0 1 149.547-90.187zM854.613 898.347 125.653 169.387l45.227-45.227 728.96 728.96-45.227 45.227z"/>
                  </svg>
                ` }
            </span>
          `
          : '' }
        ${ this.showWordLimit && this.maxlength && this.wordLimitPosition === 'inside'
          ? html`
            <div part="count-inside" class="${ classNamesConfig.elements.count } ${ classNamesConfig.elements.count }--inside">
              ${ this.value.length } / ${ this.maxlength }
            </div>
          `
          : '' }
      </div>
      ${ this.hasAppend
        ? this.appendIsButton
          ? html`<slot name="append" @slotchange=${ this._handleAppendSlotChange }></slot>`
          : html`
            <div part="append" class=${ classNamesConfig.elements.append }>
              <slot name="append" @slotchange=${ this._handleAppendSlotChange }></slot>
            </div>
          `
        : html`<slot name="append" @slotchange=${ this._handleAppendSlotChange } style="display:none"></slot>` }
      ${ this.showWordLimit && this.maxlength && this.wordLimitPosition === 'outside'
        ? html`
          <div part="count" class=${ classNamesConfig.elements.count }>
            ${ this.value.length } / ${ this.maxlength }
          </div>
        `
        : '' }
    </div>
  `;
};

export default template;
