// Centralized registry of TermKit UI components and their schemas
// Mapped directly to the actual npm package: termkit-ui@0.1.0

export const CATEGORIES = [
  { id: 'all', name: 'All Components' },
  { id: 'prompts', name: 'Prompts' },
  { id: 'progress', name: 'Progress Indicators' },
  { id: 'layout', name: 'Layout & Boxes' },
  { id: 'data', name: 'Data Display' },
  { id: 'styling', name: 'Styling & ANSI' },
];

export const COMPONENTS = [
  {
    id: 'select',
    name: 'Select',
    category: 'prompts',
    status: 'verified',
    tagline: 'Interactive single-selection list with keyboard navigation',
    description: 'Allows users to pick one option from a list using arrow keys. Supports loop navigation, item hints, disabled items, and paging.',
    packageExport: 'termkit-ui/prompts',
    defaultConfig: {
      message: 'Choose your deployment region',
      items: [
        { label: 'US East (N. Virginia)', value: 'us-east-1', hint: 'Default' },
        { label: 'US West (Oregon)', value: 'us-west-2' },
        { label: 'EU West (Frankfurt)', value: 'eu-west-1' },
        { label: 'AP South (Mumbai)', value: 'ap-south-1' }
      ],
      default: 'us-east-1',
      pageSize: 5,
      loop: true
    },
    presets: [
      {
        name: 'Deployment Region',
        config: {
          message: 'Choose your deployment region',
          items: [
            { label: 'US East (N. Virginia)', value: 'us-east-1', hint: 'Low latency' },
            { label: 'US West (Oregon)', value: 'us-west-2' },
            { label: 'EU West (Frankfurt)', value: 'eu-west-1' },
            { label: 'AP South (Mumbai)', value: 'ap-south-1' }
          ],
          default: 'us-east-1',
          loop: true
        }
      },
      {
        name: 'Framework Selector',
        config: {
          message: 'Select project template',
          items: [
            { label: 'React + Vite', value: 'react' },
            { label: 'Next.js 15 (App Router)', value: 'next' },
            { label: 'Vue 3 + Vite', value: 'vue' },
            { label: 'SvelteKit 2', value: 'svelte' }
          ],
          default: 'react',
          loop: false
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      const items = JSON.stringify(cfg.items, null, 2).replace(/\n/g, '\n  ');
      if (isEsm) {
        return `import { select } from "termkit-ui/prompts";

const region = await select({
  message: "${cfg.message}",
  items: ${items},
  default: "${cfg.default || 'us-east-1'}",
  loop: ${cfg.loop !== false}
});

console.log(\`Provisioning in region: \${region}\`);`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function main() {
  const { select } = await import("termkit-ui/prompts");

  const region = await select({
    message: "${cfg.message}",
    items: ${items},
    default: "${cfg.default || 'us-east-1'}",
    loop: ${cfg.loop !== false}
  });

  console.log(\`Provisioning in region: \${region}\`);
}

main();`;
    }
  },

  {
    id: 'input',
    name: 'Input',
    category: 'prompts',
    status: 'verified',
    tagline: 'Standard single-line text input with placeholder & validation',
    description: 'Prompts the user for a text string. Includes live inline validation, fallback defaults, and initial buffer pre-filling.',
    packageExport: 'termkit-ui/prompts',
    defaultConfig: {
      message: 'Project name',
      default: 'my-cli-app',
      placeholder: 'e.g. acme-service',
      validate: 'required'
    },
    presets: [
      {
        name: 'Project Name',
        config: {
          message: 'Project name',
          default: 'my-cli-app',
          placeholder: 'e.g. acme-service',
          validate: 'required'
        }
      },
      {
        name: 'Database Host',
        config: {
          message: 'PostgreSQL host address',
          default: 'localhost',
          placeholder: 'db.internal.net',
          validate: 'required'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      const validationSnippet = cfg.validate === 'required'
        ? 'validate: (val) => val.trim().length > 0 || "Project name cannot be empty"'
        : 'validate: (val) => Boolean(val) || "Required"';

      if (isEsm) {
        return `import { input } from "termkit-ui/prompts";

const projectName = await input({
  message: "${cfg.message}",
  default: "${cfg.default}",
  placeholder: "${cfg.placeholder}",
  ${validationSnippet}
});

console.log(\`Created project: \${projectName}\`);`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function main() {
  const { input } = await import("termkit-ui/prompts");

  const projectName = await input({
    message: "${cfg.message}",
    default: "${cfg.default}",
    placeholder: "${cfg.placeholder}",
    ${validationSnippet}
  });

  console.log(\`Created project: \${projectName}\`);
}

main();`;
    }
  },

  {
    id: 'number',
    name: 'Number',
    category: 'prompts',
    status: 'verified',
    tagline: 'Numeric input with keyboard arrow stepping and bounds checking',
    description: 'Prompts user for integer or floating-point values. ArrowUp and ArrowDown increment and decrement by step. Automatically validates min and max bounds.',
    packageExport: 'termkit-ui/prompts',
    defaultConfig: {
      message: 'Port number',
      default: 3000,
      min: 1024,
      max: 65535,
      step: 1,
      float: false
    },
    presets: [
      {
        name: 'Server Port',
        config: {
          message: 'Server listen port',
          default: 3000,
          min: 1024,
          max: 65535,
          step: 1,
          float: false
        }
      },
      {
        name: 'Worker Threads',
        config: {
          message: 'Thread pool count',
          default: 4,
          min: 1,
          max: 32,
          step: 1,
          float: false
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { number } from "termkit-ui/prompts";

const port = await number({
  message: "${cfg.message}",
  default: ${cfg.default},
  min: ${cfg.min},
  max: ${cfg.max},
  step: ${cfg.step || 1},
  float: ${Boolean(cfg.float)}
});

console.log(\`Server configured on port: \${port}\`);`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function main() {
  const { number } = await import("termkit-ui/prompts");

  const port = await number({
    message: "${cfg.message}",
    default: ${cfg.default},
    min: ${cfg.min},
    max: ${cfg.max},
    step: ${cfg.step || 1}
  });

  console.log(\`Server configured on port: \${port}\`);
}

main();`;
    }
  },

  {
    id: 'multiselect',
    name: 'Multi-Select',
    category: 'prompts',
    status: 'verified',
    tagline: 'Multiple item checkbox selection with limit controls',
    description: 'Allows selecting one or more items using Space to toggle and Enter to finish. Supports min/max selection bounds and keyboard shortcuts ("a" to toggle all).',
    packageExport: 'termkit-ui/prompts',
    defaultConfig: {
      message: 'Select CLI tool extensions to install',
      items: [
        { label: 'TypeScript support', value: 'ts', selected: true },
        { label: 'ESLint + Prettier', value: 'lint', selected: true },
        { label: 'Docker containerization', value: 'docker', selected: false },
        { label: 'GitHub Actions workflow', value: 'ci', selected: false },
        { label: 'Tailwind CSS CLI', value: 'tailwind', selected: false }
      ],
      min: 1,
      max: 4
    },
    presets: [
      {
        name: 'Feature Flags',
        config: {
          message: 'Select CLI tool extensions to install',
          items: [
            { label: 'TypeScript support', value: 'ts', selected: true },
            { label: 'ESLint + Prettier', value: 'lint', selected: true },
            { label: 'Docker containerization', value: 'docker', selected: false },
            { label: 'GitHub Actions workflow', value: 'ci', selected: false }
          ],
          min: 1,
          max: 3
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      const items = JSON.stringify(cfg.items, null, 2).replace(/\n/g, '\n  ');
      if (isEsm) {
        return `import { multiselect } from "termkit-ui/prompts";

const features = await multiselect({
  message: "${cfg.message}",
  items: ${items},
  min: ${cfg.min || 1},
  max: ${cfg.max || 5}
});

console.log("Configured features:", features);`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function main() {
  const { multiselect } = await import("termkit-ui/prompts");

  const features = await multiselect({
    message: "${cfg.message}",
    items: ${items},
    min: ${cfg.min || 1},
    max: ${cfg.max || 5}
  });

  console.log("Configured features:", features);
}

main();`;
    }
  },

  {
    id: 'confirm',
    name: 'Confirm',
    category: 'prompts',
    status: 'verified',
    tagline: 'Binary Yes/No prompt with customizable labels',
    description: 'A binary question prompt responding to (y/n) keys or arrow navigation. Configurable activeText and inactiveText labels.',
    packageExport: 'termkit-ui/prompts',
    defaultConfig: {
      message: 'Proceed with destructive database migration?',
      default: false,
      activeText: 'Yes',
      inactiveText: 'No'
    },
    presets: [
      {
        name: 'Dangerous Action',
        config: {
          message: 'Proceed with destructive database migration?',
          default: false,
          activeText: 'Yes',
          inactiveText: 'No'
        }
      },
      {
        name: 'Install Dependencies',
        config: {
          message: 'Install missing npm dependencies now?',
          default: true,
          activeText: 'Yes',
          inactiveText: 'No'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { confirm } from "termkit-ui/prompts";

const shouldProceed = await confirm({
  message: "${cfg.message}",
  default: ${cfg.default},
  activeText: "${cfg.activeText || 'Yes'}",
  inactiveText: "${cfg.inactiveText || 'No'}"
});

if (!shouldProceed) {
  console.log("Operation aborted by user.");
  process.exit(0);
}`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function run() {
  const { confirm } = await import("termkit-ui/prompts");

  const shouldProceed = await confirm({
    message: "${cfg.message}",
    default: ${cfg.default}
  });

  if (!shouldProceed) {
    console.log("Operation aborted by user.");
    process.exit(0);
  }
}

run();`;
    }
  },

  {
    id: 'password',
    name: 'Password',
    category: 'prompts',
    status: 'verified',
    tagline: 'Secure masked input for sensitive tokens and keys',
    description: 'Masks user keystrokes with bullets or asterisks. Typed value is never echoed in output or logs.',
    packageExport: 'termkit-ui/prompts',
    defaultConfig: {
      message: 'Enter API access token',
      mask: '*'
    },
    presets: [
      {
        name: 'API Token',
        config: {
          message: 'Enter API access token',
          mask: '*'
        }
      },
      {
        name: 'Master Secret',
        config: {
          message: 'Database master password',
          mask: '•'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { password } from "termkit-ui/prompts";

const secretKey = await password({
  message: "${cfg.message}",
  mask: "${cfg.mask || '*'}"
});

console.log("Token received (length:", secretKey.length, ")");`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function authenticate() {
  const { password } = await import("termkit-ui/prompts");

  const secretKey = await password({
    message: "${cfg.message}",
    mask: "${cfg.mask || '*'}"
  });

  console.log("Token received (length:", secretKey.length, ")");
}

authenticate();`;
    }
  },

  {
    id: 'spinner',
    name: 'Spinner',
    category: 'progress',
    status: 'verified',
    tagline: 'Concurrent log-safe terminal loading indicator',
    description: 'Displays a continuous animated glyph during asynchronous tasks. Asynchronous background logs write cleanly without tearing the spinner line. Methods: succeed, fail, warn, stop.',
    packageExport: 'termkit-ui/progress',
    defaultConfig: {
      message: 'Compiling TypeScript build targets...',
      color: 'cyan'
    },
    presets: [
      {
        name: 'Cyan Build',
        config: {
          message: 'Compiling TypeScript build targets...',
          color: 'cyan'
        }
      },
      {
        name: 'Emerald Fetch',
        config: {
          message: 'Fetching remote registry tarballs...',
          color: 'green'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { spinner } from "termkit-ui/progress";
import { defaultCoordinator } from "termkit-ui";

const loader = spinner({
  message: "${cfg.message}",
  color: "${cfg.color || 'cyan'}"
}).start();

try {
  // Concurrent logs will not tear active spinner line
  defaultCoordinator.log("Worker 1: compiling AST...");
  await doAsyncWork();
  loader.succeed("Build completed successfully!");
} catch (err) {
  loader.fail("Build failed: " + err.message);
}`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function runBuild() {
  const { spinner } = await import("termkit-ui/progress");

  const loader = spinner({
    message: "${cfg.message}",
    color: "${cfg.color || 'cyan'}"
  }).start();

  try {
    await doAsyncWork();
    loader.succeed("Build completed successfully!");
  } catch (err) {
    loader.fail("Build failed: " + err.message);
  }
}

runBuild();`;
    }
  },

  {
    id: 'progressBar',
    name: 'Progress Bar',
    category: 'progress',
    status: 'verified',
    tagline: 'Deterministic visual progress gauge with ETA & percentages',
    description: 'Visual percentage gauge for bounded tasks. Supports .update(current), .increment(delta), .complete(), and automatic accessible milestone mode in CI.',
    packageExport: 'termkit-ui/progress',
    defaultConfig: {
      total: 100,
      current: 68,
      width: 30,
      message: 'Downloading assets'
    },
    presets: [
      {
        name: 'Asset Downloader',
        config: {
          total: 100,
          current: 68,
          width: 30,
          message: 'Downloading assets'
        }
      },
      {
        name: 'Batch Processing',
        config: {
          total: 50,
          current: 34,
          width: 25,
          message: 'Processing batch'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { progressBar } from "termkit-ui/progress";

const bar = progressBar({
  total: ${cfg.total},
  width: ${cfg.width || 30},
  message: "${cfg.message || ''}",
  showEta: true,
  showPercentage: true
});

for (let i = 0; i < ${cfg.total}; i++) {
  await processBatchItem();
  bar.increment(1);
}

bar.complete("All items processed successfully!");`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function run() {
  const { progressBar } = await import("termkit-ui/progress");

  const bar = progressBar({
    total: ${cfg.total},
    width: ${cfg.width || 30},
    message: "${cfg.message || ''}"
  });

  for (let i = 0; i < ${cfg.total}; i++) {
    await processBatchItem();
    bar.increment(1);
  }

  bar.complete("Done!");
}

run();`;
    }
  },

  {
    id: 'box',
    name: 'Box & Panel',
    category: 'layout',
    status: 'verified',
    tagline: 'Unicode border containers with padding and titles',
    description: 'Encapsulates terminal text inside styled borders (rounded, single, double, bold, ascii). Automatically handles CJK and emoji string widths without tearing borders.',
    packageExport: 'termkit-ui/layout',
    defaultConfig: {
      title: 'TermKit v0.1.0',
      content: 'Server running at https://localhost:8080\nReady to accept inbound connections.',
      borderStyle: 'rounded',
      padding: 1,
      borderColor: 'cyan',
      titleAlign: 'left'
    },
    presets: [
      {
        name: 'Rounded Server Badge',
        config: {
          title: 'TermKit v0.1.0',
          content: 'Server running at https://localhost:8080\nReady to accept inbound connections.',
          borderStyle: 'rounded',
          padding: 1,
          borderColor: 'cyan',
          titleAlign: 'left'
        }
      },
      {
        name: 'Double Border Alert',
        config: {
          title: 'IMPORTANT NOTICE',
          content: 'Please verify SSL certificates before deploying to cluster.',
          borderStyle: 'double',
          padding: 1,
          borderColor: 'yellow',
          titleAlign: 'center'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      const contentStr = cfg.content.replace(/\n/g, '\\n');
      if (isEsm) {
        return `import { box } from "termkit-ui/layout";

const output = box("${contentStr}", {
  title: "${cfg.title}",
  borderStyle: "${cfg.borderStyle}",
  borderColor: "${cfg.borderColor}",
  padding: ${cfg.padding},
  titleAlign: "${cfg.titleAlign || 'left'}"
});

console.log(output);`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function main() {
  const { box } = await import("termkit-ui/layout");

  const output = box("${contentStr}", {
    title: "${cfg.title}",
    borderStyle: "${cfg.borderStyle}",
    borderColor: "${cfg.borderColor}",
    padding: ${cfg.padding}
  });

  console.log(output);
}

main();`;
    }
  },

  {
    id: 'divider',
    name: 'Divider',
    category: 'layout',
    status: 'verified',
    tagline: 'Terminal horizontal rule with optional centered or aligned title',
    description: 'Renders a full-width rule across the terminal viewport with an optional centered or aligned title. Automatically adapts to detected terminal column width.',
    packageExport: 'termkit-ui/layout',
    defaultConfig: {
      title: 'SYSTEM STATUS',
      borderColor: 'green',
      titleAlign: 'center',
      character: '─'
    },
    presets: [
      {
        name: 'Centered Section',
        config: {
          title: 'SYSTEM STATUS',
          borderColor: 'green',
          titleAlign: 'center',
          character: '─'
        }
      },
      {
        name: 'Left Aligned Section',
        config: {
          title: 'BUILD PIPELINE',
          borderColor: 'cyan',
          titleAlign: 'left',
          character: '─'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { divider } from "termkit-ui/layout";

console.log(divider("${cfg.title || ''}", {
  borderColor: "${cfg.borderColor || 'cyan'}",
  titleAlign: "${cfg.titleAlign || 'center'}"
}));`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function main() {
  const { divider } = await import("termkit-ui/layout");

  console.log(divider("${cfg.title || ''}", {
    borderColor: "${cfg.borderColor || 'cyan'}",
    titleAlign: "${cfg.titleAlign || 'center'}"
  }));
}

main();`;
    }
  },

  {
    id: 'table',
    name: 'Table',
    category: 'data',
    status: 'verified',
    tagline: 'Formatted ANSI tables with auto-width and border styles',
    description: 'Renders tabular data from an array of objects or 2D array. Automatically calculates column widths and aligns headers and data cells.',
    packageExport: 'termkit-ui/tables',
    defaultConfig: {
      rows: [
        { endpoint: '/api/v1/auth/login', method: 'POST', status: '200 OK', latency: '14ms' },
        { endpoint: '/api/v1/projects', method: 'GET', status: '200 OK', latency: '42ms' },
        { endpoint: '/api/v1/deployments', method: 'POST', status: '201 Created', latency: '128ms' },
        { endpoint: '/api/v1/health', method: 'GET', status: '200 OK', latency: '3ms' }
      ],
      borderStyle: 'rounded'
    },
    presets: [
      {
        name: 'API Metrics',
        config: {
          rows: [
            { endpoint: '/api/v1/auth/login', method: 'POST', status: '200 OK', latency: '14ms' },
            { endpoint: '/api/v1/projects', method: 'GET', status: '200 OK', latency: '42ms' },
            { endpoint: '/api/v1/deployments', method: 'POST', status: '201 Created', latency: '128ms' },
            { endpoint: '/api/v1/health', method: 'GET', status: '200 OK', latency: '3ms' }
          ],
          borderStyle: 'rounded'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      const rows = JSON.stringify(cfg.rows, null, 2).replace(/\n/g, '\n  ');
      if (isEsm) {
        return `import { table } from "termkit-ui/tables";

const rows = ${rows};

console.log(table(rows, {
  borderStyle: "${cfg.borderStyle || 'rounded'}"
}));`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function main() {
  const { table } = await import("termkit-ui/tables");

  const rows = ${rows};

  console.log(table(rows, {
    borderStyle: "${cfg.borderStyle || 'rounded'}"
  }));
}

main();`;
    }
  },

  {
    id: 'colors',
    name: 'Colors & Styles',
    category: 'styling',
    status: 'verified',
    tagline: 'Nesting-safe ANSI color styler with TrueColor & 256 support',
    description: 'Chained nesting-safe color and style functions. Features bold, dim, italic, underline, foreground colors, RGB, and Hex codes.',
    packageExport: 'termkit-ui/styles',
    defaultConfig: {
      color: 'cyan',
      modifier: 'bold',
      text: 'TermKit UI styling utility'
    },
    presets: [
      {
        name: 'Cyan Bold',
        config: {
          color: 'cyan',
          modifier: 'bold',
          text: 'Success: Application ready on port 3000'
        }
      },
      {
        name: 'Green Underline',
        config: {
          color: 'green',
          modifier: 'underline',
          text: 'Documentation: https://github.com/hexqbv/TermKit'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { colors, style } from "termkit-ui/styles";

console.log(colors.${cfg.color}.${cfg.modifier}("${cfg.text}"));
console.log(colors.green("✔ Passed: 48 tests"));
console.log(style.dim("  Duration: 1.2s"));`;
      }
      return `// termkit-ui is pure ESM (Node >= 22). Use dynamic import() in CommonJS:
async function main() {
  const { colors, style } = await import("termkit-ui/styles");

  console.log(colors.${cfg.color}.${cfg.modifier}("${cfg.text}"));
  console.log(colors.green("✔ Passed: 48 tests"));
  console.log(style.dim("  Duration: 1.2s"));
}

main();`;
    }
  },

  {
    id: 'autocomplete',
    name: 'Autocomplete',
    category: 'prompts',
    status: 'planned',
    tagline: 'Fuzzy auto-suggest prompt [Planned Extension / Simulated]',
    description: 'Interactive text input that filters suggestions dynamically as the user types. This component is currently simulated in Termora Studio and planned for future TermKit versions.',
    packageExport: 'Simulated in Studio',
    defaultConfig: {
      message: 'Search Kubernetes cluster namespace',
      options: [
        'default',
        'kube-system',
        'kube-public',
        'ingress-nginx',
        'production-api',
        'staging-web'
      ],
      limit: 5
    },
    presets: [
      {
        name: 'Kubernetes Namespaces',
        config: {
          message: 'Search Kubernetes cluster namespace',
          options: ['default', 'kube-system', 'ingress-nginx', 'production-api', 'staging-web'],
          limit: 5
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      return `// Note: 'autocomplete' is a planned extension in termkit-ui roadmap.
// In termkit-ui@0.1.0, use 'select' with searchable items or custom validation.
console.log("Autocomplete is simulated in Termora Studio.");`;
    }
  },

  {
    id: 'banner',
    name: 'Banner',
    category: 'layout',
    status: 'planned',
    tagline: 'High-impact CLI splash headers [Planned Recipe / Simulated]',
    description: 'Generates decorative welcome banners. In termkit-ui@0.1.0, combine box() and style for custom headers, or use the verified divider() primitive.',
    packageExport: 'Simulated in Studio',
    defaultConfig: {
      title: 'TERMKIT STUDIO',
      subtitle: 'Modern Terminal UI Toolkit for Node.js',
      badge: 'v0.1.0',
      theme: 'cyan'
    },
    presets: [
      {
        name: 'Standard Hero',
        config: {
          title: 'TERMKIT STUDIO',
          subtitle: 'Modern Terminal UI Toolkit for Node.js',
          badge: 'v0.1.0',
          theme: 'cyan'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      return `// Recipe: Creating a banner using verified termkit-ui primitives:
import { box } from "termkit-ui/layout";
import { style } from "termkit-ui/styles";

console.log(box(
  \`\${style.cyan.bold("${cfg.title}")}\\n\${style.dim("${cfg.subtitle}")}\`,
  { title: "${cfg.badge}", borderStyle: "rounded", borderColor: "cyan", padding: 1 }
));`;
    }
  }
];
