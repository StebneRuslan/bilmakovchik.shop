const express = require('express')
const router = express.Router()
const { validate } = require('../../validators/validate-midleware')
const authentificate = require('../authentificate-midleware')
const { create } = require('./validator')
const createError = require('http-errors')

const {
  createUser,
  getUser
} = require('../../services/users')

router.get('/users/:userId', authentificate, (req, res, next) => {
  console.log(req.body.user)
})

router.post('/users', validate(create), (req, res, next) => {
  createUser(req.body.user)
    .then(data => res.status(200).send(data))
    .catch(err => next(createError(400, err.message)))
})

module.exports = router
