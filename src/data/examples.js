// Verified real-world CLI examples for showcase & documentation
// Built and tested against termkit-ui@0.1.0

export const CLI_EXAMPLES = [
  {
    id: 'scaffolding-wizard',
    title: 'Full-Stack Project Scaffolder',
    description: 'An interactive CLI wizard that collects project requirements, validates input, and runs simulated setup steps.',
    category: 'Full Application',
    code: `import { select, input, multiselect, confirm, number } from "termkit-ui/prompts";
import { spinner, progressBar } from "termkit-ui/progress";
import { box, divider } from "termkit-ui/layout";
import { colors, style } from "termkit-ui/styles";
import { defaultCoordinator } from "termkit-ui";

async function runWizard() {
  // 1. Display Header
  console.log(box(
    "Welcome to the interactive project generator.\\nConfigures TypeScript, styling, and server runtime.",
    {
      title: "CREATE-MODERN-APP v2.0",
      borderStyle: "rounded",
      borderColor: "cyan",
      padding: 1
    }
  ));

  // 2. Gather Configuration
  const appName = await input({
    message: "What is your project named?",
    default: "my-awesome-app",
    validate: (val) => val.trim().length > 0 || "Name cannot be empty"
  });

  const framework = await select({
    message: "Select frontend framework:",
    items: [
      { label: "React 19 + Vite", value: "react" },
      { label: "Next.js 15 (App Router)", value: "next" },
      { label: "Vue 3 + Vite", value: "vue" }
    ]
  });

  const port = await number({
    message: "Development server port:",
    default: 3000,
    min: 1024,
    max: 65535
  });

  const features = await multiselect({
    message: "Select features to include:",
    items: [
      { label: "TypeScript", value: "ts", selected: true },
      { label: "Tailwind CSS", value: "tailwind", selected: true },
      { label: "ESLint & Prettier", value: "lint", selected: true },
      { label: "Docker Setup", value: "docker", selected: false }
    ]
  });

  const installDeps = await confirm({
    message: "Install dependencies automatically?",
    default: true
  });

  // 3. Execution Phase with Concurrent-Safe Logging
  const s = spinner({ message: \`Scaffolding \${appName}...\`, color: "cyan" }).start();
  await new Promise((r) => setTimeout(r, 800));
  defaultCoordinator.log("Created directory: ./" + appName);
  s.succeed("Project directory created.");

  if (installDeps) {
    const bar = progressBar({
      total: 30,
      width: 25,
      message: "Installing packages"
    });

    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 30));
      bar.increment(1);
    }
    bar.complete("Dependencies installed!");
  }

  console.log(divider("ALL SET", { borderColor: "green" }));

  // 4. Success summary
  console.log(colors.green(\`\\n✔ Success! Created \${appName} with \${framework} on port \${port}.\`));
  console.log(style.dim(\`\\nTo get started:\\n  cd \${appName}\\n  npm run dev\\n\`));
}

runWizard();`
  },

  {
    id: 'cloud-deploy',
    title: 'Cloud Deployment CLI',
    description: 'A deployment utility handling target cluster selection, secret token ingestion, and deployment progress.',
    category: 'DevOps & Cloud',
    code: `import { select, password, confirm } from "termkit-ui/prompts";
import { spinner } from "termkit-ui/progress";
import { box, divider } from "termkit-ui/layout";
import { colors, style } from "termkit-ui/styles";

async function deploy() {
  console.log(divider("Cloud Edge Deployer", { borderColor: "cyan" }));

  const target = await select({
    message: "Select target environment:",
    items: [
      { label: "Production (Global Anycast)", value: "prod", hint: "Live users" },
      { label: "Staging (EU Central)", value: "staging" },
      { label: "Preview (Branch ephemeral)", value: "preview" }
    ]
  });

  const token = await password({
    message: "Enter deployment API key:",
    mask: "*"
  });

  const proceed = await confirm({
    message: \`Deploy current commit to \${target}?\`,
    default: true
  });

  if (!proceed) {
    console.log(colors.yellow("Deployment cancelled."));
    return;
  }

  const s = spinner({ message: "Uploading build artifacts to CDN...", color: "cyan" }).start();
  await new Promise(r => setTimeout(r, 1200));
  s.succeed("Artifacts uploaded.");

  const s2 = spinner({ message: "Routing traffic to new deployment...", color: "green" }).start();
  await new Promise(r => setTimeout(r, 800));
  s2.succeed(colors.green("✓ Traffic live at https://app.example.com"));

  console.log(box(\`Environment: \${target}\\nStatus: ACTIVE\\nCommit: HEAD\`, {
    title: "DEPLOYMENT SUCCESS",
    borderColor: "green",
    borderStyle: "rounded"
  }));
}

deploy();`
  }
];
