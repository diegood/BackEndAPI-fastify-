'use strict';

module.exports = async(fastify, opts, next) => {
    fastify.register(require('fastify-formbody'));
    fastify.get('/sign/:requestid', require('./sign'));
    fastify.post('/request/:cartId', require('./createRequest'));
    fastify.post('/callback/:requestid', require('./callback'));
    next();
};