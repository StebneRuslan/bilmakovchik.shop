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
    console.log('dddddd', db)
    new User().save()
    // User.findOneAndUpdate({ _id: '5e03a5cc8c3b8034cb244943' }, { avatar: '' })
    // User.findById('5e03a5cc8c3b8034cb244943')
      .then((story) => {
        story.avatar = ''
        story.save().then(() => {
          db.disconnect()
          // return next()
        }).catch(err => {
          console.log(err)
          // db.disconnect()
          next(err)
        })
      })
  })
}

module.exports.down = function (next) {
  next()
}
