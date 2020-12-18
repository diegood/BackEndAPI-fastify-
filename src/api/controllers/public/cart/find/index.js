'use strict';
const serviceCart = require('../../../../../services/cart/find');
const ERRORS = require('../../../../errors');


/**
 * @function findCart
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const findCart = async(request, reply) => {
    try {
        const cartId = request.params.cartId;
        const cart = await serviceCart.find(cartId);
        
        reply.code(200).send(cart);
    } catch (error) {
        console.log('error', error)
        reply.internalServerError(ERRORS['/internalServerError']);
    }
};

module.exports = {
    handler: findCart,
    schema: require('./schema.json'),
};