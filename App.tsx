
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Debts from './components/Debts';
import Assistant from './components/Assistant';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Layout from './components/Layout';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Dashboard />;
      case 'DEBTS':
        return <Debts onBack={() => setCurrentView('HOME')} />;
      case 'ASSISTANT':
        return <Assistant />;
      case 'REPORTS':
        return <Reports />;
      case 'SETTINGS':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
