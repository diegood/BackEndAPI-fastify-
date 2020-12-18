'use strict';

module.exports = {
  fastify: {
    logger: {
      prettyPrint: true,
      level: 'info',
      serializers: {
        res(reply) {
          return {
            statusCode: reply.statusCode,
          };
        },
        req(request) {
          return {
            method: request.method,
            url: request.url,
            path: request.path,
            parameters: request.parameters,
            body: request.body,
            headers: request.headers,
          };
        },
      },
    },
    https: {
      key: process.env.HTTPS_KEY, // .key file path
      cert: process.env.HTTPS_CERT, // .crt file path
    },
  },
};
