# Matcha &middot; [![Build Status](https://travis-ci.com/sevngo/matcha.svg?branch=master)](https://travis-ci.com/sevngo/matcha) [![Coverage Status](https://coveralls.io/repos/github/sevngo/matcha/badge.svg?branch=master)](https://coveralls.io/github/sevngo/matcha?branch=master)

[Subject](https://github.com/sevngo/Matcha/blob/master/subject.pdf)

React Redux Node.js MongoDB Socket.IO web application

## Development mode

Fill .env.development then :

```
docker run -p 27017:27017 mongo:4.2.3
npm i
npm run seed:db
npm run dev
```

## Production mode

Fill .env.production then :

```
docker-compose up
```
