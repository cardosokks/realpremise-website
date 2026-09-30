# GUIA DE DEPLOY NO EASYPANEL - REALPREMISE

Este projeto foi totalmente preparado e arquitetado para rodar em produção no **Easypanel** com 1 clique usando Docker e Node.js 20.

---

### Passo a Passo no Easypanel:

1. **Criar um Novo Projeto no Easypanel:**
   - No painel do seu Easypanel, clique em **"+ New Project"** e dê um nome (ex: `realpremise`).

2. **Adicionar Serviço (App):**
   - Clique em **"+ Service"** e selecione **"App"**.
   - Dê um nome ao serviço (ex: `web`).

3. **Configuração de Build (Source):**
   - **Build Type:** Selecione `Dockerfile` (o arquivo `Dockerfile` na raiz já está pré-configurado com build multi-stage otimizado).
   - **Repository:** Aponte para o repositório GitHub do seu projeto.
   - **Branch:** `main` (ou a branch que preferir).

4. **Configuração de Portas (Ports):**
   - **Port:** `3000` (Certifique-se de configurar a variável `PORT=3000` nas variáveis de ambiente).

5. **Variáveis de Ambiente (Environment Variables):**
   Adicione as variáveis conforme o `.env.example`:
   - `PORT=3000`
   - `NODE_ENV=production`
   - `JWT_SECRET=coloque-aqui-uma-chave-longa-e-segura`
   - `GEMINI_API_KEY=sua-chave-api-gemini-aqui` (Obtenha em: https://aistudio.google.com/app/apikey)
   - `APP_URL=https://seu-dominio.com.br`

6. **Deploy:**
   - Clique em **"Deploy"**.
   - O Easypanel irá construir a imagem Docker automaticamente, executar o `npm run build` do Vite e subir o servidor Node/Express em produção.

---

### Credenciais Padrão do Painel Administrativo:
- **E-mail:** `admin`
- **Senha:** `admin`
*(Você pode alterar o e-mail, nome e senha a qualquer momento dentro da aba "Perfil & Acesso" no próprio painel).*
