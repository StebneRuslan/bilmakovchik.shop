const CustomStrategy = require('passport-custom')
const passport = require('passport')
const User = require('../models/users')

passport.use('api-key',
  new CustomStrategy((req, callback) => {
    User.findOne({ apiKey: req.headers['x-api-key'] })
      .then(user => callback(null, user))
      .catch(callback)
  })
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport.authenticate(['api-key'])
