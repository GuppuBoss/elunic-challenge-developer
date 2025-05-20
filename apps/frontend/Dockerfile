FROM node:18-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4200

CMD ["npx", "nx", "serve", "frontend", "--host", "0.0.0.0"] 