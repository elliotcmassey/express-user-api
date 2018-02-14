/* eslint no-unused-vars: ['error', { 'argsIgnorePattern': 'next' }] */
export default (err, req, res, next) => {
  res.format({
    'application/json': () => {
      res.end();
    },
  });
};
