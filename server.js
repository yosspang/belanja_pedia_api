const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const mongo = require('./mongo/schema').server
const Path = require('path')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const Pack = require('./package')

const start = async () => {
  const server = new Hapi.Server({ // server config
    port: process.env.PORT,
    host: '0.0.0.0',
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'catalogue')
      }
    }
  })

  const swaggerOptions = {
    info: {
      title: 'Belanja Pedia API Documentation',
      version: Pack.version
    },
    grouping: 'tags'
  }
  await server.register([Inert, Vision, { plugin: HapiSwagger, options: swaggerOptions }])
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
