const serviceUser = require('../../../../../services/users/getUserByParam');
const ERRORS = require('../../../../errors');
const crypt = require('../../../../../utils/hash');
const serviceUserPass = require('../../../../../services/users/changePass');
/**
 * @function changePassword
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const changePassword = async(request, reply) => {
    try {
        const { newPassword } = request.body;
        const headers = request.headers;
        const userToken = headers.authorization ?
            headers.authorization.split(" ")[1] : null;

        const validToken = userToken ? await request.fastify.jwt.verify(userToken) : null;

        if(validToken) {
            const userId = validToken.userId;
            const hashedNewPassword = await crypt.hashPassword(newPassword);
            await serviceUserPass.changePass(hashedNewPassword, userId);
            reply.code(200).send({"result": "ok"});
        } else {
            reply.unauthorized(ERRORS['/public/auth/login/invalid']);
        }
    } catch (error) {
        console.log('error', error)
        reply.internalServerError(ERRORS['/internalServerError']);
    }
};

module.exports = {
    handler: changePassword,
    schema: require('./schema.json'),
};
