# Etapa de build
FROM node:16-alpine AS builder

WORKDIR /app

# Adiciona dependências de build para pacotes nativos
RUN apk add --no-cache python3 make g++

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera a build do React
RUN npm run build

# Etapa final: nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
