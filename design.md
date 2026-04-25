# Design do Aplicativo: Finanças Pessoais Pro

## Visão Geral

Aplicativo móvel (portrait 9:16) para organização de finanças pessoais com foco em uma única mão. Segue padrões iOS (Apple Human Interface Guidelines).

---

## Paleta de Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| **Primária** | `#0a7ea4` (Azul Petróleo) | Botões, destaques, ações principais |
| **Fundo** | `#ffffff` (Branco) / `#151718` (Escuro) | Fundo geral |
| **Superfície** | `#f5f5f5` (Cinza Claro) / `#1e2022` (Cinza Escuro) | Cards, containers |
| **Texto Principal** | `#11181C` (Preto) / `#ECEDEE` (Branco) | Títulos, corpo |
| **Texto Secundário** | `#687076` (Cinza) / `#9BA1A6` (Cinza Claro) | Subtítulos, labels |
| **Receita** | `#22C55E` (Verde) | Valores positivos, receitas |
| **Despesa** | `#EF4444` (Vermelho) | Valores negativos, despesas |
| **Aviso** | `#F59E0B` (Âmbar) | Alertas, avisos |
| **Borda** | `#E5E7EB` (Cinza) / `#334155` (Cinza Escuro) | Divisores, bordas |

---

## Estrutura de Telas

### 1. **Home (Dashboard)**
**Conteúdo Principal:**
- Resumo do mês atual (saldo total, receitas, despesas)
- Gráfico de pizza (despesas por categoria - top 5)
- Lista de últimas 5 transações com ícones de categoria
- Botão flutuante para adicionar transação

**Funcionalidade:**
- Swipe horizontal para navegar entre meses
- Tap em transação → Detalhe/Edição
- Tap em categoria do gráfico → Filtro por categoria

---

### 2. **Transações**
**Conteúdo Principal:**
- Filtros: Período (mês/ano), Tipo (Receita/Despesa), Categoria
- Lista de transações agrupadas por data (descendente)
- Cada item: ícone categoria, descrição, valor, data
- Swipe para deletar (com confirmação)

**Funcionalidade:**
- Busca por descrição
- Ordenação por data/valor
- Tap para editar/visualizar detalhes

---

### 3. **Adicionar/Editar Transação**
**Conteúdo Principal:**
- Campo: Descrição (obrigatório)
- Campo: Valor (obrigatório, com máscara monetária)
- Seletor: Categoria (dropdown com 40+ opções)
- Seletor: Data (date picker)
- Toggle: Receita/Despesa
- Botão: Salvar
- Botão: Cancelar

**Funcionalidade:**
- Validação em tempo real
- Sugestão de categoria baseada em palavras-chave (ex: "Uber" → Transporte)
- Atalho para transações recorrentes

---

### 4. **Transações Recorrentes**
**Conteúdo Principal:**
- Lista de transações recorrentes configuradas
- Cada item: nome, valor, frequência, próxima data
- Botão para adicionar nova recorrência
- Swipe para deletar

**Funcionalidade:**
- Adicionar: Nome, valor, categoria, frequência (diária/semanal/mensal), data início
- Editar: Modificar qualquer campo
- Deletar: Com confirmação
- Auto-aplicação: Cria transação automaticamente na data

---

### 5. **Relatórios Mensais**
**Conteúdo Principal:**
- Seletor de mês/ano
- Resumo: Total receita, Total despesa, Saldo
- Gráfico de barras: Despesas por categoria
- Tabela: Categoria, Valor, % do total
- Botão: Exportar como PDF

**Funcionalidade:**
- Comparação com mês anterior (% de variação)
- Tap em categoria → Detalhe de transações

---

### 6. **Relatórios Anuais**
**Conteúdo Principal:**
- Seletor de ano
- Resumo: Total receita, Total despesa, Saldo
- Gráfico de linha: Evolução mensal (receita vs despesa)
- Tabela: Mês, Receita, Despesa, Saldo
- Botão: Exportar como PDF

**Funcionalidade:**
- Tap em mês → Ir para relatório mensal
- Comparação com ano anterior

---

