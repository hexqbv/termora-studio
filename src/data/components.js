// Centralized registry of Termora components and their schemas

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
    description: 'Allows users to pick one option from a list using arrow keys or numbers. Supports looping, custom pointer glyphs, and return values.',
    defaultConfig: {
      message: 'Choose your deployment region',
      options: [
        { label: 'US East (N. Virginia)', value: 'us-east-1' },
        { label: 'US West (Oregon)', value: 'us-west-2' },
        { label: 'EU West (Frankfurt)', value: 'eu-west-1' },
        { label: 'AP South (Mumbai)', value: 'ap-south-1' }
      ],
      pointer: '❯',
      loop: true,
      pageSize: 5
    },
    presets: [
      {
        name: 'Deployment Region',
        config: {
          message: 'Choose your deployment region',
          options: [
            { label: 'US East (N. Virginia)', value: 'us-east-1' },
            { label: 'US West (Oregon)', value: 'us-west-2' },
            { label: 'EU West (Frankfurt)', value: 'eu-west-1' },
            { label: 'AP South (Mumbai)', value: 'ap-south-1' }
          ],
          pointer: '❯',
          loop: true
        }
      },
      {
        name: 'Framework Selector',
        config: {
          message: 'Select project template',
          options: [
            { label: 'React + Vite', value: 'react' },
            { label: 'Next.js (App Router)', value: 'next' },
            { label: 'Vue 3 + Vite', value: 'vue' },
            { label: 'SvelteKit', value: 'svelte' }
          ],
          pointer: '→',
          loop: false
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      const opts = JSON.stringify(cfg.options, null, 2).replace(/\n/g, '\n  ');
      if (isEsm) {
        return `import { select } from "termora";

const region = await select({
  message: "${cfg.message}",
  options: ${opts},
  pointer: "${cfg.pointer || '❯'}",
  loop: ${cfg.loop}
});

console.log(\`Provisioning in region: \${region}\`);`;
      }
      return `const { select } = require("termora");

async function main() {
  const region = await select({
    message: "${cfg.message}",
    options: ${opts},
    pointer: "${cfg.pointer || '❯'}",
    loop: ${cfg.loop}
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
    description: 'Prompts the user for a text string. Includes live inline validation, default fallback values, and input trimming.',
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
        name: 'Port Number',
        config: {
          message: 'Server listen port',
          default: '3000',
          placeholder: '1024-65535',
          validate: 'numeric'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      const validationSnippet = cfg.validate === 'required'
        ? 'validate: (val) => val.trim().length > 0 || "Project name cannot be empty"'
        : 'validate: (val) => !isNaN(val) && Number(val) > 0 || "Must be a valid port number"';

      if (isEsm) {
        return `import { input } from "termora";

const projectName = await input({
  message: "${cfg.message}",
  default: "${cfg.default}",
  placeholder: "${cfg.placeholder}",
  ${validationSnippet}
});

console.log(\`Created project: \${projectName}\`);`;
      }
      return `const { input } = require("termora");

async function main() {
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
    id: 'multiselect',
    name: 'Multi-Select',
    category: 'prompts',
    status: 'verified',
    tagline: 'Multiple item checkbox selection with limit controls',
    description: 'Allows selecting one or more options using Space to toggle and Enter to finish. Supports min/max selection bounds.',
    defaultConfig: {
      message: 'Select CLI tool extensions to install',
      options: [
        { label: 'TypeScript support', value: 'ts', checked: true },
        { label: 'ESLint + Prettier', value: 'lint', checked: true },
        { label: 'Docker containerization', value: 'docker', checked: false },
        { label: 'GitHub Actions workflow', value: 'ci', checked: false },
        { label: 'Tailwind CSS CLI', value: 'tailwind', checked: false }
      ],
      min: 1,
      max: 4
    },
    presets: [
      {
        name: 'Feature Flags',
        config: {
          message: 'Select CLI tool extensions to install',
          options: [
            { label: 'TypeScript support', value: 'ts', checked: true },
            { label: 'ESLint + Prettier', value: 'lint', checked: true },
            { label: 'Docker containerization', value: 'docker', checked: false },
            { label: 'GitHub Actions workflow', value: 'ci', checked: false }
          ],
          min: 1,
          max: 3
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      const opts = JSON.stringify(cfg.options.map(o => ({ label: o.label, value: o.value, default: !!o.checked })), null, 2).replace(/\n/g, '\n  ');
      if (isEsm) {
        return `import { multiselect } from "termora";

const features = await multiselect({
  message: "${cfg.message}",
  options: ${opts},
  min: ${cfg.min || 1},
  max: ${cfg.max || 5}
});

console.log("Configuring selected features:", features);`;
      }
      return `const { multiselect } = require("termora");

async function main() {
  const features = await multiselect({
    message: "${cfg.message}",
    options: ${opts},
    min: ${cfg.min || 1},
    max: ${cfg.max || 5}
  });

  console.log("Configuring selected features:", features);
}

main();`;
    }
  },

  {
    id: 'confirm',
    name: 'Confirm',
    category: 'prompts',
    status: 'verified',
    tagline: 'Yes/No confirmation prompt with customizable default',
    description: 'A binary question prompt responding to (y/n) keys or Enter. Highly standard for safety-critical operations.',
    defaultConfig: {
      message: 'Proceed with destructive database migration?',
      default: false
    },
    presets: [
      {
        name: 'Dangerous Action',
        config: {
          message: 'Proceed with destructive database migration?',
          default: false
        }
      },
      {
        name: 'Install Dependencies',
        config: {
          message: 'Install missing npm dependencies now?',
          default: true
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { confirm } from "termora";

const shouldProceed = await confirm({
  message: "${cfg.message}",
  default: ${cfg.default}
});

if (!shouldProceed) {
  console.log("Operation aborted by user.");
  process.exit(0);
}`;
      }
      return `const { confirm } = require("termora");

async function run() {
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
    description: 'Masks user keystrokes with bullets or asterisks. Prevents secret leaking in terminal session logs or screen recordings.',
    defaultConfig: {
      message: 'Enter API access token',
      mask: '•'
    },
    presets: [
      {
        name: 'API Token',
        config: {
          message: 'Enter API access token',
          mask: '•'
        }
      },
      {
        name: 'Master Secret',
        config: {
          message: 'Database master password',
          mask: '*'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { password } from "termora";

const secretKey = await password({
  message: "${cfg.message}",
  mask: "${cfg.mask || '•'}"
});

console.log("Token received (length:", secretKey.length, ")");`;
      }
      return `const { password } = require("termora");

async function authenticate() {
  const secretKey = await password({
    message: "${cfg.message}",
    mask: "${cfg.mask || '•'}"
  });

  console.log("Token received (length:", secretKey.length, ")");
}

authenticate();`;
    }
  },

  {
    id: 'autocomplete',
    name: 'Autocomplete',
    category: 'prompts',
    status: 'verified',
    tagline: 'Searchable auto-suggest prompt with fuzzy text filtering',
    description: 'Interactive text input that filters suggestions dynamically as the user types.',
    defaultConfig: {
      message: 'Search Kubernetes cluster namespace',
      options: [
        'default',
        'kube-system',
        'kube-public',
        'ingress-nginx',
        'production-api',
        'staging-web',
        'monitoring-prometheus'
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
      const opts = JSON.stringify(cfg.options);
      if (isEsm) {
        return `import { autocomplete } from "termora";

const namespace = await autocomplete({
  message: "${cfg.message}",
  options: ${opts},
  limit: ${cfg.limit || 5}
});

console.log(\`Connected to namespace: \${namespace}\`);`;
      }
      return `const { autocomplete } = require("termora");

async function main() {
  const namespace = await autocomplete({
    message: "${cfg.message}",
    options: ${opts},
    limit: ${cfg.limit || 5}
  });

  console.log(\`Connected to namespace: \${namespace}\`);
}

main();`;
    }
  },

  {
    id: 'spinner',
    name: 'Spinner',
    category: 'progress',
    status: 'verified',
    tagline: 'Smooth terminal loading indicator with state transitions',
    description: 'Displays a continuous animated glyph during asynchronous tasks. Includes succeed, fail, warn, and info methods.',
    defaultConfig: {
      text: 'Compiling TypeScript build targets...',
      style: 'dots',
      color: 'cyan'
    },
    presets: [
      {
        name: 'Dots (Standard)',
        config: {
          text: 'Compiling TypeScript build targets...',
          style: 'dots',
          color: 'cyan'
        }
      },
      {
        name: 'Arc (Modern)',
        config: {
          text: 'Fetching remote registry tarballs...',
          style: 'arc',
          color: 'emerald'
        }
      },
      {
        name: 'Line (Minimal)',
        config: {
          text: 'Optimizing production bundle...',
          style: 'line',
          color: 'yellow'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { spinner } from "termora";

const loader = spinner({
  text: "${cfg.text}",
  style: "${cfg.style}",
  color: "${cfg.color}"
}).start();

try {
  await doAsyncWork();
  loader.succeed("Build completed in 1.42s!");
} catch (err) {
  loader.fail("Build failed: " + err.message);
}`;
      }
      return `const { spinner } = require("termora");

async function runBuild() {
  const loader = spinner({
    text: "${cfg.text}",
    style: "${cfg.style}",
    color: "${cfg.color}"
  }).start();

  try {
    await doAsyncWork();
    loader.succeed("Build completed in 1.42s!");
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
    tagline: 'Deterministic visual progress gauge with ETA & rates',
    description: 'Visual percentage gauge for bounded tasks such as downloading files, running test suites, or processing records.',
    defaultConfig: {
      total: 100,
      current: 68,
      width: 32,
      completeChar: '█',
      incompleteChar: '░',
      format: ':bar :percent :current/:total items (:eta remaining)'
    },
    presets: [
      {
        name: 'Block Bar',
        config: {
          total: 100,
          current: 68,
          width: 32,
          completeChar: '█',
          incompleteChar: '░',
          format: ':bar :percent :current/:total items'
        }
      },
      {
        name: 'Arrow Bar',
        config: {
          total: 50,
          current: 34,
          width: 28,
          completeChar: '=',
          incompleteChar: '-',
          format: '[:bar] :percent ETA: :eta'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { progressBar } from "termora";

const bar = progressBar({
  total: ${cfg.total},
  width: ${cfg.width},
  completeChar: "${cfg.completeChar}",
  incompleteChar: "${cfg.incompleteChar}",
  format: "${cfg.format}"
});

for (let i = 0; i < ${cfg.total}; i++) {
  await processNextBatch();
  bar.tick(1);
}

bar.complete("All batches processed successfully!");`;
      }
      return `const { progressBar } = require("termora");

async function run() {
  const bar = progressBar({
    total: ${cfg.total},
    width: ${cfg.width},
    completeChar: "${cfg.completeChar}",
    incompleteChar: "${cfg.incompleteChar}",
    format: "${cfg.format}"
  });

  for (let i = 0; i < ${cfg.total}; i++) {
    await processNextBatch();
    bar.tick(1);
  }
}

run();`;
    }
  },

  {
    id: 'box',
    name: 'Box & Panel',
    category: 'layout',
    status: 'verified',
    tagline: 'Bordered containers with custom styles, titles, and padding',
    description: 'Encapsulates terminal text in stylish borders. Supports rounded, single, double, and heavy border styles with title alignment.',
    defaultConfig: {
      title: 'Termora CLI v1.0.0',
      content: 'Server running at https://localhost:8080\nReady to accept inbound connections.',
      borderStyle: 'round',
      padding: 1,
      borderColor: 'cyan',
      titleAlignment: 'left'
    },
    presets: [
      {
        name: 'Rounded Server Badge',
        config: {
          title: 'Termora CLI v1.0.0',
          content: 'Server running at https://localhost:8080\nReady to accept inbound connections.',
          borderStyle: 'round',
          padding: 1,
          borderColor: 'cyan',
          titleAlignment: 'left'
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
          titleAlignment: 'center'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { box } from "termora";

const output = box({
  title: "${cfg.title}",
  content: "${cfg.content.replace(/\n/g, '\\n')}",
  borderStyle: "${cfg.borderStyle}",
  padding: ${cfg.padding},
  borderColor: "${cfg.borderColor}",
  titleAlignment: "${cfg.titleAlignment}"
});

console.log(output);`;
      }
      return `const { box } = require("termora");

const output = box({
  title: "${cfg.title}",
  content: "${cfg.content.replace(/\n/g, '\\n')}",
  borderStyle: "${cfg.borderStyle}",
  padding: ${cfg.padding},
  borderColor: "${cfg.borderColor}",
  titleAlignment: "${cfg.titleAlignment}"
});

console.log(output);`;
    }
  },

  {
    id: 'banner',
    name: 'Banner',
    category: 'layout',
    status: 'verified',
    tagline: 'High-impact CLI splash headers and welcome cards',
    description: 'Creates striking CLI headers when a CLI command is invoked, with automatic centering and subtext decoration.',
    defaultConfig: {
      title: 'TERMORA STUDIO',
      subtitle: 'Modern Terminal UI Toolkit for Node.js',
      badge: 'v1.0.0-rc',
      theme: 'cyan'
    },
    presets: [
      {
        name: 'Standard Hero',
        config: {
          title: 'TERMORA STUDIO',
          subtitle: 'Modern Terminal UI Toolkit for Node.js',
          badge: 'v1.0.0-rc',
          theme: 'cyan'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { banner } from "termora";

banner({
  title: "${cfg.title}",
  subtitle: "${cfg.subtitle}",
  badge: "${cfg.badge}",
  theme: "${cfg.theme}"
});`;
      }
      return `const { banner } = require("termora");

banner({
  title: "${cfg.title}",
  subtitle: "${cfg.subtitle}",
  badge: "${cfg.badge}",
  theme: "${cfg.theme}"
});`;
    }
  },

  {
    id: 'table',
    name: 'Table',
    category: 'data',
    status: 'verified',
    tagline: 'Formatted ANSI tables with column headers and alignment',
    description: 'Renders tabular data with auto-calculated column widths, borders, and custom cell alignments.',
    defaultConfig: {
      headers: ['Endpoint', 'Method', 'Status', 'Latency'],
      rows: [
        ['/api/v1/auth/login', 'POST', '200 OK', '14ms'],
        ['/api/v1/projects', 'GET', '200 OK', '42ms'],
        ['/api/v1/deployments', 'POST', '201 Created', '128ms'],
        ['/api/v1/health', 'GET', '200 OK', '3ms']
      ],
      borderStyle: 'single'
    },
    presets: [
      {
        name: 'API Metrics',
        config: {
          headers: ['Endpoint', 'Method', 'Status', 'Latency'],
          rows: [
            ['/api/v1/auth/login', 'POST', '200 OK', '14ms'],
            ['/api/v1/projects', 'GET', '200 OK', '42ms'],
            ['/api/v1/deployments', 'POST', '201 Created', '128ms'],
            ['/api/v1/health', 'GET', '200 OK', '3ms']
          ],
          borderStyle: 'single'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      const headers = JSON.stringify(cfg.headers);
      const rows = JSON.stringify(cfg.rows, null, 2).replace(/\n/g, '\n  ');
      if (isEsm) {
        return `import { table } from "termora";

const tableOutput = table({
  head: ${headers},
  rows: ${rows},
  borderStyle: "${cfg.borderStyle}"
});

console.log(tableOutput);`;
      }
      return `const { table } = require("termora");

const tableOutput = table({
  head: ${headers},
  rows: ${rows},
  borderStyle: "${cfg.borderStyle}"
});

console.log(tableOutput);`;
    }
  },

  {
    id: 'colors',
    name: 'Colors & Styles',
    category: 'styling',
    status: 'verified',
    tagline: 'Fast ANSI color utilities with zero dependencies',
    description: 'Chained color and style helper functions. Features bold, dim, italic, underline, foreground colors, and RGB support.',
    defaultConfig: {
      color: 'cyan',
      modifier: 'bold',
      text: 'Termora CLI styling utility'
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
          text: 'Documentation: https://termora.dev/docs'
        }
      }
    ],
    generateCode: (cfg, isEsm = true) => {
      if (isEsm) {
        return `import { colors } from "termora";

console.log(colors.${cfg.color}.${cfg.modifier}("${cfg.text}"));
console.log(colors.green("✓ Passed: 48 tests"));
console.log(colors.dim("  Duration: 1.2s"));`;
      }
      return `const { colors } = require("termora");

console.log(colors.${cfg.color}.${cfg.modifier}("${cfg.text}"));
console.log(colors.green("✓ Passed: 48 tests"));
console.log(colors.dim("  Duration: 1.2s"));`;
    }
  }
];
