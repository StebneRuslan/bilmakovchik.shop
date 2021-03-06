// connecting to mongo

const mongoose = require('mongoose')
const dbConfig = require('../config/mongo')

mongoose.connect(`${dbConfig.URI}`, {
  useNewUrlParser: dbConfig.useNewUrlParser,
  useCreateIndex: dbConfig.useCreateIndex,
  useFindAndModify: dbConfig.useFindAndModify,
  useUnifiedTopology: dbConfig.useUnifiedTopology
})

module.exports.mongoDB = mongoose
