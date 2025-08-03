# Etapa 1: build do app com Node 16
FROM node:16-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera a versão de produção
RUN npm run build

# Etapa 2: servidor nginx para servir os arquivos
FROM nginx:alpine

# Apaga arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos buildados para o nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Porta padrão do nginx
EXPOSE 80

# Inicia o nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
