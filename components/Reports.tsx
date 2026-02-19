
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const MONTHLY_DATA = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Fev', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Abr', income: 2780, expenses: 3908 },
  { name: 'Mai', income: 5000, expenses: 3200 },
];

const CATEGORY_DATA = [
  { name: 'Alimentação', value: 750, color: '#f97316' },
  { name: 'Aluguel', value: 1800, color: '#1152d4' },
  { name: 'Lazer', value: 150, color: '#a855f7' },
  { name: 'Outros', value: 500, color: '#64748b' },
];

const Reports: React.FC = () => {
  const downloadCSV = () => {
    const headers = "Mes,Entradas,Saidas\n";
    const rows = MONTHLY_DATA.map(d => `${d.name},${d.income},${d.expenses}`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_financeiro.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Relatórios Financeiros</h1>
        <button 
          onClick={downloadCSV}
          className="flex items-center gap-1 bg-primary-light text-primary px-3 py-1.5 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          CSV
        </button>
      </div>

      {/* Gráfico de Entradas vs Saídas */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-sm font-bold mb-4">Visão de Fluxo de Caixa</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="income" name="Entradas" fill="#1152d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Saídas" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-6 text-[10px] font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            <span>Entradas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span>Saídas</span>
          </div>
        </div>
      </section>

      {/* Distribuição por Categoria */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-sm font-bold mb-4">Distribuição de Gastos</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CATEGORY_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {CATEGORY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {CATEGORY_DATA.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
              <span className="text-slate-500 font-medium">{cat.name}</span>
              <span className="font-bold ml-auto">R$ {cat.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reports;
