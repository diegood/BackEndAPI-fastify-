'use strict';

const fp = require('fastify-plugin');
const helmet = require('fastify-helmet');

module.exports = fp(helmet);
