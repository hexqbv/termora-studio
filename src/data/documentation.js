// Documentation content structured into chapters and sub-sections
// Mapped to actual package: termkit-ui@0.1.0

export const DOC_SECTIONS = [
  {
    id: 'introduction',
    title: 'Introduction',
    items: [
      { id: 'what-is-termkit', title: 'What is TermKit UI?' },
      { id: 'why-termkit', title: 'Why TermKit?' },
      { id: 'design-principles', title: 'Design Principles' },
    ]
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      { id: 'installation', title: 'Installation' },
      { id: 'quick-start', title: 'Quick Start' },
      { id: 'modular-exports', title: 'Modular Subpath Exports' },
      { id: 'typescript', title: 'TypeScript Usage' },
    ]
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    items: [
      { id: 'virtual-screen', title: 'Virtual Screen & Coordination' },
      { id: 'terminal-guard', title: 'TerminalGuard & Signal Safety' },
      { id: 'string-width', title: 'Unicode Width (Intl.Segmenter)' },
      { id: 'headless-testing', title: 'Headless Unit Testing' },
      { id: 'non-interactive-fallback', title: 'CI & Headless Fallbacks' },
    ]
  },
  {
    id: 'component-reference',
    title: 'Component Reference',
    items: [
      { id: 'ref-select', title: 'select()' },
      { id: 'ref-input', title: 'input()' },
      { id: 'ref-number', title: 'number()' },
      { id: 'ref-multiselect', title: 'multiselect()' },
      { id: 'ref-confirm', title: 'confirm()' },
      { id: 'ref-password', title: 'password()' },
      { id: 'ref-spinner', title: 'spinner()' },
      { id: 'ref-progress-bar', title: 'progressBar()' },
      { id: 'ref-box', title: 'box()' },
      { id: 'ref-divider', title: 'divider()' },
      { id: 'ref-table', title: 'table()' },
      { id: 'ref-colors', title: 'colors & style' },
    ]
  },
  {
    id: 'recipes',
    title: 'Real-World Recipes',
    items: [
      { id: 'recipe-scaffold', title: 'Interactive CLI Scaffolder' },
      { id: 'recipe-deploy', title: 'Cloud Deploy Wizard' },
    ]
  }
];

