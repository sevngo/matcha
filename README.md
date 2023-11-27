# Matcha &middot; [![tests](https://github.com/sevngo/matcha/actions/workflows/tests.yml/badge.svg?branch=master)](https://github.com/sevngo/matcha/actions/workflows/tests.yml) [![Coverage Status](https://coveralls.io/repos/github/sevngo/matcha/badge.svg?branch=master)](https://coveralls.io/github/sevngo/matcha?branch=master)

## Development mode

Create .env.development

```
REACT_APP_GOOGLEMAPS_API_KEY=
REACT_APP_API_URL=http://localhost:8080
SERVER_PORT=8080
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
REACT_APP_GOOGLEMAPS_API_KEY=
SERVER_PORT=8080
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=matcha
SENDGRID_API_KEY=
JWT_SECRET=mysecret
```

Then run :

```
docker-compose up
```
