# Etapa 1: Build da aplicação
FROM node:16-alpine AS builder

WORKDIR /app

# Copia arquivos do projeto
COPY package*.json ./
COPY . .

# Instala dependências e builda
RUN npm install
RUN npm run build

# Etapa 2: Imagem final, somente com o que precisa para rodar
FROM node:16-alpine

WORKDIR /app

# Copia os arquivos de produção
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Inicia o app em modo produção
CMD ["npm", "start"]
