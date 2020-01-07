// mongoDB configuration
module.exports = {
  URI: process.env.MONGO_URL || 'mongodb://localhost/bilmakovchik-shop',
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}
