const CustomStrategy = require('passport-custom')
const passport = require('passport')
const User = require('../models/users')

// authenticate middleware for each request
passport.use('api-key',
  new CustomStrategy((req, callback) => {
    console.log(req.headers['x-api-key'])
    User.findOne({ apiKey: req.headers['x-api-key'] })
      .then(user => callback(null, user))
      .catch(callback)
  })
)

// pass user to next middleware
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport.authenticate(['api-key'])
