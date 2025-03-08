const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products-controller')
const {isAdmin} = require('../middlewares/auth-middleware');

// 1. Listado de productos
router.get('/', isAdmin, productsController.index);

// 2. Formulario de creación de productos
router.get('/create', isAdmin, productsController.create);

// 3. Detalle de un producto particular
router.get('/:id', isAdmin, productsController.show);

// 4. Acción de creación
router.post('/', productsController.store);

// 5. Formulario de edición de productos
router.get('/:id/edit', isAdmin, productsController.edit);

// 6. Acción de edición
router.put('/:id', productsController.update);

// 7. Acción de borrado
router.delete('/:id', productsController.destroy);


module.exports = router