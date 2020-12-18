'use strict';
const serviceCategories = require('../../../../../services/categories/all');
const ERRORS = require('../../../../errors');

/**
 * @function productFilters
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const productFilters = async(request, reply) => {
    try {
        const allCategories = await serviceCategories.getAll();
        reply.code(200).send(allCategories);
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
    handler: productFilters,
    schema: require('./schema.json'),
};
