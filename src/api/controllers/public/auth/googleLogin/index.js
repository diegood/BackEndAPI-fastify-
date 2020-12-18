const sget = require('simple-get')

/**
 * @function loginWithGoogle
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const loginWithGoogle = async(request, reply) => {
    try {
        request.fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request, (err, result) => {
            if (err) {
                reply.send(err)
                return
            }
            sget.concat({
                url: 'https://www.googleapis.com/plus/v1/people/me',
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + result.access_token
                },
                json: true
            }, function (err, res, data) {
                if (err) {
                    reply.send(err)
                    return
                }
                reply.send(data)
            })
        })
    } catch (error) {
        if (error.message === 'Unauthorized') {
            reply.conflict(ERRORS['/public/auth/login/invalid']);
        } else {
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};


module.exports = {
    handler: loginWithGoogle,
    schema: require('./schema.json'),
};