'use strict';
const service = require('../../../../../services/stores/update');
const ERRORS = require('../../../../errors');

/**
 * @function updateStore
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const updateStore = async(request, reply) => {
    try {
        const { store, billing, logistic } = request.body;
        store.id = request.params.store_id;
        
        const updatedStore = await service.updateStore(store, billing, logistic);
        reply.code(200).send(updatedStore);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/admin/store/update/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: updateStore,
    schema: require('./schema.json'),
};
