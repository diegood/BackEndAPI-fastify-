'use strict';
const service = require('../../../../../services/orders/update');
const ERRORS = require('../../../../errors');

/**
 * @function updateOrder
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const updateOrder = async(request, reply) => {
    try {
        const order = request.body;
        const updatedOrder = await service.updateOrder(order);
        reply.code(200).send(updatedOrder);
    } catch (error) {
        if (error.message.includes('invalid input')) reply.notFound(ERRORS['/admin/orders/update/notFound']);
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/admin/orders/update/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: updateOrder,
    schema: require('./schema.json'),
};
