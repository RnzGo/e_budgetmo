import React, { createContext, useContext, useState } from 'react';

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [finance, setFinance] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    entries: [],
  });

  function addEntry(entry) {
    setFinance((prev) => {
      const addedIncome = entry.type === 'income' ? entry.amount : 0;
      const addedExpense = entry.type === 'expense' ? entry.amount : 0;
      const newIncome = (prev.income || 0) + addedIncome;
      const newExpense = (prev.expense || 0) + addedExpense;
      const newBalance = (prev.balance || 0) + (entry.type === 'income' ? entry.amount : -entry.amount);
      const newEntries = [...(prev.entries || []), entry];
      return {
        ...prev,
        income: newIncome,
        expense: newExpense,
        balance: newBalance,
        entries: newEntries,
      };
    });
  }

  const value = { finance, addEntry };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within a FinanceProvider');
  return ctx;
}
