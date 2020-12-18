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
  },
};
