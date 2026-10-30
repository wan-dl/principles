import { defineConfig } from 'vitepress'
import { generateSidebar } from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Principles",
  description: "Principles",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '所有记录', link: '/README' }
    ],

    sidebar: {
      '/股票交易/': generateSidebar('股票交易'),
      '/Create-Yourself/': generateSidebar('Create-Yourself'),
      '/logic/': generateSidebar('logic'),
      '/人生指南/': generateSidebar('人生指南'),
      '/资料/': generateSidebar('资料'),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
