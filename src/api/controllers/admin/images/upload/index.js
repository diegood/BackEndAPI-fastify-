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
        const belongsTo = `${request.params.belongsTo}/${request.params.resource}`;
        const file = request.body.file
        reply.send(await imageService.uploadImage(file, belongsTo))
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
