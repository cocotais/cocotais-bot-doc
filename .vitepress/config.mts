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
    ]
  }
})
