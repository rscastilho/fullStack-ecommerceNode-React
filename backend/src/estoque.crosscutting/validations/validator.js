const { validationResult } = require('express-validator');

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extraiErrors = [];
  errors.array().map(err => extraiErrors.push(err.msg));
  return res.status(422).json({
    message: extraiErrors,
  });
};
module.exports = validator;
