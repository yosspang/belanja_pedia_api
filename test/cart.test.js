const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { after, before, describe, it } = exports.lab = Lab.script()
const { start } = require('../server')
const mongo = require('../mongo/schema').server

describe('Cart handler routes:', () => {
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
      url: '/api/cart/test2@mail.com'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result[0].email).to.equal('test2@mail.com')
  })

  it('responds "/api/cart/{email}" call using correct email (empty cart) with HTTP 200 and correct data', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/cart/testing@mail.com'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result).to.equal([])
  })

  it('responds "/api/cart" POST call using correct data with HTTP 200 and correct data', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/api/cart',
      payload: { email: 'test0@mail.com', product_id: 1 }
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result.message).to.equal('Success add to cart')
  })

  it('responds "/api/cart" DELETE call using correct data with HTTP 200 and correct data', async () => {
    const res = await server.inject({
      method: 'DELETE',
      url: '/api/cart',
      payload: { email: 'test0@mail.com', product_id: 1 }
    })
    expect(res.statusCode).to.equal(200)
    expect(res.result.message).to.equal('Delete cart item success')
  })
  it('responds "/api/cart" DELETE call using incorrect data with HTTP 404 and correct error message', async () => {
    const res = await server.inject({
      method: 'DELETE',
      url: '/api/cart',
      payload: { email: 'test0@mail.com', product_id: 1 }
    })
    expect(res.statusCode).to.equal(404)
    expect(res.result.message).to.equal('Not Found')
  })
})
