import debugFactory from 'debug';

const debug = debugFactory('app:errorHandler');

/* eslint no-unused-vars: ['error', { 'argsIgnorePattern': 'next' }] */
export default (err, req, res, next) => {
  debug(err);

  res.format({
    'application/json': () => {
      res.status(500).end();
    },
  });
};
