'use strict';

const fp = require('fastify-plugin');
const oauthPlugin = require('fastify-oauth2');

module.exports = fp((fastify, opts, next) => {
    fastify.register(oauthPlugin, {
        name: 'googleOAuth2',
        scope: ['profile'],
        credentials: {
            client: {
                id: process.env.GOOGLE_CLIENT_ID,
                secret: process.env.GOGGLE_CLIENT_SECRET
            },
            auth: oauthPlugin.GOOGLE_CONFIGURATION
        },
        startRedirectPath: '/auth/login/google',
        callbackUri: `http://${process.env.HOST}/auth/login/google/callback`
    })
    next();
});
