const express = require('express')
const path = require('path')
const router = express.Router()

// admin panel router
router.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'admin', 'dist', 'admin', 'index.html'))
})

module.exports = router
