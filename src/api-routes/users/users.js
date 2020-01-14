const express = require('express')
const router = express.Router()
const { validate } = require('../../validators/validate-midleware')
const authentificate = require('../authentificate-midleware')
const { create, update } = require('./validator')
const createError = require('http-errors')

const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  saveAvatar
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
    saveAvatar(req.params.userId, Buffer.concat(chunks))
      .then(data => res.status(200).send(data))
      .catch(err => next(createError(400, err.message)))
  })
})

router.delete('/users/:userId', authentificate.apiKey, (req, res, next) => {
  deleteUser(req.params.userId)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

module.exports = router
