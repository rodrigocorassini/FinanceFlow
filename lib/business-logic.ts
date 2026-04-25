/**
 * Lógica de negócio para o aplicativo Finanças Pessoais Pro
 * Inclui cálculos, relatórios e sugestões
 */

import {
  Transaction,
  Category,
  MonthlyReport,
  AnnualReport,
  CategorySuggestion,
  RecurringTransaction,
} from './types';
import { TransactionStorage, CategoryStorage } from './storage';

// ============================================================================
// FORMATAÇÃO E CONVERSÃO
// ============================================================================

/**
 * Formata um valor em centavos para string monetária
 */
export const formatCurrency = (centavos: number, currency: string = 'BRL'): string => {
  const reais = centavos / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(reais);
};

/**
 * Converte string monetária para centavos
 */
export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.');
  return Math.round(parseFloat(cleaned) * 100);
};

/**
 * Formata uma data para string
 */
export const formatDate = (date: Date, format: string = 'DD/MM/YYYY'): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

/**
 * Obtém o mês/ano em formato "YYYY-MM"
 */
export const getMonthYear = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}`;
};

/**
 * Obtém o primeiro dia do mês
 */
export const getFirstDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Obtém o último dia do mês
 */
export const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Obtém o mês anterior
 */
export const getPreviousMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

/**
 * Obtém o próximo mês
 */
export const getNextMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

/**
 * Obtém o ano anterior
 */
export const getPreviousYear = (year: number): number => {
  return year - 1;
};

/**
 * Obtém o próximo ano
 */
export const getNextYear = (year: number): number => {
  return year + 1;
};

// ============================================================================
// CÁLCULOS
// ============================================================================

/**
 * Calcula o total de transações
 */
export const calculateTotal = (transactions: Transaction[]): number => {
  return transactions.reduce((sum, t) => {
    return sum + (t.type === 'income' ? t.amount : -t.amount);
  }, 0);
};

/**
 * Calcula o total de receitas
 */
export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calcula o total de despesas
 */
export const calculateTotalExpense = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Agrupa transações por categoria
 */
export const groupByCategory = (
  transactions: Transaction[]
): Record<string, Transaction[]> => {
  return transactions.reduce((acc, t) => {
    if (!acc[t.categoryId]) {
      acc[t.categoryId] = [];
    }
    acc[t.categoryId].push(t);
    return acc;
  }, {} as Record<string, Transaction[]>);
};

/**
 * Agrupa transações por data
 */
export const groupByDate = (
  transactions: Transaction[]
): Record<string, Transaction[]> => {
  return transactions.reduce((acc, t) => {
    const dateKey = formatDate(t.date, 'YYYY-MM-DD');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(t);
    return acc;
  }, {} as Record<string, Transaction[]>);
};

/**
 * Calcula o total por categoria
 */
export const calculateByCategory = (
  transactions: Transaction[]
): Array<{ categoryId: string; amount: number; count: number }> => {
  const grouped = groupByCategory(transactions);
  return Object.entries(grouped).map(([categoryId, txns]) => ({
    categoryId,
    amount: txns.reduce((sum, t) => sum + t.amount, 0),
    count: txns.length,
  }));
};

// ============================================================================
// RELATÓRIOS
// ============================================================================

/**
 * Gera um relatório mensal
 */
export const generateMonthlyReport = async (
  date: Date
): Promise<MonthlyReport> => {
  const monthYear = getMonthYear(date);
  const startDate = getFirstDayOfMonth(date);
  const endDate = getLastDayOfMonth(date);

  const transactions = await TransactionStorage.getByDateRange(startDate, endDate);
  const categories = await CategoryStorage.getAll();

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const balance = totalIncome - totalExpense;

  const byCategory = calculateByCategory(transactions.filter((t) => t.type === 'expense'));
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  const previousMonth = getPreviousMonth(date);
  const previousMonthYear = getMonthYear(previousMonth);
  const previousStartDate = getFirstDayOfMonth(previousMonth);
  const previousEndDate = getLastDayOfMonth(previousMonth);
  const previousTransactions = await TransactionStorage.getByDateRange(
    previousStartDate,
    previousEndDate
  );
  const previousTotalExpense = calculateTotalExpense(previousTransactions);

  const previousMonthChange =
    previousTotalExpense === 0
      ? 0
      : ((totalExpense - previousTotalExpense) / previousTotalExpense) * 100;

  return {
    month: monthYear,
    totalIncome,
    totalExpense,
    balance,
    byCategory: byCategory.map((item) => ({
      categoryId: item.categoryId,
      categoryName: categoryMap.get(item.categoryId)?.name || 'Desconhecida',
      amount: item.amount,
      percentage:
        totalExpense === 0 ? 0 : (item.amount / totalExpense) * 100,
    })),
    previousMonthChange,
  };
};

/**
 * Gera um relatório anual
 */
export const generateAnnualReport = async (year: number): Promise<AnnualReport> => {
  const byMonth: AnnualReport['byMonth'] = [];
  let totalIncome = 0;
  let totalExpense = 0;

  for (let month = 0; month < 12; month++) {
    const date = new Date(year, month, 1);
    const startDate = getFirstDayOfMonth(date);
    const endDate = getLastDayOfMonth(date);

    const transactions = await TransactionStorage.getByDateRange(startDate, endDate);
    const monthIncome = calculateTotalIncome(transactions);
    const monthExpense = calculateTotalExpense(transactions);

    totalIncome += monthIncome;
    totalExpense += monthExpense;

    const monthYear = getMonthYear(date);
    byMonth.push({
      month: monthYear,
      income: monthIncome,
      expense: monthExpense,
      balance: monthIncome - monthExpense,
    });
  }

  const balance = totalIncome - totalExpense;

  // Calcula variação com ano anterior
  const previousYear = getPreviousYear(year);
  let previousTotalExpense = 0;

  for (let month = 0; month < 12; month++) {
    const date = new Date(previousYear, month, 1);
    const startDate = getFirstDayOfMonth(date);
    const endDate = getLastDayOfMonth(date);

    const transactions = await TransactionStorage.getByDateRange(startDate, endDate);
    previousTotalExpense += calculateTotalExpense(transactions);
  }

  const previousYearChange =
    previousTotalExpense === 0
      ? 0
      : ((totalExpense - previousTotalExpense) / previousTotalExpense) * 100;

  return {
    year,
    totalIncome,
    totalExpense,
    balance,
    byMonth,
    previousYearChange,
  };
};

// ============================================================================
// SUGESTÃO DE CATEGORIAS
// ============================================================================

/**
 * Padrões de regex para sugestão automática de categoria
 */
const CATEGORY_PATTERNS: Array<{
  categoryId: string;
  patterns: RegExp[];
  confidence: number;
}> = [
  // Transporte
  {
    categoryId: 'transport-uber',
    patterns: [/uber/i, /99/i, /bolt/i, /lyft/i],
    confidence: 0.95,
  },
  {
    categoryId: 'transport-fuel',
    patterns: [/combustível/i, /gasolina/i, /diesel/i, /etanol/i, /shell/i, /petrobras/i],
    confidence: 0.9,
  },
  {
    categoryId: 'transport-parking',
    patterns: [/estacionamento/i, /parking/i],
    confidence: 0.85,
  },

  // Alimentação
  {
    categoryId: 'food-delivery',
    patterns: [/ifood/i, /uber eats/i, /rappi/i, /delivery/i],
    confidence: 0.9,
  },
  {
    categoryId: 'food-restaurant',
    patterns: [/restaurante/i, /pizza/i, /burguer/i, /churrascaria/i],
    confidence: 0.85,
  },
  {
    categoryId: 'food-supermarket',
    patterns: [/supermercado/i, /carrefour/i, /pão de açúcar/i, /extra/i, /walmart/i],
    confidence: 0.9,
  },
  {
    categoryId: 'food-drinks',
    patterns: [/bar/i, /cerveja/i, /bebida/i, /café/i],
    confidence: 0.8,
  },

  // Moradia
  {
    categoryId: 'housing-internet',
    patterns: [/internet/i, /claro/i, /vivo/i, /oi/i, /sky/i],
    confidence: 0.9,
  },
  {
    categoryId: 'housing-energy',
    patterns: [/energia/i, /eletricidade/i, /luz/i, /enel/i],
    confidence: 0.9,
  },
  {
    categoryId: 'housing-water',
    patterns: [/água/i, /agua/i, /saneamento/i],
    confidence: 0.9,
  },
  {
    categoryId: 'housing-gas',
    patterns: [/gás/i, /gas/i],
    confidence: 0.85,
  },
  {
    categoryId: 'housing-condo',
    patterns: [/condomínio/i, /condominio/i, /cond/i],
    confidence: 0.9,
  },

  // Saúde
  {
    categoryId: 'health-gym',
    patterns: [/academia/i, /gym/i, /musculação/i, /crossfit/i],
    confidence: 0.9,
  },
  {
    categoryId: 'health-medicine',
    patterns: [/farmácia/i, /farmacia/i, /medicamento/i, /remédio/i],
    confidence: 0.85,
  },
  {
    categoryId: 'health-consultation',
    patterns: [/consulta/i, /médico/i, /medico/i, /hospital/i, /clínica/i, /clinica/i],
    confidence: 0.85,
  },

  // Lazer
  {
    categoryId: 'leisure-subscriptions',
    patterns: [/spotify/i, /netflix/i, /prime/i, /disney/i, /assinatura/i, /subscription/i],
    confidence: 0.9,
  },
  {
    categoryId: 'leisure-travel',
    patterns: [/hotel/i, /passagem/i, /voo/i, /flight/i, /viagem/i],
    confidence: 0.85,
  },

  // Compras
  {
    categoryId: 'shopping-electronics',
    patterns: [/eletrônico/i, /eletronico/i, /computador/i, /celular/i, /smartphone/i],
    confidence: 0.85,
  },
  {
    categoryId: 'shopping-clothes',
    patterns: [/roupa/i, /vestuário/i, /moda/i, /sapato/i],
    confidence: 0.8,
  },
  {
    categoryId: 'shopping-books',
    patterns: [/livro/i, /book/i, /kindle/i],
    confidence: 0.85,
  },

  // Pet
  {
    categoryId: 'pet-vet',
    patterns: [/veterinário/i, /veterinario/i, /vet/i, /pet shop/i],
    confidence: 0.9,
  },
  {
    categoryId: 'pet-food',
    patterns: [/ração/i, /racao/i, /pet food/i],
    confidence: 0.85,
  },

  // Educação
  {
    categoryId: 'education-school',
    patterns: [/escola/i, /colégio/i, /colegio/i, /universidade/i, /faculdade/i],
    confidence: 0.9,
  },
];

/**
 * Sugere uma categoria baseada na descrição
 */
export const suggestCategory = (description: string): CategorySuggestion | null => {
  let bestMatch: CategorySuggestion | null = null;

  for (const { categoryId, patterns, confidence } of CATEGORY_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(description)) {
        if (!bestMatch || confidence > bestMatch.confidence) {
          bestMatch = {
            categoryId,
            confidence,
            reason: `Correspondência com padrão: ${pattern.source}`,
          };
        }
      }
    }
  }

  return bestMatch;
};

// ============================================================================
// VALIDAÇÕES
// ============================================================================

/**
 * Valida uma transação
 */
export const validateTransaction = (
  description: string,
  amount: number,
  categoryId: string
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!description || description.trim().length === 0) {
    errors.push('Descrição é obrigatória');
  }

  if (amount <= 0) {
    errors.push('Valor deve ser maior que zero');
  }

  if (!categoryId) {
    errors.push('Categoria é obrigatória');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Valida uma transação recorrente
 */
export const validateRecurringTransaction = (
  name: string,
  amount: number,
  categoryId: string,
  frequency: string
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push('Nome é obrigatório');
  }

  if (amount <= 0) {
    errors.push('Valor deve ser maior que zero');
  }

  if (!categoryId) {
    errors.push('Categoria é obrigatória');
  }

  const validFrequencies = ['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'];
  if (!validFrequencies.includes(frequency)) {
    errors.push('Frequência inválida');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

// ============================================================================
// PROCESSAMENTO DE NOTIFICAÇÕES
// ============================================================================

/**
 * Extrai valor de uma notificação de gasto
 */
export const extractAmountFromNotification = (text: string): number | null => {
  // Padrões comuns: "R$ 150,00", "150.00", "R$150"
  const patterns = [
    /R\$\s*(\d+[.,]\d{2})/i,
    /(\d+[.,]\d{2})\s*reais/i,
    /débito\s+de\s+R\$\s*(\d+[.,]\d{2})/i,
    /crédito\s+de\s+R\$\s*(\d+[.,]\d{2})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const valueStr = match[1].replace('.', '').replace(',', '.');
      return Math.round(parseFloat(valueStr) * 100);
    }
  }

  return null;
};

/**
 * Extrai descrição de uma notificação
 */
export const extractDescriptionFromNotification = (text: string): string => {
  // Remove valores monetários e palavras-chave de banco
  let cleaned = text
    .replace(/R\$\s*\d+[.,]\d{2}/gi, '')
    .replace(/débito|crédito|transação|compra/gi, '')
    .trim();

  // Pega os primeiros 50 caracteres
  return cleaned.substring(0, 50);
};

// ============================================================================
// UTILITÁRIOS
// ============================================================================

/**
 * Formata um percentual
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Calcula a variação percentual
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

/**
 * Obtém a cor de um valor (positivo/negativo)
 */
export const getValueColor = (value: number): string => {
  if (value > 0) return '#22C55E'; // Verde
  if (value < 0) return '#EF4444'; // Vermelho
  return '#687076'; // Cinza
};
