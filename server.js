// server/server.js
const express = require('express');
const path = require('path');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;


const itemRoutes = require('./routes/products/items')
const userRoutes = require('./routes/users/users')


// Middlewares
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
// Middleware para servir archivos estáticos de Vite
app.use(express.static(path.resolve(__dirname, '../DPFS_cesar_bernal/client/dist')));

app.use('/api', itemRoutes); // Monta el router en la ruta /api
app.use('/api', userRoutes)

// Manejar todas las rutas no API devolviendo el archivo principal de Vite
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../DPFS_cesar_bernal/client/dist', 'index.html'));
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
