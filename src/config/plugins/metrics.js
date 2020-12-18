'use strict';

const fp = require('fastify-plugin');
const metricsPlugin = require('fastify-metrics');

module.exports = fp((fastify, opts, next) => {
  fastify.register(metricsPlugin, {endpoint: '/metrics'});
  next();
});
