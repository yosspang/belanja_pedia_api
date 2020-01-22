const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { after, before, describe, it } = exports.lab = Lab.script()
const { start } = require('../server')
const mongo = require('../mongo/schema').server

mongo()
describe('GET', () => {
  let server

  before(async () => {
    server = await start()
    mongo()
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

  it('responds "/belanjapedia" call with correct email with HTTP 200 and correct data', { timeout: 10000 }, async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/belanjapedia/test@mail.com'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result.first_name).to.equal('First')
  })

  it('responds "/belanjapedia" call with correct email with HTTP 200 and correct data', { timeout: 10000 }, async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/belanjapedia/haha@haha.com'
    })
    expect(res.statusCode).to.equal(404)
    expect(res.result.first_name).to.not.equal('First')
  })
})
