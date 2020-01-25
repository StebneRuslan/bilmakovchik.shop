const ajv = require('ajv')()
const { createSchema } = require('../../schemas-generator')
const { userModel, newUserRequiredFields } = require('./user-model')

const userSchema = createSchema('user', userModel, false, newUserRequiredFields)

const usersSchema = {
  type: 'array',
  items: userSchema,
  required: ['user'],
  additionalProperties: false
}

module.exports.validatePost = ajv.compile(usersSchema)
