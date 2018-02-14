export default (req, res, next) => {
  res.status(400);
  next(new Error('Not Found'));
};
