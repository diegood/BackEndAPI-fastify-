'use strict';
const serviceShipping = require('../../../../../services/shipping/createShippingByRequestId');
const ERRORS = require('../../../../errors');

/**
 * @function testRequestShipping
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const testRequestShipping = async(request, reply) => {
    try {
        const requestId = request.params.requestId;
        const shippingResponse = await serviceShipping.createShippingByRequestId(requestId);

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
    handler: testRequestShipping,
    schema: require('./schema.json'),
};
