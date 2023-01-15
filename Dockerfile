FROM node:18.13.0-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci

CMD ["node", "."]
