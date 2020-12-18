'use strict';
const service = require('../../../../../services/stores/create');
const ERRORS = require('../../../../errors');

/**
 * @function createStore
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const createStore = async(request, reply) => {
    try {
        const store = request.body;
        const createdStore = await service.createStore(store);
        reply.code(201).send(createdStore);
    } catch (error) {
        if (error.message === "uri-no-unique") reply.notFound(ERRORS['/admin/store/create/uri-no-unique']);
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/admin/store/create/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: createStore,
    schema: require('./schema.json'),
};
