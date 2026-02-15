/*
 * @Descripttion: submenu组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import classNamesConfig from './classNames';
import { NvSubmenu } from './index.ts';

interface Context {
  _handleTitleClick: (event: Event) => void;
  _handleMouseEnter: () => void;
  _handleMouseLeave: () => void;
  _handleListMouseEnter: () => void;
  _handleListMouseLeave: () => void;
}

const template = function(this: NvSubmenu, context: Context) {
  const { _handleTitleClick, _handleMouseEnter, _handleMouseLeave, _handleListMouseEnter, _handleListMouseLeave } = context;

  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.opened]: this.opened,
    [classNamesConfig.modifiers.disabled]: this.disabled
  });

  // 判断 icon 是否为 SVG 字符串
  const isSvgIcon = this.icon && this.icon.trim().startsWith('<svg');

  return html`
    <li
      part="base"
      class=${classMapResult}
      role="menuitem"
      @mouseenter=${_handleMouseEnter}
      @mouseleave=${_handleMouseLeave}
    >
      <div part="label" class="${classNamesConfig.elements.title}" @click=${_handleTitleClick}>
        <span part="label-content" class="${classNamesConfig.elements.titleContent}">
          ${this.icon || this.querySelector('[slot="icon"]') ? html`
            <span part="icon" class="${classNamesConfig.elements.icon}">
              <slot name="icon">
                ${isSvgIcon
                  ? html`<span .innerHTML=${this.icon}></span>`
                  : this.icon
                    ? html`<i class="${this.icon}"></i>`
                    : ''
                }
              </slot>
            </span>
          ` : ''}
          <slot name="title">${this.label}</slot>
        </span>
        <span part="arrow" class="${classNamesConfig.elements.arrow}">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"/>
          </svg>
        </span>
      </div>
      <ul
        part="list"
        class="${classNamesConfig.elements.list}"
        role="menu"
        @mouseenter=${_handleListMouseEnter}
        @mouseleave=${_handleListMouseLeave}
      >
        <slot></slot>
      </ul>
    </li>
  `;
};

export default template;
