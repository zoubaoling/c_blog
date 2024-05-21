import { defineConfig } from 'vitepress'
import { getSideBar } from '../util/index'
import MarkdownItTaskLists from 'markdown-it-task-lists'

const sidebar = await getSideBar()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小邹前端笔记",
  description: "前端面试题",
  // 源目录配置，默认为/docs/*,与vitePpress配置目录同级
  srcDir: 'src',
  lastUpdated: true, // 是否使用 Git 获取每个页面的最后更新时间戳
  base: '/c_blog/', // '/base/' 部署站点的base URL
  markdown: {
    config: (md) => {
      md.use(MarkdownItTaskLists);
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      // dangerLabel: 'DANGER',
      infoLabel: 'TIP',
      detailsLabel: '详细信息'
    }
  },
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
      {
        text: '算法',
        link: '/algorithm/'
      },
      {
        text: '设计模式',
        link: '/设计模式/'
      },
      {
        text: '外链',
        items: [
          {
            text: '面试参考网站',
            items: [
              { text: 'web前端面试', link: 'https://vue3js.cn/interview/' },
              { text: '前端面试宝典', link: 'https://fe.ecool.fun/' },
              { text: 'vue技术揭秘(v2)', link: 'https://ustbhuangyi.github.io/vue-analysis/v2/prepare/' },
              { text: 'vue源码系列(v2)', link: 'https://vue-js.com/learn-vue/start/#_1-%E5%89%8D%E8%A8%80' },
              { text: 'vue3源码', link: 'https://vue3js.cn/start/' },
              { text: 'vue3 one piece', link: 'https://vue3js.cn/' }
            ]
          },
          { 
            text: '优秀博客',
            items: [
              { text: 'justin3go blog(vitepress)', link: 'https://justin3go.com/%E7%AC%94%E8%AE%B0/Vue%E7%9B%B8%E5%85%B3/01Vue3%E6%98%AF%E5%A6%82%E4%BD%95%E8%BF%90%E8%A1%8C%E7%9A%84' },
              { text: 'Xavi', link: 'https://xaviw.github.io/XaviDocs/%E5%B7%A5%E5%85%B7%E7%B3%BB%E5%88%97/VitePress%E6%90%AD%E5%BB%BA/%E5%9F%BA%E7%A1%80%E6%90%AD%E5%BB%BA.html' }
            ]
          }
        ]
      }
      // { text: 'Examples', link: '/markdown-examples' },
    ],
    sidebar,
    outline: {
      level: [2, 4],
      label: '大纲'
    },
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
