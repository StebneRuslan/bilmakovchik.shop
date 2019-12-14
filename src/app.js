const express = require('express')
const { mongoDB } = require('./models/index')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')

const apiV1 = require('./api-routes/api.v1')

mongoDB.connection.on('connected', () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  const config = require('./config/server')

  app.use('/api/v1', apiV1)

  app.use((req, res, next) => {
    next(createError(404))
  })
  app.use((err, req, res) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
  })

  app.listen(process.env.PORT || config.PORT, () => {
    console.log('***********************************************')
    console.log('***********************************************')
    console.log('*********  Server is ready for usage  *********')
    console.log('***********************************************')
    console.log('***********************************************')
  })
})
