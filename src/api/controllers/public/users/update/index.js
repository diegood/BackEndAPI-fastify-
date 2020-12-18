const service = require('../../../../../services/users/updateUser');
const ERRORS = require('../../../../errors');

/**
 * @function updateUser
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const updateUser = async(request, reply) => {
    try {
        const userToken = request.headers.authorization.split(" ")[1];
        const validToken = await request.fastify.jwt.verify(userToken);
        const userId = validToken.userId;
        let user= request.body;

        if(userId) {
            const result = await service.updateUser(user, userId);
            const httpCode = result ? 200 : 204;
            return reply.code(httpCode).send(result.user);
        }else{
            reply.unauthorized(ERRORS['/public/user/update/match-error']);
        }
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/users/not-found']);
        } if (error.message === 'jwt expired') {
            reply.unauthorized(ERRORS['/public/users/update/expired']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: updateUser,
    schema: require('./schema.json'),
};
