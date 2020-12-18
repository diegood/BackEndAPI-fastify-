'use strict';
const fileUpload = require('fastify-file-upload')

module.exports = async(fastify, opts, next) => {
    fastify.register(fileUpload);
    fastify.post('/:belongsTo/:resource', require('./upload'));
    fastify.post('/ticket/:belongsTo/:resource', require('./upload'));
    next();
};