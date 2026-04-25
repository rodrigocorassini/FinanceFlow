/**
 * Tipos TypeScript para o aplicativo Finanças Pessoais Pro
 */

// ============================================================================
// CATEGORIAS
// ============================================================================

export type CategoryType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  color: string;
  icon: string;
  budgetLimit?: number; // Limite mensal em centavos
  order: number;
}

export const DEFAULT_CATEGORIES: Category[] = [
  // Alimentação
  { id: 'food-drinks', name: 'Alimentação - Bebidas', type: 'expense', color: '#FF6B6B', icon: 'local-drink', order: 1 },
  { id: 'food-delivery', name: 'Alimentação - Delivery', type: 'expense', color: '#FF8C42', icon: 'local-shipping', order: 2 },
  { id: 'food-restaurant', name: 'Alimentação - Restaurante', type: 'expense', color: '#FFA500', icon: 'restaurant', order: 3 },
  { id: 'food-supermarket', name: 'Alimentação - Supermercado', type: 'expense', color: '#FFB84D', icon: 'shopping-cart', order: 4 },
  { id: 'food-supplements', name: 'Alimentação - Suplementos', type: 'expense', color: '#FFC869', icon: 'local-pharmacy', order: 5 },

  // Cartão
  { id: 'card', name: 'Cartão', type: 'expense', color: '#4A90E2', icon: 'credit-card', order: 6 },

  // Compras
  { id: 'shopping-misc', name: 'Compras - Diversos', type: 'expense', color: '#7B68EE', icon: 'shopping-bag', order: 7 },
  { id: 'shopping-electronics', name: 'Compras - Eletrônicos', type: 'expense', color: '#6A5ACD', icon: 'devices', order: 8 },
  { id: 'shopping-books', name: 'Compras - Livros', type: 'expense', color: '#8B7BA8', icon: 'library-books', order: 9 },
  { id: 'shopping-gifts', name: 'Compras - Presentes', type: 'expense', color: '#DA70D6', icon: 'card-giftcard', order: 10 },
  { id: 'shopping-clothes', name: 'Compras - Roupas', type: 'expense', color: '#FF69B4', icon: 'shopping', order: 11 },

  // Educação
  { id: 'education-school', name: 'Educação - Escola', type: 'expense', color: '#20B2AA', icon: 'school', order: 12 },
  { id: 'education-materials', name: 'Educação - Materiais', type: 'expense', color: '#48D1CC', icon: 'menu-book', order: 13 },
  { id: 'education-mentorship', name: 'Educação - Mentoria', type: 'expense', color: '#40E0D0', icon: 'person', order: 14 },
  { id: 'education-swimming', name: 'Educação - Natação', type: 'expense', color: '#5DADE2', icon: 'pool', order: 15 },

  // Embarque/Desembarque
  { id: 'boarding', name: 'Embarque / Desembarque', type: 'expense', color: '#3498DB', icon: 'flight-takeoff', order: 16 },

  // Finanças
  { id: 'finance-investment', name: 'Finanças - Investimentos', type: 'income', color: '#2ECC71', icon: 'trending-up', order: 17 },

  // Lazer
  { id: 'leisure-subscriptions', name: 'Lazer - Assinaturas', type: 'expense', color: '#E74C3C', icon: 'subscriptions', order: 18 },
  { id: 'leisure-fun', name: 'Lazer - Diversão', type: 'expense', color: '#E67E22', icon: 'local-movies', order: 19 },
  { id: 'leisure-restaurant-bar', name: 'Lazer - Restaurante / Bar', type: 'expense', color: '#D35400', icon: 'local-bar', order: 20 },
  { id: 'leisure-travel', name: 'Lazer - Viagem', type: 'expense', color: '#C0392B', icon: 'flight', order: 21 },

  // Moradia
  { id: 'housing-water', name: 'Moradia - Agua', type: 'expense', color: '#3498DB', icon: 'water', order: 22 },
  { id: 'housing-claro', name: 'Moradia - Claro', type: 'expense', color: '#2980B9', icon: 'phone', order: 23 },
  { id: 'housing-condo', name: 'Moradia - Condominio', type: 'expense', color: '#1ABC9C', icon: 'apartment', order: 24 },
  { id: 'housing-energy', name: 'Moradia - Energia', type: 'expense', color: '#16A085', icon: 'flash-on', order: 25 },
  { id: 'housing-gas', name: 'Moradia - Gás', type: 'expense', color: '#0E6251', icon: 'local-fire-department', order: 26 },
  { id: 'housing-internet', name: 'Moradia - Internet', type: 'expense', color: '#27AE60', icon: 'wifi', order: 27 },
  { id: 'housing-iptu', name: 'Moradia - IPTU', type: 'expense', color: '#229954', icon: 'home', order: 28 },
  { id: 'housing-maintenance', name: 'Moradia - Manutenção', type: 'expense', color: '#1E8449', icon: 'build', order: 29 },

  // Pet
  { id: 'pet-toys', name: 'Pet - Brinquedos', type: 'expense', color: '#F39C12', icon: 'pets', order: 30 },
  { id: 'pet-food', name: 'Pet - Ração', type: 'expense', color: '#E67E22', icon: 'restaurant', order: 31 },
  { id: 'pet-medicine', name: 'Pet - Remedio', type: 'expense', color: '#D35400', icon: 'local-pharmacy', order: 32 },
  { id: 'pet-vet', name: 'Pet - Veterinário', type: 'expense', color: '#C0392B', icon: 'medical-services', order: 33 },

  // Saúde
  { id: 'health-gym', name: 'Saúde - Academia', type: 'expense', color: '#9B59B6', icon: 'fitness-center', order: 34 },
  { id: 'health-consultation', name: 'Saúde - Consulta', type: 'expense', color: '#8E44AD', icon: 'local-hospital', order: 35 },
  { id: 'health-medicine', name: 'Saúde - Medicamentos', type: 'expense', color: '#7D3C98', icon: 'medication', order: 36 },

  // Transporte
  { id: 'transport-fuel', name: 'Transporte - Combustível', type: 'expense', color: '#34495E', icon: 'local-gas-station', order: 37 },
  { id: 'transport-parking', name: 'Transporte - Estacionamento', type: 'expense', color: '#2C3E50', icon: 'local-parking', order: 38 },
  { id: 'transport-ipva', name: 'Transporte - IPVA', type: 'expense', color: '#1A252F', icon: 'directions-car', order: 39 },
  { id: 'transport-maintenance', name: 'Transporte - Manutenção', type: 'expense', color: '#566573', icon: 'build', order: 40 },
  { id: 'transport-toll', name: 'Transporte - Pedágio', type: 'expense', color: '#5D6D7B', icon: 'toll', order: 41 },
  { id: 'transport-insurance', name: 'Transporte - Seguro', type: 'expense', color: '#566573', icon: 'security', order: 42 },
  { id: 'transport-uber', name: 'Transporte - Uber', type: 'expense', color: '#34495E', icon: 'local-taxi', order: 43 },
];

