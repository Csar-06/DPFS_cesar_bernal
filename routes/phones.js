var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/item', function (req, res, next) {
  const item = {
    render: '../3dObjects/apple_iphone_15_pro_black.glb',
    brand: 'Apple',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dignissimos praesentium unde illo quidem, fugit suscipit. Dignissimos autem dolore rem optio ipsum, debitis obcaecati reiciendis natus et. Fugit sit tempore esse voluptatum, nostrum dolorum perferendis eum? Accusamus molestiae, velit delectus dolor, debitis eius sapiente, cumque error beatae asperiores maxime veniam.',
    colors: ['black', 'white', 'lightgoldenrodyellow', 'lightsteelblue'],
    price: 1200.00,
  };
  
  res.render('details', {title: 'Details', item});
});


module.exports = router;
