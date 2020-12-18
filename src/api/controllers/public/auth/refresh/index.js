'use strict';
const ERRORS = require('../../../../errors');
const jwt = require('../../../../../utils/jwtToken');

/**
 * @function authRefresh
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const authRefresh = async(request, reply) => {
    try {
        const refreshToken = request.body.refresh_token;
        const validToken = await request.fastify.jwt.verify(refreshToken);
        const response = await jwt.signToken(request, validToken.userId);
        reply.send(response);
    } catch (error) {
        if (error.code === 'NotAuthorizedException') {
            reply.badRequest(ERRORS['/public/auth/refresh/invalid']);
        } else {
            reply.internalServerError(ERRORS['/internal-server-error']);
        }
    }
};

module.exports = {
    handler: authRefresh,
    schema: require('./schema.json'),
};
