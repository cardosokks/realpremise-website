# GUIA DE DEPLOY NO NETLIFY - REALPREMISE

O Netlify é otimizado para sites estáticos e *Serverless Functions*. Como o REALPREMISE é uma aplicação Full-Stack (Vite + Express), a estratégia de deploy no Netlify exige a separação do Front-end e Back-end.

---

### Estratégia de Deploy

1.  **Front-end (Vite/React):** Deploy no Netlify (estático).
2.  **Back-end (Express/Node):** Deploy em um serviço que suporta Node.js de longa execução (ex: Render, Railway, Fly.io, ou o próprio Easypanel).

### Passo a Passo no Netlify:

1.  **Conectar Repositório:**
    - No Netlify, clique em **"Add new site"** -> **"Import an existing project"**.
    - Selecione o repositório GitHub.

2.  **Configuração de Build:**
    - **Build command:** `npm run build`
    - **Publish directory:** `dist`

3.  **Variáveis de Ambiente (Environment Variables):**
    - Se o front-end precisar de variáveis de API para se comunicar com o back-end, adicione-as aqui (iniciando com `VITE_`).

4.  **Backend (API):**
    - Você **deve** hospedar o arquivo `server.ts` (ou a versão compilada) em outro local.
    - Atualize as variáveis de ambiente do front-end (`VITE_API_URL`) para apontar para o URL onde você hospedou o seu servidor Express.

> **NOTA:** Se você deseja manter toda a aplicação unificada (Front + Back) com facilidade, recomendo fortemente utilizar o **Easypanel** ou um PaaS compatível com Docker, pois gerenciam a infraestrutura de Node.js de forma integrada.
