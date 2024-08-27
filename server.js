const express = require('express');
const app = express();
const port = 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views'); // Directorio donde se encuentran las vistas

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.render('index', { title: 'Página Principal' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
