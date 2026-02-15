/*
 * @Descripttion: menu-item组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import classNamesConfig from './classNames';
import { NvMenuItem } from './index.ts';

interface Context {
  _handleClick: () => void;
}

const template = function(this: NvMenuItem, context: Context) {
  const { _handleClick } = context;

  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.active]: this.isActive,
    [classNamesConfig.modifiers.disabled]: this.disabled
  });

  // 判断 icon 是否为 SVG 字符串
  const isSvgIcon = this.icon && this.icon.trim().startsWith('<svg');

  const menuItemContent = html`
    <li part="base" class=${ classMapResult } role="menuitem" @click=${ _handleClick }>
      <span part="content" class="${ classNamesConfig.elements.content }">
        ${
          this.icon || this.querySelector('[slot="icon"]')
            ? html`
          <span part="icon" class="${ classNamesConfig.elements.icon }">
            <slot name="icon">
              ${
                isSvgIcon 
                  ? html`<span .innerHTML=${ this.icon }></span>`
                  : this.icon 
                    ? html`<i class="${ this.icon }"></i>`
                    : ''
              }
            </slot>
          </span>
        `
            : ''
        }
        <span part="label" class="${ classNamesConfig.elements.label }">
          <slot></slot>
        </span>
      </span>
    </li>
  `;

  // 折叠模式下用tooltip包裹
  if (this.collapsed && (this as any)._textContent) {
    return html`
      <nv-tooltip content=${ (this as any)._textContent } placement="right">
        ${ menuItemContent }
      </nv-tooltip>
    `;
  }

  return menuItemContent;
};

export default template;
