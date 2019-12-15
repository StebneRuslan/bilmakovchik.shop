const mongoose = require('mongoose')
const inquirer = require('inquirer')
const dbConfig = require('../config/mongo')
const User = require('../models/users')

const userInquirerConstructor = [
  {
    type: 'input',
    name: 'firstName',
    message: 'Input firstName please'
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'Input lastName please'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Input email please'
  },
  {
    type: 'input',
    name: 'password',
    message: 'Input password please'
  },
  {
    type: 'input',
    name: 'role',
    message: 'Input role please one of this: SUPPER_ADMIN or APP_USER'
  }
]

mongoose.connect(`${dbConfig.URI}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then((db) => {
  console.log('Connected to mongo')
  inquirer
    .prompt(userInquirerConstructor)
    .then(answers => {
      const user = new User(answers)
      user.save()
        .then(() => console.log(`User ${user.email} was created`))
        .catch(err => console.log(`Create user error ${err.message}`))
        .then(() => {
          db.disconnect()
            .then(() => console.log('Disconnected'))
            .catch((err) => console.log(`Disconnect error ${err.message}`))
        })
    })
})
