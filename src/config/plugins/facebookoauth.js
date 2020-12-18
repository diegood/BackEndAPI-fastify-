'use strict';

const fp = require('fastify-plugin');
const oauthPlugin = require('fastify-oauth2');

module.exports = fp((fastify, opts, next) => {
    fastify.register(oauthPlugin, {
        name: 'facebookOAuth2',
        credentials: {
            client: {
                id: process.env.FACEBOOK_CLIENT_ID,
                secret: process.env.FACEBOOK_CLIENT_SECRET
            },
            auth: oauthPlugin.FACEBOOK_CONFIGURATION
        },
        startRedirectPath: '/login/facebook',
        callbackUri: `http://${process.env.HOST}/login/facebook/callback`
    })
    next();
});