# Etapa 1: Build da aplicação
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Etapa 2: Servir arquivos estáticos com o `serve`
FROM node:16-alpine

WORKDIR /app

# Instala o servidor estático
RUN npm install -g serve

# Copia os arquivos buildados
COPY --from=builder /app/build ./build

EXPOSE 3000

# Healthcheck para o Coolify saber que o container está ok
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["serve", "-s", "build", "-l", "3000"]
