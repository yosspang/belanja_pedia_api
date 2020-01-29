const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { after, before, describe, it } = exports.lab = Lab.script()
const { start } = require('../server')
const mongo = require('../mongo/schema').server

describe('Product handler routes:', () => {
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

  it('responds "/api/products" with 200', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/products'
    })
    expect(res.statusCode).to.equal(200)
  })

  it('responds "/api/products/image/{url}" using correct image url with 200 and correct file', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/products/image/indomie-goreng.jpg'
    })
    expect(res.statusCode).to.equal(200)
    expect(res.statusMessage).to.equal('OK')
    expect(res.headers['content-type']).to.equal('image/jpeg')
  })

  it('responds "/api/products/image/{url}" using incorrect image url with 404 and correct error message', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/products/image/indomie.jpg'
    })
    expect(res.statusCode).to.equal(404)
    expect(res.statusMessage).to.equal('Not Found')
  })
})
