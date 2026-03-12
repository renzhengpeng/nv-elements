/*
 * @Descripttion: slider组件html模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import classNamesConfig from './classNames';
import { NvSlider } from './index.ts';
import '../input/index.ts';

interface Context {
  _handleMouseDown: (event: MouseEvent) => void;
  _handleButtonMouseDown: (event: MouseEvent) => void;
  _handleInput: (event: Event) => void;
}

const template = function(this: NvSlider, context: Context) {
  const { _handleMouseDown, _handleButtonMouseDown, _handleInput } = context;

  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.disabled]: this.disabled,
    [classNamesConfig.modifiers.vertical]: this.vertical,
    [classNamesConfig.modifiers['show-input']]: this.showInput,
    [classNamesConfig.modifiers['show-stops']]: this.showStops,
    [classNamesConfig.modifiers['show-tooltip']]: this.showTooltip,
    [classNamesConfig.modifiers.mini]: this.size === 'mini',
    [classNamesConfig.modifiers.small]: this.size === 'small',
    [classNamesConfig.modifiers.medium]: this.size === 'medium',
    [classNamesConfig.modifiers.large]: this.size === 'large',
    [classNamesConfig.modifiers.huge]: this.size === 'huge'
  });

  const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
  const barStyle = this.vertical
    ? `height: ${ percentage }%; bottom: 0;`
    : `width: ${ percentage }%; left: 0;`;

  const buttonStyle = this.vertical
    ? `bottom: ${ percentage }%;`
    : `left: ${ percentage }%;`;

  return html`
    <div part="base" class=${ classMapResult }>
      <div
        part="runway"
        class=${ classNamesConfig.elements.runway }
        @mousedown=${ _handleMouseDown }
      >
        <div part="bar" class=${ classNamesConfig.elements.bar } style="${ barStyle }"></div>
        <div
          part="handle-wrapper"
          class=${ classNamesConfig.elements.buttonWrapper }
          style="${ buttonStyle }"
          @mousedown=${ _handleButtonMouseDown }
        >
          <div part="handle" class=${ classNamesConfig.elements.button }></div>
        </div>
        ${ this.showStops
          ? this.stops.map((stop) => {
              const stopPercentage =
                ((stop - this.min) / (this.max - this.min)) * 100;
              const stopStyle = this.vertical
                ? `bottom: ${ stopPercentage }%;`
                : `left: ${ stopPercentage }%;`;
              return html`
                <div
                  part="stop"
                  class=${ classNamesConfig.elements.stop }
                  style="${ stopStyle }"
                ></div>
              `;
            })
          : null }
      </div>
      ${ this.showInput
        ? html`
            <div part="input" class=${ classNamesConfig.elements.input }>
              <nv-input
                type="number"
                .value=${ this.value.toString() }
                .min=${ this.min }
                .max=${ this.max }
                @nv-input=${ _handleInput }
              ></nv-input>
            </div>
          `
        : null }
    </div>
  `;
};

export default template;
