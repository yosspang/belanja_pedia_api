const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script()
const { start } = require('../server')

describe('GET', () => {
  let server

  beforeEach(async () => {
    server = await start()
    // start transaction
  })

  afterEach(async () => {
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
})
