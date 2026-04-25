/**
 * Serviço de armazenamento para o aplicativo Finanças Pessoais Pro
 * Usa AsyncStorage para persistência local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Category,
  Transaction,
  RecurringTransaction,
  AppSettings,
  Budget,
  PushNotificationTransaction,
  DEFAULT_CATEGORIES,
} from './types';

// ============================================================================
// CONSTANTES DE CHAVES
// ============================================================================

const STORAGE_KEYS = {
  TRANSACTIONS: 'financas:transactions',
  RECURRING_TRANSACTIONS: 'financas:recurring_transactions',
  CATEGORIES: 'financas:categories',
  SETTINGS: 'financas:settings',
  BUDGETS: 'financas:budgets',
  PUSH_NOTIFICATIONS: 'financas:push_notifications',
  LAST_SYNC: 'financas:last_sync',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Converte Date para string ISO
 */
const dateToString = (date: Date): string => date.toISOString();

/**
 * Converte string ISO para Date
 */
const stringToDate = (str: string): Date => new Date(str);

/**
 * Serializa um objeto convertendo Dates para strings
 */
const serialize = (obj: any): string => {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) {
      return dateToString(value);
    }
    return value;
  });
};

/**
 * Desserializa um objeto convertendo strings para Dates
 */
const deserialize = (json: string, dateFields: string[] = []): any => {
  return JSON.parse(json, (key, value) => {
    if (dateFields.includes(key) && typeof value === 'string') {
      return stringToDate(value);
    }
    return value;
  });
};

// ============================================================================
// TRANSAÇÕES
// ============================================================================

export const TransactionStorage = {
  /**
   * Obtém todas as transações
   */
  async getAll(): Promise<Transaction[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (!data) return [];
      return deserialize(data, ['date', 'createdAt', 'updatedAt']);
    } catch (error) {
      console.error('Erro ao obter transações:', error);
      return [];
    }
  },

  /**
   * Obtém transações de um período
   */
  async getByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    const all = await this.getAll();
    return all.filter(
      (t) => t.date >= startDate && t.date <= endDate
    );
  },

  /**
   * Obtém transações de uma categoria
   */
  async getByCategory(categoryId: string): Promise<Transaction[]> {
    const all = await this.getAll();
    return all.filter((t) => t.categoryId === categoryId);
  },

  /**
   * Obtém uma transação por ID
   */
  async getById(id: string): Promise<Transaction | null> {
    const all = await this.getAll();
    return all.find((t) => t.id === id) || null;
  },

  /**
   * Adiciona uma nova transação
   */
  async add(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const all = await this.getAll();
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    all.push(newTransaction);
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, serialize(all));
    return newTransaction;
  },

  /**
   * Atualiza uma transação
   */
  async update(id: string, updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>): Promise<Transaction | null> {
    const all = await this.getAll();
    const index = all.findIndex((t) => t.id === id);
    if (index === -1) return null;
    all[index] = {
      ...all[index],
      ...updates,
      updatedAt: new Date(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, serialize(all));
    return all[index];
  },

  /**
   * Deleta uma transação
   */
  async delete(id: string): Promise<boolean> {
    const all = await this.getAll();
    const filtered = all.filter((t) => t.id !== id);
    if (filtered.length === all.length) return false;
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, serialize(filtered));
    return true;
  },

  /**
   * Limpa todas as transações
   */
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
  },
};

// ============================================================================
// TRANSAÇÕES RECORRENTES
// ============================================================================

export const RecurringTransactionStorage = {
  /**
   * Obtém todas as transações recorrentes
   */
  async getAll(): Promise<RecurringTransaction[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.RECURRING_TRANSACTIONS);
      if (!data) return [];
      return deserialize(data, ['startDate', 'endDate', 'nextDueDate', 'createdAt', 'updatedAt']);
    } catch (error) {
      console.error('Erro ao obter transações recorrentes:', error);
      return [];
    }
  },

  /**
   * Obtém transações recorrentes ativas
   */
  async getActive(): Promise<RecurringTransaction[]> {
    const all = await this.getAll();
    return all.filter((t) => t.isActive);
  },

  /**
   * Obtém uma transação recorrente por ID
   */
  async getById(id: string): Promise<RecurringTransaction | null> {
    const all = await this.getAll();
    return all.find((t) => t.id === id) || null;
  },

  /**
   * Adiciona uma nova transação recorrente
   */
  async add(transaction: Omit<RecurringTransaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<RecurringTransaction> {
    const all = await this.getAll();
    const newTransaction: RecurringTransaction = {
      ...transaction,
      id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    all.push(newTransaction);
    await AsyncStorage.setItem(STORAGE_KEYS.RECURRING_TRANSACTIONS, serialize(all));
    return newTransaction;
  },

  /**
   * Atualiza uma transação recorrente
   */
  async update(id: string, updates: Partial<Omit<RecurringTransaction, 'id' | 'createdAt'>>): Promise<RecurringTransaction | null> {
    const all = await this.getAll();
    const index = all.findIndex((t) => t.id === id);
    if (index === -1) return null;
    all[index] = {
      ...all[index],
      ...updates,
      updatedAt: new Date(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.RECURRING_TRANSACTIONS, serialize(all));
    return all[index];
  },

  /**
   * Deleta uma transação recorrente
   */
  async delete(id: string): Promise<boolean> {
    const all = await this.getAll();
    const filtered = all.filter((t) => t.id !== id);
    if (filtered.length === all.length) return false;
    await AsyncStorage.setItem(STORAGE_KEYS.RECURRING_TRANSACTIONS, serialize(filtered));
    return true;
  },

  /**
   * Limpa todas as transações recorrentes
   */
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.RECURRING_TRANSACTIONS);
  },
};

