const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const convertRoutes = require('./processing-video/routes')

function createCluster () {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
      console.log('Starting a new worker')
      cluster.fork()
    })
  } else {
    app.use(bodyParser.json())
    app.use('/', convertRoutes)
    app.listen('8000', () => {
      console.log(`Worker ${process.pid} started`)
    })
  }
}

createCluster()

module.exports.createCluster = createCluster
