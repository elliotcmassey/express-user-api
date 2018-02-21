import { body } from 'express-validator/check';

const postValidator = [
  body('email')
    .isEmail()
    .trim()
    .normalizeEmail({ all_lowercase: true }),
  body('forename')
    .isLength({ min: 1, max: 50 }),
  body('surname')
    .isLength({ min: 1, max: 50 })
];

export { postValidator };
