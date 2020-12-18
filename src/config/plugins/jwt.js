'use strict';

const fp = require('fastify-plugin');
const jwtPlugin = require('fastify-jwt');

module.exports = fp((fastify, opts, next) => {
    fastify.register(jwtPlugin, {secret: process.env.JWT_SECRET});
    next();
});
