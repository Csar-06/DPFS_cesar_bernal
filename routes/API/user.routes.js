const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users.controller')


// Obtener lista de usuarios
router.get('/', userController.getUsers);

// Obtener detalle de usuario
router.get('/:id', userController.getUserDetails);

module.exports = router;