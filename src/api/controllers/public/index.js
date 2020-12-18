'use strict';

module.exports = async(fastify, opts, next) => {

  // Routes

  fastify.register(
    require('./healt'),
    {
      ...opts,
      prefix: '/healt',
    },
  );

  fastify.register(
    require('./auth'),
    {
      ...opts,
      prefix: '/auth',
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
    require('./postalCodes'),
    {
      ...opts,
      prefix: '/postal-codes',
    },
  );

  fastify.register(
    require('./stores'),
    {
      ...opts,
      prefix: '/stores',
    },
  );

  fastify.register(
    require('./cart'),
    {
      ...opts,
      prefix: '/cart',
    },
  );

  fastify.register(
    require('./payments'),
    {
      ...opts,
      prefix: '/payments',
    }
  );
  fastify.register(
    require('./users'),
    {
      ...opts,
      prefix: '/users',
    }
  );

  next();
};
