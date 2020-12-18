const fp = require('fastify-plugin');

module.exports = fp((fastify, opts, next) => {
  fastify.register(require('fastify-rate-limit'), {
    max: 50,
    timeWindow: 1000,
    // ban: 3
  });
  next();
});
