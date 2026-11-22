import React, { useState } from 'react';
import { COMPONENTS } from '../data/components';
import { PlaygroundSidebar } from '../components/playground/PlaygroundSidebar';
import { PlaygroundConfig } from '../components/playground/PlaygroundConfig';
import { PlaygroundPreview } from '../components/playground/PlaygroundPreview';
import { CodeOutput } from '../components/playground/CodeOutput';

export function Playground({ initialComponentId = 'select' }) {
  const [activeComponentId, setActiveComponentId] = useState(initialComponentId);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active component and its config state
  const activeComponent = COMPONENTS.find(c => c.id === activeComponentId) || COMPONENTS[0];
  const [config, setConfig] = useState(activeComponent.defaultConfig);

  const handleSelectComponent = (id) => {
    const comp = COMPONENTS.find(c => c.id === id);
    if (comp) {
      setActiveComponentId(id);
      setConfig(comp.defaultConfig);
    }
  };

  const handleResetConfig = () => {
    setConfig(activeComponent.defaultConfig);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-dark-950 overflow-hidden">
      {/* 3-Column Playground Layout on Desktop */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* Left Column: Component Catalog Sidebar */}
        <PlaygroundSidebar
          activeComponentId={activeComponentId}
          onSelectComponent={handleSelectComponent}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Center Column: Live Terminal Preview & Dynamic Code Output */}
        <div className="flex-1 flex flex-col min-w-0 bg-dark-950 overflow-y-auto">
          <PlaygroundPreview
            component={activeComponent}
            config={config}
            onReset={handleResetConfig}
          />

          <CodeOutput
            component={activeComponent}
            config={config}
          />
        </div>

        {/* Right Column: Configuration Controls Inspector */}
        <PlaygroundConfig
          component={activeComponent}
          config={config}
          onChangeConfig={setConfig}
          onReset={handleResetConfig}
        />
      </div>
    </div>
  );
}
