import React from 'react';
import { TerminalWindow } from '../terminal/TerminalWindow';
import {
  SelectRenderer,
  InputRenderer,
  NumberRenderer,
  MultiSelectRenderer,
  ConfirmRenderer,
  PasswordRenderer,
  AutocompleteRenderer,
  DividerRenderer,
  BannerRenderer,
  ColorsRenderer
} from '../terminal/PromptRenderer';
import { SpinnerRenderer, ProgressBarRenderer } from '../terminal/SpinnerRenderer';
import { BoxRenderer } from '../terminal/BoxRenderer';
import { TableRenderer } from '../terminal/TableRenderer';
import { Badge } from '../common/Badge';

export function PlaygroundPreview({
  component,
  config,
  onReset
}) {
  const renderInteractiveComponent = () => {
    switch (component.id) {
      case 'select':
        return <SelectRenderer key={JSON.stringify(config)} config={config} />;
      case 'input':
        return <InputRenderer key={JSON.stringify(config)} config={config} />;
      case 'number':
        return <NumberRenderer key={JSON.stringify(config)} config={config} />;
      case 'multiselect':
        return <MultiSelectRenderer key={JSON.stringify(config)} config={config} />;
      case 'confirm':
        return <ConfirmRenderer key={JSON.stringify(config)} config={config} />;
      case 'password':
        return <PasswordRenderer key={JSON.stringify(config)} config={config} />;
      case 'autocomplete':
        return <AutocompleteRenderer key={JSON.stringify(config)} config={config} />;
      case 'spinner':
        return <SpinnerRenderer key={JSON.stringify(config)} config={config} />;
      case 'progressBar':
        return <ProgressBarRenderer key={JSON.stringify(config)} config={config} />;
      case 'box':
        return <BoxRenderer key={JSON.stringify(config)} config={config} />;
      case 'divider':
        return <DividerRenderer key={JSON.stringify(config)} config={config} />;
      case 'banner':
        return <BannerRenderer key={JSON.stringify(config)} config={config} />;
      case 'table':
        return <TableRenderer key={JSON.stringify(config)} config={config} />;
      case 'colors':
        return <ColorsRenderer key={JSON.stringify(config)} config={config} />;
      default:
        return <div className="text-slate-400">Preview not configured.</div>;
    }
  };

  const isVerified = component.status === 'verified';

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto">
      {/* Component Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-white font-mono">{component.name}</h2>
            <Badge variant={isVerified ? 'verified' : 'planned'}>
              {isVerified ? 'VERIFIED PACKAGE API' : 'SIMULATED / PLANNED EXTENSION'}
            </Badge>
            <span className="text-xs font-mono text-slate-500 uppercase">
              {component.packageExport || `termkit-ui/${component.id}`}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{component.description}</p>
        </div>
      </div>

      {/* Terminal Viewport */}
      <TerminalWindow
        title={`termkit-ui — preview: ${component.id} — 80x24`}
        onReset={onReset}
        className="w-full min-h-[300px] flex-1"
        statusText={isVerified ? `Previewing verified termkit-ui primitive` : `Previewing simulated UI extension`}
      >
        <div className="py-2">
          {renderInteractiveComponent()}
        </div>
      </TerminalWindow>
    </div>
  );
}
