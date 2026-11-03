# Containerfile
FROM docker.io/library/node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dev
RUN npm install
COPY . .
EXPOSE 4321
CMD ["npx", "astro", "dev", "--host", "0.0.0.0"]

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM docker.io/library/nginx:alpine AS preview
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]