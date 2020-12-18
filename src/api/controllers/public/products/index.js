'use strict';

module.exports = async(fastify, opts, next) => {

    fastify.get('/:uriName', require('./store/byName'));
    fastify.get('/stores', require('./store/all'));
    fastify.get('/stores/:store_id', require('./store/byId'));
    fastify.get('/base', require('./base/all'));
    fastify.get('/filters', require('./filters'));
    fastify.get('/presentations', require('./presentations'));
    next();
};