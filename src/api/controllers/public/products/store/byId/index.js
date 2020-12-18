'use strict';
const service= require('../../../../../../services/products/getStoreProducts');
const ERRORS = require('../../../../../errors');

/**
 * @function getStoreProducts
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const getStoreProducts = async(request, reply) => {
    try {
        const storeId = request.params.store_id;
        const storeResults = await service.getProductsStoreByStoreId(storeId);
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
    handler: getStoreProducts,
    schema: require('./schema.json'),
};