// ============================================================================
// TRANSAÇÕES
// ============================================================================

export interface Transaction {
  id: string;
  description: string;
  amount: number; // em centavos
  categoryId: string;
  type: CategoryType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface TransactionWithCategory extends Transaction {
  category: Category;
}

// ============================================================================
// TRANSAÇÕES RECORRENTES
// ============================================================================

export type RecurrenceFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';

export interface RecurringTransaction {
  id: string;
  name: string;
  description: string;
  amount: number; // em centavos
  categoryId: string;
  type: CategoryType;
  frequency: RecurrenceFrequency;
  startDate: Date;
  endDate?: Date;
  nextDueDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurringTransactionWithCategory extends RecurringTransaction {
  category: Category;
}

// ============================================================================
// ORÇAMENTO
// ============================================================================

export interface Budget {
  id: string;
  categoryId: string;
  monthYear: string; // formato: "2024-01"
  limit: number; // em centavos
  spent: number; // em centavos (calculado)
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// NOTIFICAÇÕES DE GASTO
// ============================================================================

export interface PushNotificationTransaction {
  id: string;
  rawText: string;
  amount?: number;
  suggestedCategoryId?: string;
  suggestedDescription?: string;
  confidence: number; // 0-1
  processed: boolean;
  transaction?: Transaction;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// RELATÓRIOS
// ============================================================================

export interface MonthlyReport {
  month: string; // "2024-01"
  totalIncome: number;
  totalExpense: number;
  balance: number;
  byCategory: {
    categoryId: string;
    categoryName: string;
    amount: number;
    percentage: number;
  }[];
  previousMonthChange: number; // percentual
}

export interface AnnualReport {
  year: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  byMonth: {
    month: string;
    income: number;
    expense: number;
    balance: number;
  }[];
  previousYearChange: number; // percentual
}

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

export interface AppSettings {
  id: string;
  userId?: string;
  theme: 'light' | 'dark' | 'auto';
  currency: string; // "BRL", "USD", etc
  dateFormat: string; // "DD/MM/YYYY", "MM/DD/YYYY", etc
  readPushNotifications: boolean;
  budgetAlerts: boolean;
  budgetAlertThreshold: number; // 80 = 80%
  autoApplyRecurring: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
  lastBackupDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// SUGESTÃO DE CATEGORIA
// ============================================================================

export interface CategorySuggestion {
  categoryId: string;
  confidence: number; // 0-1
  reason: string;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type PeriodType = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
