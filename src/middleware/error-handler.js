import debugFactory from 'debug';

const debug = debugFactory('errorLogger');

/* eslint no-unused-vars: ['error', { 'argsIgnorePattern': 'next' }] */
export default (err, req, res, next) => {
  debug(err);
  res.format({
    'application/json': () => {
      res.end();
    },
  });
};
