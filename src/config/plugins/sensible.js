'use strict';

const fp = require('fastify-plugin');

module.exports = fp((fastify, opts, next) => {
  fastify.register(require('fastify-sensible'));
  next();
});
