'use strict';

module.exports = async(fastify, opts, next) => {

  // Routes

  fastify.register(
    require('./orders'),
    {
      ...opts,
      prefix: '/orders',
    },
  );

  fastify.register(
    require('./shipping'),
    {
      ...opts,
      prefix: '/shipping',
    },
  );

  fastify.register(
    require('./images'),
    {
      ...opts,
      prefix: '/images',
    },
  );

  fastify.register(
    require('./products'),
    {
      ...opts,
      prefix: '/products',
    },
  );

  fastify.register(
    require('./stores'),
    {
      ...opts,
      prefix: '/stores',
    },
  );

  next();
};
