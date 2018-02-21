import express from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import User from './../../models/user';
import { postValidator } from './validation';

const router = express.Router();

router.get(
  '/',
  postValidator,
  async (req, res, next) => {
    try {
      const user = new User();
      const users = await user.fetchAll();
      res.status(200).json({ data: users.toJSON() });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/',
  postValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
      return;
    }
    next();
  },
  async (req, res, next) => {
    try {
      const validatedInput = matchedData(req);
      const user = new User({ id: null, ...validatedInput });
      const bookshelf = req.app.get('bookshelf');
      bookshelf.transaction(async (transacting) => {
        await user.save(null, { require: true, method: 'insert', transacting });
      });
      res.status(200).end();
    } catch (e) {
      next(e);
    }
  },
);

export default router;
