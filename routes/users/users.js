// server.js
const { Router } = require('express');
const router = Router()



// Simulación de una base de datos en memoria
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

// Ruta para obtener todos los usuarios
router.get('/users', (req, res) => {
  res.json(users);
});

// Ruta para obtener un usuario por ID
router.get('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Ruta para agregar un nuevo usuario
router.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Ruta para actualizar un usuario existente
router.put('/api/users/:id', (req, res) => {
  const { name, email } = req.body;
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users[userIndex] = { id: parseInt(req.params.id), name, email };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Ruta para eliminar un usuario
router.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router
