'use strict';
const service = require('../../../../../services/cart/shippingCost');
const ERRORS = require('../../../../errors');
/**
 * @function shippingCost
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const shippingCost = async(request, reply) => {
    try {
        const cartId = request.params.cartId;
        const shippingCosts = await service.shippingCost(cartId);

        reply.code(200).send(shippingCosts);
    } catch (error) {
        console.log('error', error)
        reply.internalServerError(ERRORS['/internalServerError']);
    }
};

module.exports = {
    handler: shippingCost,
    schema: require('./schema.json'),
};