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

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  // Recent transactions (September 2025)
  {
    id: '1',
    type: 'expense',
    category: 'Food',
    amount: 45.67,
    date: '2025-09-30',
    notes: 'Grocery shopping - weekly essentials'
  },
  {
    id: '2',
    type: 'expense',
    category: 'Transport',
    amount: 12.50,
    date: '2025-09-30',
    notes: 'Uber ride to work'
  },
  {
    id: '3',
    type: 'income',
    category: 'Freelance',
    amount: 850.00,
    date: '2025-09-29',
    notes: 'Web development project completion'
  },
  {
    id: '4',
    type: 'expense',
    category: 'Entertainment',
    amount: 25.99,
    date: '2025-09-28',
    notes: 'Netflix subscription'
  },
  {
    id: '5',
    type: 'expense',
    category: 'Food',
    amount: 78.23,
    date: '2025-09-27',
    notes: 'Dinner at Italian restaurant'
  },
  {
    id: '6',
    type: 'expense',
    category: 'Shopping',
    amount: 149.99,
    date: '2025-09-26',
    notes: 'New running shoes'
  },
  {
    id: '7',
    type: 'income',
    category: 'Salary',
    amount: 3200.00,
    date: '2025-09-25',
    notes: 'Monthly salary - Software Engineer'
  },
  {
    id: '8',
    type: 'expense',
    category: 'Bills',
    amount: 89.50,
    date: '2025-09-24',
    notes: 'Internet bill'
  },
  {
    id: '9',
    type: 'expense',
    category: 'Healthcare',
    amount: 75.00,
    date: '2025-09-23',
    notes: 'Doctor consultation'
  },
  {
    id: '10',
    type: 'expense',
    category: 'Transport',
    amount: 65.00,
    date: '2025-09-22',
    notes: 'Gas for car'
  },
  
  // Earlier September transactions
  {
    id: '11',
    type: 'expense',
    category: 'Food',
    amount: 52.34,
    date: '2025-09-20',
    notes: 'Weekly grocery shopping'
  },
  {
    id: '12',
    type: 'income',
    category: 'Investment',
    amount: 125.50,
    date: '2025-09-18',
    notes: 'Dividend from stock portfolio'
  },
  {
    id: '13',
    type: 'expense',
    category: 'Entertainment',
    amount: 42.00,
    date: '2025-09-15',
    notes: 'Movie tickets and popcorn'
  },
  {
    id: '14',
    type: 'expense',
    category: 'Shopping',
    amount: 89.99,
    date: '2025-09-14',
    notes: 'New book and stationery'
  },
  {
    id: '15',
    type: 'expense',
    category: 'Bills',
    amount: 125.75,
    date: '2025-09-10',
    notes: 'Electricity bill'
  },
  
  // August 2025 transactions
  {
    id: '16',
    type: 'income',
    category: 'Freelance',
    amount: 1200.00,
    date: '2025-08-30',
    notes: 'Mobile app development project'
  },
  {
    id: '17',
    type: 'income',
    category: 'Salary',
    amount: 3200.00,
    date: '2025-08-25',
    notes: 'Monthly salary - Software Engineer'
  },
  {
    id: '18',
    type: 'expense',
    category: 'Food',
    amount: 234.56,
    date: '2025-08-28',
    notes: 'Monthly grocery budget'
  },
  {
    id: '19',
    type: 'expense',
    category: 'Bills',
    amount: 95.00,
    date: '2025-08-20',
    notes: 'Phone bill'
  },
  {
    id: '20',
    type: 'expense',
    category: 'Healthcare',
    amount: 150.00,
    date: '2025-08-18',
    notes: 'Dental cleaning'
  },
  {
    id: '21',
    type: 'expense',
    category: 'Shopping',
    amount: 299.99,
    date: '2025-08-15',
    notes: 'New headphones for work'
  },
  {
    id: '22',
    type: 'income',
    category: 'Gift',
    amount: 200.00,
    date: '2025-08-12',
    notes: 'Birthday gift from parents'
  },
  {
    id: '23',
    type: 'expense',
    category: 'Entertainment',
    amount: 85.50,
    date: '2025-08-10',
    notes: 'Concert tickets'
  },
  {
    id: '24',
    type: 'expense',
    category: 'Transport',
    amount: 180.00,
    date: '2025-08-08',
    notes: 'Monthly bus pass'
  },
  
  // July 2025 transactions
  {
    id: '25',
    type: 'income',
    category: 'Salary',
    amount: 3200.00,
    date: '2025-07-25',
    notes: 'Monthly salary - Software Engineer'
  },
  {
    id: '26',
    type: 'expense',
    category: 'Food',
    amount: 198.45,
    date: '2025-07-22',
    notes: 'Weekly meal prep groceries'
  },
  {
    id: '27',
    type: 'expense',
    category: 'Bills',
    amount: 110.25,
    date: '2025-07-15',
    notes: 'Water bill'
  },
  {
    id: '28',
    type: 'income',
    category: 'Business',
    amount: 500.00,
    date: '2025-07-10',
    notes: 'Consulting work - weekend project'
  },
  {
    id: '29',
    type: 'expense',
    category: 'Other',
    amount: 75.00,
    date: '2025-07-08',
    notes: 'Gift for friend\'s birthday'
  },
  {
    id: '30',
    type: 'expense',
    category: 'Healthcare',
    amount: 45.00,
    date: '2025-07-05',
    notes: 'Pharmacy - prescription refill'
  }
];

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem('budget-transactions');
    if (stored) {
      const parsedTransactions = JSON.parse(stored);
      // If stored data exists but is empty, load mock data
      return parsedTransactions.length > 0 ? parsedTransactions : mockTransactions;
    }
    // If no stored data, use mock data
    return mockTransactions;
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
