const CustomStrategy = require('passport-custom')
const LocalStrategy = require('passport-local')
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

passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err)
      }
      user.verifyPassword(password, async (err, valid) => {
        if (err) {
          done(err)
          return
        }
        if (!valid) {
          done(null, false)
          return
        }
        done(null, user)
      })
    })
  }
))

// pass user to next middleware
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports.apiKey = passport.authenticate(['api-key'])
module.exports.local = passport.authenticate(['local'])
