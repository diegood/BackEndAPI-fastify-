'use strict';
const serviceCart = require('../../../../../services/cart/create');
const ERRORS = require('../../../../errors');


/**
 * @function createCart
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const createCart = async(request, reply) => {
    try {
        const { userId, currency, items } = request.body;
        const cart = await serviceCart.create(userId, currency, items );
        
        reply.code(200).send(cart);
    } catch (error) {
        console.log('error', error)
        reply.internalServerError(ERRORS['/internalServerError']);
    }
};

module.exports = {
    handler: createCart,
    schema: require('./schema.json'),
};
