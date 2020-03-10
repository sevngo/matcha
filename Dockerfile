FROM node:lts-slim

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i

COPY ./public ./public
COPY ./src ./src
RUN npm run build

COPY ./.env.production ./
EXPOSE 8080
CMD ["npm", "start"]