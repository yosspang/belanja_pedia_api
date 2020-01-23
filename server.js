const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const mongo = require('./mongo/schema').server
const Path = require('path')

const start = async () => {
  const server = new Hapi.Server({ // server config
    port: process.env.PORT,
    host: '0.0.0.0',
    routes: {
      files: {
          relativeTo: Path.join(__dirname, 'catalogue')
      }
    },
  })

  await server.register(require('inert'))
  server.route(routes)
  await mongo()
  await server.start()

  process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
  })
  console.log(`Server running at: ${server.info.uri}`)
  return server
}

module.exports = { start }
