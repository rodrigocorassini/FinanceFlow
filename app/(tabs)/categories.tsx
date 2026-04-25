import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useApp } from '@/lib/app-context';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CategoriesScreen() {
  const { state } = useApp();
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>('expense');

  const categories = state.categories.filter((c) => c.type === selectedType);

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 border-b border-border active:bg-surface">
      <View className="flex-row items-center flex-1 gap-3">
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: item.color }}
        >
          <MaterialIcons name="category" size={20} color="#fff" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-foreground">
            {item.name}
          </Text>
          {item.budgetLimit && (
            <Text className="text-xs text-muted">
              Orçamento: R$ {(item.budgetLimit / 100).toFixed(2)}
            </Text>
          )}
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#687076" />
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-0">
      {/* Header */}
      <View className="bg-primary px-4 py-4 gap-3">
        <Text className="text-2xl font-bold text-white">Categorias</Text>

        {/* Filtros */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setSelectedType('expense')}
            className={`flex-1 py-2 rounded-lg items-center justify-center ${
              selectedType === 'expense' ? 'bg-white' : 'bg-white bg-opacity-20'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedType === 'expense' ? 'text-primary' : 'text-white'
              }`}
            >
              Despesas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType('income')}
            className={`flex-1 py-2 rounded-lg items-center justify-center ${
              selectedType === 'income' ? 'bg-white' : 'bg-white bg-opacity-20'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedType === 'income' ? 'text-primary' : 'text-white'
              }`}
            >
              Receitas
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de categorias */}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <MaterialIcons name="inbox" size={48} color="#ccc" />
            <Text className="text-center text-muted mt-2">
              Nenhuma categoria encontrada
            </Text>
          </View>
        }
        scrollEnabled={true}
      />

      {/* Botão para adicionar categoria */}
      <TouchableOpacity
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
