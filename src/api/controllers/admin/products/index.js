'use strict';

module.exports = async(fastify, opts, next) => {

    fastify.post('/', require('./create'));
    fastify.put('/:id', require('./update'));
    next();
};