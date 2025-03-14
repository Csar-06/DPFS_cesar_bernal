var express = require('express');
var router = express.Router();
const upload = require("../middlewares/multer/multer-user-config");
const { isLoged } = require('../middlewares/auth-middleware')
const userController = require('../controllers/users-controller')


/* 1. Fromulario de Login */
router.get('/login', userController.index);
// 2. Fromulario de Registro
router.get('/signup', userController.createUser);
// 3. Almacenamiento de Usuario
router.post('/signup', upload.single("avatar"), userController.storeUser)
// 4. Acción de Logeo al sitio
router.post('/login', userController.login);
// 5. Deslogeo del usuario
router.get('/logout', userController.logout);
// 6. Mostrar perfil de usuario
router.get('/profile', isLoged, userController.showProfile)
// router.get('/profile', userController.showProfile)

module.exports = router;