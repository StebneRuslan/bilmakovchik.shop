const server = require('../../app')

const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')

const authentificate = require('../../api-routes/authentificate-midleware')
const { users } = require('./user-model')
const userService = require('../../services/users')

chai.should()
chai.use(chaiHttp)
const expect = chai.expect

describe('User service', () => {
  // let getAllUsersSpy = null
  // let localAuthentificateSpy = null
  // beforeEach(done => {
  //   localAuthentificateSpy = sinon.stub(authentificate, 'local').returns(mockedUsers[0])
  //   done()
  // })
  it('it should return array of users', done => {
    const getAllUsersSpy = sinon.stub(userService, 'getAllUsers').return(users)
      chai.request(server)
      .get('/api/v1/users')
      .send(users)
      .end((err, res) => {
        if (err) {
          throw err
        }
        console.log(res.body)
        res.should.have.status(200)
        // expect(localAuthentificateSpy.calledOnce).equal(true)
        // expect(getAllUsersSpy.calledOnce).equal(true)
        // res.body.should.be.a('array')
        // res.body.role.should.be.eq('USER')
        // res.body._id.should.be.a('string')
        done()
      })
  })
})
