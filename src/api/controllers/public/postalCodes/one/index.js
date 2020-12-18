'use strict';
const servicePostalCodes = require('../../../../../services/postalCodes/byNumber');
const servicePostalCodesQuery = require('../../../../../services/postalCodes/byString');
const ERRORS = require('../../../../errors');

/**
 * @function postalCodeByNumber
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const postalCodeByNumber = async(request, reply) => {
    try {
        let postalCodes= {};
        if(Number.parseInt(request.params.number)){
            postalCodes = await servicePostalCodes.getPostalCodeByNumber(`${Number.parseInt(request.params.query)}`);
        }else{
            postalCodes = await servicePostalCodesQuery.getPostalCodesByString(request.params.query);
        }
        reply.code(200).send(postalCodes);
    } catch (error) {
        if (error.message === 'NotFound') {
            reply.notFound(ERRORS['/public/postal-codes/{number}/notFound']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: postalCodeByNumber,
    schema: require('./schema.json'),
};
