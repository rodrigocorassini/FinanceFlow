import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useApp } from '@/lib/app-context';
import {
  formatCurrency,
  formatDate,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  calculateTotalIncome,
  calculateTotalExpense,
  getPreviousMonth,
  getNextMonth,
  getMonthYear,
} from '@/lib/business-logic';
import { useEffect, useState } from 'react';
import { Transaction, Category } from '@/lib/types';
import { TransactionStorage } from '@/lib/storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface TransactionWithCategory extends Transaction {
  category?: Category;
}

export default function HomeScreen() {
  const { state } = useApp();
  const [monthTransactions, setMonthTransactions] = useState<TransactionWithCategory[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Carrega transações do mês
  useEffect(() => {
    loadMonthData();
  }, [currentMonth, state.transactions]);

  const loadMonthData = async () => {
    const startDate = getFirstDayOfMonth(currentMonth);
    const endDate = getLastDayOfMonth(currentMonth);

    const transactions = await TransactionStorage.getByDateRange(startDate, endDate);
    
    // Enriquece transações com dados de categoria
    const enriched = transactions.map((t) => ({
      ...t,
      category: state.categories.find((c) => c.id === t.categoryId),
    }));

    // Ordena por data (mais recentes primeiro)
    enriched.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setMonthTransactions(enriched);
    setTotalIncome(calculateTotalIncome(transactions));
    setTotalExpense(calculateTotalExpense(transactions));
    setBalance(calculateTotalIncome(transactions) - calculateTotalExpense(transactions));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const handleAddTransaction = () => {
    // TODO: Implementar navegação para formulário de transação
  };

  const handleTransactionPress = (transaction: TransactionWithCategory) => {
    // TODO: Implementar navegação para detalhe da transação
  };

  const renderTransactionItem = ({ item }: { item: TransactionWithCategory }) => {
    const isIncome = item.type === 'income';
    const sign = isIncome ? '+' : '-';
    const color = isIncome ? '#22C55E' : '#EF4444';

    return (
      <TouchableOpacity
        onPress={() => handleTransactionPress(item)}
        className="flex-row items-center justify-between px-4 py-3 border-b border-border"
      >
        <View className="flex-row items-center flex-1 gap-3">
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: item.category?.color || '#ccc' }}
          >
            <MaterialIcons
              name="receipt"
              size={20}
              color="#fff"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground">
              {item.description}
            </Text>
            <Text className="text-xs text-muted">
              {item.category?.name}
            </Text>
          </View>
        </View>
        <Text
          className="text-sm font-bold"
          style={{ color }}
        >
          {sign} {formatCurrency(item.amount)}
        </Text>
      </TouchableOpacity>
    );
  };

  const monthYearStr = getMonthYear(currentMonth);
  const [year, month] = monthYearStr.split('-');
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const monthName = monthNames[parseInt(month) - 1];

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
        {/* Header com navegação de mês */}
        <View className="bg-primary px-4 py-6 gap-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={handlePreviousMonth} className="p-2">
              <MaterialIcons name="chevron-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-white">
              {monthName} {year}
            </Text>
            <TouchableOpacity onPress={handleNextMonth} className="p-2">
              <MaterialIcons name="chevron-right" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Resumo do mês */}
          <View className="gap-3">
            {/* Receitas */}
            <View className="bg-white bg-opacity-20 rounded-lg p-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="trending-up" size={20} color="#22C55E" />
                <Text className="text-sm text-white">Receitas</Text>
              </View>
              <Text className="text-lg font-bold text-white">
                {formatCurrency(totalIncome)}
              </Text>
            </View>

            {/* Despesas */}
            <View className="bg-white bg-opacity-20 rounded-lg p-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="trending-down" size={20} color="#EF4444" />
                <Text className="text-sm text-white">Despesas</Text>
              </View>
              <Text className="text-lg font-bold text-white">
                {formatCurrency(totalExpense)}
              </Text>
            </View>

            {/* Saldo */}
            <View
              className="rounded-lg p-3 flex-row items-center justify-between"
              style={{
                backgroundColor: balance >= 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              }}
            >
              <Text className="text-sm text-white font-semibold">Saldo</Text>
              <Text
                className="text-lg font-bold"
                style={{ color: balance >= 0 ? '#22C55E' : '#EF4444' }}
              >
                {formatCurrency(balance)}
              </Text>
            </View>
          </View>
        </View>

        {/* Últimas transações */}
        <View className="flex-1 px-0 py-4">
          <View className="px-4 pb-2">
            <Text className="text-base font-bold text-foreground">
              Últimas Transações
            </Text>
          </View>

          {monthTransactions.length > 0 ? (
            <FlatList
              data={monthTransactions.slice(0, 5)}
              renderItem={renderTransactionItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View className="flex-1 items-center justify-center px-4">
              <MaterialIcons name="inbox" size={48} color="#ccc" />
              <Text className="text-center text-muted mt-2">
                Nenhuma transação neste mês
              </Text>
            </View>
          )}

          {/* Botão para ver todas */}
          {monthTransactions.length > 5 && (
            <TouchableOpacity
              className="mx-4 mt-4 py-2"
            >
              <Text className="text-center text-primary font-semibold">
                Ver todas as transações
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Espaço para botão flutuante */}
        <View className="h-20" />
      </ScrollView>

      {/* Botão flutuante para adicionar transação */}
      <TouchableOpacity
        onPress={handleAddTransaction}
        className="absolute bottom-20 right-4 w-14 h-14 rounded-full bg-primary items-center justify-center shadow-lg"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </ScreenContainer>
  );
}
