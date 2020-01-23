const ajv = require('ajv')()
const { createUserSchema } = require('./user-validator')
const { userModel, newUserRequiredFields } = require('./user-model')

const userSchema = createUserSchema(userModel, false, newUserRequiredFields)

const usersSchema = {
  type: 'array',
  items: userSchema,
  required: ['user'],
  additionalProperties: false
}

module.exports.validatePost = ajv.compile(usersSchema)
