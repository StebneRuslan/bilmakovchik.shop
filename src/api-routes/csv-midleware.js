const createError = require('http-errors')

// checkCsvHeader middleware
const validateCsvHeader = (req, res, next) => {
  req.headers['content-type'] === 'text/csv' ? next() : next(createError(400, 'Invalid file type!'))
}

module.exports.validateCsvHeader = validateCsvHeader
