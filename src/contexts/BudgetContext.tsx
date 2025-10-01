import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  notes?: string;
}

interface BudgetContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem('budget-transactions');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('budget-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...transaction, id } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        totalIncome,
        totalExpenses,
        balance,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within BudgetProvider');
  }
  return context;
};
