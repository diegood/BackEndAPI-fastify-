'use strict';
const service = require('../../../../../services/stores/all');
const ERRORS = require('../../../../errors');

/**
 * @function allStores
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const allStores = async(request, reply) => {
    try {
        const result = await service.getAllStores();
        reply.code(200).send(result);
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
    handler: allStores,
    schema: require('./schema.json'),
};
