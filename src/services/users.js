const fs = require('fs')
const path = require('path')
const User = require('../models/users')
const File = require('../models/file')
const pick = require('lodash/pick')
const partial = require('lodash/partial')
const has = require('lodash/has')
const omit = require('lodash/omit')
const groupBy = require('lodash/groupBy')
const mapValues = require('lodash/mapValues')
const every = require('lodash/every')
const adminFields = ['_id', 'firstName', 'avatar', 'lastName', 'email', 'role']
const privateFields = ['_id', 'apiKey', 'avatar', 'firstName', 'lastName', 'email', 'role']
const createUserFields = ['firstName', 'lastName', 'email', 'role', 'password', 'error']
const { createMulti } = require('../api-routes/users/validator')
const { validateData } = require('../validators/validate-midleware')

// get user by id
function getUser (id, login = false) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .populate('avatar')
      .then(user => {
        resolve(pick(user, login ? privateFields : adminFields))
      })
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
          .then(user => resolve(pick(user, privateFields)))
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

function saveAvatar (userId, buffer, fileName, ext) {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, `../public/avatars/${fileName}`)
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        return reject(err)
      }
      // new File({ name: fileName, path: `/public/avatars/${fileName}`, type: ext, user: userId })
      //   .save()
      //   .then(file => {
      //     User.findOneAndUpdate({ _id: userId }, { avatar: file._id })
      //       .then(() => {
      //         return resolve(pick(file, ['name', 'path', 'type']))
      //       })
      //       .catch(err => reject(err))
      //   })
      //   .catch(err => reject(err))
    })
  })
}

// Create users by csv file
function createUsers (users) {
  return new Promise((resolve, reject) => {
    const processedUsers = groupUsers(createValidUser(users))
    if (!processedUsers.valid.length) {
      resolve(createResolveObject(processedUsers.valid, processedUsers.invalid))
    }
    // TODO: research insertMany with timestamps and password bcrypt
    Promise.all(processedUsers.valid.map((user, index) => {
      return new User(user).save()
        .then(data => data)
        .catch(err => {
          user.error = err
          processedUsers.invalid.push(user)
          processedUsers.valid.splice(index, 1)
          console.error(err.message)
        })
    }))
      .then((result) => resolve(createResolveObject(result.filter(user => !!user).map(user => pick(user, adminFields)),
        processedUsers.invalid)))
      .catch(err => reject(err))
  })
}

// create valid objects for saving to db
function createValidUser (users) {
  return users.map(user => {
    const validationError = validateData(createMulti, users.map(user => {
      return { user }
    }))
    if (validationError) {
      user.error = validationError
    }
    return validationError
      ? { ...pick(user, createUserFields), type: every(createUserFields, partial(has, user)) ? 'valid' : 'invalid' }
      : { ...pick(user, createUserFields), type: 'invalid' }
  })
}

// group by "valid" field to separate users
function groupUsers (users) {
  const result = mapValues(groupBy(users, 'type'), usersList => usersList.map(user => omit(user, 'type')))
  if (!result.valid) {
    result.valid = []
  }
  if (!result.invalid) {
    result.invalid = []
  }
  return result
}

// create result data
function createResolveObject (validUsers, invalidUsers) {
  return {
    savedUsers: validUsers || [],
    dontSavedUsers: invalidUsers || []
  }
}

module.exports.getUser = getUser
module.exports.getAllUsers = getAllUsers
module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
module.exports.saveAvatar = saveAvatar
module.exports.createUsers = createUsers