### 7. **Categorias**
**Conteúdo Principal:**
- Lista de 40+ categorias com ícones
- Cada item: nome, cor, ícone, % do orçamento (se definido)
- Botão para adicionar categoria customizada
- Swipe para editar/deletar

**Funcionalidade:**
- Editar: Nome, cor, ícone
- Orçamento: Definir limite mensal
- Alertas: Notificar quando atingir 80% do orçamento

---

### 8. **Configurações**
**Conteúdo Principal:**
- Seção: Permissões
  - Toggle: Ler notificações push
  - Toggle: Notificações de orçamento
- Seção: Backup/Sincronização
  - Botão: Fazer backup local
  - Botão: Restaurar backup
  - Botão: Sincronizar com nuvem (futuro)
- Seção: Aparência
  - Toggle: Modo escuro
- Seção: Sobre
  - Versão do app
  - Link: Privacidade
  - Link: Termos de uso

**Funcionalidade:**
- Exportar dados como CSV/JSON
- Importar dados de backup

---

### 9. **Leitura de Notificações (Background)**
**Conteúdo Principal:**
- Listener de notificações push do banco
- Parser de texto (ex: "Débito de R$ 150,00 em Uber")
- Sugestão de categoria automática
- Confirmação do usuário antes de salvar

**Funcionalidade:**
- Regex patterns para diferentes bancos
- Machine learning (futuro) para melhorar sugestões
- Histórico de notificações processadas

---

## Fluxos Principais

### Fluxo 1: Visualizar Gastos do Mês
1. Abrir app → Home (Dashboard)
2. Ver resumo do mês atual
3. Ver gráfico de despesas por categoria
4. Swipe para navegar entre meses
5. Tap em categoria → Filtro de transações

### Fluxo 2: Adicionar Transação Manual
1. Home → Botão flutuante (+)
2. Preencher: Descrição, Valor, Categoria, Data
3. Tap em "Salvar"
4. Voltar para Home (transação aparece na lista)

### Fluxo 3: Adicionar Transação Recorrente
1. Home → Aba "Transações" → Botão "Recorrentes"
2. Tap em "Adicionar"
3. Preencher: Nome, Valor, Categoria, Frequência, Data início
4. Tap em "Salvar"
5. Sistema cria transações automaticamente

### Fluxo 4: Ler Notificação de Gasto
1. Receber notificação push do banco
2. App processa automaticamente
3. Sugestão de categoria aparece
4. Usuário confirma ou edita
5. Transação salva automaticamente

### Fluxo 5: Gerar Relatório Mensal
1. Home → Aba "Relatórios" → "Mensal"
2. Selecionar mês/ano
3. Ver resumo e gráficos
4. Tap em "Exportar PDF"
5. Arquivo salvo na galeria

---

## Padrões de Interação

### Navegação
- **Bottom Tab Bar**: Home, Transações, Relatórios, Categorias, Configurações
- **Swipe Back**: Voltar para tela anterior (iOS padrão)
- **Swipe Horizontal**: Navegar entre períodos (meses/anos)

### Feedback Visual
- **Botões**: Scale 0.97 + haptic ao pressionar
- **Listas**: Opacity 0.7 ao tocar item
- **Ícones**: Opacity 0.6 ao tocar

### Validação
- **Campos Obrigatórios**: Destaque em vermelho se vazio
- **Valor Monetário**: Máscara automática (ex: "1500" → "R$ 1.500,00")
- **Data**: Date picker nativo

---

## Considerações Futuras

1. **Web**: Mesma estrutura de dados, UI responsiva
2. **Sincronização**: Backend para sincronizar entre dispositivos
3. **IA**: Sugestão automática de categoria com ML
4. **Integração Bancária**: API para importar transações automaticamente
5. **Orçamento**: Alertas quando atingir limite
6. **Gráficos Avançados**: Comparação período-a-período, projeções

---

## Notas de Implementação

- **Armazenamento**: AsyncStorage (local) + SQLite (futuro)
- **Notificações**: expo-notifications para push
- **Gráficos**: react-native-chart-kit ou Plotly
- **Ícones**: Usar SF Symbols (iOS) + Material Icons (Android)
- **Acessibilidade**: Labels para screen readers, contraste adequado
