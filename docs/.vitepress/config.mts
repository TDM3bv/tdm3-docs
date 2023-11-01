import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TDM3 Docs",
  base: "/tdm3-docs/",
  description: "documentatie van publieke TDM3 API's",
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tdm3cvba/tdm3-docs' }
    ],
    search: {
      provider: 'local'
    }
  }
})
