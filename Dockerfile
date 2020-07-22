FROM node:13.14.0-slim

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i --only=prod

COPY ./.env.production ./
COPY ./public ./public
COPY ./src ./src
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]