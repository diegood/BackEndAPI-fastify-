'use strict';

module.exports = async(fastify, opts, next) => {

    fastify.get('/', require('./all'));
    fastify.get('/:query', require('./one'));
    next();
};