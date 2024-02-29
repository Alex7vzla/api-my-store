const express = require('express');
const productsRouter = require('./products.routes');
const usersRouter = require('./users.routes');

function routerApi(app) {
  //Inicializamos el router
  const router = express.Router();

  //Main route
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
