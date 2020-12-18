'use strict';

const fp = require('fastify-plugin');
const healthCheck = require('fastify-healthcheck');

module.exports = fp(healthCheck);
