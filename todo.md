# Finanças Pessoais Pro - TODO

## Fase 1: Estrutura Base e Banco de Dados
- [x] Configurar banco de dados SQLite com Drizzle ORM
- [x] Criar modelos de dados (Transaction, Category, RecurringTransaction, Budget)
- [x] Implementar persistência com AsyncStorage + SQLite
- [x] Criar tipos TypeScript para todas as entidades

## Fase 2: Telas Principais
- [x] Implementar tela Home/Dashboard com resumo mensal
- [x] Implementar tela de Transações com lista e filtros
- [x] Implementar tela de Categorias com gerenciamento
- [x] Implementar tela de Configurações
- [x] Implementar navegação por abas (Tab Bar)
- [x] Adicionar ícones e mapeamento em icon-symbol.tsx

## Fase 3: Funcionalidades de Transação
- [ ] Implementar modal para adicionar/editar transação
- [ ] Implementar validação de campos (descrição, valor, categoria)
- [ ] Implementar máscara monetária para entrada de valor
- [ ] Implementar date picker para seleção de data
- [ ] Implementar sugestão automática de categoria por palavras-chave
- [ ] Implementar delete com confirmação (swipe)

## Fase 4: Transações Recorrentes
- [ ] Criar tela de Transações Recorrentes
- [ ] Implementar adição de transação recorrente
- [ ] Implementar edição de transação recorrente
- [ ] Implementar auto-aplicação de recorrências (background task)
- [ ] Implementar notificação de recorrência criada

## Fase 5: Gráficos e Visualizações
- [ ] Implementar gráfico de pizza (despesas por categoria)
- [ ] Implementar gráfico de barras (despesas por categoria - relatório mensal)
- [ ] Implementar gráfico de linha (evolução mensal - relatório anual)
- [ ] Integrar biblioteca de gráficos (react-native-chart-kit ou Plotly)

## Fase 6: Relatórios
- [ ] Implementar tela de Relatórios Mensais
- [ ] Implementar tela de Relatórios Anuais
- [ ] Implementar cálculo de totais (receita, despesa, saldo)
- [ ] Implementar comparação com período anterior
- [ ] Implementar exportação para PDF
- [ ] Implementar exportação para CSV

## Fase 7: Leitura de Notificações Push
- [ ] Configurar expo-notifications para receber push
- [ ] Implementar listener de notificações
- [ ] Criar parser de texto para diferentes bancos
- [ ] Implementar regex patterns para extração de dados
- [ ] Implementar sugestão de categoria automática
- [ ] Implementar tela de confirmação de transação detectada
- [ ] Implementar histórico de notificações processadas

## Fase 8: Configurações e Permissões
- [ ] Implementar toggle para ler notificações push
- [ ] Implementar toggle para notificações de orçamento
- [ ] Implementar backup local (AsyncStorage export)
- [ ] Implementar restauração de backup
- [ ] Implementar toggle de modo escuro
- [ ] Implementar exportação de dados (CSV/JSON)
- [ ] Implementar importação de dados

## Fase 9: Orçamento e Alertas
- [ ] Implementar definição de orçamento por categoria
- [ ] Implementar cálculo de % do orçamento utilizado
- [ ] Implementar alerta quando atingir 80% do orçamento
- [ ] Implementar notificação push de alerta

## Fase 10: Branding e Customização
- [ ] Gerar logo customizado para o app (PRÓXIMO PASSO)
- [ ] Atualizar app.config.ts com nome e branding
- [ ] Copiar logo para assets (icon.png, splash-icon.png, favicon.png, android-icon-foreground.png)
- [ ] Customizar cores no theme.config.js
- [ ] Customizar splash screen

## Fase 11: Testes e Qualidade
- [ ] Implementar testes unitários para lógica de negócio
- [ ] Implementar testes de integração para fluxos principais
- [ ] Testar em dispositivo iOS (Expo Go)
- [ ] Testar em dispositivo Android (Expo Go)
- [ ] Testar em web (browser)
- [ ] Validar acessibilidade (screen readers, contraste)

## Fase 12: Documentação
- [x] Criar manual de implementação detalhado
- [x] Criar manual do usuário
- [x] Documentar estrutura do projeto
- [x] Documentar como estender categorias
- [x] Documentar como integrar com backend (futuro)

## Categorias Pré-configuradas
- [x] Alimentação (5 subcategorias)
- [x] Cartão (1 categoria)
- [x] Compras (5 subcategorias)
- [x] Educação (4 subcategorias)
- [x] Embarque/Desembarque (1 categoria)
- [x] Finanças (1 categoria)
- [x] Lazer (4 subcategorias)
- [x] Moradia (8 subcategorias)
- [x] Pet (4 subcategorias)
- [x] Saúde (3 subcategorias)
- [x] Transporte (7 subcategorias)

## Transações Recorrentes Pré-configuradas
- [x] Cartão
- [x] Condomínio Faber
- [x] Condominio Ap
- [x] Claro
- [x] Internet Desktop
- [x] Spotify
- [x] Meli +
- [x] Escola Bella
- [x] Energia Faber
- [x] Energia Ap
- [x] Água Faber
- [x] Agua Ap
- [x] Financiamento carro
- [x] Investimento

## Notas Gerais
- Usar AsyncStorage para persistência local inicialmente
- Estruturar código para fácil migração para backend (futuro)
- Seguir padrões iOS (HIG) para melhor UX
- Implementar com foco em performance e acessibilidade
