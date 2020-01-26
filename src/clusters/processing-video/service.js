const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const Ffmpeg = require('fluent-ffmpeg')
const path = require('path')
Ffmpeg.setFfmpegPath(ffmpegPath)

function convertVideo (source) {
  return new Promise((resolve, reject) => {
    const newPath = source.replace(path.parse(source).ext, '.avi')
    new Ffmpeg({ source: source })
      .toFormat('avi')
      .saveToFile(newPath, (retcode, err) => {
        if (err) {
          console.error(err.message)
          return reject(err)
        }
      })
      .on('error', (err) => reject(err))
      .on('end', () => {
        console.log('file has been converted succesfully')
        return resolve(newPath)
      })
  })
}

module.exports.convertVideo = convertVideo
