const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { after, before, describe, it } = exports.lab = Lab.script()
const { start } = require('../server')
const mongo = require('../mongo/schema').server

describe('GET', () => {
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

  it('responds "/" call (no payload) with HTTP 200 ', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/'
    })
    expect(res.statusCode).to.equal(200)
  })

  it('responds "/api" call with correct email with HTTP 200 and correct data', { timeout: 10000 }, async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/test@mail.com'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result.first_name).to.equal('First')
  })

  it('responds "/api" call with correct email with HTTP 200 and correct data', { timeout: 10000 }, async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/haha@haha.com'
    })
    expect(res.statusCode).to.equal(404)
    expect(res.result.first_name).to.not.equal('First')
  })
})
