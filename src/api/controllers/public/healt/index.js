'use strict';

module.exports = async(fastify, opts, next) => {

    fastify.get('/', require('./check'));
    next();
};