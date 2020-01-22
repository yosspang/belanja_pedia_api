const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const start = async () => {
  const server = new Hapi.Server({ // server config
    port: process.env.PORT,
    host: '0.0.0.0'
  })

  server.route(routes)

  await server.start()

  process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
  })
  console.log(`Server running at: ${server.info.uri}`)
  return server
}

module.exports = { start }
