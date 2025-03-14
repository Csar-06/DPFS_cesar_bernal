const path = require('path');
const fs = require('fs');


const productsFilePath = path.join(__dirname, '../data/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    index: (req, res) => {
        const products = getProducts();
        res.render('./products/index', { title: 'CRUD', products });
    },
    create: (req, res) => {
        res.render('products/create', { title: 'Create Product' });
    },
    show: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        res.render('products/show', { title: product.brand + ' ' + product.model, product });
    },
    store: (req, res) => {
        const { brand, model, description, price, colors, stock } = req.body;
        console.log(req.files.image); // Para depurar
        console.log(req.files.render); // Para depurar

        // Verificar si los archivos existen antes de acceder a ellos
        const imagePath = req.files.image ? `/uploads/product_image/${req.files.image[0].filename}` : null;
        const renderPath = req.files.render ? `/uploads/product_model/${req.files.render[0].filename}` : null;

         // Obtener productos del archivo JSON
        const products = getProducts();
        //  Crear nuevo producto
        const newProduct = {
            id: products.length + 1,
            brand,
            model,
            description,
            image: imagePath,
            render: renderPath,
            price,
            colors,
            stock,
            filesInfo: req.files
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products');
    },
    edit: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        res.render('products/edit', { title: 'Edit Product', product });
    },
    update: (req, res) => {
        let products = getProducts();
        products = products.map(p => p.id == req.params.id ? { ...p, ...req.body } : p);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products');
    },
    destroy: (req, res) => {
        let products = getProducts();
        products = products.filter(p => p.id != req.params.id);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products');
    }
};

module.exports = productsController