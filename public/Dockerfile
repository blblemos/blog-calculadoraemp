# ==============================================================================
# Dockerfile para blog-calculadoraemp (React SPA)
# ==============================================================================

# Multi-stage build para otimizar o tamanho final
FROM node:18-alpine AS build

# Definir diretório de trabalho
WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apk add --no-cache libc6-compat

# Copiar arquivos de dependências primeiro (para melhor cache)
COPY package*.json ./
COPY yarn.lock* ./

# Instalar dependências
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    else npm ci --only=production; fi

# Copiar código fonte
COPY . .

# Definir variáveis de ambiente para build
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false

# Build da aplicação
RUN if [ -f yarn.lock ]; then yarn build; \
    else npm run build; fi

# ==============================================================================
# Stage de produção com Nginx
# ==============================================================================
FROM nginx:alpine AS production

# Copiar configuração customizada do Nginx
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Configuração para SPA (React Router)
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }

    # Configurações de segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Compressão gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
EOF

# Copiar build da aplicação
COPY --from=build /app/build /usr/share/nginx/html

# Remover arquivos desnecessários
RUN rm -rf /usr/share/nginx/html/*.map

# Criar usuário não-root para melhor segurança
RUN addgroup -g 1001 -S nginx-app && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx-app -g nginx-app nginx-app

# Ajustar permissões
RUN chown -R nginx-app:nginx-app /usr/share/nginx/html && \
    chown -R nginx-app:nginx-app /var/cache/nginx && \
    chown -R nginx-app:nginx-app /var/log/nginx && \
    chown -R nginx-app:nginx-app /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx-app:nginx-app /var/run/nginx.pid

# Mudar para usuário não-root
USER nginx-app

# Expor porta
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
