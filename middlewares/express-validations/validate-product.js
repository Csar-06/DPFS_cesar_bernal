const { body, param, validationResult } = require('express-validator');

const validateProduct = {
  validateId: [
    param('id').isInt({ min: 1 }).withMessage('Invalid product ID!')
  ],

  validateCreateProductFields: [
    body('brand').trim().notEmpty().withMessage('Please, add the product brand! ;)'),
    body('model')
      .trim().notEmpty().withMessage('Please, add the product model! ;)'),
    body('description')
      .trim().optional().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters! ;)'),
    body('image').optional().custom((value, { req }) => {
      if (!req.files.image) {
        throw new Error("Please upload an image!");
      }
      return true;
    }),
    body('price')
      .notEmpty().withMessage('Please, add a price! ;)')
      .isFloat({ gt: 0 }).withMessage('Price must be a positive number! ;)'),
    body('colors')
      .trim().notEmpty().withMessage('Please, add a color! ;)'),
    body('stock')
      .notEmpty().withMessage('Please, add the product stock! ;)')
      .isInt({ min: 0 }).withMessage('Stock must be a positive integer! ;)')
  ],

  validateEditProductFields: [
    body('brand').trim().notEmpty().withMessage('Please, add the product brand! ;)'),
    body('model')
      .trim().notEmpty().withMessage('Please, add the product model! ;)'),
    body('description')
      .trim().optional().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters! ;)'),
    body('price')
      .notEmpty().withMessage('Please, add a price! ;)')
      .isFloat({ gt: 0 }).withMessage('Price must be a positive number! ;)'),
    body('colors')
      .trim().notEmpty().withMessage('Please, add a color! ;)'),
    body('stock')
      .notEmpty().withMessage('Please, add the product stock! ;)')
      .isInt({ min: 0 }).withMessage('Stock must be a positive integer! ;)')
  ],

  handleValidationErrors: (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      // return res.render('products/create', {title: 'Create Product', error: 'There is an error uploading data' });
    }
    next();
  }
};

module.exports = validateProduct;
