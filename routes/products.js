const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products-controller')

// 1. Listado de productos
router.get('/', productsController.index);

// 2. Formulario de creación de productos
router.get('/create', productsController.create);

// 3. Detalle de un producto particular
router.get('/:id', productsController.show);

// 4. Acción de creación
router.post('/', productsController.store);

// 5. Formulario de edición de productos
router.get('/:id/edit', productsController.edit);

// 6. Acción de edición
router.put('/:id', productsController.update);

// 7. Acción de borrado
router.delete('/:id', productsController.destroy);

// router.get('/', productController.index)

// router.get('/new-item-form', productController.create)

// router.get('/mod-item-form/item-:id', productController.edit)

module.exports = router