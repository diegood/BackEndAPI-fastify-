const ERRORS = require('../../../../errors');
const {QueueMessage} = require('../../../../../queue/QueueMessage');
const consummer = require('../../../../../queue/consummer');

/**
 * @function check
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const check = async(request, reply) => {
    try {
        reply.code(200).send('ok');
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/stores/{number}/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: check,
    schema: require('./schema.json'),
};
