const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/products.controller')

//1. api Objeto listado de productos
router.get('/', productsController.getProduct);

//2. api Detalle de producto
router.get('/:id', productsController.getProductDetail);

module.exports = router;
