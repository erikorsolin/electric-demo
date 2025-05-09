# 🚀 ElectricSQL Sync Demo

Este projeto é uma **demonstração** do poder de sincronização em tempo real do **[ElectricSQL](https://electric-sql.com/)**, um motor de sincronização que permite a replicação de dados em múltiplos dispositivos, utilizando o Supabase como backend. 

> ⚡️ **Objetivo**: Demonstrar como criar, modificar e sincronizar tarefas em tempo real entre diferentes clientes.

---

## 🛠️ Configuração do Ambiente

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
REACT_APP_ELECTRIC_API_URL=<API URL fornecida pelo ElectricSQL>
REACT_APP_ELECTRIC_SOURCE_ID=<Source ID fornecido pelo ElectricSQL>
REACT_APP_ELECTRIC_SOURCE_SECRET=<Source Secret fornecido pelo ElectricSQL>
REACT_APP_SUPABASE_URL=<URL do Supabase>
REACT_APP_SUPABASE_KEY=<Chave anônima do Supabase>
```

⚠️ **Importante**: Nunca compartilhe suas credenciais em repositórios públicos.

---

## 🖥️ Como Executar o Projeto

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

4. Abra a URL que aparece no terminal (geralmente `http://localhost:3000`) no navegador.

---

## 🔄 Testando a Sincronização em Tempo Real

1. **Abra o aplicativo em múltiplas janelas ou abas do navegador.**
   - Copie e cole a URL do aplicativo em mais de uma aba ou instância do navegador.
   
2. **Crie ou modifique tarefas.**
   - Adicione, edite ou exclua tarefas em uma das instâncias.

3. **Observe a mágica da sincronização.**
   - Todas as alterações realizadas em uma aba serão refletidas em tempo real nas outras instâncias, sem a necessidade de recarregar a página! 🎉

---

## 🧩 Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca para interfaces de usuário.
- [ElectricSQL](https://electric-sql.com/) - Motor de sincronização de dados.
- [Supabase](https://supabase.com/) - Banco de dados como serviço.

---