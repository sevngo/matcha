# Matcha &middot; [![Build Status](https://travis-ci.com/sevngo/matcha.svg?branch=master)](https://travis-ci.com/sevngo/matcha) [![Coverage Status](https://coveralls.io/repos/github/sevngo/matcha/badge.svg?branch=master)](https://coveralls.io/github/sevngo/matcha?branch=master) [![dependencies Status](https://david-dm.org/sevngo/matcha/status.svg)](https://david-dm.org/sevngo/matcha) [![devDependencies Status](https://david-dm.org/sevngo/matcha/dev-status.svg)](https://david-dm.org/sevngo/matcha?type=dev)

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
npm start
```

## Production mode

Create .env.production

```
SERVER_PORT=8080
REACT_APP_GOOGLEMAPS_API_KEY=
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=matcha
SENDGRID_API_KEY=
JWT_SECRET=mysecret
```

Then run :

```
docker-compose up
```
