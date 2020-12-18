'use strict';
const serviceShipping = require('../../../../../services/shipping/createShipping');
const ERRORS = require('../../../../errors');

/**
 * @function createShipping
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const createShipping = async(request, reply) => {
    try {
        const {user, store, order} = request.body;
        const shippingResponse = await serviceShipping.createShipping(user, store, order);

        reply.code(200).send(shippingResponse);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/shipping/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: createShipping,
    schema: require('./schema.json'),
};
