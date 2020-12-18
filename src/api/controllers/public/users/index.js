'use strict';

module.exports = async(fastify, opts, next) => {
    fastify.decorateRequest('fastify', fastify);
    fastify.get('/history/request', require('./historyRequest'));
    fastify.put('/', require('./update'));
    fastify.put('/password', require('./changePassword'));
    fastify.post('/address', require('./addAddress'));
    fastify.put('/address/:userAddressId', require('./updateAddress'));
    fastify.delete('/address/:userAddressId', require('./removeAddress'));
    next();
};