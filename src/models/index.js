const mongoose = require('mongoose')
const dbConfig = require('../config/mongo')
mongoose.connect(`${dbConfig.URI}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

module.exports.mongoDB = mongoose
