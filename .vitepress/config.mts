import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cocotais Bot",
  description: "基于 qq-bot-sdk 实现的的QQ官方机器人框架",
  cleanUrls: true,

  head: [['link', { rel: 'icon', href: 'https://static.codemao.cn/coco/player/unstable/BytsUP4j6.image/png?hash=FmjJ-D3XwRi0OxgAgsXHEKHPhSLg' }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: "https://static.codemao.cn/coco/player/unstable/BytsUP4j6.image/png?hash=FmjJ-D3XwRi0OxgAgsXHEKHPhSLg",
    nav: [
      { text: '入门', link: '/starter/quickstart' },
      { text: '开发', link: '/develop/plugins' },
      { text: '参考', link: '/reference/changelog' }
    ],

    sidebar: {
      '/': [
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
            { text: '插件开发', link: '/develop/plugins' },
            { text: '插件进阶', link: '/develop/advanced' }
          ]
        },
        {
          text: '参考',
          items: [
            { text: '更新日志', link: '/reference/changelog' },
            { text: '错误速查表', link: '/reference/errors' },
          ]
        }
      ],
      '/next/': []
    },

    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/cocotais-bot' }
    ],

    footer: {
      copyright: '© Cocotais 2024',
    },

    outline: {
      level: [2, 3],
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

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  },

  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
})
