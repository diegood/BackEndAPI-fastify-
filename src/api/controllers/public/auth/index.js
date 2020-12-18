'use strict';

module.exports = async(fastify, opts, next) => {
    fastify.decorateRequest('fastify', fastify);
    fastify.post('/signup', require('./signup'));
    fastify.post('/login', require('./login'));
    fastify.post('/refresh', require('./refresh'));
    fastify.post('/forgot', require('./forgot'));
    fastify.get('/activate', require('./activate'));
    fastify.get('/verify', require('./verify'));
    fastify.get('/login/google/callback', require('./googleLogin'));
    fastify.get('/login/facebook/callback', require('./facebookLogin'));

    next();
};
