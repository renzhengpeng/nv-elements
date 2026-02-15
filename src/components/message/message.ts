/*
 * @Descripttion: message全局方法
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 *
 * 使用方式：
 *
 * 1. 基础用法：
 *    import { message } from 'nv-elements';
 *    message('这是一条消息');
 *    message({ message: '这是一条消息', type: 'info' });
 *
 * 2. 快捷方法：
 *    message.success('操作成功');
 *    message.warning('请注意');
 *    message.error('操作失败');
 *    message.info('提示信息');
 *
 * 3. 配置选项：
 *    message.success({
 *      message: '操作成功',
 *      duration: 3000,
 *      showIcon: true,
 *      closable: false,
 *      onClose: () => console.log('closed')
 *    });
 *
 * 4. 关闭所有消息：
 *    message.closeAll();
 *
 * 5. 全局配置：
 *    message.config({ duration: 5000, offset: 30 });
 */
import { NvMessage } from './index.ts';

export interface MessageOptions {
  message?: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  duration?: number;
  showIcon?: boolean;
  center?: boolean;
  closable?: boolean;
  offset?: number; // 距离顶部的偏移量
  onClose?: () => void; // 关闭时的回调
}

// 消息实例列表
const instances: NvMessage[] = [];

// 默认配置
const defaultConfig = {
  duration: 3000,
  showIcon: true,
  center: false,
  closable: false,
  offset: 20, // 默认距离顶部20px
  gap: 16 // 消息之间的间距
};

/**
 * 更新所有消息的位置
 */
const updatePositions = (): void => {
  let offset = defaultConfig.offset;

  instances.forEach((instance) => {
    if (instance.isConnected) {
      instance.style.top = `${ offset }px`;
      // 获取当前实例的高度，加上间距作为下一个的偏移
      const height = instance.offsetHeight || 60; // 如果获取不到高度，使用默认值60px
      offset += height + defaultConfig.gap;
    }
  });
};

/**
 * 创建消息实例
 */
const createMessage = (options: MessageOptions | string): NvMessage => {
  const opts: MessageOptions = typeof options === 'string' ? { message: options } : options;

  const message = document.createElement('nv-message') as NvMessage;
  message.message = opts.message || '';
  message.type = opts.type || 'info';
  message.duration = opts.duration !== undefined ? opts.duration : defaultConfig.duration;
  message.showIcon = opts.showIcon !== undefined ? opts.showIcon : defaultConfig.showIcon;
  message.center = opts.center !== undefined ? opts.center : defaultConfig.center;
  message.closable = opts.closable !== undefined ? opts.closable : defaultConfig.closable;

  // 添加到DOM
  document.body.appendChild(message);

  // 添加到实例列表
  instances.push(message);

  // 使用requestAnimationFrame确保元素已渲染
  requestAnimationFrame(() => {
    updatePositions();
  });

  // 监听消息关闭事件
  // 注意：在某些极端情况下（例如自定义元素尚未完全升级时），message.close 可能暂时不存在
  // 为了避免运行时错误，这里做一次安全降级处理
  const originalClose =
    typeof (message as any).close === 'function'
      ? (message as any).close.bind(message)
      : () => {
          // 自定义元素尚未挂载 close 方法时，直接移除元素
          message.remove();
        };

  message.close = function() {
    // 执行原始关闭逻辑（或降级逻辑）
    originalClose();

    // 从实例列表中移除
    const index = instances.indexOf(message);
    if (index > -1) {
      instances.splice(index, 1);
    }

    // 延迟更新位置，等待关闭动画完成
    setTimeout(() => {
      updatePositions();
    }, 50);

    // 执行回调
    if (opts.onClose) {
      opts.onClose();
    }
  };

  return message;
};

/**
 * Message 全局API
 */
export const message = Object.assign(
  // 默认调用方法
  (options: MessageOptions | string) => createMessage(options),
  {
    /**
     * 显示成功消息
     */
    success: (options: MessageOptions | string) =>
      createMessage(
        typeof options === 'string'
          ? { message: options, type: 'success' }
          : { ...options, type: 'success' }
      ),

    /**
     * 显示警告消息
     */
    warning: (options: MessageOptions | string) =>
      createMessage(
        typeof options === 'string'
          ? { message: options, type: 'warning' }
          : { ...options, type: 'warning' }
      ),

    /**
     * 显示信息消息
     */
    info: (options: MessageOptions | string) =>
      createMessage(
        typeof options === 'string'
          ? { message: options, type: 'info' }
          : { ...options, type: 'info' }
      ),

    /**
     * 显示错误消息
     */
    error: (options: MessageOptions | string) =>
      createMessage(
        typeof options === 'string'
          ? { message: options, type: 'error' }
          : { ...options, type: 'error' }
      ),

    /**
     * 关闭所有消息
     */
    closeAll: () => {
      const instancesToClose = instances.slice();
      instancesToClose.forEach(instance => {
        if (instance.isConnected) {
          instance.close();
        }
      });
    },

    /**
     * 配置默认选项
     */
    config: (config: Partial<typeof defaultConfig>) => {
      Object.assign(defaultConfig, config);
    }
  }
);

// 为了兼容性，同时导出 Message（大写）
export const Message = message;
