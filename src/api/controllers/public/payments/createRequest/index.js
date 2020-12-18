'use strict';
const requestService = require('../../../../../services/request/create');
const paymentsService = require('../../../../../services/payments/signForm');
const ERRORS = require('../../../../errors');

/**
 * @function signedForm
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const createRequest = async(request, reply) => {
    try {
        const orderRequest = await requestService.createRequest(request.params.cartId);
        const form = await paymentsService.createPayment(orderRequest.id);
        reply.code(200).send(form);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/payments/sign/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: createRequest,
    schema: require('./schema.json'),
};
