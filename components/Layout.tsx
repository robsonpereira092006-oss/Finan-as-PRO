
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-background-light dark:bg-background-dark">
      {/* Top Header - Oculto na visualização do Assistente para mais espaço */}
      {currentView !== 'ASSISTANT' && currentView !== 'DEBTS' && (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary">
              <span className="material-symbols-outlined filled-icon">person</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Bem-vindo de volta,</p>
              <p className="text-sm font-bold">Alex Johnson</p>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
          </button>
        </header>
      )}

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 pb-6 pt-3 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button 
            onClick={() => setView('HOME')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'HOME' ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className={`material-symbols-outlined ${currentView === 'HOME' ? 'filled-icon' : ''}`}>home</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Início</span>
          </button>
          
          <button 
            onClick={() => setView('DEBTS')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'DEBTS' ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className={`material-symbols-outlined ${currentView === 'DEBTS' ? 'filled-icon' : ''}`}>credit_card</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Dívidas</span>
          </button>

          <div className="relative -top-8">
            <button 
              onClick={() => setView('ASSISTANT')}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all border-4 border-background-light dark:border-background-dark ${
                currentView === 'ASSISTANT' 
                ? 'bg-slate-900 text-white shadow-slate-900/40' 
                : 'bg-primary text-white shadow-primary/40'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">{currentView === 'ASSISTANT' ? 'smart_toy' : 'add'}</span>
            </button>
          </div>

          <button 
            onClick={() => setView('REPORTS')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'REPORTS' ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className={`material-symbols-outlined ${currentView === 'REPORTS' ? 'filled-icon' : ''}`}>bar_chart</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Relatórios</span>
          </button>

          <button 
            onClick={() => setView('SETTINGS')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'SETTINGS' ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className={`material-symbols-outlined ${currentView === 'SETTINGS' ? 'filled-icon' : ''}`}>settings</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Ajustes</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
