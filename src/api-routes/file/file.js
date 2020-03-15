const express = require('express')
const router = express.Router()
const authentificate = require('../authentificate-midleware')
const createError = require('http-errors')

const { createFile, geUserFiles } = require('../../services/files')

router.get('/files', authentificate.apiKey, (req, res, next) => {
  geUserFiles()
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.put('/files', authentificate.apiKey, (req, res, next) => {
  const chunks = []
  req.on('data', (chunk) => chunks.push(chunk))
  req.on('end', () => {
    const fileBuffer = Buffer.concat(chunks)
    createFile(req.user._id, fileBuffer, req.headers['x-file-name'])
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => next(createError(400, err.message)))
  })
})

module.exports = router
