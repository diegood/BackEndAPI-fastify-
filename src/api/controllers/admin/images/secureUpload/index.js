'use strict';
const imageService = require('../../../../../services/images/upload');
const ERRORS = require('../../../../errors');

/**
 * @function uploadImage
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const uploadImage = async(request, reply) => {
    try {
        // TODO poner cifrado a todo lo que entre por este endpoint
        const belongsTo = `tickets/${request.params.belongsTo}`;
        const file = request.body.file
        reply.send(await imageService.uploadTicket(file, belongsTo, request.params.resource))
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/shipping/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: uploadImage,
    schema: require('./schema.json'),
};
