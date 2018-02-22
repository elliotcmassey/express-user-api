import express from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { bookshelf } from '../../modules/bookshelf';
import User from './../../models/user';
import { getValidator, putValidator, deleteValidator, postValidator } from './validation';

const router = express.Router();

router.get(
  '/:id',
  getValidator,
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
      const user = new User({ id: validatedInput.id });
      await user.fetch({ require: true });
      res.status(200).json({ data: user.toJSON() });
    } catch (e) {
      const isNotFoundError = (e instanceof bookshelf.Model.NotFoundError);
      if (isNotFoundError) {
        res.status(404).end();
      } else {
        next(e);
      }
    }
  },
);

router.put(
  '/:id',
  putValidator,
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
      const user = new User(validatedInput);

      await bookshelf.transaction(async (transacting) => {
        await user.save(null, { require: true, transacting });
      });

      res.format({
        'application/json': () => {
          res.status(204).end();
        },
      });
    } catch (e) {
      const isNoRowsUpdatedError = (e instanceof bookshelf.Model.NoRowsUpdatedError);
      if (isNoRowsUpdatedError) {
        res.status(404).end();
      } else {
        next(e);
      }
    }
  },
);

router.delete(
  '/:id',
  deleteValidator,
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

      const user = new User({ id: validatedInput.id });
      await bookshelf.transaction(async (transacting) => {
        await user.destroy({ require: true, transacting });
      });
      res.status(204).end();
    } catch (e) {
      const isNoRowsDeletedError = (e instanceof bookshelf.Model.NoRowsDeletedError);
      if (isNoRowsDeletedError) {
        res.status(404).end();
      } else {
        next(e);
      }
    }
  },
);

router.get(
  '/',
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

      await bookshelf.transaction(async (transacting) => {
        await user.save(null, { require: true, method: 'insert', transacting });
      });

      res.format({
        'application/json': () => {
          res.status(200).end();
        },
      });
    } catch (e) {
      const constraintError = (e.code === 'SQLITE_CONSTRAINT');
      if (constraintError) {
        res.status(403).json({
          data: { message: 'That email address may already exist' },
        });
      } else {
        next(e);
      }
    }
  },
);

export default router;
