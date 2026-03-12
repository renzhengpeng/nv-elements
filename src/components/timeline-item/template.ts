/*
 * @Descripttion: timeline-item组件html模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import classNamesConfig from './classNames';
import { NvTimelineItem } from './index.ts';
import '../icon/index';

const template = function(this: NvTimelineItem) {
  const classMapResult = classMap({
    [classNamesConfig.block]: true,
    [classNamesConfig.modifiers.pending]: this.pending,
    [classNamesConfig.modifiers.reverse]: this.reverse
  });

  const nodeClassMap = classMap({
    [classNamesConfig.elements.node]: true,
    [classNamesConfig.modifiers.nodeHasIcon]: !!this.icon,
    [`nv-timeline-item__node--${this.type}`]: !!this.type,
  });

  const wrapperClassMap = classMap({
    [classNamesConfig.elements.wrapper]: true
  });

  const contentClassMap = classMap({
    [classNamesConfig.elements.content]: true
  });

  const timestampClassMap = classMap({
    [classNamesConfig.elements.timestamp]: true
  });

  return html`
    <li part="base" class=${ classMapResult }>
      <div part="tail" class=${ classNamesConfig.elements.tail }></div>
      <div part="node" class=${ nodeClassMap } style="${ this.color ? `background-color: ${this.color};` : '' }">
        ${ this.icon ? html`<nv-icon name=${ this.icon }></nv-icon>` : null }
      </div>
      <div part="wrapper" class=${ wrapperClassMap }>
        <div part="content" class=${ contentClassMap }>
          <slot></slot>
        </div>
        ${ this.timestamp
          ? html`
              <div part="timestamp" class=${ timestampClassMap }>
                <slot name="timestamp">${ this.timestamp }</slot>
              </div>
            `
          : html`<slot name="timestamp"></slot>` }
      </div>
    </li>
  `;
};

export default template;
