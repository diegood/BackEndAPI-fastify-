'use strict';

async function signToken(request, userId) {

    const token = request.fastify.jwt.sign({ userId }, { expiresIn: '2h' });
    const refreshToken = request.fastify.jwt.sign({ userId }, { expiresIn: '3h' });
    const signedTokens = {
        token,
        refresh_token: refreshToken,
    };
    return signedTokens;
}

module.exports = {
    signToken,
}

