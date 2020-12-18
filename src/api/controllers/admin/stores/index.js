
module.exports = async(fastify, opts, next) => {

    fastify.post('/', require('./create'));
    fastify.put('/:store_id', require('./update'));

    next();
};