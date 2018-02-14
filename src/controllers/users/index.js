import express from 'express';

const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    try {
      res.status(200).json({ data: 'hi' });
    } catch (e) {
      next(e);
    }
  },
);

export default router;
