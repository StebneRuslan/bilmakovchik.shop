// ajv schema error handler
const validateError = (error, req, res, next) => {
  if (error.errors) {
    if (/^\/api/.test(req.originalUrl)) {
      return res.status(400).json({
        error: { name: error.name, errors: error.errors },
        message: error.message
      })
    } else {
      return res.status(400).send(error.message)
    }
  }
  return res.status(error.status).send(error)
}

module.exports.validateError = validateError
