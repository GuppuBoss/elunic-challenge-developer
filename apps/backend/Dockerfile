FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npx", "--node-options=--experimental-global-webcrypto", "nx", "serve", "backend", "--host", "0.0.0.0"] 