const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ api: { status: 'success', version: '1' } })
})

const user = require('./users/users')
const file = require('./file/file')

module.exports = [router, user, file]
