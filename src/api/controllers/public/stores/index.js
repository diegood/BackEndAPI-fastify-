'use strict';

module.exports = async(fastify, opts, next) => {

    fastify.get('/', require('./all'));
    fastify.get('/:id', require('./one'));
    fastify.get('/name/:name_store', require('./byName'));
    next();
};