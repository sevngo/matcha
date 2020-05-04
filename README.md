# Matcha &middot; [![Build Status](https://travis-ci.com/sevngo/matcha.svg?branch=master)](https://travis-ci.com/sevngo/matcha) [![Coverage Status](https://coveralls.io/repos/github/sevngo/matcha/badge.svg?branch=master)](https://coveralls.io/github/sevngo/matcha?branch=master)

[Subject](https://github.com/sevngo/Matcha/blob/master/subject.pdf)

React Redux Node.js MongoDB web application

Install Node v12.14.0

## .env.development

```
REACT_APP_API_URL=http://localhost:8080
SERVER_PORT=8080
REACT_APP_GOOGLEMAPS_API_KEY=
MONGODB_URI=
DATABASE_NAME=
SENDGRID_API_KEY=
JWT_SECRET=
```

```
docker run -p 27017:27017 mongo:4.2.3
npm i
npm run seed:db
npm run dev
```
