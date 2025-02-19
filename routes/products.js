const express = require('express');
const router = express.Router();
const productController = require('../controllers/products-controller')


router.get('/', productController.index)

router.get('/new-item-form', productController.create)

router.get('/mod-item-form/item-:id', productController.edit)

module.exports = router