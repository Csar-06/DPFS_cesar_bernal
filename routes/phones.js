var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Phones' });
});


router.get('/item/:id', function(req, res, next) {
  res.render('details', { title: 'Details' });
});


module.exports = router;
