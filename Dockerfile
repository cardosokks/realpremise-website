# ==============================================================================
# REALPREMISE - DOCKERFILE MULTI-STAGE OTIMIZADO PARA EASYPANEL / DOCKER
# ==============================================================================

# Estágio 1: Build dos assets estáticos
FROM node:20-alpine AS builder

WORKDIR /app

# Copia manifestos de pacotes
COPY package*.json ./
RUN npm ci

# Copia código-fonte e compila os bundles do Vite
COPY . .
RUN npm run build

# Estágio 2: Runtime enxuto e seguro de produção
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copia apenas as dependências necessárias de produção
COPY package*.json ./
RUN npm ci --omit=dev && npm install -g tsx

# Copia arquivos estáticos e servidores compilados
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/src/data ./src/data
COPY --from=builder /app/src/types ./src/types

# Usuário não-root por segurança OWASP
USER node

# Porta padrão de escuta
EXPOSE 3000

# Comando de inicialização do servidor de produção
CMD ["tsx", "server.ts"]
