# Manual de Implementação - Finanças Pessoais Pro

## Visão Geral

Este manual fornece instruções detalhadas para implementar, configurar e estender o aplicativo **Finanças Pessoais Pro** em seu ambiente de desenvolvimento. O aplicativo é construído com **React Native**, **Expo SDK 54**, **TypeScript** e **NativeWind (Tailwind CSS)**.

---

## Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação e Configuração](#instalação-e-configuração)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Arquitetura de Dados](#arquitetura-de-dados)
5. [Componentes Principais](#componentes-principais)
6. [Fluxos de Funcionalidades](#fluxos-de-funcionalidades)
7. [Extensões e Customizações](#extensões-e-customizações)
8. [Troubleshooting](#troubleshooting)

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18+)
- **npm** ou **pnpm** (recomendado pnpm 9.12.0+)
- **Expo CLI** (`npm install -g expo-cli`)
- **Git**
- Um editor de código (VS Code recomendado)
- Um dispositivo físico ou emulador (Android/iOS) para testes

### Verificar Instalação

```bash
node --version
pnpm --version
expo --version
```

---

## Instalação e Configuração

### 1. Clonar ou Baixar o Projeto

```bash
cd /home/ubuntu/financas-pessoais-app
```

### 2. Instalar Dependências

```bash
pnpm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (se necessário):

```env
# Exemplo de variáveis (adicione conforme necessário)
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### 4. Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

Isso iniciará:
- **Metro Bundler** (bundler React Native) na porta 8081
- **Servidor Backend** (opcional) na porta 3000

### 5. Testar no Dispositivo

#### Opção A: Expo Go (Recomendado para Desenvolvimento)

1. Instale o aplicativo **Expo Go** no seu dispositivo (iOS App Store ou Google Play)
2. Escaneie o código QR exibido no terminal
3. O aplicativo será carregado no Expo Go

#### Opção B: Build Local

```bash
# iOS
pnpm ios

# Android
pnpm android
```

---

## Estrutura do Projeto

```
financas-pessoais-app/
├── app/                          # Rotas Expo Router
│   ├── _layout.tsx              # Layout raiz com providers
│   ├── (tabs)/                  # Grupo de abas
│   │   ├── _layout.tsx          # Configuração das abas
│   │   ├── index.tsx            # Tela Home/Dashboard
│   │   ├── transactions.tsx     # Tela de Transações
│   │   ├── reports.tsx          # Tela de Relatórios
│   │   ├── categories.tsx       # Tela de Categorias
│   │   └── settings.tsx         # Tela de Configurações
│   └── oauth/                   # Callbacks de autenticação
│
├── components/                   # Componentes reutilizáveis
│   ├── screen-container.tsx     # Wrapper de tela com SafeArea
│   ├── haptic-tab.tsx           # Tab com feedback háptico
│   └── ui/
│       └── icon-symbol.tsx      # Mapeamento de ícones
│
├── lib/                         # Lógica de negócio e utilitários
│   ├── types.ts                 # Tipos TypeScript
│   ├── storage.ts               # AsyncStorage CRUD
│   ├── business-logic.ts        # Cálculos e formatações
│   ├── app-context.tsx          # Contexto global (Redux-like)
│   ├── theme-provider.tsx       # Provedor de tema
│   ├── trpc.ts                  # Cliente tRPC
│   └── utils.ts                 # Funções utilitárias
│
├── hooks/                       # React Hooks customizados
│   ├── use-colors.ts            # Hook para cores do tema
│   ├── use-color-scheme.ts      # Detecção de modo escuro
│   └── use-auth.ts              # Hook de autenticação
│
├── assets/                      # Imagens e ícones
│   ├── images/
│   │   ├── icon.png             # Ícone do app
│   │   ├── splash-icon.png      # Ícone da splash screen
│   │   └── favicon.png          # Favicon web
│   └── fonts/                   # Fontes customizadas
│
├── design.md                    # Especificação de design
├── todo.md                      # Lista de tarefas
├── app.config.ts                # Configuração Expo
├── tailwind.config.js           # Configuração Tailwind
├── theme.config.js              # Paleta de cores
├── package.json                 # Dependências
└── tsconfig.json                # Configuração TypeScript
```

---

## Arquitetura de Dados

### Modelo de Dados

O aplicativo utiliza os seguintes modelos principais:

#### 1. **Transaction** (Transação)

```typescript
interface Transaction {
  id: string;
  description: string;
  amount: number;              // em centavos
  categoryId: string;
  type: 'income' | 'expense';
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}
```

#### 2. **Category** (Categoria)

```typescript
interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;               // hex color
  icon: string;
  budgetLimit?: number;        // em centavos
  order: number;
}
```

#### 3. **RecurringTransaction** (Transação Recorrente)

```typescript
interface RecurringTransaction {
  id: string;
  name: string;
  description: string;
  amount: number;
  categoryId: string;
  type: 'income' | 'expense';
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate?: Date;
  nextDueDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 4. **Budget** (Orçamento)

```typescript
interface Budget {
  id: string;
  categoryId: string;
  monthYear: string;           // formato: "2024-01"
  limit: number;               // em centavos
  spent: number;               // em centavos (calculado)
  createdAt: Date;
  updatedAt: Date;
}
```

### Persistência de Dados

O aplicativo utiliza **AsyncStorage** para armazenamento local. Todos os dados são salvos em JSON e sincronizados automaticamente.

**Arquivo de Armazenamento**: `lib/storage.ts`

Principais operações:
- `TransactionStorage.add()` - Adiciona transação
- `TransactionStorage.getByDateRange()` - Busca por período
- `CategoryStorage.getAll()` - Obtém todas as categorias
- `BackupStorage.exportAll()` - Exporta todos os dados

---

## Componentes Principais

### 1. AppProvider (Contexto Global)

Localização: `lib/app-context.tsx`

O `AppProvider` gerencia o estado global do aplicativo usando React Context + useReducer. Todos os dados são sincronizados com AsyncStorage automaticamente.

**Uso**:

```typescript
import { useApp } from '@/lib/app-context';

export default function MyComponent() {
  const { state, addTransaction, updateSettings } = useApp();
  
  // Acessar estado
  const transactions = state.transactions;
  const categories = state.categories;
  
  // Atualizar estado
  await addTransaction({
    description: 'Café',
    amount: 1500,  // R$ 15,00
    categoryId: 'food-drinks',
    type: 'expense',
    date: new Date(),
  });
}
```

### 2. ScreenContainer (Wrapper de Tela)

Localização: `components/screen-container.tsx`

Componente que envolve toda tela para garantir SafeArea correto e background color.

**Uso**:

```typescript
import { ScreenContainer } from '@/components/screen-container';

export default function MyScreen() {
  return (
    <ScreenContainer className="p-4">
      <Text className="text-2xl font-bold">Conteúdo</Text>
    </ScreenContainer>
  );
}
```

### 3. Business Logic (Cálculos)

Localização: `lib/business-logic.ts`

Funções utilitárias para cálculos, formatações e sugestões:

```typescript
import {
  formatCurrency,
  calculateTotalExpense,
  suggestCategory,
  generateMonthlyReport,
} from '@/lib/business-logic';

// Formatar valor
const formatted = formatCurrency(1500);  // "R$ 15,00"

// Sugerir categoria
const suggestion = suggestCategory('Uber para trabalho');
// { categoryId: 'transport-uber', confidence: 0.95, reason: '...' }

// Gerar relatório
const report = await generateMonthlyReport(new Date());
```

---

## Fluxos de Funcionalidades

### Fluxo 1: Adicionar Transação Manual

1. Usuário toca no botão flutuante (+)
2. Abre formulário de transação (a ser implementado)
3. Usuário preenche: descrição, valor, categoria, data
4. Sistema sugere categoria automaticamente
5. Usuário confirma e salva
6. Transação é adicionada ao estado e persistida

**Código de Exemplo**:

```typescript
const { addTransaction } = useApp();

const handleSaveTransaction = async (formData) => {
  await addTransaction({
    description: formData.description,
    amount: parseCurrency(formData.amount),
    categoryId: formData.categoryId,
    type: formData.type,
    date: formData.date,
  });
};
```

### Fluxo 2: Ler Notificação de Gasto

1. Aplicativo recebe notificação push do banco
2. Sistema extrai valor e descrição
3. Sugere categoria automaticamente
4. Exibe tela de confirmação
5. Usuário confirma ou edita
6. Transação é criada

**Código de Exemplo**:

```typescript
import {
  extractAmountFromNotification,
  extractDescriptionFromNotification,
  suggestCategory,
} from '@/lib/business-logic';

const handlePushNotification = async (notificationText) => {
  const amount = extractAmountFromNotification(notificationText);
  const description = extractDescriptionFromNotification(notificationText);
  const suggestion = suggestCategory(description);
  
  // Exibir tela de confirmação
  // Se confirmado:
  await addTransaction({
    description,
    amount,
    categoryId: suggestion.categoryId,
    type: 'expense',
    date: new Date(),
  });
};
```

### Fluxo 3: Gerar Relatório Mensal

1. Usuário navega para aba "Relatórios"
2. Seleciona mês/ano
3. Sistema calcula totais e gráficos
4. Exibe resumo com comparação ao mês anterior
5. Usuário pode exportar como PDF/CSV

**Código de Exemplo**:

```typescript
import { generateMonthlyReport } from '@/lib/business-logic';

const [report, setReport] = useState(null);

useEffect(() => {
  const loadReport = async () => {
    const monthReport = await generateMonthlyReport(selectedDate);
    setReport(monthReport);
  };
  loadReport();
}, [selectedDate]);
```

---

## Extensões e Customizações

### 1. Adicionar Nova Categoria

Edite `lib/types.ts` e adicione à lista `DEFAULT_CATEGORIES`:

```typescript
{
  id: 'custom-category',
  name: 'Minha Categoria',
  type: 'expense',
  color: '#FF5733',
  icon: 'shopping-bag',
  order: 100,
}
```

### 2. Customizar Cores do Tema

Edite `theme.config.js`:

```javascript
const themeColors = {
  primary: { light: '#0a7ea4', dark: '#0a7ea4' },
  background: { light: '#ffffff', dark: '#151718' },
  // ... adicione suas cores
};
```

### 3. Adicionar Nova Tela

1. Crie arquivo em `app/(tabs)/nova-tela.tsx`
2. Adicione rota em `app/(tabs)/_layout.tsx`:

```typescript
<Tabs.Screen
  name="nova-tela"
  options={{
    title: "Nova Tela",
    tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
  }}
/>
```

### 4. Integrar com Backend

Para sincronizar dados com servidor, edite `lib/app-context.tsx` e adicione chamadas tRPC:

```typescript
import { trpc } from '@/lib/trpc';

const { mutate: syncTransactions } = trpc.transactions.sync.useMutation();

const handleSync = async () => {
  const transactions = await TransactionStorage.getAll();
  await syncTransactions({ transactions });
};
```

### 5. Adicionar Gráficos

Instale biblioteca de gráficos:

```bash
pnpm add react-native-chart-kit
```

Use em componente:

```typescript
import { PieChart } from 'react-native-chart-kit';

<PieChart
  data={{
    labels: ['Alimentação', 'Transporte'],
    datasets: [{ data: [300, 200] }],
  }}
  width={screenWidth}
  height={220}
/>
```

---

## Troubleshooting

### Problema: "Module not found"

**Solução**: Limpe cache e reinstale dependências:

```bash
rm -rf node_modules
pnpm install
pnpm dev
```

### Problema: AsyncStorage não persiste dados

**Solução**: Verifique se `AppProvider` envolve todo o app em `app/_layout.tsx`

### Problema: Ícones não aparecem

**Solução**: Adicione mapeamento em `components/ui/icon-symbol.tsx`:

```typescript
const MAPPING = {
  "seu-icone": "material-icon-name",
};
```

### Problema: Tema não muda

**Solução**: Certifique-se de usar `useColors()` hook:

```typescript
import { useColors } from '@/hooks/use-colors';

const colors = useColors();
<View style={{ backgroundColor: colors.background }} />
```

### Problema: Notificações push não funcionam

**Solução**: Verifique permissões em `app.config.ts`:

```typescript
android: {
  permissions: ["POST_NOTIFICATIONS"],
}
```

---

## Próximos Passos

1. **Implementar Formulários**: Criar telas de adição/edição de transações
2. **Integrar Notificações**: Configurar expo-notifications para push
3. **Adicionar Gráficos**: Integrar biblioteca de gráficos
4. **Sincronização com Backend**: Conectar com servidor para sincronização
5. **Testes Automatizados**: Adicionar testes com Vitest
6. **Build para Produção**: Gerar APK/IPA para distribuição

---

## Referências

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [NativeWind Documentation](https://www.nativewind.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage)

---

**Versão**: 1.0.0  
**Última Atualização**: Abril 2026  
**Autor**: Manus AI
