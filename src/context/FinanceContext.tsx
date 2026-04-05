import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Transaction, defaultTransactions } from '@/data/transactions';

type Role = 'viewer' | 'admin';

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savings: number;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem('finsight-transactions');
    return stored ? JSON.parse(stored) : defaultTransactions;
  });

  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem('finsight-role') as Role) || 'admin';
  });

  useEffect(() => {
    localStorage.setItem('finsight-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finsight-role', role);
  }, [role]);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...tx, id: Date.now().toString() }, ...prev]);
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const totalBalance = 124500;
  const savings = totalIncome - totalExpenses;

  return (
    <FinanceContext.Provider value={{
      transactions, role, setRole,
      addTransaction, updateTransaction, deleteTransaction,
      totalBalance, totalIncome, totalExpenses, savings,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
