const User = require('../models/users')

function getUser () {
  console.log('getUser')
}

function getAllUsers () {
  console.log('getAllUsers')
}

function createUser (userConfig) {
  return new Promise((resolve, reject) => {
    const user = new User(userConfig)
    user.save()
      .then(() => resolve(user))
      .catch(err => reject(err))
  })
}

function updateUser () {
  console.log('updateUser')
}

function deleteUser () {
  console.log('deleteUser')
}

module.exports.getUser = getUser
module.exports.getAllUsers = getAllUsers
module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
