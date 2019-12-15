// create ajv error
class ValidationError extends Error {
  constructor (errors, status = 400, message = 'Invalid data') {
    super(message)
    this.status = status
    this.errors = errors
    this.name = 'ValidationError'
  }
}

const validate = (validator) => (req, res, next) => {
  if (!validator(req.body)) {
    return next(new ValidationError(validator.errors))
  }
  next()
}

module.exports.validate = validate