// ============================================================================
// CATEGORIAS
// ============================================================================

export const CategoryStorage = {
  /**
   * Obtém todas as categorias
   */
  async getAll(): Promise<Category[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) {
        // Inicializa com categorias padrão
        await this.setAll(DEFAULT_CATEGORIES);
        return DEFAULT_CATEGORIES;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
      return DEFAULT_CATEGORIES;
    }
  },

  /**
   * Obtém uma categoria por ID
   */
  async getById(id: string): Promise<Category | null> {
    const all = await this.getAll();
    return all.find((c) => c.id === id) || null;
  },

  /**
   * Obtém categorias por tipo
   */
  async getByType(type: 'income' | 'expense'): Promise<Category[]> {
    const all = await this.getAll();
    return all.filter((c) => c.type === type);
  },

  /**
   * Adiciona uma nova categoria
   */
  async add(category: Omit<Category, 'id'>): Promise<Category> {
    const all = await this.getAll();
    const newCategory: Category = {
      ...category,
      id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    all.push(newCategory);
    await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(all));
    return newCategory;
  },

  /**
   * Atualiza uma categoria
   */
  async update(id: string, updates: Partial<Omit<Category, 'id'>>): Promise<Category | null> {
    const all = await this.getAll();
    const index = all.findIndex((c) => c.id === id);
    if (index === -1) return null;
    all[index] = { ...all[index], ...updates };
    await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(all));
    return all[index];
  },

  /**
   * Deleta uma categoria
   */
  async delete(id: string): Promise<boolean> {
    const all = await this.getAll();
    const filtered = all.filter((c) => c.id !== id);
    if (filtered.length === all.length) return false;
    await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));
    return true;
  },

  /**
   * Define todas as categorias
   */
  async setAll(categories: Category[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },
};

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

export const SettingsStorage = {
  /**
   * Obtém as configurações
   */
  async get(): Promise<AppSettings> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        const defaultSettings: AppSettings = {
          id: `settings_${Date.now()}`,
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
        };
        await this.update(defaultSettings);
        return defaultSettings;
      }
      return deserialize(data, ['createdAt', 'updatedAt', 'lastBackupDate']);
    } catch (error) {
      console.error('Erro ao obter configurações:', error);
      const defaultSettings: AppSettings = {
        id: `settings_${Date.now()}`,
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
      };
      return defaultSettings;
    }
  },

  /**
   * Atualiza as configurações
   */
  async update(settings: Partial<AppSettings>): Promise<AppSettings> {
    const current = await this.get();
    const updated: AppSettings = {
      ...current,
      ...settings,
      updatedAt: new Date(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, serialize(updated));
    return updated;
  },
};

// ============================================================================
// ORÇAMENTOS
// ============================================================================

