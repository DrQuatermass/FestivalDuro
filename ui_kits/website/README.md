# Festival Duro — Website UI kit

Ricreazione pixel-perfect del sito marketing `festivalduro.it`, costruita leggendo il codebase Django originale (`FestivalDuro/festival_duro/`):

- `templates/base.html` — header sticky, footer, meta/OG
- `templates/core/home.html` — hero + headliner grid + festival panel
- `templates/core/lineup.html` — hero + band grid
- `templates/core/info.html` — info grid + FAQ
- `templates/core/band_detail.html` — detail dark
- `static/css/main.css` — 857 righe, fonte di verità per valori

## Entry point

`index.html` — versione interattiva con router client-side. Naviga tra Home / Line-up / Info & Venue / dettaglio band. Tutti i valori (colori, bordi, shadow, padding) arrivano da `../../colors_and_type.css`.

## Componenti

- `SiteHeader.jsx` — header sticky nero con logo giallo wide e nav
- `SiteFooter.jsx` — footer con logo stack + grid 3 colonne
- `Hero.jsx` — hero giallo con kicker, logo glitch, meta data/venue, CTA
- `PageHero.jsx` — hero compatto per pagine secondarie
- `BandCard.jsx` — card band (foto 16:11, nome, meta, badge Headliner)
- `InfoCard.jsx` — card info con titolo + copy + CTA
- `FaqItem.jsx` — `<details>` stile display uppercase
- `FestivalPanel.jsx` — pannello bianco con locandina + shadow brut
- `Button.jsx` — variants: primary / ghost
- `BandDetail.jsx` — vista detail in sezione dark

## Copiato, non reinventato

- Tutti gli asset sono quelli del repo.
- Copy e struttura sono quelli dei template Django.
- Niente icone custom, niente emoji (coerente col brand).
