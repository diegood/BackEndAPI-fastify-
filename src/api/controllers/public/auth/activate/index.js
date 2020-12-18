const ERRORS = require('../../../../errors');

/**
 * @function activate
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const activate = async(request, reply) => {
    try {
        const { token } = request.body;
        const validToken = await request.fastify.jwt.verify(token);

        if(validToken.userId) {
            reply.code(200).send({ message: "ok" });
        } else {
            reply.badRequest(ERRORS['/public/auth/login/invalid']);
        }
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
    handler: activate,
    schema: require('./schema.json'),
};
