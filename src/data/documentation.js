// Documentation content structured into chapters and sub-sections

export const DOC_SECTIONS = [
  {
    id: 'introduction',
    title: 'Introduction',
    items: [
      { id: 'what-is-termora', title: 'What is Termora?' },
      { id: 'why-termora', title: 'Why Termora?' },
      { id: 'design-principles', title: 'Design Principles' },
    ]
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      { id: 'installation', title: 'Installation' },
      { id: 'quick-start', title: 'Quick Start' },
      { id: 'typescript', title: 'TypeScript Usage' },
    ]
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    items: [
      { id: 'terminal-rendering', title: 'Terminal Rendering & ANSI' },
      { id: 'raw-mode', title: 'TTY & Raw Mode Handling' },
      { id: 'cursor-management', title: 'Cursor & Line Rewriting' },
      { id: 'non-interactive-fallback', title: 'CI & Headless Fallbacks' },
    ]
  },
  {
    id: 'component-reference',
    title: 'Component Reference',
    items: [
      { id: 'ref-select', title: 'select()' },
      { id: 'ref-input', title: 'input()' },
      { id: 'ref-multiselect', title: 'multiselect()' },
      { id: 'ref-confirm', title: 'confirm()' },
      { id: 'ref-password', title: 'password()' },
      { id: 'ref-autocomplete', title: 'autocomplete()' },
      { id: 'ref-spinner', title: 'spinner()' },
      { id: 'ref-progress-bar', title: 'progressBar()' },
      { id: 'ref-box', title: 'box()' },
      { id: 'ref-table', title: 'table()' },
      { id: 'ref-colors', title: 'colors' },
    ]
  },
  {
    id: 'recipes',
    title: 'Real-World Recipes',
    items: [
      { id: 'recipe-scaffold', title: 'Interactive CLI Scaffolder' },
      { id: 'recipe-deploy', title: 'Cloud Deploy Wizard' },
      { id: 'recipe-monitor', title: 'Health Diagnostic Tool' },
    ]
  }
];

