/**
 * Contexto global do aplicativo Finanças Pessoais Pro
 * Gerencia estado compartilhado entre telas
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import {
  Transaction,
  Category,
  RecurringTransaction,
  AppSettings,
  Budget,
} from './types';
import {
  TransactionStorage,
  RecurringTransactionStorage,
  CategoryStorage,
  SettingsStorage,
  BudgetStorage,
} from './storage';

// ============================================================================
// TIPOS
// ============================================================================

export interface AppState {
  transactions: Transaction[];
  recurringTransactions: RecurringTransaction[];
  categories: Category[];
  settings: AppSettings;
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  selectedMonth: Date;
}

export type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_RECURRING_TRANSACTIONS'; payload: RecurringTransaction[] }
  | { type: 'ADD_RECURRING_TRANSACTION'; payload: RecurringTransaction }
  | { type: 'UPDATE_RECURRING_TRANSACTION'; payload: RecurringTransaction }
  | { type: 'DELETE_RECURRING_TRANSACTION'; payload: string }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_SETTINGS'; payload: AppSettings }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'SET_BUDGETS'; payload: Budget[] }
  | { type: 'ADD_BUDGET'; payload: Budget }
  | { type: 'UPDATE_BUDGET'; payload: Budget }
  | { type: 'DELETE_BUDGET'; payload: string }
  | { type: 'SET_SELECTED_MONTH'; payload: Date }
  | { type: 'INITIALIZE'; payload: Partial<AppState> };

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Ações de transação
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  // Ações de transação recorrente
  addRecurringTransaction: (transaction: Omit<RecurringTransaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateRecurringTransaction: (id: string, updates: Partial<Omit<RecurringTransaction, 'id' | 'createdAt'>>) => Promise<void>;
  deleteRecurringTransaction: (id: string) => Promise<void>;
  // Ações de categoria
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Omit<Category, 'id'>>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  // Ações de configurações
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  // Ações de orçamento
  addBudget: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBudget: (id: string, updates: Partial<Omit<Budget, 'id' | 'createdAt'>>) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
  // Ações de inicialização
  initialize: () => Promise<void>;
}

// ============================================================================
// CONTEXTO
// ============================================================================

const AppContext = createContext<AppContextType | undefined>(undefined);

// ============================================================================
// REDUCER
// ============================================================================

const initialState: AppState = {
  transactions: [],
  recurringTransactions: [],
  categories: [],
  settings: {
    id: '',
    theme: 'auto',
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    readPushNotifications: true,
    budgetAlerts: true,
    budgetAlertThreshold: 80,
    autoApplyRecurring: true,
    backupFrequency: 'weekly',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  budgets: [],
  loading: true,
  error: null,
  selectedMonth: new Date(),
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };

    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case 'SET_RECURRING_TRANSACTIONS':
      return { ...state, recurringTransactions: action.payload };

    case 'ADD_RECURRING_TRANSACTION':
      return {
        ...state,
        recurringTransactions: [...state.recurringTransactions, action.payload],
      };

    case 'UPDATE_RECURRING_TRANSACTION':
      return {
        ...state,
        recurringTransactions: state.recurringTransactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_RECURRING_TRANSACTION':
      return {
        ...state,
        recurringTransactions: state.recurringTransactions.filter(
          (t) => t.id !== action.payload
        ),
      };

    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };

    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };

    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };

    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    case 'SET_BUDGETS':
      return { ...state, budgets: action.payload };

    case 'ADD_BUDGET':
      return { ...state, budgets: [...state.budgets, action.payload] };

    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map((b) =>
          b.id === action.payload.id ? action.payload : b
        ),
      };

    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter((b) => b.id !== action.payload),
      };

    case 'SET_SELECTED_MONTH':
      return { ...state, selectedMonth: action.payload };

    case 'INITIALIZE':
      return { ...state, ...action.payload, loading: false };

    default:
      return state;
  }
};

// ============================================================================
// PROVIDER
// ============================================================================

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Inicializa o app ao montar
  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const [transactions, recurringTransactions, categories, settings, budgets] =
        await Promise.all([
          TransactionStorage.getAll(),
          RecurringTransactionStorage.getAll(),
          CategoryStorage.getAll(),
          SettingsStorage.get(),
          BudgetStorage.getAll(),
        ]);

      dispatch({
        type: 'INITIALIZE',
        payload: {
          transactions,
          recurringTransactions,
          categories,
          settings,
          budgets,
        },
      });
    } catch (error) {
      console.error('Erro ao inicializar app:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao carregar dados do aplicativo',
      });
    }
  };

  const addTransaction = async (
    transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      const newTransaction = await TransactionStorage.add(transaction);
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao adicionar transação',
      });
    }
  };

  const updateTransaction = async (
    id: string,
    updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>
  ) => {
    try {
      const updated = await TransactionStorage.update(id, updates);
      if (updated) {
        dispatch({ type: 'UPDATE_TRANSACTION', payload: updated });
      }
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao atualizar transação',
      });
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const deleted = await TransactionStorage.delete(id);
      if (deleted) {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      }
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao deletar transação',
      });
    }
  };

  const addRecurringTransaction = async (
    transaction: Omit<RecurringTransaction, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      const newTransaction = await RecurringTransactionStorage.add(transaction);
      dispatch({ type: 'ADD_RECURRING_TRANSACTION', payload: newTransaction });
    } catch (error) {
      console.error('Erro ao adicionar transação recorrente:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao adicionar transação recorrente',
      });
    }
  };

  const updateRecurringTransaction = async (
    id: string,
    updates: Partial<Omit<RecurringTransaction, 'id' | 'createdAt'>>
  ) => {
    try {
      const updated = await RecurringTransactionStorage.update(id, updates);
      if (updated) {
        dispatch({ type: 'UPDATE_RECURRING_TRANSACTION', payload: updated });
      }
    } catch (error) {
      console.error('Erro ao atualizar transação recorrente:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao atualizar transação recorrente',
      });
    }
  };

  const deleteRecurringTransaction = async (id: string) => {
    try {
      const deleted = await RecurringTransactionStorage.delete(id);
      if (deleted) {
        dispatch({ type: 'DELETE_RECURRING_TRANSACTION', payload: id });
      }
    } catch (error) {
      console.error('Erro ao deletar transação recorrente:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao deletar transação recorrente',
      });
    }
  };

  const addCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const newCategory = await CategoryStorage.add(category);
      dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao adicionar categoria',
      });
    }
  };

  const updateCategory = async (
    id: string,
    updates: Partial<Omit<Category, 'id'>>
  ) => {
    try {
      const updated = await CategoryStorage.update(id, updates);
      if (updated) {
        dispatch({ type: 'UPDATE_CATEGORY', payload: updated });
      }
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao atualizar categoria',
      });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const deleted = await CategoryStorage.delete(id);
      if (deleted) {
        dispatch({ type: 'DELETE_CATEGORY', payload: id });
      }
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao deletar categoria',
      });
    }
  };

  const updateSettings = async (updates: Partial<AppSettings>) => {
    try {
      const updated = await SettingsStorage.update(updates);
      dispatch({ type: 'UPDATE_SETTINGS', payload: updated });
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao atualizar configurações',
      });
    }
  };

  const addBudget = async (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newBudget = await BudgetStorage.add(budget);
      dispatch({ type: 'ADD_BUDGET', payload: newBudget });
    } catch (error) {
      console.error('Erro ao adicionar orçamento:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao adicionar orçamento',
      });
    }
  };

  const updateBudget = async (
    id: string,
    updates: Partial<Omit<Budget, 'id' | 'createdAt'>>
  ) => {
    try {
      const updated = await BudgetStorage.update(id, updates);
      if (updated) {
        dispatch({ type: 'UPDATE_BUDGET', payload: updated });
      }
    } catch (error) {
      console.error('Erro ao atualizar orçamento:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao atualizar orçamento',
      });
    }
  };

  const deleteBudget = async (id: string) => {
    try {
      const deleted = await BudgetStorage.delete(id);
      if (deleted) {
        dispatch({ type: 'DELETE_BUDGET', payload: id });
      }
    } catch (error) {
      console.error('Erro ao deletar orçamento:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Erro ao deletar orçamento',
      });
    }
  };

  const value: AppContextType = {
    state,
    dispatch,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addRecurringTransaction,
    updateRecurringTransaction,
    deleteRecurringTransaction,
    addCategory,
    updateCategory,
    deleteCategory,
    updateSettings,
    addBudget,
    updateBudget,
    deleteBudget,
    initialize,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ============================================================================
// HOOK
// ============================================================================

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
};
