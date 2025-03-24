const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer/multer-product-config");
const productsController = require('../controllers/products-controller')
const { isAdmin } = require('../middlewares/auth-middleware');

// 1. Listado de productos
// router.get('/', isAdmin, productsController.index);
router.get('/', productsController.index);

// 2. Formulario de creación de productos
// router.get('/create', isAdmin, productsController.create);
router.get('/create', productsController.create);

// 3. Detalle de un producto particular
// router.get('/:id', isAdmin, productsController.show);
router.get('/p/:id', productsController.show);

// 4. Acción de creación
router.post('/', upload.fields([
    { name: "image", maxCount: 1 },   // Solo una imagen
    { name: "render", maxCount: 1 }, // Solo un modelo 3D .glb
  ]), productsController.store);

// 5. Formulario de edición de productos
// router.get('/:id/edit', isAdmin, productsController.edit);
router.get('/:id/edit', productsController.edit);

// 6. Acción de edición
router.put('/p/:id', upload.fields([
  { name: "image", maxCount: 1 },   // Solo una imagen
  { name: "render", maxCount: 1 }, // Solo un modelo 3D .glb
]), productsController.update);

router.get('/search', productsController.fetch);

// 7. Acción de borrado
router.delete('/p/:id', productsController.destroy);


module.exports = router