import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useApp } from '@/lib/app-context';
import { formatCurrency, getMonthYear } from '@/lib/business-logic';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ReportsScreen() {
  const { state } = useApp();
  const currentDate = new Date();
  const monthYear = getMonthYear(currentDate);
  const [year, month] = monthYear.split('-');

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const monthName = monthNames[parseInt(month) - 1];

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
        {/* Header */}
        <View className="bg-primary px-4 py-4">
          <Text className="text-2xl font-bold text-white">Relatórios</Text>
        </View>

        {/* Relatório Mensal */}
        <View className="px-4 py-6 gap-3">
          <Text className="text-base font-bold text-foreground">Relatório Mensal</Text>

          <TouchableOpacity className="bg-surface rounded-lg p-4 active:opacity-70">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="calendar-month" size={24} color="#0a7ea4" />
                <View>
                  <Text className="text-sm text-muted">Mês Atual</Text>
                  <Text className="text-lg font-bold text-foreground">
                    {monthName} {year}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#687076" />
            </View>
            <View className="border-t border-border pt-3 gap-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Receitas</Text>
                <Text className="text-sm font-semibold text-green-600">
                  {formatCurrency(0)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Despesas</Text>
                <Text className="text-sm font-semibold text-red-600">
                  {formatCurrency(0)}
                </Text>
              </View>
              <View className="flex-row justify-between pt-2 border-t border-border">
                <Text className="text-sm font-semibold text-foreground">Saldo</Text>
                <Text className="text-sm font-bold text-foreground">
                  {formatCurrency(0)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Relatório Anual */}
        <View className="px-4 py-6 gap-3 border-t border-border">
          <Text className="text-base font-bold text-foreground">Relatório Anual</Text>

          <TouchableOpacity className="bg-surface rounded-lg p-4 active:opacity-70">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="calendar-today" size={24} color="#0a7ea4" />
                <View>
                  <Text className="text-sm text-muted">Ano Atual</Text>
                  <Text className="text-lg font-bold text-foreground">
                    {year}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#687076" />
            </View>
            <View className="border-t border-border pt-3 gap-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Receitas</Text>
                <Text className="text-sm font-semibold text-green-600">
                  {formatCurrency(0)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Despesas</Text>
                <Text className="text-sm font-semibold text-red-600">
                  {formatCurrency(0)}
                </Text>
              </View>
              <View className="flex-row justify-between pt-2 border-t border-border">
                <Text className="text-sm font-semibold text-foreground">Saldo</Text>
                <Text className="text-sm font-bold text-foreground">
                  {formatCurrency(0)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Ações */}
        <View className="px-4 py-6 gap-3 border-t border-border">
          <Text className="text-base font-bold text-foreground">Ações</Text>

          <TouchableOpacity className="bg-surface rounded-lg p-4 flex-row items-center justify-between active:opacity-70">
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="file-download" size={24} color="#0a7ea4" />
              <View>
                <Text className="text-sm font-semibold text-foreground">
                  Exportar como PDF
                </Text>
                <Text className="text-xs text-muted">
                  Relatório do mês atual
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#687076" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-surface rounded-lg p-4 flex-row items-center justify-between active:opacity-70">
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="table-chart" size={24} color="#0a7ea4" />
              <View>
                <Text className="text-sm font-semibold text-foreground">
                  Exportar como CSV
                </Text>
                <Text className="text-xs text-muted">
                  Dados em formato tabular
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#687076" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
