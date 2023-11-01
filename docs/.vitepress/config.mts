import { defineConfig } from 'vitepress'
import imsize_plugin from 'markdown-it-imsize';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TDM3 Docs",
  base: "/tdm3-docs/",
  description: "documentatie van publieke TDM3 API's",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Thuisverpleging', link: '/nurse/README.html' },
      { text: 'Huisartsen', link: '/doctor/README.html' }
    ],
    sidebar: [
      {
        text: "API's",
        items: [
          { text: 'Thuisverpleging', link: '/nurse/README.html' },
          { text: 'Huisartsen', link: '/doctor/README.html' }
        ]
      }
    ],
    editLink: {
      pattern: 'https://github.com/tdm3cvba/tdm3-docs/edit/vitepress/docs/:path',
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tdm3cvba/tdm3-docs' }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      copyright: "Copyright © 2023 TDM3 CVBA"
    },
    
  },
  markdown: {
    theme: {
        light: 'light-plus',
        dark: 'dark-plus'
    },
    config: (md) => {
        md.use(imsize_plugin)
    }
}
 
})
