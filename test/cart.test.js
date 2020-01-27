const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { after, before, describe, it } = exports.lab = Lab.script()
const { start } = require('../server')
const mongo = require('../mongo/schema').server

describe('Cart handler routes test scenarios', () => {
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

  it('responds "/api/cart/{email}" call using correct email (have product(s) in cart) with HTTP 200 and correct data', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/cart/test@mail.com'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result[0].email).to.equal('test@mail.com')
  })

  it('responds "/api/cart/{email}" call using correct email (empty cart) with HTTP 200 and correct data', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/cart/testing@mail.com'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result).to.equal([])
  })
})
