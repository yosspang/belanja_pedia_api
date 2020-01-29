const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { after, before, describe, it } = exports.lab = Lab.script()
const { start } = require('../server')
const mongo = require('../mongo/schema').server

describe('User handler routes:', () => {
  let server

  before(async () => {
    await mongo()
    server = await start()
    // start transaction
  })

  after(async () => {
    await server.stop()
    // rollback
  })

  it('responds "/api/user/{email}" call using correct email with HTTP 200 and correct data', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/user/test@mail.com'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result.first_name).to.equal('First')
  })

  it('responds "/api/user/{email}" call using incorrect email with HTTP 404 and correct response', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/user/haha@haha.com'
    })
    expect(res.statusCode).to.equal(404)
    expect(res.result.message).to.equal('not found')
  })

  it('responds "/api/register" call with existing email with HTTP 400 and error message', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/api/register',
      payload: {
        email: 'test@mail.com',
        password: 'string',
        first_name: 'string',
        last_name: 'string',
        address: 'string'
      }
    })
    expect(res.statusCode).to.equal(400)
    expect(res.result.message).to.equal('username already taken')
  })
})
