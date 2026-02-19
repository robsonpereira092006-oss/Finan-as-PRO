
import React from 'react';
import { Transaction, SpendingCategory } from '../types';

const TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Starbucks Café', amount: -5.50, date: '12 de Maio, 2024', time: '09:15 AM', category: 'Alimentação', icon: 'coffee' },
  { id: '2', title: 'Salário Mensal', amount: 2500.00, date: '11 de Maio, 2024', time: '08:00 AM', category: 'Renda', icon: 'account_balance_wallet' },
  { id: '3', title: 'Apple Store', amount: -129.00, date: '10 de Maio, 2024', time: '02:30 PM', category: 'Compras', icon: 'shopping_bag' },
  { id: '4', title: 'Posto Shell', amount: -45.20, date: '09 de Maio, 2024', time: '06:45 PM', category: 'Transporte', icon: 'directions_car' },
];

const SPENDING: SpendingCategory[] = [
  { id: '1', name: 'Alimentação e Bebidas', spent: 750, budget: 1000, icon: 'restaurant', color: 'bg-orange-500' },
  { id: '2', name: 'Aluguel e Contas', spent: 1800, budget: 1800, icon: 'home', color: 'bg-primary' },
  { id: '3', name: 'Lazer e Diversão', spent: 150, budget: 500, icon: 'movie', color: 'bg-purple-500' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Card de Saldo */}
      <section className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white shadow-xl shadow-primary/20">
          <div className="relative z-10">
            <p className="text-sm font-medium text-white/80">Saldo Total</p>
            <h1 className="text-3xl font-bold mt-1">R$ 12.450,00</h1>
            <div className="mt-4 flex items-center gap-2 text-xs bg-white/20 w-fit px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+2,4% desde o mês passado</span>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 transition-all active:scale-[0.98]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined text-[18px]">south_west</span>
              </div>
              <span className="text-xs font-medium text-slate-500">Entradas</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">R$ 5.000,00</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 transition-all active:scale-[0.98]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                <span className="material-symbols-outlined text-[18px]">north_east</span>
              </div>
              <span className="text-xs font-medium text-slate-500">Saídas</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">R$ 3.200,00</p>
          </div>
        </div>
      </section>

      {/* Divisão de Gastos */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Divisão de Gastos</h2>
          <button className="text-primary text-sm font-semibold">Ver Tudo</button>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          {SPENDING.map((cat) => (
            <div key={cat.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${cat.color} bg-opacity-10 text-opacity-100`}>
                    <span className={`material-symbols-outlined ${cat.color.replace('bg-', 'text-')}`}>{cat.icon}</span>
                  </div>
                  <span className="font-medium text-sm">{cat.name}</span>
                </div>
                <span className="text-sm font-bold">R$ {cat.spent} / R$ {cat.budget}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${cat.color} rounded-full transition-all duration-1000`} 
                  style={{ width: `${Math.min(100, (cat.spent / cat.budget) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transações Recentes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Transações Recentes</h2>
          <button className="text-primary text-sm font-semibold">Ver Todas</button>
        </div>
        <div className="space-y-3">
          {TRANSACTIONS.map((tx) => (
            <div 
              key={tx.id} 
              className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">{tx.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{tx.title}</p>
                  <p className="text-xs text-slate-500">{tx.date} • {tx.time}</p>
                </div>
              </div>
              <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900 dark:text-slate-100'}`}>
                {tx.amount > 0 ? `+R$ ${tx.amount.toFixed(2)}` : `-R$ ${Math.abs(tx.amount).toFixed(2)}`}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
