const { body, validationResult } = require('express-validator');

const validateUser = {
    validateRegisterFields: [
        body('firstName')
            .trim().notEmpty().withMessage('Please, insert your name!')
            .isLength({ max: 25 }).withMessage('First name must be at most 25 characters long!'),
        body('lastName')
            .trim().notEmpty().withMessage('Please, insert your last name!')
            .isLength({ max: 35 }).withMessage('Last name must be at most 35 characters long!'),
        body('email')
            .trim().notEmpty().withMessage('Please, insert your e-mail!')
            .isEmail().withMessage('Invalid e-mail format!')
            .normalizeEmail(),
        body('password')
            .trim().notEmpty().withMessage('Please, insert a password!')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long!')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter!')
            .matches(/[0-9]/).withMessage('Password must contain at least one number!')
            .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character (!@#$%^&*)!'),
        body('confirmPassword')
            .trim().notEmpty().withMessage('Please, confirm your password!')
            .custom((value, { req }) => value === req.body.password)
            .withMessage('Passwords do not match!')
    ],

    validateLoginFields: [
        body('email')
            .trim().notEmpty().withMessage('Please, insert your e-mail!')
            .isEmail().withMessage('Invalid e-mail format!')
            .normalizeEmail(),

        body('password')
            .trim().notEmpty().withMessage('Please, insert your password!')
            .isLength({ min: 4 }).withMessage('Password must be at least 8 characters long!')
    ],

    validateEditProfile: [
        body('firstName')
            .trim().notEmpty().withMessage('Please, insert your name!')
            .isLength({ max: 25 }).withMessage('First name must be at most 25 characters long!'),
        body('lastName')
            .trim().notEmpty().withMessage('Please, insert your last name!')
            .isLength({ max: 35 }).withMessage('Last name must be at most 35 characters long!')
    ],

    handleValidationErrors: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

};

module.exports = validateUser;