const express = require('express')
const router = express.Router()
const { validate } = require('../../validators/validate-midleware')
const authentificate = require('../authentificate-midleware')
const { validateCsvHeader } = require('../csv-midleware')
const { create, update } = require('./validator')
const createError = require('http-errors')
const FileType = require('file-type')
const csv = require('csv-parser')

const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  saveAvatar,
  createUsers
} = require('../../services/users')

router.post('/users/login', authentificate.local, (req, res, next) => {
  getUser(req.user, true)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.get('/users/:userId', authentificate.apiKey, (req, res, next) => {
  getUser(req.params.userId)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.get('/users', authentificate.apiKey, (req, res, next) => {
  getAllUsers()
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.post('/users', authentificate.apiKey, validate(create), (req, res, next) => {
  createUser(req.body.user)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.put('/users/:userId', authentificate.apiKey, validate(update), (req, res, next) => {
  updateUser(req.body.user, req.params.userId)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.post('/users/:userId/avatar', authentificate.apiKey, (req, res, next) => {
  const chunks = []
  req.on('data', (chunk) => chunks.push(chunk))
  req.on('end', () => {
    const fileBuffer = Buffer.concat(chunks)
    FileType.fromBuffer(fileBuffer).then(file => {
      saveAvatar(req.params.userId, fileBuffer, req.headers['x-file-name'], file.ext)
        .then(data => res.status(200).send(data))
        .catch(err => next(createError(400, err.message)))
    })
  })
})

router.delete('/users/:userId', authentificate.apiKey, (req, res, next) => {
  deleteUser(req.params.userId)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.post('/users/csv', authentificate.apiKey, validateCsvHeader, (req, res, next) => {
  const users = []
  // Parsing buffer to valid csv object
  req.pipe(csv())
    .on('data', (data) => users.push(data))
    .on('end', () => {
      createUsers(users)
        .then(data => res.status(200).send(data))
        .catch(err => next(createError(400, err.message)))
    })
    .on('error', (err) => next(createError(400, err.message)))
})

module.exports = router
