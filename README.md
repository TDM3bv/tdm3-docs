# TDM3 Docs

Bron van [docs.tdm3.be](https://docs.tdm3.be): de publieke documentatie van de TDM3-API's, gebouwd met [VitePress](https://vitepress.dev).

## Lokaal werken

Gebruik de Node-versie uit `.nvmrc`.

```bash
npm ci
npm run docs:dev
```

`npm run docs:build` bouwt de site naar `docs/.vitepress/dist`. De build faalt bij een dode interne link.

## Branches en deploy

- Wijzigingen gaan via een PR naar `vitepress`.
- Elke PR wordt gebouwd (`.github/workflows/build.yml`).
- Een merge naar `vitepress` deployt de site naar GitHub Pages (`.github/workflows/deploy.yml`).

## Upgrades

- Dependabot opent PR's voor npm-packages (wekelijks) en GitHub Actions (maandelijks). Minor- en patchversies komen gebundeld, een major komt als aparte PR.
- Een upgrade-PR is klaar als de build slaagt. Kijk bij een major ook de pagina's lokaal na.
- Een nieuwe Node-versie: pas `.nvmrc` aan. Beide workflows lezen dat bestand.
