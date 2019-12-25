const express = require('express')
const path = require('path')
const { mongoDB } = require('./models/index')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const { validateError } = require('./validators/validate-error-handler')
const passport = require('passport')
const compression = require('compression')

const apiV1 = require('./api-routes/api-v1')
const adminRoutes = require('./routes/admin-routes')

mongoDB.connection.on('connected', () => {
  const app = express()

  app.use('/assets/', express.static(path.resolve(__dirname, '..', 'admin', 'dist', 'admin')))
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(passport.initialize())
  const config = require('./config/server')

  app.use('/', adminRoutes)
  app.use('/api/v1', apiV1)

  app.use((req, res, next) => next(createError(404)))
  app.use((err, req, res) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
  })

  app.use(validateError)
  app.listen(process.env.PORT || config.PORT, () => {
    console.log('***********************************************')
    console.log('***********************************************')
    console.log('*********  Server is ready for usage  *********')
    console.log('***********************************************')
    console.log('***********************************************')
  })
})
