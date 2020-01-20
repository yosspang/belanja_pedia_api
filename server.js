const Hapi = require('@hapi/hapi')

const start = async () => {
  const server = new Hapi.Server({ // server config
    port: 3000,
    host: '0.0.0.0'
  })

  server.route([ // routes goes here
    {
      method: 'GET',
      path: '/',
      handler: function (request, h) {
        return h.response('Hello World!').code(200)
      }
    }
  ])

  await server.start()

  process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
  })
  console.log(`Server running at: ${server.info.uri}`)
  return server
}

module.exports = { start }
