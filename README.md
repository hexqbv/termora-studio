# Termora Studio

> **Interactive Developer Playground & Documentation Platform for Termora CLI Toolkit**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)
[![Node Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen.svg)](#requirements)
[![Vite 6](https://img.shields.io/badge/Bundled%20with-Vite%206-646CFF.svg)](https://vitejs.dev/)
[![React 19](https://img.shields.io/badge/UI-React%2019-61DAFB.svg)](https://react.dev/)

Termora Studio is a browser-based developer playground, documentation platform, and interactive showcase for **Termora**, a JavaScript toolkit for building interactive, polished command-line applications in Node.js.

---

## Features

- **Interactive Terminal Playground**:
  - Full client-side terminal simulator with ANSI styling and true monospace alignment.
  - Interactive prompts (`select`, `input`, `multiselect`, `confirm`, `password`, `autocomplete`).
  - Progress indicators (animated `spinner`, customizable `progressBar`).
  - Layout components (`box` with round, double, single borders; `banner`).
  - Tabular data display (`table` with dynamic column alignment).
  - Styling matrix (`colors` ANSI utility).
- **Dynamic JavaScript Code Generator**:
  - Synchronous generation of runnable Node.js code snippets reflecting real-time configuration changes.
  - Dual support for modern **ES Modules** (`import`) and **CommonJS** (`require`).
  - One-click clipboard copying.
- **Hero Interactive Scaffolding Wizard**:
  - Live interactive CLI demo directly in the hero section supporting keyboard navigation and task simulation.
- **Comprehensive Technical Documentation**:
  - Deep-dive guides covering raw TTY mode, ANSI escapes, cursor management, and non-interactive CI/CD degradation.
  - Full API specifications for all 12 primitives with configuration parameters and return types.
  - Real-world production recipes (project scaffolder, cloud deployment CLI).
- **Component Catalog**:
  - Filterable, searchable directory of all primitives with status badges and quick-launch links.
- **Dedicated Installation Hub**:
  - Package manager commands for `npm`, `pnpm`, `yarn`, and `bun`.
  - Smoke test verification scripts.

---

## Tech Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS with custom terminal color tokens (`term-cyan`, `term-green`, `dark-950`)
- **Icons**: Lucide React
- **Architecture**: Single Page Application with deep-linked hash routing (`#playground`, `#components`, `#docs`, `#install`)
- **Deployment**: Vercel configuration included (`vercel.json`)

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser.

### 3. Run Test Suite
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```
The compiled assets will be placed in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## Project Structure

```text
├── dist/                     # Optimized production bundle
├── public/
│   └── favicon.svg           # Terminal SVG icon
├── src/
│   ├── components/
│   │   ├── common/           # Badge, Button, CodeBlock, Tabs
│   │   ├── layout/           # Navbar, Footer
│   │   ├── playground/       # Sidebar, Config, Preview, CodeOutput
│   │   └── terminal/         # TerminalWindow, BoxRenderer, TableRenderer, PromptRenderer, HeroTerminalDemo
│   ├── data/
│   │   ├── components.js     # Component schemas, presets, and code generators
│   │   ├── documentation.js  # Structured documentation articles
│   │   └── examples.js       # Real-world CLI scripts
│   ├── pages/
│   │   ├── Home.jsx          # Landing page with interactive hero
│   │   ├── Playground.jsx    # 3-column component playground
│   │   ├── Components.jsx    # Component directory & search
│   │   ├── Documentation.jsx # Documentation browser
│   │   └── Installation.jsx  # Installation guide & smoke tests
│   ├── styles/
│   │   └── index.css         # Tailwind & terminal scrollbar styles
│   ├── App.jsx               # Application router & hash state
│   └── main.jsx              # React DOM entrypoint
├── ARCHITECTURE.md           # System architecture specification
├── IMPLEMENTATION.md         # Implementation details & API tables
├── PLAN.md                   # Phased execution roadmap
├── package.json
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

---

## Deployment to Vercel

Termora Studio is pre-configured for instant zero-configuration deployment to Vercel:

1. Push this repository to GitHub or GitLab.
2. Import the project in Vercel.
3. Vercel automatically detects the Vite build configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy! The included `vercel.json` ensures all route rewrites resolve cleanly to `index.html`.

---

## License

MIT © Termora Project
