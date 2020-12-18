'use strict';

module.exports = async(fastify, opts, next) => {
    fastify.post('/', require('./mrw'));
    fastify.post('/test/:requestId', require('./test'));
    next();
};