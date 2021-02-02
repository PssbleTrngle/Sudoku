FROM node:latest as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --no-audit

# Build application
COPY src ./src/
COPY public ./public/
COPY tsconfig.json ./
RUN npm run build

# Serve enviroment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]