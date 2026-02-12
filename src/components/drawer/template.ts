/*
 * @Descripttion: drawer组件模板
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 */
import { html, classMap } from '../../based-on';
import { NvDrawer } from './index.ts';
import classNamesConfig from './classNames';
import '../icon/index';

/**
 * 模板上下文接口
 *
 * @remarks
 * 定义模板函数中可用的方法，这些方法由组件实例传入
 */
interface Context {
  /** 关闭抽屉的处理函数 */
  _handleClose: () => void;
  /** 遮罩层点击事件处理函数 */
  _handleModalClick: (event: Event) => void;
  /** 检查是否有自定义头部插槽内容 */
  _hasHeaderSlot: () => boolean;
  /** 检查是否有底部插槽内容（暂未使用） */
  _hasFooterSlot: () => boolean;
  /** 获取抽屉面板的内联样式 */
  _getDrawerStyle: () => string;
}

/**
 * Drawer 组件模板函数
 *
 * @param context - 包含事件处理和辅助方法的上下文对象
 * @returns Lit HTML 模板结果
 *
 * @remarks
 * 模板结构：
 * - wrapper: 遮罩层容器，position: fixed 覆盖整个视口
 * - drawer: 抽屉面板，根据 direction 从不同方向滑入
 * - header: 头部区域，支持自定义插槽或默认标题+关闭按钮
 * - body: 主体内容区域，通过默认插槽接收内容
 * - footer: 底部区域，通过具名插槽接收内容，为空时自动隐藏
 */
const template = function(this: NvDrawer, context: Context) {
  // 解构上下文对象，获取所需的方法
  const { _handleClose, _handleModalClick, _hasHeaderSlot, _getDrawerStyle } = context;

  // 检查是否有自定义头部插槽内容
  const hasHeaderSlot = _hasHeaderSlot();
  const shouldRenderHeader = hasHeaderSlot || !!this.label || !!this.showClose;
  const shouldRenderCloseButton = !!this.showClose && !hasHeaderSlot;

  return html`
    <!-- 遮罩层容器：position: fixed 覆盖整个视口 -->
    <div part="base mask" class="${ classMap({
      [classNamesConfig.elements.wrapper]: true,
      [classNamesConfig.modifiers.mask]: this.mask // 如果 mask 为 true，添加半透明背景
    }) }"
         @click=${ _handleModalClick }>

      <!-- 抽屉面板：根据 direction 从不同方向滑入 -->
      <div part="panel" class="${ classMap({
        [classNamesConfig.elements.drawer]: true,
        // 添加方向修饰符类，控制滑入方向和位置
        [`${ classNamesConfig.elements.drawer }--${ this.direction }`]: true,
        // 添加自定义类名（如果提供）
        [this.customClass]: !!this.customClass
      }) }"
           style="${ _getDrawerStyle() }">

        <!-- 头部区域：条件渲染，只有在有内容时才显示 -->
        ${ shouldRenderHeader
          ? html`
              <div part="header" class=${ classNamesConfig.elements.header }>
                <!-- 判断使用自定义头部还是默认头部 -->
                ${ hasHeaderSlot
                  ? html`
                      <!-- 自定义头部：使用 header 插槽内容 -->
                      <slot name="header"></slot>
                    `
                  : html`
                      <!-- 默认头部：标题 + 关闭按钮 -->
                      <div class=${ classNamesConfig.elements.headerContent }>
                        ${ this.label }
                      </div>
                      <!-- 关闭按钮：只在 showClose 为 true 时显示 -->
                      ${ shouldRenderCloseButton
                        ? html`
                            <button part="close" class=${ classNamesConfig.elements.close }
                                    @click=${ _handleClose }>
                              <nv-icon name="close"></nv-icon>
                            </button>
                          `
                        : '' }
                    ` }
              </div>
            `
          : '' }

        <!-- 主体内容区域：始终渲染，通过默认插槽接收内容 -->
        <div part="body" class=${ classNamesConfig.elements.body }>
          <slot></slot>
        </div>

        <!-- 底部区域：始终渲染 footer 元素，但通过 CSS :empty 选择器自动隐藏空内容 -->
        <div part="footer" class=${ classNamesConfig.elements.footer }>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  `;
};

export default template;
