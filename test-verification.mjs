import { COMPONENTS } from './src/data/components.js';
import { DOCS_CONTENT, DOC_SECTIONS } from './src/data/documentation.js';
import { CLI_EXAMPLES } from './src/data/examples.js';

console.log('--- TERMORA DATA & CODE GENERATOR TEST SUITE ---');

// Test 1: Data integrity
console.log(`✓ Components loaded: ${COMPONENTS.length}`);
console.log(`✓ Doc sections loaded: ${DOC_SECTIONS.length}`);
console.log(`✓ Doc articles loaded: ${Object.keys(DOCS_CONTENT).length}`);
console.log(`✓ Real-world examples loaded: ${CLI_EXAMPLES.length}`);

// Test 2: Verify code generator for every component in both ESM and CJS
for (const comp of COMPONENTS) {
  if (comp.generateCode) {
    const esmCode = comp.generateCode(comp.defaultConfig, true);
    const cjsCode = comp.generateCode(comp.defaultConfig, false);
    if (!esmCode || !cjsCode) {
      throw new Error(`Code generator failed for component: ${comp.id}`);
    }
    if (!esmCode.includes('termora') || !cjsCode.includes('termora')) {
      throw new Error(`Generated code does not reference termora for: ${comp.id}`);
    }
    console.log(`  ✓ Generated code verified for: ${comp.name} (${comp.id})`);
  }
}

// Test 3: Check preset configurations
for (const comp of COMPONENTS) {
  if (comp.presets) {
    for (const preset of comp.presets) {
      if (!preset.name || !preset.config) {
        throw new Error(`Invalid preset in ${comp.id}: ${JSON.stringify(preset)}`);
      }
    }
  }
}
console.log('✓ All component presets validated.');

console.log('--- ALL CHECKS PASSED SUCCESSFULLY ---');
