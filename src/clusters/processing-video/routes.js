const express = require('express')
const { convertVideo } = require('./service')
const router = express.Router()

router.put('/convert', (req, res) => {
  convertVideo(req.body.path)
    .then((path) => res.json({ done: true, path: path }))
    .catch(err => console.log(err.message))
})

module.exports = router
