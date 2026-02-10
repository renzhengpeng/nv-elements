/*
 * 组件库主入口：全局样式、基础类、nv 工具及全部 UI 组件
 * @creater: zhengpeng.ren
 * @since: 2024-05-15 14:29:37
 * @lastTime: 2024-12-19
 *
 * 使用方式：
 * - 全量引入（本入口）：import 'nv-elements' 或 import * as Nv from 'nv-elements'
 * - 按需引入：import { NvButton } from 'nv-elements/es/components/button'
 */
// 全局样式由构建后脚本输出到 es/styles/、lib/styles/，不在此 import，避免产出空 .scss.mjs。
// 使用方式：import 'nv-elements' 后单独引入 import 'nv-elements/es/styles/style.css'（或按需引入 variables/index.css、global/global.style.css）

// 导出基础类与工具
import { Component } from './based-on';
export { Component } from './based-on';
export * from './based-on';

// 导出并注册全部 UI 组件（引入本入口即会注册 nv-button、nv-input 等自定义元素）
export * from './components';

// 将 DOM 节点包装为具备组件能力的对象
export default function nv(
  node: Node | NodeList | Node[],
  inheritFrom?: typeof Component
): Node | Node[] {
  const SupComponent = inheritFrom || Component;
  const component = new SupComponent();

  if (Array.isArray(node)) {
    return node.map((n: Node) => nv(n, inheritFrom)) as Node[];
  }
  if (node instanceof NodeList) {
    return [].map.call(node, (n: Node) => nv(n, inheritFrom)) as Node[];
  }

  Object.setPrototypeOf(node, component);
  return node;
}
