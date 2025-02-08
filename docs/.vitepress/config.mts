import { defineConfig } from 'vitepress'
import imsize_plugin from 'markdown-it-imsize';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TDM3 Docs",
  base: "/",
  description: "documentatie van publieke TDM3 API's",
  lastUpdated: true,
  cleanUrls: true,
  lang: 'nl-BE',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Thuisverpleging', link: '/nurse/' },
      { text: 'Huisartsen', link: '/doctor/' }
    ],
    sidebar: {
      '/nurse/': [
      {
        text: "Nurse-XML",
        items: [          
          { text: 'Algemeen', link: '/nurse/' },
          { text: 'Nodes', link: '/nurse/nodes' },
          { text: 'Changelog', link: '/nurse/CHANGELOG' }
        ]        
      }],
      '/doctor/': [
      {
        text: "Doctor",
        items: [    
          { text: 'Huisartsen', link: '/doctor/' }
        ]        
      }]
    },
    editLink: {
      pattern: 'https://github.com/tdm3bv/tdm3-docs/edit/vitepress/docs/:path',
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tdm3bv/tdm3-docs' }
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
