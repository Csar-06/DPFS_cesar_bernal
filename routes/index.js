var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { slides  :[
    '/video/iphone-promo.mp4',
    '/video/EDZN0157.mp4'] });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Cart' });
});

router.get('/item/:id', function(req, res, next) {
  res.render('details', { title: 'Details' });
});


module.exports = router;
