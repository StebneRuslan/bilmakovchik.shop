const express = require('express')
const router = express.Router()
const { getAllUsers } = require('../../services/users')

router.post('/users', (req, res) => {
  res.status(200).send({ message: 'ok' })
})

module.exports = router
