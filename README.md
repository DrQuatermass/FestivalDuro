# Festival Duro — Design System

**Festival Duro** è un festival musicale live indipendente a Modena, giunto alla sua **4ª edizione** (venerdì 5 – sabato 6 giugno 2026) presso **Arena Wave Music, Via Ancona 6**.

Il sito pubblico è online su <https://festivalduro.it>. Il payoff del brand, stampato sui poster, è una frase punk-ironica — *"Hard Rock, Harder Cock" — O.E.E.* — che fissa il tono: irriverente, diretto, "duro". Il festival è prodotto/realizzato con **Ombra del Portico** (credit in footer) e l'identità visiva è costruita attorno al binomio **giallo sodio × nero grunge**.

---

## Sources

- **Codebase Django** (locale, mounted): `FestivalDuro/festival_duro/`
  - `templates/` — base layout, home, line-up, info, band detail, privacy, cookie
  - `static/css/main.css` — 857 righe, sistema grafico completo
  - `static/img/` — logo in tutte le varianti, corner ornaments, grunge texture, hero bg, poster
  - `static/fonts/` — Rubik Mono One, Bungee Inline, Inter 400/600/700 (tutti self-hosted)
- **Asset originali**: `FestivalDuro/assets-originali/` — poster social (copertina FB, post 4th, comunicazioni), reel/stories video, cartella `loghi/`.
- **GitHub repo** di riferimento: `DrQuatermass/FestivalDuro` (non letto — abbiamo già tutto in locale).
- **Upload utente**: `uploads/locandina.png`, `uploads/comunicazioni.png`, `uploads/copertina fb duro 4th.png`, `uploads/duro 4th cop ev. fb.png`, `uploads/duro 4th post.png`, `uploads/img profilo social.png`.

## Prodotti rappresentati

1. **Sito web marketing** (festivalduro.it) — unico surface digitale. Django + template HTML, mobile-first, pagine: Home, Line-up, Info & Venue, Band detail, Privacy/Cookie.
2. **Social kit** — poster 4:5 per Instagram/Facebook, cover eventi FB 16:9, reel/stories video. Sharing unica visual language con il sito.

---

## Content fundamentals

La lingua è **italiano**, colloquiale ma marcato. Voce di band/crew che parla alla propria gente, non di agenzia.

- **Tono**: punk-rock, diretto, un pelo sfottente. "Vieni a vivere l'esperienza più intensa dell'estate modenese." "Restate connessi sui nostri canali social." "Vi aspettiamo!"
- **Persona**: **noi → voi** (plurale). "Vi aspettiamo", "restate connessi", "tutto quello che ti serve" (singolare ammesso sui CTA informativi).
- **Casing**:
  - Titoli display, bottoni, nav, kicker, label, FAQ summary, band card name → **UPPERCASE**. Sempre.
  - Copy body → **Sentence case** normale, italiano corretto, accenti giusti (è, à, ù, più).
- **Numerali**: ordinali con il piccolo "ª" (4ª Edizione), "4TH ED." nel poster, date estese in lowercase sui card ("venerdì 5 giugno"). Mai `#4` o `IV`.
- **Payoff/slogan**: `'Hard Rock, Harder Cock' — O.E.E.` è un easter-egg stampato piccolo: usarlo solo dove il brand già lo mostra (poster, merch), **non** in copy istituzionale/SEO.
- **Punteggiatura**: trattino lungo " — " come separatore ritmico ("4TH ED. — VENERDÌ E SABATO"). Mai smart quotes giornalistiche; sì apostrofi dritti negli slogan ('Hard Rock').
- **Call to action**: verbi imperativi brevi → "Vedi line-up", "Biglietti", "Apri mappa", "Scopri di più", "Salta al contenuto".
- **Emoji**: **mai**. Il brand è rigorosamente nero/giallo; emoji rovinano il mood. Unicode decorativi: solo `&amp;` (reso come "&") e la freccia `←` sul back-link.
- **SEO / meta**: Schema.org `MusicFestival`, `og:locale = it_IT`. Descrizioni sobrie, factual, con città + date.
- **Esempi di copy "good"**:
  - *"Festival Duro torna per la sua quarta edizione: due serate imperdibili di musica live, energia e adrenalina."*
  - *"La line-up sarà annunciata a breve. Resta connesso sui nostri canali social per tutti gli aggiornamenti!"*
  - *"Per info, prenotazioni o richieste di backstage scrivi a **info@festivalduro.it**"*

---

## Visual foundations

Il sistema è **brutalist-punk**: alto contrasto, bordi neri spessi, shadow offset dure, texture grunge, niente gradient, niente vetrosità. Il giallo è la voce; il nero è la struttura.

### Palette

