# Etapa 1: build da aplicação
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servir a aplicação com nginx
FROM nginx:alpine

# Remove a configuração padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos buildados da etapa anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Copia o arquivo de configuração customizado (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
