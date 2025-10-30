import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [finance, setFinance] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    entries: [],
  });

  // AsyncStorage key for persisted finance state
  const STORAGE_KEY = '@e_budgetmo_finance';

  // Load persisted finance state on mount
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        // basic validation
        if (mounted && parsed && typeof parsed === 'object') {
          setFinance((prev) => ({ ...prev, ...parsed }));
        }
      } catch (err) {
        // ignore load errors in production; dev can check logs
        console.warn('Failed to load finance from storage', err);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Save finance state whenever it changes
  useEffect(() => {
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(finance || {}));
      } catch (err) {
        console.warn('Failed to save finance to storage', err);
      }
    }
    // don't block render; fire-and-forget
    save();
  }, [finance]);

  function addEntry(entry) {
    setFinance((prev) => {
      // Normalize the incoming entry to ensure it always has an id, date and numeric amount
      const normalized = {
        id: entry.id ?? Date.now(),
        date: entry.date ?? new Date().toISOString(),
        // prefer an explicit title, fall back to note for legacy compatibility
        category: entry.category ?? entry.title ?? entry.note ?? (entry.type === 'income' ? 'Income' : 'Expense'),
        title: entry.title ?? entry.note ?? '',
        // also keep note for older records/components that still read it
        note: entry.note ?? entry.title ?? '',
        type: entry.type,
        amount: Number(entry.amount) || 0,
      };

      const addedIncome = normalized.type === 'income' ? normalized.amount : 0;
      const addedExpense = normalized.type === 'expense' ? normalized.amount : 0;
      const newIncome = (prev.income || 0) + addedIncome;
      const newExpense = (prev.expense || 0) + addedExpense;
      const newBalance = (prev.balance || 0) + (normalized.type === 'income' ? normalized.amount : -normalized.amount);
      // Prepend new entries so the most recent appear first
      const newEntries = [normalized, ...(prev.entries || [])];
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
