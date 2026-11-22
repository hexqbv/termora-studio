import { COMPONENTS } from './src/data/components.js';
import { DOCS_CONTENT, DOC_SECTIONS } from './src/data/documentation.js';
import { CLI_EXAMPLES } from './src/data/examples.js';
import * as TermKit from 'termkit-ui';
import * as Prompts from 'termkit-ui/prompts';
import * as Progress from 'termkit-ui/progress';
import * as Layout from 'termkit-ui/layout';
import * as Tables from 'termkit-ui/tables';
import * as Styles from 'termkit-ui/styles';
import { createTestTerminal } from 'termkit-ui/testing';

console.log('--- TERMKIT AUDIT & VERIFICATION SUITE ---');

// 1. Verify installed package metadata
console.log('✓ Verified termkit-ui package successfully loaded.');
console.log('✓ Public export count from barrel:', Object.keys(TermKit).length);

// 2. Verify all components in data catalog
console.log(`✓ Components loaded in studio catalog: ${COMPONENTS.length}`);
console.log(`✓ Doc sections loaded: ${DOC_SECTIONS.length}`);
console.log(`✓ Doc articles loaded: ${Object.keys(DOCS_CONTENT).length}`);
console.log(`✓ Real-world examples loaded: ${CLI_EXAMPLES.length}`);

// 3. Verify code generation for each component
for (const comp of COMPONENTS) {
  if (comp.generateCode) {
    const esmCode = comp.generateCode(comp.defaultConfig, true);
    const cjsCode = comp.generateCode(comp.defaultConfig, false);
    if (!esmCode || !cjsCode) {
      throw new Error(`Code generator failed for component: ${comp.id}`);
    }
    console.log(`  ✓ Code generated for: ${comp.name} (${comp.id}) [status: ${comp.status}]`);
  }
}

// 4. Execute actual package functions with the generated structures
console.log('\n--- EXECUTING ACTUAL PACKAGE PRIMITIVES ---');

// Box
const boxed = Layout.box('Test Box Content', { title: 'UNIT TEST', borderStyle: 'rounded', borderColor: 'cyan' });
if (!boxed.includes('Test Box Content')) throw new Error('box() rendering failed');
console.log('✓ box() executed successfully with actual package');

// Divider
const divided = Layout.divider('DIVIDER TEST', { borderColor: 'green' });
if (!divided.includes('DIVIDER TEST')) throw new Error('divider() rendering failed');
console.log('✓ divider() executed successfully with actual package');

// Table
const tabled = Tables.table([{ service: 'api', status: 'OK' }], { borderStyle: 'rounded' });
if (!tabled.includes('api')) throw new Error('table() rendering failed');
console.log('✓ table() executed successfully with actual package');

// Colors
const colored = Styles.colors.cyan.bold('Colors OK');
if (!colored.includes('Colors OK')) throw new Error('colors rendering failed');
console.log('✓ colors / style executed successfully with actual package');

// Prompts using Headless Virtual Terminal
const term = createTestTerminal();

// Confirm
const confirmPromise = Prompts.confirm({ message: 'OK?', input: term.stdin, output: term.stderr });
await term.type('\r');
const confirmRes = await confirmPromise;
if (confirmRes !== true) throw new Error('confirm() execution failed');
console.log('✓ confirm() prompt executed successfully in virtual terminal');

// Input
const inputPromise = Prompts.input({ message: 'Name', default: 'termkit', input: term.stdin, output: term.stderr });
await term.type('\r');
const inputRes = await inputPromise;
if (inputRes !== 'termkit') throw new Error('input() execution failed');
console.log('✓ input() prompt executed successfully in virtual terminal');

// Number
const numberPromise = Prompts.number({ message: 'Port', default: 3000, min: 1024, max: 9999, input: term.stdin, output: term.stderr });
await term.type('\r');
const numberRes = await numberPromise;
if (numberRes !== 3000) throw new Error('number() execution failed');
console.log('✓ number() prompt executed successfully in virtual terminal');

// Select
const selectPromise = Prompts.select({
  message: 'Framework',
  items: [{ label: 'React', value: 'react' }, { label: 'Vue', value: 'vue' }],
  input: term.stdin,
  output: term.stderr
});
await term.type('\r');
const selectRes = await selectPromise;
if (selectRes !== 'react') throw new Error('select() execution failed');
console.log('✓ select() prompt executed successfully in virtual terminal');

// MultiSelect
const multiPromise = Prompts.multiselect({
  message: 'Tools',
  items: [{ label: 'TypeScript', value: 'ts', selected: true }],
  input: term.stdin,
  output: term.stderr
});
await term.type('\r');
const multiRes = await multiPromise;
if (!Array.isArray(multiRes) || multiRes[0] !== 'ts') throw new Error('multiselect() execution failed');
console.log('✓ multiselect() prompt executed successfully in virtual terminal');

console.log('\n--- ALL AUDIT & INTEGRITY CHECKS PASSED ---');
