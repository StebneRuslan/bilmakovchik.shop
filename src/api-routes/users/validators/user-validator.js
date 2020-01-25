function createUserSchema (model, additionalProperties, requiredFields) {
  return {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: model,
        additionalProperties: additionalProperties,
        required: requiredFields
      }
    },
    required: ['user'],
    additionalProperties: false
  }
}

module.exports.createUserSchema = createUserSchema
