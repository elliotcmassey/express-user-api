export default (req, res, next) => {
  res.status(404);
  next(new Error('Not Found'));
};
