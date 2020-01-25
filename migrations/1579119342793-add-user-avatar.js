'use strict'

const mongoose = require('mongoose')
const dbConfig = require('../src/config/mongo')
const User = require('../src/models/users')

module.exports.up = function (next) {
  mongoose.connect(`${dbConfig.URI}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(db => {
    User.update({}, { avatar: null }, { multi: true })
      .then(() => {
        db.disconnect()
        return next()
      })
      .catch(err => next(err))
  })
}

module.exports.down = function (next) {
  mongoose.connect(`${dbConfig.URI}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(db => {
    User.update({}, { avatar: null }, { multi: true })
      .then(() => {
        db.disconnect()
        return next()
      })
      .catch(err => next(err))
  })
}
