import { ScrollView, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useApp } from '@/lib/app-context';
import {
  formatCurrency,
  formatDate,
  groupByDate,
} from '@/lib/business-logic';
import { useEffect, useState } from 'react';
import { Transaction, Category } from '@/lib/types';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface TransactionWithCategory extends Transaction {
  category?: Category;
}

export default function TransactionsScreen() {
  const { state } = useApp();
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionWithCategory[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  // Carrega e filtra transações
  useEffect(() => {
    loadTransactions();
  }, [state.transactions, searchText, filterType]);

  const loadTransactions = () => {
    let transactions = [...state.transactions];

    // Filtra por tipo
    if (filterType !== 'all') {
      transactions = transactions.filter((t) => t.type === filterType);
    }

    // Filtra por busca
    if (searchText.trim()) {
      transactions = transactions.filter((t) =>
        t.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Enriquece com dados de categoria
    const enriched = transactions.map((t) => ({
      ...t,
      category: state.categories.find((c) => c.id === t.categoryId),
    }));

    // Ordena por data (mais recentes primeiro)
    enriched.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredTransactions(enriched);
  };

  const handleTransactionPress = (transaction: TransactionWithCategory) => {
    // TODO: Implementar navegação para detalhe da transação
  };

  const handleAddTransaction = () => {
    // TODO: Implementar navegação para formulário de transação
  };

  const handleDeleteTransaction = async (id: string) => {
    // Implementar delete com confirmação
  };

  const renderTransactionItem = ({ item }: { item: TransactionWithCategory }) => {
    const isIncome = item.type === 'income';
    const sign = isIncome ? '+' : '-';
    const color = isIncome ? '#22C55E' : '#EF4444';

    return (
      <TouchableOpacity
        onPress={() => handleTransactionPress(item)}
        className="flex-row items-center justify-between px-4 py-3 border-b border-border active:bg-surface"
      >
        <View className="flex-row items-center flex-1 gap-3">
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: item.category?.color || '#ccc' }}
          >
            <MaterialIcons name="receipt" size={20} color="#fff" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground">
              {item.description}
            </Text>
            <Text className="text-xs text-muted">
              {formatDate(item.date)} • {item.category?.name}
            </Text>
          </View>
        </View>
        <Text className="text-sm font-bold" style={{ color }}>
          {sign} {formatCurrency(item.amount)}
        </Text>
      </TouchableOpacity>
    );
  };

  const groupedTransactions = groupByDate(filteredTransactions);
  const sortedDates = Object.keys(groupedTransactions).sort().reverse();

  return (
    <ScreenContainer className="p-0">
      {/* Header */}
      <View className="bg-primary px-4 py-4 gap-3">
        <Text className="text-2xl font-bold text-white">Transações</Text>

        {/* Barra de busca */}
        <View className="flex-row items-center bg-white bg-opacity-20 rounded-lg px-3 py-2 gap-2">
          <MaterialIcons name="search" size={20} color="#fff" />
          <TextInput
            placeholder="Buscar transações..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 text-white text-sm"
          />
        </View>

        {/* Filtros */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setFilterType('all')}
            className={`flex-1 py-2 rounded-lg items-center justify-center ${
              filterType === 'all' ? 'bg-white' : 'bg-white bg-opacity-20'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                filterType === 'all' ? 'text-primary' : 'text-white'
              }`}
            >
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterType('income')}
            className={`flex-1 py-2 rounded-lg items-center justify-center ${
              filterType === 'income' ? 'bg-white' : 'bg-white bg-opacity-20'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                filterType === 'income' ? 'text-primary' : 'text-white'
              }`}
            >
              Receitas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterType('expense')}
            className={`flex-1 py-2 rounded-lg items-center justify-center ${
              filterType === 'expense' ? 'bg-white' : 'bg-white bg-opacity-20'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                filterType === 'expense' ? 'text-primary' : 'text-white'
              }`}
            >
              Despesas
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de transações */}
      <FlatList
        data={sortedDates}
        renderItem={({ item: date }) => (
          <View>
            <View className="bg-surface px-4 py-2 border-b border-border">
              <Text className="text-xs font-semibold text-muted uppercase">
                {formatDate(new Date(date))}
              </Text>
            </View>
            {groupedTransactions[date].map((transaction) => (
              <View key={transaction.id}>
                {renderTransactionItem({ item: transaction })}
              </View>
            ))}
          </View>
        )}
        keyExtractor={(item) => item}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <MaterialIcons name="inbox" size={48} color="#ccc" />
            <Text className="text-center text-muted mt-2">
              Nenhuma transação encontrada
            </Text>
          </View>
        }
        scrollEnabled={true}
      />

      {/* Botão flutuante */}
      <TouchableOpacity
        onPress={handleAddTransaction}
        className="absolute bottom-20 right-4 w-14 h-14 rounded-full bg-primary items-center justify-center"
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
