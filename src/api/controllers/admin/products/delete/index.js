'use strict';
const service = require('../../../../../services/products/delete');
const ERRORS = require('../../../../errors');

/**
 * @function deleteStoreProduct
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const deleteStoreProduct = async(request, reply) => {
    try {
        const productId = request.body;
        const deletedProduct = await service.deleteStoreProduct(productId);
        reply.code(200).send(deletedProduct);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/admin/products/delete/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: deleteStoreProduct,
    schema: require('./schema.json'),
};
