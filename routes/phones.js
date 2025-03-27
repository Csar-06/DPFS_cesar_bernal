var express = require('express');
var router = express.Router();


let phonesControllers = require('../controllers/phones.controller.js')

/* Lista de Telefonos */
router.get('/', phonesControllers.index);
// Ruta para obtener un producto por ID
router.get('/id/:id', phonesControllers.show);


module.exports = router;
