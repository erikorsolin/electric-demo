# 🚀 ElectricSQL Sync Demo

Este projeto é uma **demonstração** do poder de sincronização em tempo real do **[ElectricSQL](https://electric-sql.com/)**, uma sync engine que permite a sincronização de dados em múltiplos dispositivos, utilizando o Supabase como Banco de Dados. Você pode testar a ferramenta diretamente utilizando a URL do GitHub Pages, onde o projeto foi publicado. Se quiser rodar localmente, basta seguir os passos descritos abaixo.

> ⚡️ **Objetivo**: Demonstrar o funcionamento da tecnologia ElectricSQL.

---

## Configuração do Ambiente

Siga as instruções abaixo para configurar o projeto e experimentar a sincronização em tempo real:

### 1. **Criar uma conta no Supabase**
- Acesse [Supabase](https://supabase.com/) e crie uma conta gratuita.
- Crie um novo projeto no Supabase.
- No projeto, vá até a aba **SQL** e execute o seguinte script para criar a tabela `todos`:

```sql
CREATE TABLE todos (
  id UUID PRIMARY KEY,
  task TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. **Obter as credenciais do Supabase**
- Vá até a aba **Settings > API** no painel do Supabase.
- Copie os valores de:
  - **URL do banco de dados** 
  - **Chave anônima (anon key)**

---

### 3. **Criar uma conta no ElectricSQL**
- Acesse [ElectricSQL Cloud](https://electric-sql.com/) e crie uma conta.
- No painel do ElectricSQL, configure uma nova conexão com o banco de dados:
  1. Insira a **string de conexão** do seu banco de dados Supabase.
  2. Após configurar, o ElectricSQL fornecerá:
     - **API URL**
     - **Source ID**
     - **Source Secret**

---

### 4. **Configurar variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
VITE_ELECTRIC_API_URL='https://api.electric-sql.cloud/v1/shape'
VITE_ELECTRIC_SOURCE_ID=<Source ID fornecido pelo ElectricSQL>
VITE_ELECTRIC_SOURCE_SECRET=<Source Secret fornecido pelo ElectricSQL>
VITE_SUPABASE_URL=<URL do Supabase>
VITE_SUPABASE_KEY=<Chave anônima do Supabase>
```

⚠️ **Importante**: Nunca compartilhe suas credenciais privadas.

---

## Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/erikorsolin/electric-sync-demo.git
   cd electric-sync-demo
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

4. Abra a URL `http://localhost:3000` no navegador.

---


## Testando a Sincronização em Tempo Real


1. **Abra o aplicativo em múltiplas janelas ou abas do navegador.**
   - Copie e cole a URL do aplicativo em mais de uma aba ou instância do navegador.
   
2. **Crie ou modifique tarefas.**
   - Adicione, edite ou exclua tarefas em uma das instâncias.

3. **Observe a mágica da sincronização.**
   - Todas as alterações realizadas em uma aba serão refletidas em tempo real nas outras instâncias, sem a necessidade de recarregar a página! 🎉

---

## Tecnologias Utilizadas

- [React](https://reactjs.org/) - UI.
- [ElectricSQL](https://electric-sql.com/) - Sync Engine.
- [Supabase](https://supabase.com/) - DBaaS.

---
