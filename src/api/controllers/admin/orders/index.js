'use strict';

module.exports = async(fastify, opts, next) => {

    fastify.get('/:id', require('./one'));
    fastify.put('/:id', require('./update'));
    fastify.put('/items/:id', require('./updateItem'));
    fastify.get('/store/:storeId', require('./byStore'));
    next();
};