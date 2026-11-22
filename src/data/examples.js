// Full real-world CLI examples for showcase & documentation

export const CLI_EXAMPLES = [
  {
    id: 'scaffolding-wizard',
    title: 'Full-Stack Project Scaffolder',
    description: 'An interactive CLI wizard that collects project requirements, validates input, and runs simulated setup steps.',
    category: 'Full Application',
    code: `import { select, input, multiselect, confirm, spinner, progressBar, box, colors } from "termora";

async function runWizard() {
  // 1. Display Header
  console.log(box({
    title: "CREATE-MODERN-APP v2.0",
    content: "Welcome to the interactive project generator.",
    borderStyle: "round",
    borderColor: "cyan",
    padding: 1
  }));

  // 2. Gather Configuration
  const appName = await input({
    message: "What is your project named?",
    default: "my-awesome-app",
    validate: (val) => val.trim().length > 0 || "Name cannot be empty"
  });

  const framework = await select({
    message: "Select frontend framework:",
    options: [
      { label: "React 19 + Vite", value: "react" },
      { label: "Next.js 15 (App Router)", value: "next" },
      { label: "Vue 3 + Vite", value: "vue" }
    ]
  });

  const features = await multiselect({
    message: "Select features to include:",
    options: [
      { label: "TypeScript", value: "ts", default: true },
      { label: "Tailwind CSS v4", value: "tailwind", default: true },
      { label: "ESLint & Prettier", value: "lint", default: true },
      { label: "Docker Setup", value: "docker", default: false }
    ]
  });

  const installDeps = await confirm({
    message: "Install dependencies automatically?",
    default: true
  });

  // 3. Execution Phase
  const s = spinner({ text: \`Creating scaffolding for \${appName}...\`, color: "cyan" }).start();
  await new Promise((r) => setTimeout(r, 1200));
  s.succeed("Project directory created.");

  if (installDeps) {
    const bar = progressBar({
      total: 40,
      width: 25,
      format: "Installing packages [:bar] :percent :current/:total"
    });

    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 40));
      bar.tick(1);
    }
  }

  // 4. Success summary
  console.log(colors.green(\`\\n✔ Success! Created \${appName} with \${framework}.\`));
  console.log(colors.dim(\`\\nTo get started:\\n  cd \${appName}\\n  npm run dev\\n\`));
}

runWizard();`
  },

  {
    id: 'cloud-deploy',
    title: 'Cloud Deployment CLI',
    description: 'A deployment utility handling target cluster selection, secret token ingestion, and deployment progress.',
    category: 'DevOps & Cloud',
    code: `import { select, password, confirm, spinner, colors } from "termora";

async function deploy() {
  console.log(colors.cyan.bold("=== Cloud Edge Deployer ==="));

  const target = await select({
    message: "Select target environment:",
    options: [
      { label: "Production (Global Anycast)", value: "prod" },
      { label: "Staging (EU Central)", value: "staging" },
      { label: "Preview (Branch ephemeral)", value: "preview" }
    ]
  });

  const token = await password({
    message: "Enter deployment API key:",
    mask: "•"
  });

  const proceed = await confirm({
    message: \`Deploy current commit to \${target}?\`,
    default: true
  });

  if (!proceed) {
    console.log(colors.yellow("Deployment cancelled."));
    return;
  }

  const s = spinner({ text: "Uploading build artifacts to CDN...", color: "cyan" }).start();
  await new Promise(r => setTimeout(r, 1800));
  s.succeed("Artifacts uploaded.");

  const s2 = spinner({ text: "Routing traffic to new deployment...", color: "emerald" }).start();
  await new Promise(r => setTimeout(r, 1000));
  s2.succeed(colors.green("✓ Traffic live at https://app.example.com"));
}

deploy();`
  }
];
