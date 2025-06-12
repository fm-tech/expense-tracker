# Stage 1: Build the Vite application
FROM node:24-alpine AS builder


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Stage 2: Serve the static files using nginx
FROM nginx:1.28.0-alpine-slim

ENV VERSION=0.0.0

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80
# Entrypoint to inject runtime config
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]