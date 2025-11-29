# Copilot / AI Agent Instructions — Advent repo

This repository is a React + Vite web-based Advent Calendar. The Go TUI version has been removed; all code and instructions now apply only to the React app in `src/`.

The goal of these instructions is to give an AI coding agent immediate, actionable context for productive edits.

**Big Picture**

- The app is in `src/`:
  - `src/data/doors.js` — canonical door data: `characterType` and `message` arrays (length 24).
  - `src/components/` — UI components: `Door.jsx`, `DoorModal.jsx`, `Character.jsx`. CSS is colocated as `*.css` next to components.
  - `package.json` and `vite.config.js` control dev, build and deployment behavior (note `base` uses `GITHUB_PAGES` env var).

**Where to make changes (examples)**

- Change messages/character types: edit `src/data/doors.js`. Keep the arrays at length 24; elements are positionally matched (index -> day).
- Change component styling: edit the CSS files alongside components in `src/components/`.

**Commands / Workflows**

- Install: `npm install`
- Start dev server: `npm run dev` (Vite, usually serves at `http://localhost:5173`).
- Build: `npm run build`
- Preview production build: `npm run preview`
- GitHub Pages build (used by CI): `npm run build:gh` (sets `GITHUB_PAGES=true` so `base` becomes `/advent/`).
- Deploy (local): `npm run deploy` (runs `build:gh` then `gh-pages -d dist`).

**Project-specific conventions / patterns**

- Door/Day mapping is position-based: index 0 => Day 1, index 23 => Day 24. Keep arrays aligned when adding/removing items.
- In React components, CSS files are component-scoped by filename (e.g. `Door.jsx` ↔ `Door.css`), so prefer editing the component CSS file for visual changes.

**Integration & external dependencies**

- Frontend dependencies are in `package.json` (React, Framer Motion, Vite). Use `npm install` to manage them.

**Small implementation notes / gotchas**

- The Vite `base` path is toggled by `process.env.GITHUB_PAGES` in `vite.config.js`. CI/Actions or local `build:gh` set that to `true`.
- There are no automated tests in this repo; validate visually by running `npm run dev` for the web UI.

**If you're editing the repo as an AI**

- Make minimal, focused changes and include a short rationale in the PR description.
- Preserve the 24-entry contract in `src/data/doors.js` unless you intentionally change the calendar length — then update all code that assumes 24 days (render loops, array lengths).
- When adding CSS or markup, follow the existing pattern of colocated CSS files per component.

If any of these areas are unclear or you want more examples (e.g., a sample PR that updates a single day's message), tell me which part to expand and I will iterate.
