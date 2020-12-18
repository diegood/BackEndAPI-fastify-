const service = require('../../../../../services/request/find');
const ERRORS = require('../../../../errors');
const jwt = require('../../../../../utils/jwtToken');

/**
 * @function addUserAddres
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const getHistoryRequest = async(request, reply) => {
    try {
        const userToken = request.headers.authorization.split(" ")[1];
        const validToken = await request.fastify.jwt.verify(userToken);
        const userId = validToken.userId;
        if(userId){
            const history = await service.getAllRequestByUserId(userId);
            reply.code(200).send(history);
        }else{
            reply.unauthorized(ERRORS['/public/user/update/match-error'])
        }
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/users/not-found']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: getHistoryRequest,
    schema: require('./schema.json'),
};
