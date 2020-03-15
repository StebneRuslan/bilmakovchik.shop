const fileModel = {
  name: {
    type: 'string'
  },
  type: {
    type: 'string'
  }
}

const newFileRequiredFields = ['name', 'type']

module.exports.newFileRequiredFields = newFileRequiredFields
module.exports.fileModel = fileModel
