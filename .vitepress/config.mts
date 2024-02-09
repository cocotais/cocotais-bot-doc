import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cocotais Bot",
  description: "基于 qq-bot-sdk 实现的的QQ官方机器人框架",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '入门', link: '/starter/quickstart' },
      { text: '开发', link: '/develope/plugins' }
    ],

    sidebar: [
      {
        text: '入门',
        items: [
          { text: '快速开始', link: '/starter/quickstart' },
          { text: 'CLI用法', link: '/starter/cli' }
        ]
      },
      {
        text: '开发',
        items: [
          { text: '插件开发', link: '/develope/plugins' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cocotais/cocotais-bot' }
    ],

    footer: {
      copyright: '© Cocotais 2024',
    },

    outline: {
      level: 2,
      label: '大纲',
    },
    docFooter: {
      prev: '上一章',
      next: '下一章',
    },
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到亮色主题',
    darkModeSwitchTitle: '切换到深色主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
  }
})
