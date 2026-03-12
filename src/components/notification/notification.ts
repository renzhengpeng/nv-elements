/*
 * @Descripttion: notification全局方法
 * @creater: zhengpeng.ren
 * @since: 2024-12-19
 * 
 * 支持 slot 自定义内容：
 * - label slot: 自定义标题 HTML 内容
 * - content slot: 自定义消息 HTML 内容
 * - icon slot: 自定义图标内容
 * 
 * 使用示例：
 * const notification = document.createElement('nv-notification');
 * const labelEl = document.createElement('span');
 * labelEl.slot = 'label';
 * labelEl.innerHTML = '<strong>标题</strong>';
 * notification.appendChild(labelEl);
 * 
 * const iconEl = document.createElement('span');
 * iconEl.slot = 'icon';
 * iconEl.innerHTML = '🎉';
 * notification.appendChild(iconEl);
 * 
 * document.body.appendChild(notification);
 */
import { NvNotification } from './index.ts';

interface NotificationOptions {
  label?: string;
  message?: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  duration?: number;
  showIcon?: boolean;
  icon?: string;
  closable?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  zIndex?: number;
  closeIcon?: string;
}

// 按位置分组管理实例
const instancesByPosition: {
  'top-right': NvNotification[];
  'top-left': NvNotification[];
  'bottom-right': NvNotification[];
  'bottom-left': NvNotification[];
} = {
  'top-right': [],
  'top-left': [],
  'bottom-right': [],
  'bottom-left': []
};

// 默认配置
const defaultConfig = {
  offset: 20, // 距离顶部/底部的初始偏移量
  gap: 16 // notification 之间的间距
};

/**
 * 更新指定位置的所有 notification 的位置
 */
const updatePositions = (position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'): void => {
  const instances = instancesByPosition[position];
  const isTop = position.startsWith('top');
  let offset = defaultConfig.offset;

  instances.forEach((instance) => {
    if (instance.isConnected) {
      if (isTop) {
        instance.style.top = `${offset}px`;
        instance.style.bottom = 'auto';
      } else {
        instance.style.bottom = `${offset}px`;
        instance.style.top = 'auto';
      }
      
      // 获取当前实例的高度，加上间距作为下一个的偏移
      const height = instance.offsetHeight || 100; // 如果获取不到高度，使用默认值100px
      offset += height + defaultConfig.gap;
    }
  });
};

/**
 * 注册 notification 实例到全局管理
 * 用于直接使用 <nv-notification> 标签时自动加入位置管理
 */
export const registerNotificationInstance = (instance: NvNotification): void => {
  const position = instance.position;
  const instances = instancesByPosition[position];
  
  // 避免重复注册
  if (instances.indexOf(instance) === -1) {
    instances.push(instance);
    
    // 使用 requestAnimationFrame 确保元素已渲染，然后更新所有位置
    requestAnimationFrame(() => {
      updatePositions(position);
      
      // 位置更新完成后，通知实例可以启用过渡了
      // 使用自定义事件通知
      instance.dispatchEvent(new CustomEvent('position-updated', { bubbles: false }));
    });
  }
};

/**
 * 从全局管理中注销 notification 实例
 */
export const unregisterNotificationInstance = (instance: NvNotification): void => {
  const position = instance.position;
  const instances = instancesByPosition[position];
  const index = instances.indexOf(instance);
  
  if (index > -1) {
    instances.splice(index, 1);
    
    // 延迟更新位置，等待关闭动画完成
    setTimeout(() => {
      updatePositions(position);
    }, 300);
  }
};

const createNotification = (options: NotificationOptions): NvNotification => {
  const notification = document.createElement(
    'nv-notification'
  ) as NvNotification;
  notification.label = options.label || '';
  notification.message = options.message || '';
  notification.type = options.type || 'info';
  notification.duration =
    options.duration !== undefined ? options.duration : 4500;
  notification.showIcon =
    options.showIcon !== undefined ? options.showIcon : true;
  notification.icon = options.icon || '';
  notification.closable =
    options.closable !== undefined ? options.closable : true;
  notification.position = options.position || 'top-right';
  notification.zIndex =
    options.zIndex !== undefined ? options.zIndex : 2000;
  notification.closeIcon = options.closeIcon || 'close';

  document.body.appendChild(notification);
  
  // 注意：不需要在这里手动注册，因为 $mounted 生命周期会自动调用 registerNotificationInstance
  
  return notification;
};

// 主函数，可直接调用
const NotificationFunction = Object.assign(
  (options: NotificationOptions | string): NvNotification => {
    return createNotification(
      typeof options === 'string' ? { message: options } : options
    );
  },
  {
    /**
     * 显示成功通知
     */
    success: (options: NotificationOptions | string) =>
      createNotification(
        typeof options === 'string'
          ? { message: options, type: 'success' }
          : { ...options, type: 'success' }
      ),

    /**
     * 显示警告通知
     */
    warning: (options: NotificationOptions | string) =>
      createNotification(
        typeof options === 'string'
          ? { message: options, type: 'warning' }
          : { ...options, type: 'warning' }
      ),

    /**
     * 显示信息通知
     */
    info: (options: NotificationOptions | string) =>
      createNotification(
        typeof options === 'string'
          ? { message: options, type: 'info' }
          : { ...options, type: 'info' }
      ),

    /**
     * 显示错误通知
     */
    error: (options: NotificationOptions | string) =>
      createNotification(
        typeof options === 'string'
          ? { message: options, type: 'error' }
          : { ...options, type: 'error' }
      ),

    /**
     * 关闭所有通知
     */
    closeAll: () => {
      Object.values(instancesByPosition).forEach((instances) => {
        const instancesToClose = instances.slice();
        instancesToClose.forEach((instance) => {
          if (instance.isConnected) {
            instance.close();
          }
        });
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

export const Notification = NotificationFunction;
