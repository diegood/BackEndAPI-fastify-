'use strict';

module.exports = async(fastify, opts, next) => {
    fastify.get('/:cartId', require('./find'));
    fastify.get('/user/:userId', require('./find/byUser'));
    fastify.get('/:cartId/shipping/calculate', require('./shippingCosts'));
    fastify.post('/', require('./create'));
    fastify.put('/', require('./update'));
    next();
};