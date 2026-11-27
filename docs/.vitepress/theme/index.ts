// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { redirectFor } from './redirects'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ router, siteData }) {
    if (typeof window === 'undefined') return

    // De site kan in een submap staan (PR-preview). De redirects kennen enkel paden vanaf de
    // root van de site: het basispad gaat er hier af en komt er met withBase weer bij.
    const base = siteData.value.base
    const target = () => {
      const path = window.location.pathname
      if (!path.startsWith(base)) return undefined
      const to = redirectFor('/' + path.slice(base.length), window.location.hash)
      return to ? withBase(to) : undefined
    }

    // Bij het openen van de pagina: volledig herladen op de nieuwe url. Een router.go() op dit
    // moment laadt een andere pagina dan de server-HTML en breekt de hydratatie.
    const initial = target()
    if (initial) {
      window.location.replace(initial)
      return
    }

    // Daarna, bij navigatie binnen de site.
    const redirect = () => {
      const to = target()
      if (to) router.go(to)
    }
    router.onAfterRouteChange = redirect
    window.addEventListener('hashchange', redirect)
  }
} satisfies Theme
