const File = require('../models/file')
const User = require('../models/users')
const pick = require('lodash/pick')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const FileType = require('file-type')
const { COMPRESS_VIDEO_URL } = require('../config/server')

const publicFileFields = ['path', 'name', 'type']

function geUserFiles (userId) {
  return new Promise((resolve, reject) => {
    File.find({ author: userId })
      .then(users => resolve(users.map(user => pick(user, publicFileFields))))
      .catch(err => reject(err))
  })
}

function createFile (userId, buffer, fileName) {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, `../public/media/${fileName}`)
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        return reject(err)
      }
      axios.put(`${COMPRESS_VIDEO_URL}/convert`, { path: path.resolve(__dirname, `../public/media/${fileName}`) })
        .then((res) => {
          const newFileName = fileName.replace(path.parse(fileName).ext, '.avi')
          console.log('444444', newFileName)
          fs.readFile(res.data.path, (err, data) => {
            if (err) {
              return reject(err)
            }
            FileType.fromBuffer(data).then(fileData => {
              const newFile = new File({ name: newFileName, path: `/public/media/${newFileName}`, type: fileData.ext, user: userId })
              newFile.save()
                .then((file) => {
                  fs.unlink(filePath, async (err) => {
                    if (err) {
                      return reject(err)
                    }
                    await updateUserFiles(userId, file._id)
                    return resolve(pick(file, publicFileFields))
                  })
                })
                .catch(err => reject(err))
            })
          })
        })
        .catch(err => reject(err))
    })
  })
}

function updateUserFiles (userId, fileId) {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then(user => {
        user.files.push(fileId)
        user.save()
          .then((user) => {
            return resolve(user)
          })
      })
      .catch(err => reject(err))
  })
}

module.exports.createFile = createFile
module.exports.geUserFiles = geUserFiles
module.exports.publicFileFields = publicFileFields
