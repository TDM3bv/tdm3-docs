import { defineConfig } from 'vitepress'
import imsize_plugin from 'markdown-it-imsize';

// VitePress behandelt een link naar een extensie die het niet kent als een pagina van de site:
// de router vangt de klik op en toont een 404, en de dead-link-check zoekt een .md.
// Met xsd in VITE_EXTRA_EXTENSIONS gaat de link naar het bestand in docs/public.
// Vite geeft VITE_*-variabelen uit process.env door aan de client-build.
process.env.VITE_EXTRA_EXTENSIONS = 'xsd'

// De site staat op de root van docs.tdm3.be. Een PR-preview staat in een submap
// (/pr-preview/pr-<nummer>/); de preview-workflow geeft dat pad door via DOCS_BASE.
const base = process.env.DOCS_BASE || '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TDM3 Docs",
  base,
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
          text: 'Prestatiebestand',
          items: [
            { text: 'Overzicht', link: '/nurse/' },
            { text: 'Wie voert de zorg uit?', link: '/nurse/wie' },
            { text: 'Wat: zorg bij de patiënt', link: '/nurse/wat' },
            { text: 'Aan wie: de betaler', link: '/nurse/aan-wie' },
            { text: 'Hoe: factureren en aanleveren', link: '/nurse/hoe' }
          ]
        },
        {
          text: 'Specificatie',
          items: [
            { text: 'Nodes', link: '/nurse/nodes' },
            { text: 'Veelgestelde vragen', link: '/nurse/faq' },
            { text: 'Changelog', link: '/nurse/CHANGELOG' }
          ]
        },
        {
          text: 'Voorbeelden',
          items: [
            { text: 'Artikel 8', link: '/nurse/artikel8' },
            { text: 'Pilootproject artikel 56', link: '/nurse/artikel56' }
          ]
        }
      ],
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
      copyright: `Copyright © 2023-${new Date().getFullYear()} TDM3`
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
