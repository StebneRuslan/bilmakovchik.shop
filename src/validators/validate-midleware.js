const createError = require('http-errors')

class InvalidRequestError extends Error {
  constructor (errors, status = 400, msg = 'Invalid data') {
    super(msg)
    this.status = status
    this.errors = errors
    this.name = 'ValidationError'
  }
}

const validate = (validator) => (req, res, next) => {
  if (!validator(req.body)) {
    return next(new InvalidRequestError(validator.errors))
  }
  next()
}

module.exports.validate = validate
