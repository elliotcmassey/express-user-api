import { param, body } from 'express-validator/check';

const getValidator = [
  param('id')
    .isInt({ min: 1 })
    .trim()
    .toInt(),
];

const putValidator = [
  param('id')
    .isInt({ min: 1 })
    .trim()
    .toInt(),
  body('email')
    .isEmail()
    .trim()
    .normalizeEmail({ all_lowercase: true }),
  body('forename')
    .isLength({ min: 1, max: 50 }),
  body('surname')
    .isLength({ min: 1, max: 50 }),
];

const deleteValidator = [
  param('id')
    .isInt({ min: 1 })
    .trim()
    .toInt(),
];

const postValidator = [
  body('email')
    .isEmail()
    .trim()
    .normalizeEmail({ all_lowercase: true }),
  body('forename')
    .isLength({ min: 1, max: 50 }),
  body('surname')
    .isLength({ min: 1, max: 50 }),
];

export { getValidator, putValidator, deleteValidator, postValidator };
