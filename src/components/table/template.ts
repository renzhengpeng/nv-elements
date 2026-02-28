/*
 * @Descripttion: table 组件主模板
 * @creater: zhengpeng.ren
 * @since: 2025-02-18
 */
import { html, classMap } from '../../based-on';
import type { TemplateResult } from 'lit';
import classNamesConfig from './classNames';
import { renderTableHeader } from './template-header';
import type { NvTable } from './index';
import type { TableHeaderContext } from './template-header';

export interface TableTemplateContext {
  headerContext: TableHeaderContext;
  bodyContent: TemplateResult;
  bodyHeightStyle: string;
  /** 虚拟滚动时给 wrapper 设置 min-height，保证表体区域有高度 */
  wrapperStyle?: string;
  /** 虚拟滚动时给 body-wrapper 加的 class，用于固定高度不撑开 */
  bodyWrapperClass?: string;
  onBodyScroll: (e: Event) => void;
  /** 虚拟滚动时列宽总和，用于表头/表体宽度一致 */
  totalColumnWidth?: number;
  /** 虚拟滚动时表格总宽（列宽 + 滚动条预留） */
  tableWidth?: number;
}

const template = function (this: NvTable, context: TableTemplateContext) {
  const { headerContext, bodyContent, bodyHeightStyle, wrapperStyle = '', bodyWrapperClass = '', onBodyScroll, totalColumnWidth = 0, tableWidth = 0 } = context;

  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers[this.size]]: true,
    [classNamesConfig.modifiers.stripe]: this.stripe,
    [classNamesConfig.modifiers.border]: this.border
  });

  const useFixedWidth = tableWidth > 0 && totalColumnWidth > 0;
  const headerWrapperStyle = useFixedWidth ? `width: ${tableWidth}px` : '';
  const headerContextWithWidth = useFixedWidth ? { ...headerContext, tableWidth: totalColumnWidth } : headerContext;
  const bodyWrapperStyle = useFixedWidth
    ? (bodyHeightStyle ? `${bodyHeightStyle}; width: ${tableWidth}px` : `width: ${tableWidth}px`)
    : bodyHeightStyle;

  return html`
    <div part="base" class=${classMapResult}>
      <div part="wrapper" class=${classNamesConfig.elements.wrapper} style=${wrapperStyle}>
        <div part="header-wrapper" class=${classNamesConfig.elements.headerWrapper} style=${headerWrapperStyle}>
          ${renderTableHeader(headerContextWithWidth)}
        </div>
        <div
          part="body-wrapper"
          class="${classNamesConfig.elements.bodyWrapper} ${bodyWrapperClass}"
          style=${bodyWrapperStyle}
          @scroll=${onBodyScroll}
        >
          ${bodyContent}
        </div>
      </div>
    </div>
  `;
};

export default template;
