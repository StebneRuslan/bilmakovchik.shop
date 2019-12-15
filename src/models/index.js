// connecting to mongo

const mongoose = require('mongoose')
const dbConfig = require('../config/mongo')

mongoose.connect(`${dbConfig.URI}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

module.exports.mongoDB = mongoose
