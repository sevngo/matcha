FROM node:13.14.0-slim as base

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i --only=prod && npm cache clean --force


FROM base as prod

COPY ./.env.production ./
COPY ./public ./public
COPY ./src ./src
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]


FROM base as test

WORKDIR /app

RUN npm i --only=development

COPY ./.env.test ./
COPY ./src ./src

CMD ["npm", "test"]