export const BudgetStorage = {
  /**
   * Obtém todos os orçamentos
   */
  async getAll(): Promise<Budget[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BUDGETS);
      if (!data) return [];
      return deserialize(data, ['createdAt', 'updatedAt']);
    } catch (error) {
      console.error('Erro ao obter orçamentos:', error);
      return [];
    }
  },

  /**
   * Obtém orçamento de uma categoria em um mês
   */
  async getByMonthAndCategory(monthYear: string, categoryId: string): Promise<Budget | null> {
    const all = await this.getAll();
    return all.find((b) => b.monthYear === monthYear && b.categoryId === categoryId) || null;
  },

  /**
   * Obtém orçamentos de um mês
   */
  async getByMonth(monthYear: string): Promise<Budget[]> {
    const all = await this.getAll();
    return all.filter((b) => b.monthYear === monthYear);
  },

  /**
   * Adiciona um novo orçamento
   */
  async add(budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Budget> {
    const all = await this.getAll();
    const newBudget: Budget = {
      ...budget,
      id: `bgt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    all.push(newBudget);
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, serialize(all));
    return newBudget;
  },

  /**
   * Atualiza um orçamento
   */
  async update(id: string, updates: Partial<Omit<Budget, 'id' | 'createdAt'>>): Promise<Budget | null> {
    const all = await this.getAll();
    const index = all.findIndex((b) => b.id === id);
    if (index === -1) return null;
    all[index] = {
      ...all[index],
      ...updates,
      updatedAt: new Date(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, serialize(all));
    return all[index];
  },

  /**
   * Deleta um orçamento
   */
  async delete(id: string): Promise<boolean> {
    const all = await this.getAll();
    const filtered = all.filter((b) => b.id !== id);
    if (filtered.length === all.length) return false;
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, serialize(filtered));
    return true;
  },

  /**
   * Limpa todos os orçamentos
   */
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.BUDGETS);
  },
};

// ============================================================================
// NOTIFICAÇÕES PUSH
// ============================================================================

export const PushNotificationStorage = {
  /**
   * Obtém todas as notificações
   */
  async getAll(): Promise<PushNotificationTransaction[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PUSH_NOTIFICATIONS);
      if (!data) return [];
      return deserialize(data, ['createdAt', 'updatedAt']);
    } catch (error) {
      console.error('Erro ao obter notificações:', error);
      return [];
    }
  },

  /**
   * Obtém notificações não processadas
   */
  async getUnprocessed(): Promise<PushNotificationTransaction[]> {
    const all = await this.getAll();
    return all.filter((n) => !n.processed);
  },

  /**
   * Adiciona uma nova notificação
   */
  async add(notification: Omit<PushNotificationTransaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<PushNotificationTransaction> {
    const all = await this.getAll();
    const newNotification: PushNotificationTransaction = {
      ...notification,
      id: `push_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    all.push(newNotification);
    await AsyncStorage.setItem(STORAGE_KEYS.PUSH_NOTIFICATIONS, serialize(all));
    return newNotification;
  },

  /**
   * Atualiza uma notificação
   */
  async update(id: string, updates: Partial<Omit<PushNotificationTransaction, 'id' | 'createdAt'>>): Promise<PushNotificationTransaction | null> {
    const all = await this.getAll();
    const index = all.findIndex((n) => n.id === id);
    if (index === -1) return null;
    all[index] = {
      ...all[index],
      ...updates,
      updatedAt: new Date(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.PUSH_NOTIFICATIONS, serialize(all));
    return all[index];
  },

  /**
   * Deleta uma notificação
   */
  async delete(id: string): Promise<boolean> {
    const all = await this.getAll();
    const filtered = all.filter((n) => n.id !== id);
    if (filtered.length === all.length) return false;
    await AsyncStorage.setItem(STORAGE_KEYS.PUSH_NOTIFICATIONS, serialize(filtered));
    return true;
  },

  /**
   * Limpa todas as notificações
   */
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.PUSH_NOTIFICATIONS);
  },
};

// ============================================================================
// BACKUP E SINCRONIZAÇÃO
// ============================================================================

export const BackupStorage = {
  /**
   * Exporta todos os dados como JSON
   */
  async exportAll(): Promise<string> {
    const data = {
      transactions: await TransactionStorage.getAll(),
      recurringTransactions: await RecurringTransactionStorage.getAll(),
      categories: await CategoryStorage.getAll(),
      budgets: await BudgetStorage.getAll(),
      settings: await SettingsStorage.get(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  /**
   * Importa dados de um JSON
   */
  async importAll(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);

      if (data.transactions) {
        await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, serialize(data.transactions));
      }
      if (data.recurringTransactions) {
        await AsyncStorage.setItem(STORAGE_KEYS.RECURRING_TRANSACTIONS, serialize(data.recurringTransactions));
      }
      if (data.categories) {
        await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
      }
      if (data.budgets) {
        await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, serialize(data.budgets));
      }
      if (data.settings) {
        await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, serialize(data.settings));
      }
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      throw new Error('Falha ao importar dados. Verifique o formato do arquivo.');
    }
  },

  /**
   * Limpa todos os dados
   */
  async clearAll(): Promise<void> {
    await Promise.all([
      TransactionStorage.clear(),
      RecurringTransactionStorage.clear(),
      BudgetStorage.clear(),
      PushNotificationStorage.clear(),
      AsyncStorage.removeItem(STORAGE_KEYS.CATEGORIES),
      AsyncStorage.removeItem(STORAGE_KEYS.SETTINGS),
    ]);
  },
};
