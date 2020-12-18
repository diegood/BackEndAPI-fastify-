const sget = require('simple-get')

/**
 * @function loginWithFacebook
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const loginWithFacebook = async(request, reply) => {
    request.fastify.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request, (err, result) => {
        if (err) {
            reply.send(err)
            return
        }

        sget.concat({
            url: 'https://graph.facebook.com/v6.0/me',
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
};


module.exports = {
    handler: loginWithFacebook,
    schema: require('./schema.json'),
};