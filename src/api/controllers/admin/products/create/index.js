'use strict';
const service = require('../../../../../services/products/create');
const ERRORS = require('../../../../errors');

/**
 * @function createStoreProduct
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const createStoreProduct = async(request, reply) => {
    try {
        const product = request.body;
        const createdProduct = await service.createStoreProduct(product);
        reply.code(200).send(createdProduct);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/admin/products/create/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: createStoreProduct,
    schema: require('./schema.json'),
};
