# Termora Studio — Implementation Specification

## 1. Technical Stack & Dependencies
- **Runtime & Bundler**: Node.js v24+, Vite 6, ES Modules
- **UI Framework**: React 18 / 19
- **Styling**: Tailwind CSS 3.4 with custom monospace & color tokens
- **Icons**: Lucide React
- **Syntax Highlighting**: Prism-compatible lightweight formatting with clipboard feedback

---

## 2. Component Catalog Specification

| Component | Category | Status | Supported Configs | Interactive Features |
|---|---|---|---|---|
| `select` | Prompts | Verified Spec | `message`, `options`, `defaultIndex`, `loop` | Keyboard ↑/↓, Enter, click selection |
| `input` | Prompts | Verified Spec | `message`, `default`, `placeholder`, `validate` | Focus, typing, enter to submit |
| `multiselect` | Prompts | Verified Spec | `message`, `options`, `min`, `max`, `defaults` | Space to check, ↑/↓, Enter |
| `confirm` | Prompts | Verified Spec | `message`, `default` (true/false) | Y/N or Enter to select |
| `password` | Prompts | Verified Spec | `message`, `mask` (`*`, `•`) | Masked typing, show/hide toggle |
| `autocomplete`| Prompts | Verified Spec | `message`, `options`, `limit` | Live filter matching options |
| `spinner` | Progress | Verified Spec | `text`, `style` (`dots`, `line`, `arc`, `arrow`), `color` | Start, pause, succeed, fail triggers |
| `progressBar` | Progress | Verified Spec | `total`, `current`, `width`, `format`, `completeChar` | Slider control, auto-increment toggle |
| `box` | Layout | Verified Spec | `content`, `title`, `borderStyle` (round, single, double), `padding`, `borderColor` | Real-time border & padding recalculation |
| `banner` | Layout | Verified Spec | `title`, `subtitle`, `badge`, `align` | Visual banner header with accents |
| `table` | Data Display | Verified Spec | `columns`, `rows`, `borderStyle`, `alignments` | Column sorting, border switches |
| `colors` | Styling | Verified Spec | `foreground`, `background`, `modifier` (bold, dim, italic, underline) | Real-time ANSI style matrix preview |

---

## 3. Code Generation Engine

The code generator generates standard ES Module and CommonJS code.

Example output format for `select`:
```javascript
import { select } from "termora";

const chosen = await select({
  message: "Choose your deployment target",
  options: [
    { label: "Production (us-east)", value: "prod-us" },
    { label: "Staging (eu-central)", value: "staging-eu" },
    { label: "Local Emulator", value: "local" }
  ],
  defaultIndex: 0
});

console.log(`Selected target: ${chosen}`);
```

---

## 4. Quality & Verification Gates
1. **Visual Fidelity**: Dark theme with high contrast, true monospace grid alignment, authentic terminal titlebar.
2. **Keyboard Accessibility**: Terminal simulators respond to ArrowUp, ArrowDown, Space, Enter, Tab.
3. **Code Copying**: Every code block features instantaneous clipboard copy with toast feedback.
4. **Zero Broken Links**: All navigation tabs (`Home`, `Components`, `Playground`, `Documentation`, `Installation`) route seamlessly with URL hash/history support.
5. **Clean Production Build**: Zero compilation errors or unresolved module paths.