export const DOCS_CONTENT = {
  'what-is-termora': {
    title: 'What is Termora?',
    category: 'Introduction',
    badge: 'Core Guide',
    content: `Termora is an open-source, zero-bloat JavaScript toolkit for building interactive, ergonomic command-line interfaces (CLIs) in Node.js.

Traditionally, building modern CLI apps requires stitching together disparate packages: one library for color, one for interactive prompts, another for spinners, a third for progress bars, and yet another for box drawing. This often leads to dependency conflicts, excessive bundle weight, ANSI escape artifacts, and inconsistent keyboard handling.

Termora unites these primitives into a single, cohesive, and type-safe API that feels native to modern JavaScript and TypeScript developers.`
  },

  'why-termora': {
    title: 'Why Termora?',
    category: 'Introduction',
    content: `### Problems with traditional terminal libraries

1. **Fragmented Ecosystem**: Developers typically mix Inquirer, Chalk, Ora, Cli-Table, and Boxen. They evolve at different release cadences and use incompatible ESM/CJS interop patterns.
2. **Terminal Flicker**: Uncontrolled line overwriting leads to ugly jumping cursors and visual artifacts across different terminal emulators (iTerm2, Windows Terminal, Alacritty, VS Code integrated terminal).
3. **CI Pipeline Failures**: When prompts are triggered in non-interactive CI/CD pipelines (GitHub Actions, GitLab CI), unhandled TTY calls crash the process or hang forever waiting for nonexistent standard input.

### How Termora Solves This

- **Single Lightweight Dependency**: One coherent library with consistent option naming conventions.
- **Double-buffered ANSI Rendering**: Renders diffs between frames to eliminate terminal cursor flicker during rapid spinner and progress updates.
- **Automatic TTY Detection**: Gracefully degrades to non-interactive mode or reads environment variable defaults in headless pipelines.
- **First-Class ESM & CommonJS**: Dual-build distributions ensuring flawless imports in modern Node.js environments.`
  },

  'design-principles': {
    title: 'Design Principles',
    category: 'Introduction',
    content: `Termora adheres to strict UNIX philosophy guidelines tailored for modern developer experience:

- **Predictable Asynchronous Flow**: Every prompt returns a native standard \`Promise\` that resolves immediately upon user confirmation.
- **Graceful Signal Handling**: Handles \`SIGINT\` (Ctrl+C) cleanly without leaving terminal cursor hidden or raw mode active.
- **ANSI Escape Precision**: Emits standard VT100 / ANSI escape codes with automatic color depth negotiation (TrueColor 24-bit, 256 colors, or 16 colors).
- **Zero Heavy Native Addons**: Pure JavaScript implementation using standard Node.js core modules (\`readline\`, \`tty\`, \`process\`).`
  },

  'installation': {
    title: 'Installation',
    category: 'Getting Started',
    content: `Install Termora into your Node.js project using your package manager of choice:

\`\`\`bash
# Using npm
npm install termora

# Using pnpm
pnpm add termora

# Using yarn
yarn add termora

# Using bun
bun add termora
\`\`\`

### System Requirements
- Node.js >= 18.0.0
- Supports Linux, macOS, and Windows (PowerShell, Windows Terminal, CMD with ANSI support).`
  },

  'quick-start': {
    title: 'Quick Start',
    category: 'Getting Started',
    content: `Here is a complete, functioning CLI script demonstrating interactive prompts and spinners:

\`\`\`javascript
import { select, input, spinner, colors, box } from "termora";

console.log(box({
  title: "DevOps CLI",
  content: "Welcome to the cloud deployment helper.",
  borderColor: "cyan"
}));

// 1. Text input prompt
const appName = await input({
  message: "Enter application name:",
  default: "web-api"
});

// 2. Select menu prompt
const environment = await select({
  message: "Choose target environment:",
  options: [
    { label: "Production (us-east)", value: "prod" },
    { label: "Staging (us-west)", value: "staging" },
    { label: "Development", value: "dev" }
  ]
});

// 3. Animated spinner
const deployLoader = spinner({
  text: \`Deploying \${appName} to \${environment}...\`,
  color: "cyan"
}).start();

await new Promise((resolve) => setTimeout(resolve, 2000));
deployLoader.succeed(colors.green(\`✓ Successfully deployed \${appName} to \${environment}!\`));
\`\`\`

Run this script using:
\`\`\`bash
node deploy.js
\`\`\``
  },

  'typescript': {
    title: 'TypeScript Usage',
    category: 'Getting Started',
    content: `Termora ships with complete, strict TypeScript definitions out of the box.

\`\`\`typescript
import { select, type SelectOptions } from "termora";

interface FrameworkChoice {
  id: string;
  version: string;
}

const chosen = await select<FrameworkChoice>({
  message: "Select your target runtime:",
  options: [
    { label: "Node.js v20 LTS", value: { id: "node", version: "20.10.0" } },
    { label: "Bun v1.1", value: { id: "bun", version: "1.1.0" } }
  ]
});

console.log(chosen.value.id); // Fully typed!
\`\`\``
  },

  'terminal-rendering': {
    title: 'Terminal Rendering & ANSI',
    category: 'Core Concepts',
    content: `Termora communicates with standard output streams via ANSI escape sequences (also known as VT100 control codes).

- **Colors and SGR Codes**: Bold, Dim, Underline, and 24-bit RGB codes (\`\\x1b[38;2;r;g;bm\`).
- **Cursor Repositioning**: Moves cursor up (\`\\x1b[nA\`), down (\`\\x1b[nB\`), and erases line contents (\`\\x1b[2K\`).
- **Screen Clearing**: Selective line rewrites prevent whole-screen blinking.

When you call \`spinner()\` or \`progressBar()\`, Termora records the number of terminal rows rendered, clears only those rows on the next tick, and reprints the updated frame.`
  },

  'raw-mode': {
    title: 'TTY & Raw Mode Handling',
    category: 'Core Concepts',
    content: `Node.js standard input is line-buffered by default; keystrokes are not sent to the program until the user presses Enter.

Interactive prompts require immediate reaction to single keypresses (like arrow keys or the Spacebar). Termora puts \`process.stdin\` into **Raw Mode** (\`process.stdin.setRawMode(true)\`):

- Character-by-character stream consumption.
- Custom decoding of multi-byte escape sequences generated by arrow keys (\`\\x1b[A\`, \`\\x1b[B\`).
- Guaranteed cleanup of raw mode whenever the prompt completes or catches an interruption.`
  },

  'cursor-management': {
    title: 'Cursor & Line Rewriting',
    category: 'Core Concepts',
    content: `Leaving the cursor visible while actively redrawing terminal lines can cause unpleasant flickering.

Termora automatically:
1. **Hides cursor** (\`\\x1b[?25l\`) at prompt startup.
2. Performs smooth redraws at terminal refresh rate.
3. **Restores cursor** (\`\\x1b[?25h\`) before exiting.
4. Binds process exit listeners to ensure the cursor is restored even on unhandled crashes.`
  },

  'non-interactive-fallback': {
    title: 'CI & Headless Fallbacks',
    category: 'Core Concepts',
    content: `Running interactive prompts inside automated CI environments (GitHub Actions, Jenkins, CircleCI) can freeze continuous integration jobs.

Termora checks:
\`\`\`javascript
const isInteractive = Boolean(process.stdout.isTTY && !process.env.CI && process.env.TERM !== 'dumb');
\`\`\`

If \`isInteractive\` is false, prompts automatically return configured \`default\` values or emit a clean error rather than blocking the runner.`
  },

  'ref-select': {
    title: 'select(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function select<T = string>(options: SelectConfig<T>): Promise<T>;
\`\`\`

### Parameters
| Option | Type | Default | Description |
|---|---|---|---|
| \`message\` | \`string\` | Required | The prompt question displayed above the options |
| \`options\` | \`Array<{ label: string, value: T }>\` | Required | Array of choices |
| \`defaultIndex\` | \`number\` | \`0\` | Initially focused option index |
| \`pointer\` | \`string\` | \`"❯"\` | Character prefix indicating active row |
| \`loop\` | \`boolean\` | \`true\` | Whether pressing down on last item wraps to top |

### Example
\`\`\`javascript
import { select } from "termora";

const env = await select({
  message: "Select deployment environment:",
  options: [
    { label: "Production", value: "prod" },
    { label: "Staging", value: "staging" }
  ]
});
\`\`\``
  },

  'ref-input': {
    title: 'input(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function input(options: InputConfig): Promise<string>;
\`\`\`

### Parameters
| Option | Type | Default | Description |
|---|---|---|---|
| \`message\` | \`string\` | Required | Prompt label |
| \`default\` | \`string\` | \`""\` | Fallback value if user presses Enter immediately |
| \`placeholder\` | \`string\` | \`""\` | Dim hint text displayed when input is empty |
| \`validate\` | \`(val: string) => boolean | string\` | Optional validation callback |`
  },

  'ref-spinner': {
    title: 'spinner(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function spinner(options: SpinnerConfig): SpinnerInstance;
\`\`\`

### Methods
- \`.start(text?: string)\`: Starts animation loop
- \`.succeed(text?: string)\`: Stops with green checkmark (✔)
- \`.fail(text?: string)\`: Stops with red cross (✖)
- \`.warn(text?: string)\`: Stops with yellow warning (⚠)
- \`.stop()\`: Halts animation without icon`
  },

  'ref-box': {
    title: 'box(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function box(options: BoxConfig): string;
\`\`\`

### Parameters
| Option | Type | Default | Description |
|---|---|---|---|
| \`content\` | \`string\` | Required | Text inside box (supports multiline) |
| \`title\` | \`string\` | \`""\` | Optional title placed in top border |
| \`borderStyle\` | \`"round" | "single" | "double" | "heavy"\` | \`"round"\` | Box border character set |
| \`padding\` | \`number\` | \`1\` | Whitespace padding around content |
| \`borderColor\` | \`string\` | \`"cyan"\` | Border color keyword |`
  },

  'ref-table': {
    title: 'table(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function table(options: TableConfig): string;
\`\`\`

Generates a formatted ANSI table string with aligned columns and clean borders.`
  },

  'recipe-scaffold': {
    title: 'Interactive CLI Scaffolder',
    category: 'Real-World Recipes',
    content: `A complete starter wizard for generating boilerplate projects:

\`\`\`javascript
import { select, input, multiselect, spinner, box, colors } from "termora";

async function main() {
  console.log(box({
    title: "CREATE-APP CLI",
    content: "Initialize a high-performance modern web application.",
    borderColor: "cyan"
  }));

  const name = await input({
    message: "Project directory name:",
    default: "my-app"
  });

  const template = await select({
    message: "Pick project template:",
    options: [
      { label: "Next.js (App Router)", value: "next" },
      { label: "Vite + React", value: "vite-react" },
      { label: "Node.js REST API", value: "node-api" }
    ]
  });

  const tools = await multiselect({
    message: "Select optional integrations:",
    options: [
      { label: "Tailwind CSS", value: "tailwind", default: true },
      { label: "TypeScript", value: "ts", default: true },
      { label: "ESLint & Prettier", value: "lint", default: false }
    ]
  });

  const s = spinner({ text: "Cloning repository template...", color: "cyan" }).start();
  await new Promise(r => setTimeout(r, 1500));
  s.succeed("Template cloned successfully!");

  console.log(colors.green(\`\\nAll set! Run:\\n  cd \${name}\\n  npm run dev\`));
}

main();
\`\`\``
  }
};
