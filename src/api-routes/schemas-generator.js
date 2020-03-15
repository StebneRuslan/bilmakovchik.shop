function createSchema (modelName, model, additionalProperties, requiredFields) {
  const properties = {}
  properties[modelName] = {
    type: 'object',
    properties: model,
    additionalProperties: additionalProperties,
    required: requiredFields
  }
  return {
    type: 'object',
    properties: properties,
    required: [modelName],
    additionalProperties: false
  }
}

module.exports.createSchema = createSchema
