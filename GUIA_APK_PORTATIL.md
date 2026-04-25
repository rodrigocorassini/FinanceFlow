# 📱 Guia Completo - Gerar APK do Finanças Pessoais Pro (SEM INSTALAR NADA)

## ⚠️ IMPORTANTE: Você NÃO precisa instalar nada no seu PC!

Tudo que você precisa já está pronto. Basta seguir este guia.

---

## 🎯 O que você vai fazer:

1. Baixar um programa portátil (não precisa instalar)
2. Extrair o ZIP do projeto
3. Rodar um comando simples
4. Pronto! O APK estará pronto para instalar no celular

---

## 📥 PASSO 1: Baixar Node.js Portátil

Node.js é o programa que vai gerar o APK. A versão portátil não precisa ser instalada.

### Para Windows:

1. Acesse: https://nodejs.org/en/download/
2. Clique em **"Windows Binary (.zip)"** (não clique em "Installer")
3. Escolha a versão **LTS** (recomendado)
4. Baixe o arquivo `.zip` (vai ter um nome como `node-v20.x.x-win-x64.zip`)
5. **Extraia em uma pasta** (ex: `C:\nodejs`)

### Para Mac:

1. Acesse: https://nodejs.org/en/download/
2. Clique em **"macOS Binary (.tar.gz)"**
3. Escolha a versão **LTS**
4. Baixe o arquivo
5. **Extraia em uma pasta** (ex: `/Users/seu-usuario/nodejs`)

### Para Linux:

1. Acesse: https://nodejs.org/en/download/
2. Clique em **"Linux Binary (.tar.xz)"**
3. Escolha a versão **LTS**
4. Baixe o arquivo
5. **Extraia em uma pasta** (ex: `~/nodejs`)

---

## 📦 PASSO 2: Extrair o Projeto

1. Você recebeu um arquivo chamado `financas-pessoais-app.zip`
2. **Clique com botão direito** → **Extrair aqui** (ou use WinRAR, 7-Zip, etc)
3. Uma pasta chamada `financas-pessoais-app` será criada
4. **Anote o caminho dessa pasta** (ex: `C:\Users\seu-usuario\Downloads\financas-pessoais-app`)

---

## 🚀 PASSO 3: Abrir Terminal/Prompt de Comando

### Windows:

1. Pressione `Windows + R`
2. Digite `cmd` e pressione Enter
3. Uma janela preta vai abrir (é o terminal)

### Mac:

1. Pressione `Cmd + Space`
2. Digite `terminal` e pressione Enter
3. Uma janela branca vai abrir

### Linux:

1. Clique com botão direito na área vazia
2. Selecione "Abrir Terminal"
3. Ou pressione `Ctrl + Alt + T`

---

## 📍 PASSO 4: Navegar até a Pasta do Projeto

No terminal, digite este comando (e pressione Enter):

```bash
cd "caminho-da-pasta-do-projeto"
```

**Exemplo para Windows:**
```bash
cd "C:\Users\seu-usuario\Downloads\financas-pessoais-app"
```

**Exemplo para Mac:**
```bash
cd "/Users/seu-usuario/Downloads/financas-pessoais-app"
```

**Exemplo para Linux:**
```bash
cd "~/Downloads/financas-pessoais-app"
```

---

## 🔧 PASSO 5: Instalar Dependências

No terminal, digite este comando e pressione Enter:

```bash
npm install
```

**Isso vai levar 5-10 minutos.** Deixe rodar até aparecer `added X packages`.

---

## 🏗️ PASSO 6: Gerar o APK

Agora vem o passo importante! Digite este comando:

```bash
npx eas build --platform android --local
```

**Ou, se o anterior não funcionar, tente:**

```bash
npm run build
```

**Isso vai levar 30-60 minutos.** Deixe o terminal aberto e não feche nada.

---

## ✅ PASSO 7: Encontrar o APK

Quando terminar, você verá uma mensagem como:

```
✅ Build successful!
APK saved to: ./app.apk
```

O arquivo `app.apk` estará na pasta do projeto.

---

## 📱 PASSO 8: Instalar no Celular

1. Copie o arquivo `app.apk` para seu celular (via USB, email, Google Drive, etc)
2. No celular, abra o arquivo `app.apk`
3. Clique em **Instalar**
4. Pronto! O app está instalado

---

## ❓ Dúvidas Frequentes

### P: Deu erro "npm: command not found"

R: Você não adicionou Node.js ao PATH. Tente assim:

**Windows:**
```bash
"C:\nodejs\node.exe" --version
```

Se funcionar, use assim para instalar:
```bash
"C:\nodejs\npm.cmd" install
```

**Mac/Linux:**
```bash
~/nodejs/bin/npm install
```

### P: Deu erro "eas: command not found"

R: Tente instalar globalmente:
```bash
npm install -g eas-cli
```

### P: Deu erro sobre Android SDK

R: Você pode usar o Expo online. Acesse: https://expo.dev/

1. Crie uma conta (grátis)
2. Faça login no terminal: `npx eas login`
3. Rode: `npx eas build --platform android`

### P: Quanto tempo leva?

R: 
- Instalar dependências: 5-10 minutos
- Gerar APK: 30-60 minutos
- **Total: 1-2 horas**

Deixe o PC ligado e o terminal aberto.

### P: Posso fechar o terminal?

R: **NÃO!** Deixe aberto até terminar. Se fechar, o build para.

### P: Preciso de internet?

R: **SIM!** Precisa de internet durante todo o processo.

### P: Posso usar em outro PC?

R: Sim! Basta repetir os passos em outro PC.

---

## 🎉 Pronto!

Quando terminar, você terá um arquivo `app.apk` que pode instalar em qualquer celular Android.

**Qualquer dúvida, me avise!**

---

## 📚 Referências Rápidas

| Comando | O que faz |
|---------|-----------|
| `npm install` | Baixa as dependências |
| `npx eas build --platform android --local` | Gera o APK |
| `npm run build` | Alternativa para gerar APK |
| `cd "pasta"` | Entra em uma pasta |
| `ls` ou `dir` | Lista arquivos |
| `pwd` | Mostra a pasta atual |

---

**Versão**: 1.0  
**Data**: Abril 2026  
**Suporte**: Qualquer dúvida, me avise!
