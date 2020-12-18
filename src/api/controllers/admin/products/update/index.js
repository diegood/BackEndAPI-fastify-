'use strict';
const service = require('../../../../../services/products/update');
const ERRORS = require('../../../../errors');

/**
 * @function updateStoreProduct
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const updateStoreProduct = async(request, reply) => {
    try {
        const product = request.body;
        const updatedProduct = await service.updateStoreProduct(product);
        reply.code(200).send(updatedProduct);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/admin/products/update/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: updateStoreProduct,
    schema: require('./schema.json'),
};
