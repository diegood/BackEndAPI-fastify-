'use strict';
const service = require('../../../../../services/orders/updateItem');
const ERRORS = require('../../../../errors');

/**
 * @function updateItem
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const updateItem = async(request, reply) => {
    try {
        const item = request.body;
        const updatedItem = await service.updateItem(item);
        reply.code(200).send(updatedItem);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/admin/orders/updateItem/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: updateItem,
    schema: require('./schema.json'),
};
