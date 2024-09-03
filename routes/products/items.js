const { Router } = require('express');
const router = Router();
const path = require('path');

// Simulación de una base de datos en memoria
let items = [
    {
        id: 1,
        brand: 'Samsung',
        model: 'S22 Ultra',
        description: 'High-end smartphone with advanced features.',
        image: 'http://example.com/image1.jpg',
        object: '/3dObjects/samsung_galaxy_s22_ultra.glb',
        colors: ['green', 'red', 'black', 'white'],
        quantity: '10',
        price: '999.99',
    },
    {
        id: 2,
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        description: 'Latest iPhone with improved cameras and performance.',
        image: '',
        object: '/3dObjects/apple_iphone_15_pro_black.glb',
        colors: ['Red', 'Blue', 'green', 'black', 'white'],
        quantity: '5',
        price: '1099.99',
    },
];

// Ruta para obtener todos los items
router.get('/items', (req, res) => {
    res.send(items);
});

// Ruta para obtener un item por ID
router.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id)
    const item = items.find(item => item.id === itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Ruta para agregar un nuevo item
router.post('/api/items', (req, res) => {
    const { brand, model, description, image, colors, quantity, price } = req.body;
    const newItem = {
        id: items.length + 1,
        brand,
        model,
        description,
        image,
        colors,
        quantity,
        price,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Ruta para actualizar un item existente
router.put('/api/items/:id', (req, res) => {
    const { brand, model, description, image, colors, quantity, price } = req.body;
    const itemIndex = items.findIndex(item => item.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        items[itemIndex] = { id: parseInt(req.params.id), brand, model, description, image, colors, quantity, price };
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Ruta para eliminar un item
router.delete('/api/items/:id', (req, res) => {
    const itemIndex = items.findIndex(item => item.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

module.exports = router;
