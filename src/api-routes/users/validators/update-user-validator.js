const ajv = require('ajv')()

const userSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          minLength: 3
        },
        lastName: {
          type: 'string',
          minLength: 3
        },
        email: {
          type: 'string',
          maxLength: 64,
          minLength: 8
        },
        role: {
          type: 'string',
          minLength: 2,
          maxLength: 20
        }
      },
      additionalProperties: false
    }
  },
  required: ['user'],
  additionalProperties: false
}

module.exports.validatePut = ajv.compile(userSchema)
