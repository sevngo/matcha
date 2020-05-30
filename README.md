# Matcha &middot; [![Build Status](https://travis-ci.com/sevngo/webapp.svg?branch=master)](https://travis-ci.com/sevngo/webapp) [![Coverage Status](https://coveralls.io/repos/github/sevngo/webapp/badge.svg?branch=master)](https://coveralls.io/github/sevngo/webapp?branch=master)

[Subject](https://github.com/sevngo/Matcha/blob/master/subject.pdf)

React Redux Node.js MongoDB Socket.IO web application

## Development mode

Create .env.development

```
REACT_APP_API_URL=http://localhost:8080
SERVER_PORT=8080
REACT_APP_GOOGLEMAPS_API_KEY=
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=matcha
SENDGRID_API_KEY=
JWT_SECRET=mysecret
```

Then run :

```
docker-compose up -d mongo
npm i
npm run seed:db
npm run dev
```

## Production mode

Create .env.production

```
REACT_APP_API_URL=http://localhost:8080
SERVER_PORT=8080
REACT_APP_GOOGLEMAPS_API_KEY=
MONGODB_URI=mongodb://mongo:27017
DATABASE_NAME=matcha
SENDGRID_API_KEY=
JWT_SECRET=mysecret
```

Then run :

```
docker-compose up
```
