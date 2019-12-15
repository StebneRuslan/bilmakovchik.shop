const express = require('express')
const router = express.Router()
const { validate } = require('../../validators/validate-midleware')
// const authentificate = require('../authentificate-midleware')
const { create, update } = require('./validator')
const createError = require('http-errors')

const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../../services/users')

router.get('/users/:userId', (req, res, next) => {
  getUser(req.user)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.get('/users', (req, res, next) => {
  getAllUsers()
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.post('/users', validate(create), (req, res, next) => {
  createUser(req.body.user)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.put('/users/:userId', validate(update), (req, res, next) => {
  updateUser(req.body.user, req.params.userId)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

router.delete('/users/:userId', (req, res, next) => {
  deleteUser(req.params.userId)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

module.exports = router
