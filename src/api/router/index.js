'use strict';

module.exports = async(fastify, opts, next) => {

  // Public
  fastify.register(require('../controllers/public'), {
    ...opts,
    prefix: '/public',
  });

  // Admin
  fastify.register(require('../controllers/admin'), {
    ...opts,
    prefix: '/admin',
  });
  next();
};
