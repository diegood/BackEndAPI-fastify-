'use strict';
const service = require('../../../../../services/stores/byName');
const ERRORS = require('../../../../errors');

/**
 * @function byName
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const byName = async(request, reply) => {
    try {
        const store = await service.getStoreByName(request.params.name_store);
        reply.code(200).send(store);
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
    handler: byName,
    schema: require('./schema.json'),
};
