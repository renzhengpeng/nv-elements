# 组件库性能分析报告

本文件夹用于存放 **nv-elements 组件库** 各组件在 Storybook 环境下的性能分析结果，便于统一查看与回归测试。

## 测试环境

- **本地开发地址**: http://localhost:6006/（Storybook）
- **测试工具**: Chrome DevTools Performance / Core Web Vitals
- **测试方式**: 对各组件的 Overview（或 Default）故事页进行加载与交互性能录制

### 路由规则

- **规则**: `/?path=/story/components-[组件名]--overview`
- **[组件名]**：先按 kebab-case 写（如 ButtonGroup → button-group），再**去掉所有中横线**作为 URL 路径（如 `button-group` → `buttongroup`，`infinite-scroll` → `infinitescroll`）
- **无 Overview 的组件** 使用 `--default`：Step、Submenu、TabPane、TimelineItem（如 `components-step--default`）

## 报告索引

| 组件 | 测试页面 | 报告文件 | 状态 |
|------|----------|----------|------|
| [Dropdown](./dropdown.md) | [components-dropdown--overview](http://localhost:6006/?path=/story/components-dropdown--overview) | dropdown.md | ✅ 已分析 |
| [Alert](./alert.md) | [components-alert--overview](http://localhost:6006/?path=/story/components-alert--overview) | alert.md | ✅ 已分析 |
| [Avatar](./avatar.md) | [components-avatar--overview](http://localhost:6006/?path=/story/components-avatar--overview) | avatar.md | ✅ 已分析 |
| [BackTop](./back-top.md) | [components-backtop--overview](http://localhost:6006/?path=/story/components-backtop--overview) | back-top.md | ✅ 已分析 |
| [Badge](./badge.md) | [components-badge--overview](http://localhost:6006/?path=/story/components-badge--overview) | badge.md | ✅ 已分析 |
| [Button](./button.md) | [components-button--overview](http://localhost:6006/?path=/story/components-button--overview) | button.md | ✅ 已分析 |
| [ButtonGroup](./button-group.md) | [components-buttongroup--overview](http://localhost:6006/?path=/story/components-buttongroup--overview) | button-group.md | ✅ 已分析 |
| [Calendar](./calendar.md) | [components-calendar--overview](http://localhost:6006/?path=/story/components-calendar--overview) | calendar.md | ✅ 已分析 |
| [Card](./card.md) | [components-card--overview](http://localhost:6006/?path=/story/components-card--overview) | card.md | ✅ 已分析 |
| [Carousel](./carousel.md) | [components-carousel--overview](http://localhost:6006/?path=/story/components-carousel--overview) | carousel.md | ✅ 已分析 |
| [Cascader](./cascader.md) | [components-cascader--overview](http://localhost:6006/?path=/story/components-cascader--overview) | cascader.md | ✅ 已分析 |
| [Checkbox](./checkbox.md) | [components-checkbox--overview](http://localhost:6006/?path=/story/components-checkbox--overview) | checkbox.md | ✅ 已分析 |
| [CheckboxGroup](./checkbox-group.md) | [components-checkboxgroup--overview](http://localhost:6006/?path=/story/components-checkboxgroup--overview) | checkbox-group.md | ✅ 已分析 |
| [Col](./col.md) | [components-col--overview](http://localhost:6006/?path=/story/components-col--overview) | col.md | ✅ 已分析 |
| [Collapse](./collapse.md) | [components-collapse--overview](http://localhost:6006/?path=/story/components-collapse--overview) | collapse.md | ✅ 已分析 |
| [ColorPicker](./color-picker.md) | [components-colorpicker--overview](http://localhost:6006/?path=/story/components-colorpicker--overview) | color-picker.md | ✅ 已分析 |
| [Divider](./divider.md) | [components-divider--overview](http://localhost:6006/?path=/story/components-divider--overview) | divider.md | ✅ 已分析 |
| [Drawer](./drawer.md) | [components-drawer--overview](http://localhost:6006/?path=/story/components-drawer--overview) | drawer.md | ✅ 已分析 |
| [Empty](./empty.md) | [components-empty--overview](http://localhost:6006/?path=/story/components-empty--overview) | empty.md | ✅ 已分析 |
| [Icon](./icon.md) | [components-icon--overview](http://localhost:6006/?path=/story/components-icon--overview) | icon.md | ✅ 已分析 |
| [InfiniteScroll](./infinite-scroll.md) | [components-infinitescroll--overview](http://localhost:6006/?path=/story/components-infinitescroll--overview) | infinite-scroll.md | ✅ 已分析 |
| [Input](./input.md) | [components-input--overview](http://localhost:6006/?path=/story/components-input--overview) | input.md | ✅ 已分析 |
| [Link](./link.md) | [components-link--overview](http://localhost:6006/?path=/story/components-link--overview) | link.md | ✅ 已分析 |
| [Loading](./loading.md) | [components-loading--overview](http://localhost:6006/?path=/story/components-loading--overview) | loading.md | ✅ 已分析 |
| [Message](./message.md) | [components-message--overview](http://localhost:6006/?path=/story/components-message--overview) | message.md | ✅ 已分析 |
| [Modal](./modal.md) | [components-modal--overview](http://localhost:6006/?path=/story/components-modal--overview) | modal.md | ✅ 已分析 |
| [NavMenu](./nav-menu.md) | [components-navmenu--overview](http://localhost:6006/?path=/story/components-navmenu--overview) | nav-menu.md | ✅ 已分析 |
| [Notification](./notification.md) | [components-notification--overview](http://localhost:6006/?path=/story/components-notification--overview) | notification.md | ✅ 已分析 |
| [Pagination](./pagination.md) | [components-pagination--overview](http://localhost:6006/?path=/story/components-pagination--overview) | pagination.md | ✅ 已分析 |
| [Popconfirm](./popconfirm.md) | [components-popconfirm--overview](http://localhost:6006/?path=/story/components-popconfirm--overview) | popconfirm.md | ✅ 已分析 |
| [Popup](./popup.md) | [components-popup--overview](http://localhost:6006/?path=/story/components-popup--overview) | popup.md | ✅ 已分析 |
| [Progress](./progress.md) | [components-progress--overview](http://localhost:6006/?path=/story/components-progress--overview) | progress.md | ✅ 已分析 |
| [Radio](./radio.md) | [components-radio--overview](http://localhost:6006/?path=/story/components-radio--overview) | radio.md | ✅ 已分析 |
| [RadioGroup](./radio-group.md) | [components-radiogroup--overview](http://localhost:6006/?path=/story/components-radiogroup--overview) | radio-group.md | ✅ 已分析 |
| [Rate](./rate.md) | [components-rate--overview](http://localhost:6006/?path=/story/components-rate--overview) | rate.md | ✅ 已分析 |
| [Result](./result.md) | [components-result--overview](http://localhost:6006/?path=/story/components-result--overview) | result.md | ✅ 已分析 |
| [Row](./row.md) | [components-row--overview](http://localhost:6006/?path=/story/components-row--overview) | row.md | ✅ 已分析 |
| [Select](./select.md) | [components-select--overview](http://localhost:6006/?path=/story/components-select--overview) | select.md | ✅ 已分析 |
| [Skeleton](./skeleton.md) | [components-skeleton--overview](http://localhost:6006/?path=/story/components-skeleton--overview) | skeleton.md | ✅ 已分析 |
| [Slider](./slider.md) | [components-slider--overview](http://localhost:6006/?path=/story/components-slider--overview) | slider.md | ✅ 已分析 |
| [Statistic](./statistic.md) | [components-statistic--overview](http://localhost:6006/?path=/story/components-statistic--overview) | statistic.md | ✅ 已分析 |
| [Step](./step.md) | [components-step--default](http://localhost:6006/?path=/story/components-step--default) | step.md | ✅ 已分析 |
| [Steps](./steps.md) | [components-steps--overview](http://localhost:6006/?path=/story/components-steps--overview) | steps.md | ✅ 已分析 |
| [Submenu](./submenu.md) | [components-submenu--default](http://localhost:6006/?path=/story/components-submenu--default) | submenu.md | ✅ 已分析 |
| [Switch](./switch.md) | [components-switch--overview](http://localhost:6006/?path=/story/components-switch--overview) | switch.md | ✅ 已分析 |
| [TabPane](./tab-pane.md) | [components-tabpane--default](http://localhost:6006/?path=/story/components-tabpane--default) | tab-pane.md | ✅ 已分析 |
| [Tabs](./tabs.md) | [components-tabs--overview](http://localhost:6006/?path=/story/components-tabs--overview) | tabs.md | ✅ 已分析 |
| [Tag](./tag.md) | [components-tag--overview](http://localhost:6006/?path=/story/components-tag--overview) | tag.md | ✅ 已分析 |
| [Timeline](./timeline.md) | [components-timeline--overview](http://localhost:6006/?path=/story/components-timeline--overview) | timeline.md | ✅ 已分析 |
| [TimelineItem](./timeline-item.md) | [components-timelineitem--default](http://localhost:6006/?path=/story/components-timelineitem--default) | timeline-item.md | ✅ 已分析 |
| [Tooltip](./tooltip.md) | [components-tooltip--overview](http://localhost:6006/?path=/story/components-tooltip--overview) | tooltip.md | ✅ 已分析 |
| [Transfer](./transfer.md) | [components-transfer--overview](http://localhost:6006/?path=/story/components-transfer--overview) | transfer.md | ✅ 已分析 |
| [Upload](./upload.md) | [components-upload--overview](http://localhost:6006/?path=/story/components-upload--overview) | upload.md | ✅ 已分析 |

## 核心指标说明

- **INP (Interaction to Next Paint)**: 交互到下次绘制，< 200ms 为良好
- **LCP (Largest Contentful Paint)**: 最大内容绘制，< 2.5s 为良好
- **CLS (Cumulative Layout Shift)**: 累积布局偏移，< 0.1 为良好

## 如何复现

1. 启动 Storybook：`yarn storybook`（默认 http://localhost:6006/）
2. 打开 Chrome DevTools → Performance 面板
3. 访问上表中对应组件的测试页面（URL 规则：`/?path=/story/components-[组件名]--overview`，[组件名] 为 kebab-case 并**去掉中横线**，如 `infinite-scroll` → `infinitescroll`；无 Overview 的用 `--default`），录制加载或交互
4. **有交互的组件**：录制时先 Reload，待页面加载完成后执行一次典型交互（如点击按钮、切换 Tab、打开下拉等），再停止录制，以便采集 **INP** 指标（< 200ms 为良好）
5. 根据 Core Web Vitals 与 Performance 洞察撰写或更新对应 `*.md` 报告

批量测试时可直接按 [run-all-traces.md](./run-all-traces.md) 中的 URL 列表依次访问并填写报告。
