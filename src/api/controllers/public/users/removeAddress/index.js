const service = require('../../../../../services/users/updateUser');
const ERRORS = require('../../../../errors');
const jwt = require('../../../../../utils/jwtToken');

/**
 * @function removeUserAddress
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const removeUserAddress = async(request, reply) => {
    try {
        const userToken = request.headers.authorization.split(" ")[1];
        const validToken = await request.fastify.jwt.verify(userToken);
        const userId = validToken.userId;
        let address= request.body;
        if(userId){
            return await service.removeUserAddress(request.params.userAddressId);
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
    handler: removeUserAddress,
    schema: require('./schema.json'),
};
