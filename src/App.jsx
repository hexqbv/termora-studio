import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Playground } from './pages/Playground';
import { Components } from './pages/Components';
import { Documentation } from './pages/Documentation';
import { Installation } from './pages/Installation';

export function App() {
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '').split('/')[0];
    return ['home', 'playground', 'components', 'docs', 'install'].includes(hash) ? hash : 'home';
  });

  const [playgroundTargetComponent, setPlaygroundTargetComponent] = useState('select');
  const [docsTargetId, setDocsTargetId] = useState('what-is-termora');

  // Sync hash changes with active page state
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '');
      const [page, subId] = fullHash.split('/');

      if (['home', 'playground', 'components', 'docs', 'install'].includes(page)) {
        setActivePage(page);
        if (page === 'playground' && subId) {
          setPlaygroundTargetComponent(subId);
        }
        if (page === 'docs' && subId) {
          setDocsTargetId(subId);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page;
  };

  const handleOpenComponentInPlayground = (componentId) => {
    setPlaygroundTargetComponent(componentId);
    setActivePage('playground');
    window.location.hash = `playground/${componentId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInDocs = (docId) => {
    setDocsTargetId(docId);
    setActivePage('docs');
    window.location.hash = `docs/${docId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950 text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Sticky Top Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
      />

      {/* Primary Page Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            setActivePage={handlePageChange}
            onOpenComponentInPlayground={handleOpenComponentInPlayground}
          />
        )}

        {activePage === 'playground' && (
          <Playground
            initialComponentId={playgroundTargetComponent}
          />
        )}

        {activePage === 'components' && (
          <Components
            onOpenInPlayground={handleOpenComponentInPlayground}
            onOpenInDocs={handleOpenInDocs}
          />
        )}

        {activePage === 'docs' && (
          <Documentation
            activeDocId={docsTargetId}
            onSelectDoc={setDocsTargetId}
          />
        )}

        {activePage === 'install' && (
          <Installation
            onGoToPlayground={() => handlePageChange('playground')}
          />
        )}
      </main>

      {/* Global Footer (hidden on playground for full-height terminal studio experience) */}
      {activePage !== 'playground' && (
        <Footer setActivePage={handlePageChange} />
      )}
    </div>
  );
}

export default App;
