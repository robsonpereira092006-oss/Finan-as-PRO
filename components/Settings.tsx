
import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleExportData = () => {
    const data = {
      user: "Alex Johnson",
      exportDate: new Date().toISOString(),
      balance: 12450.00,
      transactions: [
        { id: '1', title: 'Starbucks Café', amount: -5.50, date: '2024-05-12' },
        { id: '2', title: 'Salário Mensal', amount: 2500.00, date: '2024-05-11' }
      ],
      debts: [
        { institution: 'Banco Chase', remaining: 1200, total: 5000 }
      ]
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `finanza_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Configurações</h1>

      <section className="space-y-4">
        {/* Aparência */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined">dark_mode</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Modo Escuro</p>
                <p className="text-[10px] text-slate-500">Ativar tema escuro</p>
              </div>
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-primary' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>

        {/* Instalação Nativa (Simulação de APK) */}
        {deferredPrompt && (
          <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined">install_mobile</span>
              </div>
              <div>
                <p className="text-sm font-bold text-primary">App Disponível</p>
                <p className="text-[10px] text-primary/80">Instale no seu celular agora</p>
              </div>
            </div>
            <button 
              onClick={handleInstallClick}
              className="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-md active:scale-95 transition-all"
            >
              Instalar
            </button>
          </div>
        )}

        {/* Backup e Dados */}
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Backup e Dados</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <button 
            onClick={handleExportData}
            className="w-full p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined">download</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Exportar Backup</p>
                <p className="text-[10px] text-slate-500">Baixar dados em JSON</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-blue-400">file_download</span>
          </button>

          <div className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-50 dark:active:bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined">cloud_upload</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Sincronização em Nuvem</p>
                <p className="text-[10px] text-slate-500">Ativar Google Drive / iCloud</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-50 dark:active:bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined">security</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Privacidade e Segurança</p>
                <p className="text-[10px] text-slate-500">Senha, FaceID e mais</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 flex items-center gap-3 text-red-500 cursor-pointer active:bg-red-50 dark:active:bg-red-900/10">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined">logout</span>
            </div>
            <p className="text-sm font-semibold">Sair da Conta</p>
          </div>
        </div>
      </section>

      <div className="text-center space-y-1">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Finanza Pro v2.4.1</p>
        <p className="text-[10px] text-slate-400">Desenvolvido com Inteligência Gemini</p>
      </div>
    </div>
  );
};

export default Settings;
