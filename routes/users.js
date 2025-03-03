var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bcrypt = require('bcryptjs');
const { type } = require('os');

const usersFilePath = path.join(__dirname, '../data/users.json'); //Dirección del archivo.json con la data
const getUsers = () => JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));// Función para obtener transfromar el archivo .json a texto 

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('users/login', { title: 'Login', error: "" });
});

router.get('/signup', function (req, res, next) {
  res.render('users/signup', { title: 'Sign-Up', error: "" });
});

router.post('/signup', upload.single("avatar"), async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Verificar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.render('users/signup', { title: 'Sign-Up', error: "Passwords don't match", email });
  }

  // Encriptar la contraseña
  const salt = await bcrypt.genSalt(10); // Genera un "salt" (valor aleatorio)
  const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña

  const users = getUsers();// Obtención de los usuarios
  const newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    type: 'Customer',
    avatar: req.file
  };

  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));// subida del array con los usuarios + el nuevo usuario
  res.redirect('/users/login');
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  // Buscar usuario por email
  const user = users.find(u => u.email === email);
  console.log(user);

  if (!user) {
    return res.render('users/login', { title: 'Login', error: "Wrong user or password, try again  U", email });
  }

  // Comparar la contraseña ingresada con la encriptada
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(password,"=",user.password);

  if (!isMatch) {
    return res.render('users/login', { title: 'Login', error: "Wrong user or password, try again  P", email });
  }

  if (user.type === 'Customer') {
    // Guardar datos del usuario en la sesión
    req.session.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    res.redirect('/');// Redirigir al usuario autenticado

  } else if (user.type === 'Admin') {
    req.session.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    res.redirect('/products/');// Redirigir al usuario autenticado
  }
  // Crear cookie para recordar al usuario (opcional)
  //  res.cookie('userEmail', user.email, { maxAge: 3600000, httpOnly: true });
});



router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('userEmail');
    res.redirect('/login');
  });
});






module.exports = router;
