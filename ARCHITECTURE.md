# Termora Studio — Architecture Specification

## 1. Architectural Philosophy
Termora Studio is architected as a modern, high-performance client-side Single Page Application (SPA) designed to simulate the terminal runtime experience directly in the browser while maintaining zero arbitrary code execution risks.

Key tenets:
1. **Accurate Terminal Simulation**: The browser cannot execute Node.js `process.stdin.setRawMode` or ANSI escape sequences natively in a standard DOM without an emulator. We build a custom, ultra-lightweight Terminal Simulator component that accurately reproduces ANSI styles, box drawing characters, cursor behaviors, and interactive keyboard prompts.
2. **Deterministic Code Generation**: Playground controls manipulate a normalized configuration object that feeds both the simulator and a syntax-highlighted code generator, guaranteeing that the preview and the generated JavaScript code are always in 100% sync.
3. **Decoupled Package Integration Layer**: Termora API signatures are declared in a centralized metadata schema (`src/data/components.js` and `src/data/examples.js`). If the local or remote package is linked, an optional Node.js bridge can be plugged in without refactoring UI layers.

---

## 2. System Architecture

```text
┌────────────────────────────────────────────────────────┐
│                     Termora Studio                      │
└──────────────────────────────────┬─────────────────────┘
                                   │
         ┌─────────────────────────┼────────────────────────┐
         │                         │                        │
         ▼                         ▼                        ▼
┌──────────────────┐     ┌───────────────────┐    ┌──────────────────┐
│  Landing Page    │     │   Playground      │    │  Documentation   │
│  - Hero Demo     │     │   - State Engine  │    │  - Guide / Concepts
│  - Feature Grid  │     │   - Terminal View │    │  - API Reference │
│  - Quick Start   │     │   - Config Form   │    │  - Examples      │
└──────────────────┘     │   - Code Generator│    └──────────────────┘
                         └─────────┬─────────┘
                                   │
                         ┌─────────▼─────────┐
                         │ Terminal Engine   │
                         │ - ANSI Parser     │
                         │ - Keyboard Handler│
                         │ - Box Renderer    │
                         │ - Spinner / Gauge │
                         └───────────────────┘
```

---

## 3. Directory Layout

```text
termora-studio/
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── CodeBlock.jsx
│   │   │   ├── Tabs.jsx
│   │   │   └── SearchInput.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Container.jsx
│   │   ├── terminal/
│   │   │   ├── TerminalWindow.jsx
│   │   │   ├── TerminalText.jsx
│   │   │   ├── BoxRenderer.jsx
│   │   │   ├── TableRenderer.jsx
│   │   │   ├── SpinnerRenderer.jsx
│   │   │   └── PromptRenderer.jsx
│   │   └── playground/
│   │       ├── PlaygroundSidebar.jsx
│   │       ├── PlaygroundConfig.jsx
│   │       ├── PlaygroundPreview.jsx
│   │       └── CodeOutput.jsx
│   ├── data/
│   │   ├── components.js     // Centralized catalog of components & schemas
│   │   ├── documentation.js  // Structured docs content and API references
│   │   └── examples.js       // Full real-world CLI examples
│   ├── hooks/
│   │   ├── useTerminalState.js
│   │   ├── useCodeGenerator.js
│   │   └── useKeyboardNavigation.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Playground.jsx
│   │   ├── Components.jsx
│   │   ├── Documentation.jsx
│   │   └── Installation.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 4. Terminal Simulation Model

The Terminal Simulator maps Termora CLI primitives into interactive DOM elements with authentic terminal styling:

1. **Box Drawing**: Uses UTF-8 box characters (`┌─┐│└─┘`, `╭─╮│╰─╯`, `╔═╗║╚═╝`) with monospace column alignment.
2. **Interactive Prompts**: Supports arrow keys (`ArrowUp`, `ArrowDown`), `Space` (toggle multi-select), `Enter` (confirm selection), typing (text input and password masking), and `Escape` (cancel/clear).
3. **Spinner & Progress**: Driven by `requestAnimationFrame` and interval timers with customizable frame glyphs (`⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏`, `dots`, `line`, `arc`).
4. **ANSI Colors**: Standard 16-color ANSI palette mapped to curated Tailwind/HEX colors for optimal contrast and dark-mode elegance.

---

## 5. Security & Isolation
- No dynamic code evaluation (`eval`, `new Function`) is used anywhere.
- All user inputs are sanitized and escaped before rendering in the DOM or displaying in code outputs.
- No remote command execution; playground is purely sandboxed client-side.
