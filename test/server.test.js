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

  it('responds "/belanjapedia" call with correct email with HTTP 200 and correct data', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/belanjapedia/test@mail.com'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result.first_name).to.equal('First')
  })

  it('responds "/belanjapedia" call with correct email with HTTP 200 and correct data', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/belanjapedia/haha@haha.com'
    })
    expect(res.statusCode).to.equal(404)
    expect(res.result.first_name).to.not.equal('First')
  })
})
