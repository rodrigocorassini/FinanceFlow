# Finanças Pessoais Pro

Um aplicativo móvel completo para organização de finanças pessoais com leitura automática de notificações, categorização inteligente de gastos, gráficos interativos e relatórios detalhados.

## 🎯 Características

- ✅ **Dashboard Intuitivo**: Resumo mensal com receitas, despesas e saldo
- ✅ **Transações**: Adicione, edite e delete transações facilmente
- ✅ **40+ Categorias Pré-configuradas**: Alimentação, Transporte, Moradia, Saúde, etc.
- ✅ **Categorização Automática**: O app sugere categorias baseado na descrição
- ✅ **Transações Recorrentes**: Configure despesas fixas (aluguel, internet, etc.)
- ✅ **Relatórios Mensais e Anuais**: Visualize padrões de gastos com gráficos
- ✅ **Leitura de Notificações Push**: Detecta automaticamente gastos do banco
- ✅ **Orçamento por Categoria**: Defina limites e receba alertas
- ✅ **Backup e Exportação**: Salve seus dados em CSV ou JSON
- ✅ **Modo Escuro**: Interface adaptável ao seu dispositivo
- ✅ **Totalmente Offline**: Seus dados ficam no seu dispositivo

## 📱 Plataformas

- iOS 13+
- Android 7+
- Web (futuro)

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- pnpm 9.12.0+
- Expo CLI

### Instalação

```bash
# Clonar ou navegar até o projeto
cd financas-pessoais-app

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Escanear QR code com Expo Go no seu dispositivo
```

## 📚 Documentação

- **[Manual de Implementação](./MANUAL_IMPLEMENTACAO.md)** - Para desenvolvedores
- **[Manual do Usuário](./MANUAL_USUARIO.md)** - Para usuários finais
- **[Design](./design.md)** - Especificação de design e fluxos

## 🏗️ Arquitetura

### Stack Tecnológico

- **Framework**: React Native + Expo SDK 54
- **Linguagem**: TypeScript 5.9
- **Styling**: NativeWind 4 (Tailwind CSS)
- **Estado**: React Context + useReducer
- **Persistência**: AsyncStorage
- **Ícones**: Material Icons + SF Symbols
- **Roteamento**: Expo Router 6

### Estrutura de Pastas

```
app/                    # Telas e rotas
├── (tabs)/             # Abas principais
│   ├── index.tsx       # Home/Dashboard
│   ├── transactions.tsx # Transações
│   ├── reports.tsx     # Relatórios
│   ├── categories.tsx  # Categorias
│   └── settings.tsx    # Configurações
└── _layout.tsx         # Layout raiz

lib/                    # Lógica de negócio
├── types.ts            # Tipos TypeScript
├── storage.ts          # Persistência
├── business-logic.ts   # Cálculos
└── app-context.tsx     # Estado global

components/            # Componentes reutilizáveis
├── screen-container.tsx
├── haptic-tab.tsx
└── ui/
```

## 📊 Categorias Disponíveis

### Alimentação
- Bebidas
- Delivery
- Restaurante
- Supermercado
- Suplementos

### Compras
- Diversos
- Eletrônicos
- Livros
- Presentes
- Roupas

### Educação
- Escola
- Materiais
- Mentoria
- Natação

### Moradia
- Água
- Internet
- Condomínio
- Energia
- Gás
- IPTU
- Manutenção

### Saúde
- Academia
- Consulta
- Medicamentos

### Transporte
- Combustível
- Estacionamento
- IPVA
- Manutenção
- Pedágio
- Seguro
- Uber

### Lazer
- Assinaturas
- Diversão
- Restaurante/Bar
- Viagem

### Pet
- Brinquedos
- Ração
- Remédio
- Veterinário

## 💾 Dados e Privacidade

- ✅ Todos os dados são armazenados **localmente** no seu dispositivo
- ✅ Nenhum dado é enviado para servidores externos
- ✅ Você tem controle total sobre seus dados
- ✅ Backup e exportação disponíveis

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia Metro Bundler + Backend

# Build
pnpm build            # Build para produção
pnpm ios              # Build para iOS
pnpm android          # Build para Android

# Qualidade
pnpm check            # TypeScript check
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm test             # Vitest

# Banco de Dados
pnpm db:push          # Migração de banco de dados
```

### Adicionar Dependências

```bash
pnpm add nome-do-pacote
```

### Estrutura de Componentes

Todos os componentes devem:
1. Usar `ScreenContainer` para SafeArea correto
2. Usar `useApp()` para acessar estado global
3. Usar Tailwind classes para styling
4. Ser TypeScript-first

## 🎨 Customização

### Alterar Cores

Edite `theme.config.js`:

```javascript
const themeColors = {
  primary: { light: '#0a7ea4', dark: '#0a7ea4' },
  background: { light: '#ffffff', dark: '#151718' },
  // ...
};
```

### Adicionar Categoria

Edite `lib/types.ts` e adicione à lista `DEFAULT_CATEGORIES`.

### Adicionar Tela

1. Crie arquivo em `app/(tabs)/nova-tela.tsx`
2. Adicione rota em `app/(tabs)/_layout.tsx`

## 🐛 Troubleshooting

### Problema: "Module not found"

```bash
rm -rf node_modules
pnpm install
pnpm dev
```

### Problema: AsyncStorage não persiste

Verifique se `AppProvider` envolve todo o app em `app/_layout.tsx`.

### Problema: Ícones não aparecem

Adicione mapeamento em `components/ui/icon-symbol.tsx`.

## 📋 Roadmap

- [ ] Sincronização com nuvem
- [ ] Integração com APIs bancárias
- [ ] Machine Learning para categorização
- [ ] Versão web
- [ ] Suporte a múltiplas moedas
- [ ] Compartilhamento de orçamento familiar
- [ ] Gráficos avançados com previsões

## 📝 Licença

Este projeto é fornecido como está, para uso pessoal.

## 👨‍💻 Desenvolvido por

**Manus AI** - Abril 2026

## 📞 Suporte

Para dúvidas ou sugestões, consulte:
- [Manual de Implementação](./MANUAL_IMPLEMENTACAO.md)
- [Manual do Usuário](./MANUAL_USUARIO.md)

---

**Versão**: 1.0.0  
**Status**: Pronto para uso

Aproveite o aplicativo e tenha controle total de suas finanças! 💰
