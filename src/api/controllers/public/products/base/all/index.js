'use strict';
const serviceBaseProducts = require('../../../../../../services/baseProducts/getAll');
const ERRORS = require('../../../../../errors');

/**
 * @function allBaseProducts
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const allBaseProducts = async(request, reply) => {
    try {
        const baseProducts = await serviceBaseProducts.getAll();
        reply.code(200).send(baseProducts);
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
    handler: allBaseProducts,
    schema: require('./schema.json'),
};
