# Etapa de build
FROM node:16-alpine AS builder

WORKDIR /app

# Instala dependências de build para pacotes nativos
RUN apk add --no-cache python3 make g++

# Copia arquivos de dependência
COPY package*.json ./

# Solução do seu erro aqui 👇
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Etapa final para servir com nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
