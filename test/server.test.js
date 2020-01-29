const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { after, before, describe, it } = exports.lab = Lab.script()
const { start } = require('../server')
const mongo = require('../mongo/schema').server

describe('Server root routes:', () => {
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

  it('responds "/api" call (no payload) with HTTP 200 ', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api'
    })
    expect(res.statusCode).to.equal(200)
  })
  it('responds "/documentation" call (no payload) with HTTP 200 ', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/documentation'
    })
    expect(res.statusCode).to.equal(200)
  })
})
