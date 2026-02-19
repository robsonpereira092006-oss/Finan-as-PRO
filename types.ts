
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  time: string;
  category: string;
  icon: string;
}

export interface SpendingCategory {
  id: string;
  name: string;
  spent: number;
  budget: number;
  icon: string;
  color: string;
}

export interface Debt {
  id: string;
  institution: string;
  description: string;
  remaining: number;
  total: number;
  dueDate: string;
  icon: string;
  color: string;
}

export type View = 'HOME' | 'DEBTS' | 'REPORTS' | 'SETTINGS' | 'ASSISTANT';
