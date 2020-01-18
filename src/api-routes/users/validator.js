module.exports.create = require('./validators/new-user-validator').validatePost
module.exports.createMulti = require('./validators/multiple-users-validator').validatePost
module.exports.update = require('./validators/update-user-validator').validatePut
