'use strict';
const service = require('../../../../../services/orders/byStore');
const ERRORS = require('../../../../errors');

/**
 * @function getAllOrdersByStoreId
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const getAllOrdersByStoreId = async(request, reply) => {
    try {
        const { storeId } = request.params;
        const { preparationDate, status } = request.query;
        const result = await service.getAllOrdersByStoreId(storeId, preparationDate, status);
        reply.code(200).send(result);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/admin/store/storeId/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: getAllOrdersByStoreId,
    schema: require('./schema.json'),
};
