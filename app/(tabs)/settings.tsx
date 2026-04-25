import { ScrollView, Text, View, TouchableOpacity, Switch } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useApp } from '@/lib/app-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SettingsScreen() {
  const { state, updateSettings } = useApp();

  const handleToggle = (key: string, value: boolean) => {
    updateSettings({
      [key]: value,
    });
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
        {/* Header */}
        <View className="bg-primary px-4 py-4">
          <Text className="text-2xl font-bold text-white">Configurações</Text>
        </View>

        {/* Permissões */}
        <View className="px-4 py-4 border-b border-border">
          <Text className="text-base font-bold text-foreground mb-3">Permissões</Text>

          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2 flex-1">
              <MaterialIcons name="notifications" size={20} color="#0a7ea4" />
              <Text className="text-sm text-foreground">Ler notificações push</Text>
            </View>
            <Switch
              value={state.settings.readPushNotifications}
              onValueChange={(value) => handleToggle('readPushNotifications', value)}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2 flex-1">
              <MaterialIcons name="warning" size={20} color="#F59E0B" />
              <Text className="text-sm text-foreground">Alertas de orçamento</Text>
            </View>
            <Switch
              value={state.settings.budgetAlerts}
              onValueChange={(value) => handleToggle('budgetAlerts', value)}
            />
          </View>
        </View>

        {/* Aparência */}
        <View className="px-4 py-4 border-b border-border">
          <Text className="text-base font-bold text-foreground mb-3">Aparência</Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2 flex-1">
              <MaterialIcons name="dark-mode" size={20} color="#687076" />
              <Text className="text-sm text-foreground">Modo escuro</Text>
            </View>
            <TouchableOpacity className="px-3 py-2 rounded-lg bg-surface">
              <Text className="text-xs text-muted">Auto</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dados */}
        <View className="px-4 py-4 border-b border-border">
          <Text className="text-base font-bold text-foreground mb-3">Dados</Text>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-border">
            <View className="flex-row items-center gap-2 flex-1">
              <MaterialIcons name="backup" size={20} color="#0a7ea4" />
              <View>
                <Text className="text-sm font-semibold text-foreground">Fazer backup</Text>
                <Text className="text-xs text-muted">Exportar dados localmente</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#687076" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-border">
            <View className="flex-row items-center gap-2 flex-1">
              <MaterialIcons name="restore" size={20} color="#0a7ea4" />
              <View>
                <Text className="text-sm font-semibold text-foreground">Restaurar backup</Text>
                <Text className="text-xs text-muted">Importar dados salvos</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#687076" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center gap-2 flex-1">
              <MaterialIcons name="file-download" size={20} color="#0a7ea4" />
              <View>
                <Text className="text-sm font-semibold text-foreground">Exportar como CSV</Text>
                <Text className="text-xs text-muted">Baixar relatório em CSV</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#687076" />
          </TouchableOpacity>
        </View>

        {/* Sobre */}
        <View className="px-4 py-4">
          <Text className="text-base font-bold text-foreground mb-3">Sobre</Text>

          <View className="py-3 border-b border-border">
            <Text className="text-sm text-muted">Versão</Text>
            <Text className="text-sm font-semibold text-foreground">1.0.0</Text>
          </View>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-border">
            <Text className="text-sm text-foreground">Política de Privacidade</Text>
            <MaterialIcons name="open-in-new" size={16} color="#0a7ea4" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <Text className="text-sm text-foreground">Termos de Uso</Text>
            <MaterialIcons name="open-in-new" size={16} color="#0a7ea4" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
