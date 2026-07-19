# BUNT — Design System

> Die verbindliche Vorgabe für alles Visuelle auf **www.Bunt.onion**.
> Zentrale Anlaufstelle von *prod by louis*: Releases zeigen, Dateien (Samples,
> Artwork, Sessions) zum Download anbieten, Links bündeln, optional Beats/Merch.

---

## 1. Prinzipien

1. **Dunkel & atmosphärisch.** Fast-schwarzer, kühl-violetter Grund. Die Kunst
   (Cover, Wordmarks) leuchtet, die UI tritt zurück.
2. **Ein Akzent pro Release.** Das Grundsystem ist neutral; jede Veröffentlichung
   bekommt *eine* Akzentfarbe (`--bunt-accent`). Glow, Ränder und Soft-Fills
   leiten sich automatisch daraus ab.
3. **Tor zuerst.** Reines HTML + CSS. **Nichts** darf JavaScript zum Funktionieren
   brauchen (viele Besucher fahren Tor im „Safest"-Modus ohne JS). Kein externer
   Request: Schriften und Assets werden **selbst gehostet**, Texturen sind in CSS
   generiert.
4. **Download ist ein Erstklasse-Feature.** Datei-Zeilen, Größen, Typen und
   Hashes sind eigene Komponenten, nicht Beiwerk.
5. **Blackletter nur als Bild.** Die getorturte Metal-Typo ist Artwork und wird
   als Bild-Asset ausgeliefert. Alle *lesbaren* Texte laufen in einer klaren
   Sans (`--bunt-font-ui`).

---

## 2. Dateien

| Datei | Zweck |
|---|---|
| `design-system/tokens.css` | Alle Design-Tokens (Farbe, Typo, Space, Radius, Glow, Motion) |
| `design-system/themes.css` | Release-Akzent-Klassen (`.theme-void`, `.theme-ash`, …) |
| `design-system/bunt.css`   | Basis-Reset + alle Komponenten |
| `design-system/styleguide.html` | Lebender Styleguide zum Anschauen/Testen |

**Ladereihenfolge:** `tokens.css` → `themes.css` → `bunt.css`.

```html
<link rel="stylesheet" href="/design-system/tokens.css">
<link rel="stylesheet" href="/design-system/themes.css">
<link rel="stylesheet" href="/design-system/bunt.css">
```

---

## 3. Farbe

Alle Werte als CSS-Custom-Properties in `tokens.css`. Nie Hex-Werte direkt im
Markup schreiben — immer Tokens verwenden.

| Rolle | Token | Wert |
|---|---|---|
| Seiten-Hintergrund | `--bunt-bg` | `#0b0910` |
| Panel / Footer | `--bunt-bg-2` | `#100d16` |
| Karte | `--bunt-surface` | `#17131f` |
| Karte erhöht / Hover | `--bunt-surface-2` | `#1f1a29` |
| Input / Chip | `--bunt-surface-3` | `#2a2336` |
| Linie | `--bunt-line` | `#2a2434` |
| Linie stark | `--bunt-line-strong` | `#3b3350` |
| Text | `--bunt-text` | `#ece9f1` |
| Text sekundär | `--bunt-text-muted` | `#a49cb5` |
| Text schwach | `--bunt-text-faint` | `#6f6880` |
| **Akzent (Default)** | `--bunt-accent` | `#8a3ffb` (void purple) |

**Abgeleitete Akzent-Töne** (nicht manuell setzen): `--bunt-accent-soft`,
`--bunt-accent-line`, `--bunt-accent-hover`, `--bunt-glow`. Sie nutzen
`color-mix()` (unterstützt ab Firefox 113 / Tor Browser ESR 128+).

### Release-Themes
Genau **eine** Klasse auf `<body>` (ganze Seite) oder auf `.release` (einzelne
Karte) setzt den Akzent:

```html
<body class="theme-void">
<article class="release theme-ash">
<section style="--bunt-accent:#ff2d55">   <!-- Einzelfall -->
```

Verfügbar: `theme-void` (Lila), `theme-ash` (Cyan), `theme-blood` (Rot),
`theme-toxic` (Grün), `theme-gold` (Amber), `theme-frost` (Blau),
`theme-bone` (Off-White). Neues Release = eine Zeile in `themes.css`.

**Kontrast-Regel:** Ein neuer Akzent muss als Text auf `--bunt-bg` ≥ 4.5:1
erreichen. Sehr helle/dunkle Töne nur als Fläche, nicht als Fließtext.

---

## 4. Typografie

| Rolle | Token | Einsatz |
|---|---|---|
| Display | `--bunt-font-display` | **Nur** Wordmark/Logo, wenn kein Bild-Asset genutzt wird |
| UI | `--bunt-font-ui` | Alle lesbaren Texte (Default: Inter → System-Sans) |
| Mono | `--bunt-font-mono` | Dateinamen, Größen, Hashes, technische Meta |

Selbst-Hosten für markengetreue Darstellung (Tor lädt keine Google Fonts):

```css
@font-face{ font-family:"Inter"; src:url("/fonts/Inter.woff2") format("woff2");
  font-weight:100 900; font-display:swap; }
```

**Typo-Skala** (fluid, `clamp()`): `--bunt-text-xs` … `--bunt-text-4xl`.
Klassen: `.bunt-h1/2/3`, `.bunt-lead`, `.bunt-eyebrow` (Uppercase-Overline in
Akzentfarbe), `.bunt-mono`, `.bunt-wordmark`.

---

## 5. Space, Radius, Glow

- **Space:** 4-px-Basis, `--bunt-space-1` (4) … `--bunt-space-9` (96). Keine
  krummen Pixelwerte im Markup.
- **Radius:** `sm 6` · `md 10` · `lg 16` · `xl 22` · `pill 999`.
  Buttons/Links = Pill, Karten = `lg`, Inputs/Icons = `md/sm`.
- **Glow** ist die Signatur (das „Licht hinter dem Logo"): `--bunt-glow-sm/md/lg`.
  Sparsam auf Hover, Primär-Buttons und Cover-Halos. Nie auf Fließtext.

---

## 6. Komponenten (Klassen-API)

Alle Klassen sind mit `bunt-` präfixiert (BEM-artig: `Block__element--modifier`).

| Komponente | Klasse | Notiz |
|---|---|---|
| Container | `.bunt-container` (`--tight`) | max 1200 / 820 px, zentriert |
| Layout | `.bunt-section` `.bunt-stack` `.bunt-row` `.bunt-grid` | Grid = auto-fill min 240px |
| Header/Nav | `.bunt-header` `.bunt-nav` | sticky, blur, `aria-current="page"` |
| Hero | `.bunt-hero` | Wordmark + Tagline zentriert |
| Button | `.bunt-btn` + `--primary/--ghost/--quiet` `--sm` `--block` | Pill, Uppercase |
| Badge | `.bunt-badge` (`--accent`, `data-type="wav\|png\|zip…"`) | Dateityp-Chips |
| Karte | `.bunt-card` `.bunt-card__body` | generische Fläche |
| Release | `.release` `__cover` `__body` `__title` `__meta` `__actions` | Cover-Halo im Akzent |
| Datei-Zeile | `.bunt-file` `__icon` `__name` `__sub` `__size` | Download-Liste |
| Player | `.bunt-player` + natives `<audio controls>` | **kein JS** |
| Link-Hub | `.bunt-links` `.bunt-link` `__arrow` | Pill-Buttons, Hover-Glow |
| Input | `.bunt-input` | Suche / Newsletter |
| Footer | `.bunt-footer` | |
| Utilities | `.bunt-divider` `.bunt-center` `.bunt-glow` `.bunt-sr-only` | |

Vollständige, live gerenderte Beispiele: **`design-system/styleguide.html`**.

---

## 7. Barrierefreiheit & Tor

- **Fokus** ist immer sichtbar (`:focus-visible`, 2 px Akzent-Outline). Nicht
  entfernen.
- **Reduced Motion** wird respektiert (Tokens fallen auf ~0 ms).
- **Kein JS-Zwang:** Player = natives `<audio>`; Navigation = echte `<a href>`;
  Downloads = echte `href`/`download`. JS nur als *Progressive Enhancement*.
- **Kein externer Request:** keine CDN-Fonts, keine Remote-Bilder, keine
  Analytics. Alles same-origin.
- **Semantik:** `<header> <nav> <main> <article> <footer>`, ein `<h1>` pro Seite,
  `alt`-Texte auf Cover-Artwork.

---

## 8. Do / Don't

**Do**
- Akzent über `--bunt-accent` / `theme-*` setzen und alles andere ableiten lassen.
- Dateinamen, Größen, Hashes in Mono.
- Glow als Akzent, nicht als Dauerzustand.

**Don't**
- Keine Hex-Werte oder rohen px-Abstände im Markup — nur Tokens.
- Blackletter nicht für Lauftext (nur als Bild-Wordmark).
- Kein Feature, das ohne JavaScript kaputtgeht.
- Mehr als eine Akzentfarbe pro Ansicht.
