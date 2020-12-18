'use strict';
const ERRORS = require('../../../../errors');
const serviceUser = require('../../../../../services/users/getUserByParam');
const userMapper = require('../../../../../services/_mappers/users');
const jwt = require('../../../../../utils/jwtToken');

/**
 * @function authVerify
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const authVerify = async(request, reply) => {
    try {
        const authHeaders = request.headers.authorization;
        const userToken = authHeaders.split(" ");
        const validToken = await request.fastify.jwt.verify(userToken[1]);
        const userId = validToken.userId;
        const validatedUser = await serviceUser.getUserById(userId);
        const tokenResponse = await jwt.signToken(request, userId);

        const response = await userMapper.userWithToken(tokenResponse, validatedUser);

        reply.send(response);
    } catch (error) {
        if (error.message === 'jwt expired') {
            reply.unauthorized(ERRORS['/public/auth/verify/expired']);
        } else if(error.message === 'invalid signature') {
            reply.unauthorized(ERRORS['/public/auth/verify/invalid']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internal-server-error']);
        }
    }
};

module.exports = {
    handler: authVerify,
    schema: require('./schema.json'),
};
