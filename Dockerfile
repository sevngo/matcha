FROM node:14-alpine AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i

COPY ./.env.production ./
COPY ./public ./public
COPY ./src ./src
RUN npm run build


FROM node:14-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i --only=prod && npm cache clean

COPY --from=builder /app/build ./build
COPY ./.env.production ./
COPY ./src/server ./src/server

EXPOSE 8080
CMD ["npm", "run", "production"]