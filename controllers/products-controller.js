const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../DB/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
 index: (req, res) => {
        const products = getProducts();
        res.render('./products/index', { title: 'CRUD', products });
    },
    create: (req, res) => {
        res.render('products/create', {title: 'Create Product'});
    },
    show: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        res.render('products/show', { title: product.brand+' '+product.model, product });
    },
    store: (req, res) => {
        const products = getProducts();
        const newProduct = {
            id: products.length + 1,
            ...req.body
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/products');
    },
    edit: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        res.render('products/edit', {title: 'Edit Product', product });
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