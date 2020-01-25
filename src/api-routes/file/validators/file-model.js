const fileModel = {
  name: {
    type: 'string',
    required: true
  },
  type: {
    type: 'string',
    required: true
  }
}

const newFileRequiredFields = ['name', 'type']

module.exports.newFileRequiredFields = newFileRequiredFields
module.exports.fileModel = fileModel
