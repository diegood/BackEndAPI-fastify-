'use strict';
const serviceProducts = require('../../../../../../services/products/getStoreProducts');
const ERRORS = require('../../../../../errors');

/**
 * @function allProducts
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const allProducts = async(request, reply) => {
    try {
        const products = await serviceProducts.getAllProductsStore();
        reply.code(200).send(products);
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
    handler: allProducts,
    schema: require('./schema.json'),
};
