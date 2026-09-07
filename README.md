# StuPaper — Vite + React

Questo progetto è la conversione da **Next.js** a **Vite + React** dell'app
originale [StuPaper](https://github.com/workmgfloriello/StuPaper).

## Come avviare

```bash
npm install
npm run dev       # dev server su http://localhost:3000
npm run build     # build di produzione in ./out
npm run preview   # anteprima della build
```

Per Electron (invariato nell'uso):

```bash
npm run electron:dev   # avvia Vite + Electron in sviluppo
npm run dist            # build + electron-builder
```

## Cosa è cambiato rispetto all'originale Next.js

- **Routing**: il routing a cartelle di Next (`app/page.tsx`, `app/corsi/page.tsx`, ecc.)
  è stato sostituito con `react-router-dom` (`BrowserRouter`/`Routes`) in `src/App.tsx`.
  Le pagine sono ora in `src/pages/`.
- **`next/link` e `usePathname`** → `Link` e `useLocation` di `react-router-dom`
  (in `src/components/Sidebar.tsx`).
- **`next/font/google`** → font Google (Geist, Geist Mono, Plus Jakarta Sans)
  caricati via `<link>` in `index.html`, con le stesse variabili CSS di prima.
- **Export PDF**: la vecchia API route `app/api/export-pdf/route.ts` usava
  **Puppeteer** lato server (richiede un backend Node). Vite produce una SPA
  puramente client-side e non ha route server, quindi l'export PDF è stato
  riscritto in `src/editor/extension/FileManager.ts` per generare il PDF
  interamente nel browser con **html2pdf.js** (già presente tra le dipendenze
  originali). Il pacchetto `puppeteer` non è più necessario ed è stato rimosso.
- **Service Worker / PWA**: `app/sw.ts` (basato su `@serwist/next`) è stato
  sostituito da **`vite-plugin-pwa`**, configurato in `vite.config.ts` per
  usare direttamente `public/manifest.json`.
- **Tailwind CSS v4**: prima veniva applicato via PostCSS
  (`postcss.config.mjs` + `@tailwindcss/postcss`), ora tramite il plugin
  ufficiale **`@tailwindcss/vite`**.
- **Alias `@/`**: puntava alla root del progetto (`@/app/...`), ora punta a
  `src/` (`@/...`), configurato sia in `vite.config.ts` che in `tsconfig.app.json`.
- **Output di build**: `vite build` genera l'app in `./out` (stesso nome
  cartella usato prima da `next build` con `output: "export"`), così
  `electron/main.ts` non ha dovuto cambiare il percorso di `loadFile`.
- **Elettron**: solo la porta del dev server è stata aggiornata (Vite usa la
  3000, la stessa di `next dev`), e corretto un refuso preesistente
  (`preload.ts` → `preload.js`, il file reale nel progetto).

### Dipendenze mancanti nell'originale (corrette qui)

`app/editor/Editor.tsx` importava `@tiptap/extension-horizontal-rule` e
`highlight.js`, entrambe usate ma **non dichiarate** nel `package.json`
originale. Sono state aggiunte come dipendenze qui.

## Struttura

```
src/
  App.tsx              # routing + provider (ex layout.tsx)
  main.tsx             # entry point (ex bootstrap implicito di Next)
  index.css            # ex globals.css
  pages/                # ex app/*/page.tsx
  components/
  editor/
  lib/
  interface/
electron/
public/
```

## Nota

Non ho modificato la logica applicativa preesistente (es. un componente in
`LastNotes.tsx` ha una funzione chiamata `notes` invece di `Notes`, che
`react-hooks/rules-of-hooks` segnala in lint ma funziona a runtime perché è
un default export rinominato in fase di import). Il task era migrare il
framework, non correggere la logica di business.
