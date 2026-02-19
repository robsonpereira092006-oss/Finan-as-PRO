
import React from 'react';
import { Debt } from '../types';

const DEBTS: Debt[] = [
  { id: '1', institution: 'Banco Chase', description: 'Cartão de Crédito Gold', remaining: 1200, total: 5000, dueDate: '12 Out, 2024', icon: 'account_balance', color: 'primary' },
  { id: '2', institution: 'João Silva', description: 'Empréstimo Pessoal', remaining: 8450, total: 10000, dueDate: '05 Nov, 2024', icon: 'person', color: 'orange-500' },
  { id: '3', institution: 'Toyota Finance', description: 'Parcelas do Carro', remaining: 2800, total: 8000, dueDate: '28 Out, 2024', icon: 'directions_car', color: 'green-500' },
];

interface DebtsProps {
  onBack: () => void;
}

const Debts: React.FC<DebtsProps> = ({ onBack }) => {
  const totalOwed = DEBTS.reduce((acc, debt) => acc + debt.remaining, 0);

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Minhas Dívidas</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </header>

      <div className="p-4 space-y-6">
        {/* Total Owed Card */}
        <section>
          <div className="bg-primary rounded-2xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <p className="text-white/80 text-sm font-medium">Valor Total Devido</p>
              <h2 className="text-3xl font-bold mt-1">R$ {totalOwed.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium">{DEBTS.length} dívidas ativas</span>
                <span className="text-xs opacity-70">Atualizado há 2 min</span>
              </div>
            </div>
          </div>
        </section>

        {/* Debts List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Dívidas Ativas</h3>
            <span className="text-sm text-primary font-semibold cursor-pointer">Ver Histórico</span>
          </div>
          
          <div className="space-y-4">
            {DEBTS.map((debt) => {
              const paidPercent = Math.round(((debt.total - debt.remaining) / debt.total) * 100);
              return (
                <div key={debt.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all active:scale-[0.99]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${debt.color}/10 rounded-xl flex items-center justify-center text-${debt.color}`}>
                        <span className="material-symbols-outlined">{debt.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold">{debt.institution}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{debt.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Vence: {debt.dueDate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Restante</span>
                      <span className="font-bold">R$ {debt.remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${paidPercent}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-400 uppercase tracking-tighter">
                      <span>{paidPercent}% pago</span>
                      <span>Total: R$ {debt.total.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Debts;
