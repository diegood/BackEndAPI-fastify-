'use strict';
const servicePostalCodes = require('../../../../../services/postalCodes/all');
const ERRORS = require('../../../../errors');

/**
 * @function allPostalCodes
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const allPostalCodes = async(request, reply) => {
    try {
        const postalCodes = await servicePostalCodes.getAllPostalCodes();
        reply.code(200).send(postalCodes);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/postalCodes/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: allPostalCodes,
    schema: require('./schema.json'),
};
