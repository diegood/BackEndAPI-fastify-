'use strict';

const fp = require('fastify-plugin');
const cors = require('fastify-cors');

module.exports = fp((fastify, opts, next) => {
    //TODO change restrictions by env
    fastify.register(cors, {
        origin: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE']
    });
    next();
});