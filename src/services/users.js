const User = require('../models/users')
const pick = require('lodash/pick')
const adminFields = ['firstName', 'lastName', 'email', 'role', 'phone']

function getUser (id) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then(user => resolve(pick(user, adminFields)))
      .catch(err => reject(err))
  })
}

function getAllUsers () {
  return new Promise((resolve, reject) => {
    User.find({})
      .then(data => resolve(data.map(user => pick(user, adminFields))))
      .catch(err => reject(err))
  })
}

function createUser (userConfig) {
  return new Promise((resolve, reject) => {
    const user = new User(userConfig)
    user.save()
      .then(() => resolve(user))
      .catch(err => reject(err))
  })
}

function updateUser (userConfig, userId) {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(userId, userConfig)
      .then(() => {
        User.findById(userId)
          .then(user => resolve(user))
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}

function deleteUser (userId) {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(userId)
      .then(user => resolve(user))
      .catch(err => reject(err))
  })
}

module.exports.getUser = getUser
module.exports.getAllUsers = getAllUsers
module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
