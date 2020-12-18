'use strict';
const serviceUser = require('../../../../../services/users/getUserByParam');
const ERRORS = require('../../../../errors');
const jwt = require('../../../../../utils/jwtToken');
const mailService = require('../../../../../services/email/mailchimpTransactional');
const { EMAILS } = require('../../../../../config/constants');
/**
 * @function forgotPassword
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const forgotPassword = async(request, reply) => {
    try {
        const { email } = request.body;
        const user = await serviceUser.getUserByEmail(email);
        if (user) {
            const jwtRes = await jwt.signToken(request, user.id);
            const from = EMAILS.NO_REPLY;
            const subject = 'Reestablecer contraseña elmercadodelpescado.com';
            const text =`<html><h2>Para restablecer la contraseña presione el siguiente link</h2>
                        <a>href=${process.env.API_BASE_URL}/auth/activate/${jwtRes.token}</a></html>`; //TODO change to WEB_BASE_URL
            mailService.sendMessage(from, email, subject, text);
        }
        const response = { message: "ok" };
        reply.code(200).send(response);
    } catch (error) {
        if (error.message === 'Unauthorized') {
            reply.conflict(ERRORS['/user/post/invalid']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: forgotPassword,
    schema: require('./schema.json'),
};
