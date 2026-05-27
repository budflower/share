# 个人作品展示网站 - 产品需求文档

## Overview
- **Summary**: 一个展示个人项目作品的静态网站，包含个人简介、作品集展示、联系方式等核心功能
- **Purpose**: 帮助用户展示过往项目经验，建立个人品牌形象，便于潜在雇主或合作伙伴了解其专业能力
- **Target Users**: 潜在雇主、合作伙伴、行业同行、个人粉丝

## Goals
- 展示个人简介和专业背景
- 展示过往项目作品，包含项目描述、技术栈、截图等
- 提供联系方式和社交链接
- 响应式设计，支持移动端访问

## Non-Goals (Out of Scope)
- 用户注册/登录功能
- 动态内容管理系统（CMS）
- 博客功能
- 在线聊天功能
- 支付/电商功能

## Background & Context
- 个人作品展示网站是专业人士展示自己能力的重要途径
- 目标是创建一个简洁、专业、美观的静态网站
- 使用Vue3 + UniApp技术栈开发，便于后续扩展为小程序

## Functional Requirements
- **FR-1**: 首页展示个人简介、头像、核心技能标签
- **FR-2**: 作品集页面展示项目列表，支持分类筛选
- **FR-3**: 项目详情展示项目描述、技术栈、截图/gif演示
- **FR-4**: 关于页面展示详细个人介绍和工作经历
- **FR-5**: 联系页面提供联系方式和社交链接
- **FR-6**: 响应式导航栏，支持移动端菜单

## Non-Functional Requirements
- **NFR-1**: 页面加载速度快，首屏加载时间<2秒
- **NFR-2**: 响应式设计，适配桌面端和移动端
- **NFR-3**: 视觉美观，使用现代UI设计风格
- **NFR-4**: 代码结构清晰，便于后续维护和扩展

## Constraints
- **Technical**: Vue3 + UniApp + SCSS，纯前端静态网站
- **Business**: 无后端依赖，部署简单
- **Dependencies**: UniApp组件库、图标库

## Assumptions
- 用户已有项目作品数据（项目名称、描述、技术栈、截图等）
- 用户提供个人照片和简介内容

## Acceptance Criteria

### AC-1: 首页展示正常
- **Given**: 用户访问网站首页
- **When**: 页面加载完成
- **Then**: 显示个人头像、姓名、职位、简介和核心技能标签
- **Verification**: `human-judgment`

### AC-2: 作品集列表展示
- **Given**: 用户点击导航栏"作品集"链接
- **When**: 页面切换到作品集页面
- **Then**: 显示项目卡片列表，包含项目封面图、名称、分类标签、简短描述
- **Verification**: `human-judgment`

### AC-3: 项目分类筛选
- **Given**: 作品集页面已加载
- **When**: 用户点击分类标签（如"前端"、"后端"、"全栈"）
- **Then**: 只显示对应分类的项目
- **Verification**: `human-judgment`

### AC-4: 项目详情展示
- **Given**: 用户点击某个项目卡片
- **When**: 进入项目详情页面
- **Then**: 显示项目完整描述、技术栈标签、项目截图/演示、项目链接（如GitHub）
- **Verification**: `human-judgment`

### AC-5: 关于页面展示
- **Given**: 用户点击导航栏"关于"链接
- **When**: 页面切换到关于页面
- **Then**: 显示详细个人介绍、工作经历时间线、教育背景
- **Verification**: `human-judgment`

### AC-6: 联系页面展示
- **Given**: 用户点击导航栏"联系"链接
- **When**: 页面切换到联系页面
- **Then**: 显示联系方式（邮箱、电话）和社交链接（GitHub、LinkedIn等）
- **Verification**: `human-judgment`

### AC-7: 响应式导航
- **Given**: 在移动端访问网站
- **When**: 页面加载完成
- **Then**: 导航栏切换为汉堡菜单，点击后展开导航链接
- **Verification**: `human-judgment`

### AC-8: 页面加载性能
- **Given**: 用户首次访问网站
- **When**: 浏览器开发者工具性能面板开启
- **Then**: 首屏加载时间<2秒
- **Verification**: `programmatic`

## Open Questions
- [ ] 用户是否有特定的设计风格偏好（如深色/浅色主题）？
- [ ] 用户是否已有项目数据需要导入？
- [ ] 是否需要动画效果或交互特效？