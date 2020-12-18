'use strict';
const paymentsService = require('../../../../../services/payments/signForm');
const ERRORS = require('../../../../errors');

/**
 * @function signedForm
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const signedForm = async(request, reply) => {
    try {
        const form = await paymentsService.createPayment(request.params.requestid);
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
    handler: signedForm,
    schema: require('./schema.json'),
};
