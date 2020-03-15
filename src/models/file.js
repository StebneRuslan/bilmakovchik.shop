const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const File = mongoose.model('File', fileSchema)
module.exports = File
