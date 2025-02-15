var express = require('express');
const { title } = require('process');
var router = express.Router();


let phonesControllers = require('../controllers/phones-controllers.js')

/* Lista de Telefonos */
router.get('/', phonesControllers.index);
// Ruta para obtener un producto por ID
router.get('/id/:id', phonesControllers.show);


module.exports = router;
