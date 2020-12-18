'use strict';
const service = require('../../../../../services/stores/byId');
const ERRORS = require('../../../../errors');

/**
 * @function byId
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const byId = async(request, reply) => {
    try {
        const postalCodes = await service.getStoreById(request.params.id);
        reply.code(200).send(postalCodes);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/stores/{number}/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: byId,
    schema: require('./schema.json'),
};
