'use strict';
const serviceUser = require('../../../../../services/users/getUserByParam');
const ERRORS = require('../../../../errors');
const crypt = require('../../../../../utils/hash');
const jwt = require('../../../../../utils/jwtToken');
const responseMapper = require('../../../../../services/_mappers/users');

/**
 * @function loginUser
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const loginUser = async(request, reply) => {
    try {
        const { email, password } = request.body;
        const user = await serviceUser.getUserByEmail(email);

        const credentialsResponse = await crypt.comparePassword(password, user.password);

        if (!credentialsResponse) {
            reply.badRequest(ERRORS['/public/auth/login/invalid']);
        }
        
        const tokenResponse = await jwt.signToken(request, user.id);
        const response =  await responseMapper.userWithToken(tokenResponse, user);

        reply.code(200).send(response);
    } catch (error) {
        if (error.message === 'Unauthorized') {
            reply.conflict(ERRORS['/user/post/invalid']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: loginUser,
    schema: require('./schema.json'),
};
