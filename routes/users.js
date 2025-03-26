const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer/multer-user-config");
const { isLoged } = require('../middlewares/auth-middleware')
const userController = require('../controllers/users-controller')
const validateUser = require('../middlewares/express-validations/validate-user');


/* 1. Fromulario de Login */
router.get('/login', userController.index);
// 2. Fromulario de Registro
router.get('/signup', userController.createUser);
// 3. Almacenamiento de Usuario
router.post('/signup',
    upload.single("avatar"),
    validateUser.validateRegisterFields, // Valida los campos de registro.
    validateUser.handleValidationErrors, // Control de errores.
    userController.storeUser)
// 4. Acción de Logeo al sitio
router.post('/login',
    validateUser.validateLoginFields, // Valida los campos de Logueo
    validateUser.handleValidationErrors, //Validacion de errores.
    userController.login);
// 5. Deslogeo del usuario
router.get('/logout', userController.logout);
// 6. Mostrar perfil de usuario
router.get('/profile', isLoged, userController.showProfile)
// router.get('/profile', userController.showProfile)

router.get('/profile/edit', isLoged, userController.editProfile)

router.put('/u/profile',
    validateUser.validateEditProfile, // Valida los campos de actualización de perfil
    validateUser.handleValidationErrors,
    userController.updateProfile)

module.exports = router;