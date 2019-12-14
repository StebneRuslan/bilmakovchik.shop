const CustomStrategy = require('passport-custom')
const passport = require('passport')
const User = require('../models/users')

passport.use('api-key',
  new CustomStrategy((req, callback) => {
    User.find({ apiKey: req.headers['x-api-key'] })
      .then(user => callback(null, user))
      .catch(callback)
  })
)

module.exports = passport.authenticate(['api-key'])
