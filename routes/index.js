var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('./users/index', {
    title: 'Landing page',
    slides: [
      '/video/iphone-promo.mp4',
      '/video/EDZN0157.mp4']
  });
});

router.get('/login', function (req, res, next) {
  res.render('users/login', { title: 'Login' });
});

router.get('/signup', function (req, res, next) {
  res.render('users/signup', { title: 'Signup' });
});

router.get('/cart', function (req, res, next) {
  const products = [
    { image: "images/vite.svg", name: "Galaxy Buds3", size: "M", quantity: 1, price: 32.00 },
    // { image: "images/vite.svg", name: "Wireless Charger", size: "L", quantity: 1, price: 45.00 }
  ];

  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const shipping = subtotal > 100 ? 0 : 5;
  const taxes = subtotal * 0.1;
  const total = subtotal + shipping + taxes;

  res.render('users/cart', {title: "Cart", products, subtotal, shipping, taxes, total });

});

module.exports = router;
