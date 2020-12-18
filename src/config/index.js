'use strict';

const constants = require('./constants');
const fastifyEnv = require('fastify-env');
const envConfig = require(`./env/config-${process.env.NODE_ENV || 'localhost'}`);

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: 3000,
    },
  },
};

const options = {
  schema: schema,
  data: {
    ...process.env,
    ...envConfig,
    constants,
  },
};

module.exports = (fastify) => {
  fastify.register(fastifyEnv, options);
};
