FROM node:14.12.0-slim AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i

COPY ./.env.production ./
COPY ./public ./public
COPY ./src ./src
RUN npm run build


FROM node:14.12.0-slim

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i --only=prod && npm cache clean --force

COPY --from=builder /app/build ./build
COPY ./.env.production ./
COPY ./src/server ./src/server

EXPOSE 8080
CMD ["npm", "start"]