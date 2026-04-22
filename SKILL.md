---
name: festival-duro-design
description: Use this skill to generate well-branded interfaces and assets for Festival Duro (festival musicale live indipendente a Modena), either for production or throwaway prototypes/mocks/social posts/poster layouts. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, social posts, poster layouts), copy assets out and create static HTML files for the user to view. If working on production code (the Django site), you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design — sito, post social, evento FB, poster, nuova pagina artisti, etc — ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key starting points:
- `README.md` — content fundamentals, visual foundations, iconography, caveats
- `colors_and_type.css` — CSS vars (brand + semantic) + typography base — import this first
- `fonts/` — Rubik Mono One, Bungee Inline, Inter (woff2)
- `assets/` — logos (yellow/black × wide/stack), hero backgrounds, ornaments (lights, trees, guitar, mic), posters
- `ui_kits/website/` — React recreation of festivalduro.it (Home, Line-up, Info, Band detail)
- `preview/` — individual token/component cards

Brand-critical rules (never break):
- Palette: `#ffd400` yellow × `#050505` black. No other colors.
- Type: Rubik Mono One for display/buttons/nav UPPERCASE; Inter for body. No Inter uppercase for headings.
- Borders are thick (2–5px black), corners are HARD (radius 0), shadows are BRUTALIST (offset solid black, no blur).
- No emoji, no gradients, no blur, no glass-morphism.
- Italian copy, imperative, plural "voi". Payoff `'Hard Rock, Harder Cock'` only on poster/merch.
