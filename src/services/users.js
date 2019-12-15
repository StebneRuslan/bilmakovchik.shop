const User = require('../models/users')
const pick = require('lodash/pick')
const adminFields = ['_id', 'firstName', 'lastName', 'email', 'role']

// get user by id
function getUser (id) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then(user => resolve(pick(user, adminFields)))
      .catch(err => reject(err))
  })
}

// get array of all users
function getAllUsers () {
  return new Promise((resolve, reject) => {
    User.find({})
      .then(data => resolve(data.map(user => pick(user, adminFields))))
      .catch(err => reject(err))
  })
}

// create user by body config
function createUser (userConfig) {
  return new Promise((resolve, reject) => {
    const user = new User(userConfig)
    user.save()
      .then(() => resolve(pick(user, adminFields)))
      .catch(err => reject(err))
  })
}

// update user by body config
function updateUser (userConfig, userId) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: userId }, userConfig)
      .then(() => {
        User.findById(userId)
          .then(user => resolve(user))
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}

// delete user by ID
function deleteUser (userId) {
  return new Promise((resolve, reject) => {
    User.findOneAndRemove({ _id: userId })
      .then(user => resolve({ message: `User ${user._id} was successfully deleted` }))
      .catch(err => reject(err))
  })
}

module.exports.getUser = getUser
module.exports.getAllUsers = getAllUsers
module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
