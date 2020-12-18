'use strict';
const serviceCart = require('../../../../../services/cart/update');
const ERRORS = require('../../../../errors');


/**
 * @function updateCart
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const updateCart = async(request, reply) => {
    try {
        const { cartId, currency, items, shippingAddressId, userId, pickUpStore, billingAddressId, date } = request.body;
        const updatedCart = await serviceCart.update(cartId, currency, items, shippingAddressId, userId, pickUpStore, billingAddressId, date);
        
        reply.code(200).send(updatedCart);
    } catch (error) {
        console.log('error', error)
        reply.internalServerError(ERRORS['/internalServerError']);
    }
};

module.exports = {
    handler: updateCart,
    schema: require('./schema.json'),
};