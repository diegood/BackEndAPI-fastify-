'use strict';
const paymentsService = require('../../../../../services/payments/validateCallBack');
const ERRORS = require('../../../../errors');

/**
 * @function callback
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const callback = async(request, reply) => {
    try {
        console.log(request.body)
        paymentsService.decryptPayment(request.body, request.params.requestid);
        reply.code(200).send('ok');
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
    handler: callback,
    schema: require('./schema.json'),
};