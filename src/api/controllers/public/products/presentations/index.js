'use strict';
const service = require('../../../../../services/presentation/getAll');
const ERRORS = require('../../../../errors');

/**
 * @function getAllPresentations
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const getAllPresentations = async(request, reply) => {
    try {
        const presentations = await service.getAll();
        reply.code(200).send(presentations);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/products/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: getAllPresentations,
    schema: require('./schema.json'),
};
