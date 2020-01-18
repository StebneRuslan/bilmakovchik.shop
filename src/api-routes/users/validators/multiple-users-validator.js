const ajv = require('ajv')()
const { newUserSchema } = require('./new-user-validator')

const usersSchema = {
  type: 'array',
  items: newUserSchema,
  required: ['user'],
  additionalProperties: false
}

module.exports.validatePost = ajv.compile(usersSchema)
