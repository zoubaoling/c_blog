import { defineConfig } from 'vitepress'
import { getSideBar } from '../util/index'
const sidebar = await getSideBar()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小邹前端笔记",
  description: "前端面试题",
  // 源目录配置，默认为/docs/*,与vitePpress配置目录同级
  srcDir: 'src',
  lastUpdated: true, // 是否使用 Git 获取每个页面的最后更新时间戳
  base: '/c_blog/', // '/base/' 部署站点的base URL
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                displayDetails: '显示详细信息',
                resetButtonTitle: '清除查询条件',
                backButtonTitle: '返回搜索结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: 'enter',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: 'up arrow',
                  navigateDownKeyAriaLabel: 'down arrow',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'escape'
                }
              }
            }
          }
        }
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'HTML',
        items: [
          { text: 'HTML', link: '/html/' },
          { text: 'CSS', link: '/css/' }
        ]
      },
      {
        text: 'JavaScript',
        items: [
          { text: 'ES5', link: '/js/' },
          { text: 'ES6', link: '/ES6/' }
        ]
      },
      { text: 'Vue', link: '/vue/index', activeMatch: '/vue/' },
      {
        text: '构建工具',
        items: [
          { text: 'webpack', link: '/webpack/' },
          { text: 'http', link: '/http/' },
          { text: 'vite', link: '/vite/' }
        ]
      },
      // { text: 'Examples', link: '/markdown-examples' },
    ],
    sidebar,
    outline: 'deep',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zoubaoling/c_blog' }
    ],
    // 编辑
    editLink: {
      pattern: 'https://github.com/zoubaoling/c_blog/tree/main/docs/src/:path',
      text: '在Github上编辑此页'
    }
  }
})