| Token | Hex | Uso |
|---|---|---|
| `--duro-yellow` | `#ffd400` | Sfondo primario, accent, fg su nero |
| `--duro-black`  | `#050505` | Testo, bordi, sfondo scuro (leggermente più morbido di #000) |
| `--duro-bone`   | `#f5f1e6` | Testo secondario su nero, fondo card chiare |
| `--duro-grey`   | `#898989` | Meta, footer bottom, hairline |
| `#ffffff` | white puro | Panel interno sotto hero (sezioni home/info) |

Niente altri colori. Niente "success green", niente "danger red". Se serve un errore, si usa il nero su giallo con label UPPERCASE.

### Type

Tre famiglie, ciascuna con un ruolo chiaro:

- **Rubik Mono One** (`--font-display`) → H1/H2/H3, bottoni, kicker, nav, band name, FAQ summary. UPPERCASE. Mono-width, geometrica, perfetta per il feel "stencil da poster".
- **Bungee Inline** (`--font-decor`) → riservata a decor/motif (es. overlay "Music Fest"). Evitare in body.
- **Inter** 400/600/700 (`--font-body`) → tutto il body, lead, meta, footer. Mai maiuscolo tranne label/meta.

Scala: fluid `clamp()`, H1 `clamp(2.2rem, 7vw, 5.5rem)`, H2 `clamp(2rem, 5vw, 3.5rem)`, H3 `clamp(1.15rem, 2.5vw, 1.6rem)`, body 16px / 1.55.

Tracking: display = 0 (già robusta), kicker 0.14em, label/nav 0.12em. Mai tracking negativo.

### Backgrounds & motifs

- **Piatto**: sfondi solidi giallo o nero. Niente gradient ambientali. Niente blur.
- **Full-bleed grunge**: `hero-bg.jpg` (giallo + silhouette lampioncini/tree/chitarra/mic) è l'immagine totem del brand. Va usata sul `<hero>` della home, non generalizzata.
- **Texture grunge overlay**: `hero-grunge.png` può essere sovrapposto con `mix-blend-mode: multiply` o `opacity: 0.15–0.3` per dare un "graffio" sporco.
- **Ornament fissi**: `hero-ornament-top.png` (ghirlanda di luci + chioma), `hero-ornament-bottom.png` (terreno stracciato), `hero-corner-*` (angoli decorati). Usare per impaginare eventi/social.
- **Pattern ripetuti**: **no**. L'identità è fotografica/silhouette, non geometrica.

### Imagery

- Foto band e folla in **bianco & nero ad alto contrasto**, spesso strappate/tagliate con bordi irregolari su sfondo giallo (cfr. `poster-duro-4th-post.png`).
- Polaroid-style: card fotografica bianca con shadow offset, inclinata `transform: rotate(±2deg)`.
- Niente foto warm/stock. Niente illustrazioni "friendly". Silhouette rock (mic, guitar, drum kit, festoni, alberi) — già presenti come PNG pronti.

### Layout & borders

- **Bordi neri spessi** ovunque: `4px` sui card (`band-card`, `info-card`), `5px` sui panel (`festival-panel`), `3px` sui bottoni, `2px` per hairline/nav.
- **Shadow brutaliste**: offset solido nero, niente blur — `7px 7px 0 #050505` → `14px 14px 0 #050505` (grandezza in base alla scala).
- **Radii**: **0**. Tutto squadrato. Solo eccezione: chip/tag molto piccole (fino a 2px). Corner arrotondati sono off-brand.
- **Max-width**: `1160px`. Gutter fluida `clamp(1rem, 4vw, 2rem)`. Sezioni con padding verticale `clamp(4rem, 8vw, 6.75rem)`.
- **Sezioni alternate**: giallo → bianco → nero. Le sezioni dark (`--section-dark`) hanno heading in `bone`, meta in `grey`.

### Cards

- Band card: bordo nero 4px, padding 1.25rem, foto 16:11 che sfora fino al bordo (margin negativo), nome H3 display uppercase, meta grey uppercase 700.
- Info card: bordo nero 4px, fondo giallo, padding 2rem.
- Panel "Il Festival" (`festival-panel`): bianco, bordo nero 5px, locandina dentro un frame giallo con `box-shadow: 14px 14px 0 #050505`.
- Polaroid (social kit): bianco puro, padding 12–16px attorno all'immagine, rotate leggero, shadow morbida opzionale.

### Buttons

- **Primary** (`.btn`): bg nero, fg giallo, bordo 3px nero, `min-height: 54px`, padding `.95rem 1.45rem`, font display `.88rem`, `letter-spacing: .12em`.
- **Ghost** (`.btn--ghost`): bg trasparente, fg nero, bordo nero; hover inverte (bg nero / fg giallo).
- Hover: `transform: translateY(-2px)` su 180ms `ease`. Niente cambio di colore sul primary. Press: nessuno stato dedicato — la hover-lift basta.
- Focus: bordo già visibile; aggiungere `outline: 3px solid var(--duro-yellow); outline-offset: 3px;` se serve su dark.

### Motion

- Veloce e funzionale: 120–260ms, `ease` / `ease-out`. Mai bounce/elastic.
- Transitions only: opacity, transform (translate + rotate molto leggero). Niente parallax automatico.
- Respect `prefers-reduced-motion`: tutto a `0.01ms`.

### Hover/press states

- **Link navbar / social / legal / credits**: hover → `color: var(--duro-bone)` (da giallo). Nessun underline aggiunto.
- **Band card**: hover → `translateY(-3px)`. Niente overlay.
- **Ghost button**: hover → inversione bg/fg completa.
- **Press**: nessuna scala dedicata. Il design non ha "squish".

### Transparency & blur

- Quasi **mai**. Due eccezioni storiche nel CSS:
  - `rgba(5,5,5,.96)` sui meta del hero (quasi opaco, solo per evitare banding).
  - `rgba(255,212,0,.2)` come hairline del footer su nero.
- **Mai** `backdrop-filter`, mai glass-morphism.

### Layout rules / fixed elements

- **Header sticky** in nero, bordo bottom 4px giallo, altezza min 76px (68 su mobile).
- **Skip link** a `top: 0` con bg nero/fg giallo, visibile solo in focus.
- Footer sempre in nero.
- Grid footer: logo stack + 3 colonne (Quando / Dove / Social). Collassa in single column `< 820px`.
- Nessun overlay sticky (cookie banner non è implementato nel codice; se arriva, segue lo stile `.kicker`).

---

## Iconography

**FestivalDuro non usa un icon set.** Il linguaggio visivo è **silhouette nero su giallo** — disegni grandi, quasi cartoloni, non icone UI.

- **Silhouette assets** presenti come PNG (copia in `assets/`): microfono vintage, headstock di chitarra, batteria, cassa/ampli, alberi/chioma, ghirlanda di lampadine (party lights), folla, suonatori. Sono composti a mano dentro `hero-bg.jpg`, poster e cover. **Non** sono SVG; non vanno rielaborati.
- **Icone UI propriamente dette**: praticamente assenti. L'unica in repo è il "burger" del nav mobile, disegnato con 3 `<span>` neutri. Il back-link usa `&larr;` (freccia unicode).
- **Social icons**: il sito lista i social come **testo** ("Instagram", "Facebook", "YouTube"), **non** con glifi. Mantenere così.
- **Emoji**: **mai**, vedi sopra.
- **Se servono icone UI aggiuntive** (es. per un admin panel futuro): ripiegare su **Lucide** (CDN, `stroke-width: 2`, monocolore nero o giallo). Segnalare esplicitamente la sostituzione in code review.
- **Loghi**: 4 varianti principali — yellow wide / yellow stack / black wide / black stack + la variante "yellow on black" per social avatar. Sceglie wide su header orizzontale, stack su footer e social square. Il lockup include il "glitch" orizzontale (scan-line) che rompe le lettere.

---

## Index / Manifesto

Root files:
- `README.md` — questo file
- `SKILL.md` — manifest per riuso come Agent Skill
- `colors_and_type.css` — CSS vars (brand + semantiche) + basi tipografiche
- `fonts/` — Rubik Mono One, Bungee Inline, Inter 400/600/700 (woff2)
- `assets/` — logo, hero bg, corner ornaments, grunge texture, locandina, poster social, favicon

Folders:
- `preview/` — card HTML mostrate nella tab Design System (type, colors, spacing, components, brand)
- `ui_kits/website/` — ricreazione pixel-perfect del sito festivalduro.it (Home, Line-up, Info, Band detail)

---

## Caveats & known substitutions

- **Nessuna sostituzione di font**: tutti i woff2 originali sono stati copiati dal codebase. Ottimo.
- **Non abbiamo letto il repo GitHub** `DrQuatermass/FestivalDuro` — avevamo già la copia locale completa, con CSS/template/asset. Se è cambiato di recente, va risincronizzato.
- **Niente app mobile o dashboard admin custom**: il solo surface digitale è il sito marketing. L'UI kit è quindi single-product.
- **Niente icon font**: confermato. Se il futuro prodotto (es. form biglietti, area artisti) richiederà icone, va introdotto **Lucide** come fallback.
- **Nessun sistema di ticketing integrato**: i CTA "Biglietti" puntano a un URL esterno (campo `edizione.biglietti_url`).
