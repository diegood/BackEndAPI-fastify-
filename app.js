
const path = require('path')
const AutoLoad = require('fastify-autoload')
const oas = require('fastify-oas')
const config = require('./src/config/')

module.exports = function (fastify, opts, next) {
  // config
  config(fastify);

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, './src/config/plugins'),
    options: Object.assign({}, opts),
  })

  //swagger
  fastify.register(oas, {
    routePrefix: '/admin/docs',
    swagger: {
      info: {
        title: 'El Mercado del pescado',
        description: 'fastify api for EMDP',
        version: '0.1.0',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
      servers: [{
        url: 'http://localhost:3000',
        description: 'Localhost',
      },{
        url: 'https://api.elmercadodelpescado.com',
        description: 'Production',
      }],
      components: {
        securitySchemes: {
          appToken: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      }
    },
    exposeRoute: true
  })

  // Middlewares
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'src/api/middlewares'),
    options: Object.assign({}, opts)
  },
  );
    // Controllers
  fastify.register(
    require('./src/api/router'),
    {
      ...opts,
    },
  );

  next()
}
