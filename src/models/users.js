const mongoose = require('mongoose')
const uuid = require('uuid')
const mongooseBcrypt = require('mongoose-bcrypt')

const { ROLE_APP_USER, ROLE_SUPER_ADMIN } = require('../config/user-roles')

mongoose.Promise = global.Promise
// separate users by role
const roles = [ROLE_SUPER_ADMIN, ROLE_APP_USER]

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 3,
    required: true
  },
  lastName: {
    type: String,
    minLength: 3,
    required: true
  },
  email: {
    type: String,
    minLength: 8,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
    bcrypt: true
  },
  apiKey: {
    type: String,
    required: true,
    default: uuid.v4,
    unique: true
  },
  role: {
    type: String,
    enum: { values: roles },
    required: true,
    default: ROLE_APP_USER
  },
  avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

// crypt user password
userSchema.plugin(mongooseBcrypt)

const User = mongoose.model('User', userSchema)
module.exports = User
