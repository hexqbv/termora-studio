import React, { useState } from 'react';
import { CodeBlock } from '../common/CodeBlock';
import { Tabs } from '../common/Tabs';
import { FileCode, FileText } from 'lucide-react';

export function CodeOutput({ component, config }) {
  const [moduleFormat, setModuleFormat] = useState('esm'); // esm | cjs

  const generatedCode = component.generateCode
    ? component.generateCode(config, moduleFormat === 'esm')
    : `// No generator configured for ${component.id}`;

  const tabs = [
    { id: 'esm', label: 'ES Modules (import)', icon: FileCode },
    { id: 'cjs', label: 'CommonJS (require)', icon: FileText }
  ];

  return (
    <div className="border-t border-dark-800 bg-dark-950 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
            Generated Node.js Implementation
          </span>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
            Runnable
          </span>
        </div>

        <Tabs
          tabs={tabs}
          activeTab={moduleFormat}
          onChange={setModuleFormat}
        />
      </div>

      <CodeBlock
        code={generatedCode}
        filename={moduleFormat === 'esm' ? 'index.mjs' : 'index.cjs'}
      />
    </div>
  );
}