export const DOCS_CONTENT = {
  'what-is-termkit': {
    title: 'What is TermKit UI?',
    category: 'Introduction',
    badge: 'Core Guide',
    content: `TermKit (published on npm as \`termkit-ui\`) is a zero-dependency, cohesive TypeScript/ESM toolkit for building robust Node.js CLI user interfaces.

Historically, CLI developers were forced to piece together separate libraries: chalk for color, inquirer/prompts for user input, ora for spinners, cli-table for tables, and boxen for borders. These disparate libraries feature conflicting ESM/CJS interop patterns, disparate ANSI line-clearing engines, and lack a shared coordinator to prevent asynchronous background logs from corrupting active spinners or prompt lines.

TermKit solves this by building prompts, progress bars, spinners, boxes, and tables on top of a **shared virtual screen renderer** with zero runtime dependencies.`
  },

  'why-termkit': {
    title: 'Why TermKit?',
    category: 'Introduction',
    content: `### Problems with traditional terminal libraries

1. **Concurrent Logging Collision**: When asynchronous worker logs arrive while a spinner or prompt is active, uncoordinated \`console.log\` calls overwrite lines and tear the terminal screen. TermKit includes an \`OutputCoordinator\` that multiplexes logs cleanly above active live regions.
2. **Terminal Restoration Failures**: If an uncaught exception, process exit, or Ctrl+C occurs during raw mode, traditional libraries often leave the user's terminal cursor invisible or terminal echo disabled. TermKit's \`terminalGuard\` hooks process exits to guarantee restoration.
3. **CI Pipeline Freezes**: Unchecked \`stdin\` calls in automated CI environments (GitHub Actions, GitLab CI) cause pipelines to hang indefinitely. TermKit prompts detect non-interactive environments and return configured defaults or throw typed \`NonInteractiveError\`.
4. **Zero Dependencies**: Pure ESM, sub-millisecond startup, and zero native C++ compile steps.`
  },

  'design-principles': {
    title: 'Design Principles',
    category: 'Introduction',
    content: `TermKit adheres to strict UNIX philosophy guidelines tailored for modern Node.js developers:

- **Clean UNIX Pipelines**: Prompts and spinners write to \`process.stderr\` by default, keeping \`process.stdout\` dedicated exclusively to machine-readable pipe data.
- **Fail-Safe Terminal Restoration**: Raw mode and cursor visibility are restored on every exit path, normal completion, cancellation, and unhandled exception.
- **Intl.Segmenter Precision**: Zero-dependency string width calculation combining Unicode grapheme clustering and East Asian Width (EAW) rules to prevent CJK and emoji border tearing.
- **Built-in In-Memory Testing**: Includes \`createTestTerminal()\` so consumers can unit-test interactive CLI workflows in memory without spawning PTY child processes.`
  },

  'installation': {
    title: 'Installation',
    category: 'Getting Started',
    content: `Install the verified npm package into your project:

\`\`\`bash
# Using npm
npm install termkit-ui

# Using pnpm
pnpm add termkit-ui

# Using yarn
yarn add termkit-ui

# Using bun
bun add termkit-ui
\`\`\`

### System Requirements
- **Node.js**: \`>= 22.0.0\` (LTS or Current)
- **Module Format**: Pure ES Modules (\`"type": "module"\`)
- **Dependencies**: 0 (Zero runtime dependencies)`
  },

  'quick-start': {
    title: 'Quick Start',
    category: 'Getting Started',
    content: `Here is a complete, functioning Node.js CLI script using verified \`termkit-ui\` APIs:

\`\`\`javascript
import { select, input, confirm } from "termkit-ui/prompts";
import { spinner } from "termkit-ui/progress";
import { box } from "termkit-ui/layout";
import { colors } from "termkit-ui/styles";
import { defaultCoordinator } from "termkit-ui";

console.log(box(
  "Welcome to the cloud deployment helper.",
  { title: "DevOps CLI", borderColor: "cyan", borderStyle: "rounded" }
));

// 1. Text input prompt
const appName = await input({
  message: "Enter application name:",
  default: "web-api"
});

// 2. Select menu prompt
const environment = await select({
  message: "Choose target environment:",
  items: [
    { label: "Production (us-east)", value: "prod" },
    { label: "Staging (us-west)", value: "staging" },
    { label: "Development", value: "dev" }
  ]
});

// 3. Animated spinner with concurrent log safety
const deployLoader = spinner({
  message: \`Deploying \${appName} to \${environment}...\`,
  color: "cyan"
}).start();

// Safely log background output without tearing spinner
defaultCoordinator.log("Connected to cluster endpoint");

await new Promise((resolve) => setTimeout(resolve, 1500));
deployLoader.succeed(colors.green(\`✓ Successfully deployed \${appName} to \${environment}!\`));
\`\`\``
  },

  'modular-exports': {
    title: 'Modular Subpath Exports',
    category: 'Getting Started',
    content: `TermKit provides fine-grained, tree-shakeable subpath exports:

| Subpath | Exported Symbols |
|---|---|
| \`termkit-ui\` | Primary barrel export: \`terminalGuard\`, \`defaultCoordinator\`, \`detectCapabilities\` |
| \`termkit-ui/prompts\` | \`select\`, \`input\`, \`number\`, \`multiselect\`, \`confirm\`, \`password\` |
| \`termkit-ui/progress\` | \`spinner\`, \`progressBar\`, \`Spinner\`, \`ProgressBar\` |
| \`termkit-ui/layout\` | \`box\`, \`divider\` |
| \`termkit-ui/tables\` | \`table\` |
| \`termkit-ui/styles\` | \`colors\`, \`style\`, \`stringWidth\`, \`stripAnsi\`, \`truncate\`, \`wrapText\` |
| \`termkit-ui/testing\` | \`createTestTerminal\`, \`VirtualTerminal\`, \`MockStream\` |`
  },

  'typescript': {
    title: 'TypeScript Usage',
    category: 'Getting Started',
    content: `TermKit ships with complete TypeScript definitions compiled directly from source:

\`\`\`typescript
import { select, type SelectOptions } from "termkit-ui/prompts";

interface RuntimeChoice {
  id: string;
  version: string;
}

const chosen = await select<RuntimeChoice>({
  message: "Select your target runtime:",
  items: [
    { label: "Node.js 22 LTS", value: { id: "node", version: "22.11.0" } },
    { label: "Bun 1.1", value: { id: "bun", version: "1.1.0" } }
  ]
});

console.log(chosen.id); // Fully typed!
\`\`\`

Note: TermKit types reference Node.js stream primitives (\`NodeJS.ReadableStream\`). Ensure \`@types/node\` is installed in devDependencies (\`npm i -D @types/node\`).`
  },

  'virtual-screen': {
    title: 'Virtual Screen & Coordination',
    category: 'Core Concepts',
    content: `TermKit manages terminal output through an \`OutputCoordinator\`.

When an interactive prompt or spinner renders, it mounts a \`LiveRegion\`. When standard logs arrive via \`defaultCoordinator.log('...')\`, the coordinator:
1. Erases the active live region.
2. Emits the unformatted log message followed by a newline.
3. Immediately repaints the live region underneath.

This eliminates the visual corruption that occurs when third-party libraries write to standard output during animations.`
  },

  'terminal-guard': {
    title: 'TerminalGuard & Signal Safety',
    category: 'Core Concepts',
    content: `Leaving standard input in raw mode or the terminal cursor hidden on exit makes the developer's shell unresponsive.

TermKit's \`terminalGuard\` automatically:
- Registers process-level handlers for \`SIGINT\`, \`SIGTERM\`, \`uncaughtException\`, and \`exit\`.
- Restores standard input buffering (\`process.stdin.setRawMode(false)\`).
- Unhides the cursor (\`\\x1b[?25h\`).
- Restores standard streams before process exit.`
  },

  'string-width': {
    title: 'Unicode Width (Intl.Segmenter)',
    category: 'Core Concepts',
    content: `Computing character widths using \`string.length\` produces broken table borders when strings contain emojis, combining characters, or CJK characters.

TermKit includes zero-dependency Unicode grapheme clustering via \`Intl.Segmenter\` and East Asian Width (EAW) rules:
\`\`\`javascript
import { stringWidth } from "termkit-ui/styles";

console.log(stringWidth("A"));   // 1
console.log(stringWidth("🚀"));  // 2
console.log(stringWidth("你好")); // 4
\`\`\``
  },

  'headless-testing': {
    title: 'Headless Unit Testing',
    category: 'Core Concepts',
    content: `TermKit provides \`createTestTerminal()\` to test interactive CLI applications in memory without spawning pseudo-terminals (PTYs):

\`\`\`javascript
import { test } from "node:test";
import assert from "node:assert/strict";
import { createTestTerminal } from "termkit-ui/testing";
import { confirm } from "termkit-ui/prompts";

test("prompts user for confirmation", async () => {
  const term = createTestTerminal();

  const promise = confirm({
    message: "Deploy now?",
    input: term.stdin,
    output: term.stderr
  });

  await term.type("y");
  const result = await promise;
  assert.equal(result, true);
});
\`\`\``
  },

  'non-interactive-fallback': {
    title: 'CI & Headless Fallbacks',
    category: 'Core Concepts',
    content: `When a CLI script is executed in non-interactive CI/CD pipelines (such as GitHub Actions with \`CI=true\` or \`TERM=dumb\`), interactive prompts automatically:
1. Resolve immediately to their configured \`default\` value if specified.
2. Throw a typed \`NonInteractiveError\` naming the prompt message if no default exists.

This prevents CI jobs from hanging indefinitely.`
  },

  'ref-select': {
    title: 'select(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function select<T = string>(options: SelectOptions<T>): Promise<T>;
\`\`\`

### Parameters
| Option | Type | Default | Description |
|---|---|---|---|
| \`message\` | \`string\` | Required | Prompt question label |
| \`items\` | \`Array<{ label: string, value: T, hint?: string, disabled?: boolean \| string }>\` | Required | Array of choices |
| \`default\` | \`T\` | \`items[0].value\` | Default selected value |
| \`pageSize\` | \`number\` | \`7\` | Max visible items before scrolling |
| \`loop\` | \`boolean\` | \`true\` | Wrap around when navigating past boundaries |`
  },

  'ref-input': {
    title: 'input(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function input(options: InputOptions): Promise<string>;
\`\`\`

### Parameters
| Option | Type | Default | Description |
|---|---|---|---|
| \`message\` | \`string\` | Required | Prompt label |
| \`default\` | \`string\` | \`""\` | Fallback default value |
| \`placeholder\` | \`string\` | \`""\` | Ghost placeholder text |
| \`initial\` | \`string\` | \`""\` | Pre-filled input buffer |
| \`validate\` | \`(val: string) => boolean \| string \| Promise<boolean \| string>\` | None | Validation function |`
  },

  'ref-number': {
    title: 'number(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function number(options: NumberOptions): Promise<number>;
\`\`\`

### Parameters
| Option | Type | Default | Description |
|---|---|---|---|
| \`message\` | \`string\` | Required | Prompt label |
| \`default\` | \`number\` | None | Default number value |
| \`min\` | \`number\` | None | Minimum allowed value |
| \`max\` | \`number\` | None | Maximum allowed value |
| \`step\` | \`number\` | \`1\` | Increment/decrement step (ArrowUp/ArrowDown) |
| \`float\` | \`boolean\` | \`false\` | Allow decimal numbers |`
  },

  'ref-spinner': {
    title: 'spinner(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function spinner(options: SpinnerOptions | string): Spinner;
\`\`\`

### Methods
- \`.start(message?: string)\`: Starts animation loop
- \`.update(message: string)\`: Changes loading text
- \`.succeed(message?: string)\`: Stops with green checkmark (✔)
- \`.fail(message?: string)\`: Stops with red cross (✖)
- \`.warn(message?: string)\`: Stops with yellow warning (⚠)
- \`.stop()\`: Halts animation without status glyph`
  },

  'ref-progress-bar': {
    title: 'progressBar(options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function progressBar(options: ProgressBarOptions): ProgressBar;
\`\`\`

### Methods
- \`.update(current: number, message?: string)\`: Set progress position
- \`.increment(amount?: number, message?: string)\`: Advance progress by amount
- \`.complete(message?: string)\`: Complete progress bar and unmount
- \`.stop()\`: Halts and unmounts progress bar`
  },

  'ref-box': {
    title: 'box(content, options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function box(content: string, options?: BoxOptions): string;
\`\`\`

### Parameters
- \`content\`: The multiline string to enclose inside the box.
- \`options.title\`: Optional title string.
- \`options.borderStyle\`: \`'rounded' | 'single' | 'double' | 'bold' | 'ascii'\` (default: \`'rounded'\`).
- \`options.borderColor\`: Color keyword (\`'cyan'\`, \`'green'\`, \`'yellow'\`, etc.).
- \`options.padding\`: Number of padding rows/cols or \`{ top, bottom, left, right }\`.
- \`options.titleAlign\`: \`'left' | 'center' | 'right'\`.`
  },

  'ref-divider': {
    title: 'divider(title, options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function divider(options?: DividerOptions | string): string;
\`\`\`

Renders a terminal-width horizontal rule with optional centered or aligned title. Adapts automatically to terminal column dimensions.`
  },

  'ref-table': {
    title: 'table(rows, options)',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
function table(rows: Array<Record<string, any>> | Array<any[]>, options?: TableOptions): string;
\`\`\`

Formats an array of objects or 2D array into a clean column-aligned terminal table with borders (\`'rounded'\`, \`'single'\`, or \`'ascii'\`).`
  },

  'ref-colors': {
    title: 'colors & style',
    category: 'Component Reference',
    content: `### Signature
\`\`\`typescript
import { colors, style } from "termkit-ui/styles";
\`\`\`

Nesting-safe chainable ANSI styler:
\`\`\`javascript
colors.cyan.bold("Text");
style.green.underline("Link");
colors.rgb(255, 128, 0)("Custom TrueColor");
colors.hex("#00ff88")("Hex color");
\`\`\``
  },

  'recipe-scaffold': {
    title: 'Interactive CLI Scaffolder',
    category: 'Real-World Recipes',
    content: `Complete runnable CLI starter wizard using verified \`termkit-ui\` APIs:

\`\`\`javascript
import { select, input, multiselect } from "termkit-ui/prompts";
import { spinner } from "termkit-ui/progress";
import { box, divider } from "termkit-ui/layout";
import { colors } from "termkit-ui/styles";

async function main() {
  console.log(box(
    "Initialize a modern web application.",
    { title: "CREATE-APP CLI", borderColor: "cyan", borderStyle: "rounded" }
  ));

  const name = await input({
    message: "Project directory name:",
    default: "my-app"
  });

  const template = await select({
    message: "Pick project template:",
    items: [
      { label: "Next.js 15 (App Router)", value: "next" },
      { label: "Vite + React 19", value: "vite-react" },
      { label: "Node.js REST API", value: "node-api" }
    ]
  });

  const tools = await multiselect({
    message: "Select integrations:",
    items: [
      { label: "Tailwind CSS", value: "tailwind", selected: true },
      { label: "TypeScript", value: "ts", selected: true },
      { label: "ESLint & Prettier", value: "lint", selected: false }
    ]
  });

  const s = spinner({ message: "Cloning repository template...", color: "cyan" }).start();
  await new Promise(r => setTimeout(r, 1200));
  s.succeed("Template cloned successfully!");

  console.log(colors.green(\`\\nAll set! Run:\\n  cd \${name}\\n  npm run dev\`));
}

main();
\`\`\``
  }
};
