FROM node:13.14.0-stretch-slim

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i --only=prod

COPY ./public ./public
COPY ./src ./src
COPY ./.env.production ./
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]