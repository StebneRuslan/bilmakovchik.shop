const userModel = {
  firstName: {
    type: 'string',
    minLength: 3
  },
  lastName: {
    type: 'string',
    minLength: 3
  },
  email: {
    type: 'string',
    maxLength: 64,
    minLength: 8
  },
  role: {
    type: 'string',
    minLength: 2,
    maxLength: 20
  },
  password: {
    type: 'string',
    minLength: 8,
    maxLength: 30
  }
}

const newUserRequiredFields = ['firstName', 'lastName', 'password', 'email']

module.exports.newUserRequiredFields = newUserRequiredFields
module.exports.userModel = userModel
