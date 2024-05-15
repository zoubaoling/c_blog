import { defineConfig } from 'vitepress'
import { getSideBar } from '../util/index'
const sidebar = await getSideBar()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端面试题",
  description: "前端面试题",
  // 源目录配置，默认为/docs/*,与vitePpress配置目录同级
  srcDir: 'src',
  lastUpdated: true, // 是否使用 Git 获取每个页面的最后更新时间戳
  // base: '/blog/', // '/base/' 部署站点的base URL
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'HTML',
        link: '/html/'
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
          { text: 'webpack', link: '/webpack/'},
          { text: 'http', link: '/http/'},
          { text: 'vite', link: '/vite/'}
        ]
      },
      // { text: 'Examples', link: '/markdown-examples' },
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
