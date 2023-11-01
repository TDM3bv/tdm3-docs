import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TDM3 Docs",
  description: "documentatie van publieke TDM3 API's",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Thuisverpleging', link: '/nurse/readme.html' },
      { text: 'Huisartsen', link: '/doctor/readme.html' }
    ],

    sidebar: [
      {
        text: "API's",
        items: [
          { text: 'Thuisverpleging', link: '/nurse/readme.html' },
          { text: 'Huisartsen', link: '/doctor/readme.html' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tdm3cvba/tdm3-docs' }
    ],
    search: {
      provider: 'local'
    }
  }
})
