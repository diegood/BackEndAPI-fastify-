const serviceCart = require('../../../../../../services/cart/find');
const ERRORS = require('../../../../../errors');


/**
 * @function findCartByUser
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const findCartByUser = async(request, reply) => {
    try {
        const userId = request.params.userId;
        const cart = await serviceCart.findByUserId(userId);
        
        reply.code(200).send(cart);
    } catch (error) {
        console.log('error', error)
        reply.internalServerError(ERRORS['/internalServerError']);
    }
};

module.exports = {
    handler: findCartByUser,
    schema: require('./schema.json'),
};