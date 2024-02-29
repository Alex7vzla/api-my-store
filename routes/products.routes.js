const express = require('express');
const ProductsService = require('../services/products.services');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, getProductSchema, updateProductSchema } = require('../schemas/products.schema');

const router = express.Router();

//Creamos una instancia de la clase de servicios
const service = new ProductsService();

//Routes
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
 validatorHandler(getProductSchema, 'params'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await service.findOne(id);
    res.json(productById);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newProduct = await service.create(data);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
 validatorHandler(getProductSchema, 'params'),
 validatorHandler(updateProductSchema, 'body'),
 async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const productUpdated = await service.update(id, data);
    res.json(productUpdated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {

  const { id } = req.params;

  const productDeleted = await service.delete(id);

  res.json(productDeleted);

});

module.exports = router;
