const File = require('../models/file')
const pick = require('lodash/pick')
const fs = require('fs')
const path = require('path')

const publicFileFields = ['path', 'name', 'type']

function createFile (userId, buffer, fileName, ext) {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, `../public/avatars/${fileName}`)
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        return reject(err)
      }
      const file = new File({ name: fileName, path: `/public/files/${fileName}`, type: ext, user: userId })
      file.save()
        .then(() => resolve(pick(file, publicFileFields)))
        .catch(err => reject(err))
    })
  })
}

module.exports.createFile = createFile()
