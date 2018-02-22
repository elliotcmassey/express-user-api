import { param, body } from 'express-validator/check';
import xss from 'xss';

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
    .normalizeEmail({ all_lowercase: true })
    .customSanitizer(value => xss(value)),
  body('forename')
    .isLength({ min: 1, max: 50 })
    .customSanitizer(value => xss(value)),
  body('surname')
    .isLength({ min: 1, max: 50 })
    .customSanitizer(value => xss(value)),
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
    .normalizeEmail({ all_lowercase: true })
    .customSanitizer(value => xss(value)),
  body('forename')
    .isLength({ min: 1, max: 50 })
    .customSanitizer(value => xss(value)),
  body('surname')
    .isLength({ min: 1, max: 50 })
    .customSanitizer(value => xss(value)),
];

export { getValidator, putValidator, deleteValidator, postValidator };
