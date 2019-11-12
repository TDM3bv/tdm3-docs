// .vuepress/configconst getConfig = require("vuepress-bar");

const getConfig = require("vuepress-bar");

const barConfig = getConfig('${__dirName}/../docs');
//barConfig.sidebar = barConfig.sidebar.filter(x => x.text == 'Nurse');
console.log(barConfig);
barConfig.sidebar.map(item => {
  item.collapsable = true;
  if(item.title == "Nurse")
  {
    item.title = "Thuisverpleging"
  } else if(item.title == "Doctor")
  {
    item.title = "Huisartsen";
  }
});
module.exports = {
  plugins: ['@vuepress/back-to-top','reading-progress', '@vuepress/pwa', {
    serviceWorker: true,
    updatePopup: true
  }],
  base: '/tdm3-docs/',
  theme: 'cool',
  //dest: 'dist',
  head: [
    ['link', { rel: 'icon', href: '/faviconCustom.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
	  ['link', {href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel :'stylesheet'}]
  ],
  themeConfig: {
    // logo: './myAvatar.png',
    sidebar: barConfig.sidebar,
      sidebarDepth: 4,
    displayAllHeaders: true, // Default: false
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Thuisverpleging', link: '/nurse/' },
      { text: 'Huisartsen', link: '/doctor/'},
    ],
    
    lastUpdated: 'Last Updated', // string | boolean
      // Assumes GitHub. Can also be a full GitLab url.
    repo: 'tdm3cvba/tdm3-docs',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Github',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    // docsRepo: 'FriendlyUser/ENGRYear4BNotes',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!'

  },
  title: 'TDM3 Docs',
  description: "publieke documentatie TDM3 API's",
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': '../img'
      }
    }
  },
  markdown: {
    extendMarkdown: md => {
      md.set({ html: true })
      md.use(require('markdown-it-katex'))
      md.use(require('markdown-it-plantuml'))
      md.use(require('markdown-it-admonition'))
    }
  }
}