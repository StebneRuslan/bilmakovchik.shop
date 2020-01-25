const express = require('express')
const router = express.Router()
const { validate } = require('../../validators/validate-midleware')
const authentificate = require('../authentificate-midleware')
const { createSchema } = require('../schemas-generator')
const createError = require('http-errors')
const FileType = require('file-type')
const { fileModel, newFileRequiredFields } = require('./validators/file-model')
const ajv = require('ajv')()

// const create = ajv.compile(createSchema('file', fileModel, false, newFileRequiredFields))

const { createFile } = require('../../services/files')

// router.get('/users', (req, res, next) => {
//   getAllUsers()
//     .then(data => res.status(200).send(data))
//     .catch(err => next(createError(400, err.message)))
// })

router.post('/files', authentificate.apiKey, (req, res, next) => {
  const chunks = []
  req.on('data', (chunk) => chunks.push(chunk))
  req.on('end', () => {
    const fileBuffer = Buffer.concat(chunks)
    FileType.fromBuffer(fileBuffer).then(file => {
      createFile(req.params.userId, fileBuffer, req.headers['x-file-name'], file.ext)
        .then(data => res.status(200).send(data))
        .catch(err => next(createError(400, err.message)))
    })
  })
})

module.exports = router
