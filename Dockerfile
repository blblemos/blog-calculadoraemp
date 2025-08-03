# Etapa 1: Build do projeto
FROM node:16-alpine AS build

WORKDIR /app

COPY . .

RUN npm install --frozen-lockfile
RUN npm build

# Etapa 2: Servindo os arquivos com 'serve'
FROM node:16-alpine

WORKDIR /app

# Instala o pacote 'serve' globalmente
RUN npm global add serve

# Copia os arquivos buildados da etapa anterior
COPY --from=build /app/build ./build

EXPOSE 3000

# Inicia o servidor
CMD ["serve", "-s", "build", "-l", "3000"]
