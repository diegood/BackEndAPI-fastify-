'use strict';
const service= require('../../../../../../services/products/getStoreProducts');
const ERRORS = require('../../../../../errors');

/**
 * @function getStoreProducts
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const getStoreProduct = async(request, reply) => {
    try {
        const uriName = request.params.uriName
        const storeResults = await service.getProductsStoreByUriName(uriName);
        reply.code(200).send(storeResults);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/products/store/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: getStoreProduct,
    schema: require('./schema.json'),
};
