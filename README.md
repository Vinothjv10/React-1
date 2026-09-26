# Vinoth J — Portfolio

Personal portfolio built with React (Create React App), GSAP and Three.js.

## Run locally

```bash
npm install
npm start          # http://localhost:3000
npm run build      # production bundle in build/
```

Requires Node 18+.

## What's in the box

- **Sections** — `src/components/*`: video intro, bio, about, timeline, experience workbench, portfolio, contact, footer.
- **3D background** — `src/components/background/ParticleBackground.jsx`: site-wide floating glow particles (Three.js) that react to mouse and scroll and recolour with the theme.
- **Theme** — `src/context/ThemeContext.jsx` + `src/components/themeToggle/`: dark by default, light via the top-right toggle, persisted in `localStorage`, applied before first paint by `public/index.html`.
- **Effects** — `src/components/effects/Cursor.jsx` (trailing cursor ring), `src/hooks/useMagnetic.js` (magnetic buttons), `src/hooks/useTilt.js` (card tilt + pointer-following glow).
- **Smooth scrolling** — `src/hooks/useLenis.js`: Lenis synced to GSAP ScrollTrigger. It never blocks or redirects input.
- **Design tokens** — `src/index.css`: `--color-*`, `--fg-rgb` / `--bg-rgb` for alpha overlays, glass tokens, and the light-theme overrides.

Every effect checks `prefers-reduced-motion` and, where relevant, `pointer: fine`, so touch and reduced-motion users get a static, fully usable page.

## Theming component CSS

Use `rgba(var(--fg-rgb), a)` for text/border overlays and `rgba(var(--bg-rgb), a)` for glass backgrounds instead of hard-coded white/black alphas — that is what makes a rule work in both themes. `var(--color-primary)` is the accent; it darkens slightly in light mode for contrast. The video intro is intentionally always dark.

## Contact form

The form uses EmailJS; the public service/template/key IDs live in `src/components/contact/Contact.jsx`.

## Deploy

Static output in `build/`. Netlify: build command `npm run build`, publish directory `build`. Vercel: framework preset "Create React App".
