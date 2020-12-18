const service = require('../../../../../services/users/updateUser');
const ERRORS = require('../../../../errors');
const jwt = require('../../../../../utils/jwtToken');

/**
 * @function updateUserAddress
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const updateUserAddress = async(request, reply) => {
    try {
        const userToken = request.headers.authorization.split(" ")[1];
        const validToken = await request.fastify.jwt.verify(userToken);
        const userId = validToken.userId;
        const userAddressId = request.params.userAddressId;
        const address= request.body;
        if(userId){
            const updatedAddress = await service.updateUserAddress(address, userAddressId, userId);
            reply.code(201).send(updatedAddress);
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
    handler: updateUserAddress,
    schema: require('./schema.json'),
};
