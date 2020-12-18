'use strict';

const fp = require('fastify-plugin');

const ERRORS = require('../errors');

module.exports = fp((fastify, opts, next) => {
  fastify.setErrorHandler((error, request, reply) => {

    const url = request.raw.url;
    const {validation} = error;
    if (validation) {
      error.message = validation.map((item) => {
        let dataPath;
        if (item.dataPath === '' && item.params.missingProperty === undefined) {
          dataPath = 'field';
        } else if (item.params.missingProperty !== undefined) {
          dataPath = item.params.missingProperty;
        } else {
          dataPath = item.dataPath.replace('.', '').split('.').join('/');
        }
        let errorKey = `${url.replace('/public', '')}/${dataPath}/${item.keyword}`;

        const regex = new RegExp(/((\w{4,12}-?)){5}/);
        const match = regex.exec(url);
        if(match){
          errorKey = `${url.replace(match[0], '')}${dataPath}/${item.keyword}`;
        }
        //@TODO delete debug LOG
        console.debug('--------ERROR key----------->',errorKey);
        console.debug('--------ERROR FOUND?----------->',ERRORS.hasOwnProperty(errorKey) === true);
        return (ERRORS.hasOwnProperty(errorKey) === true) ? ERRORS[errorKey] : ERRORS['/global'];
      });
    }

    request.log.info('Error Captured', error);
    request.log.info(error);

    reply.send(error);
  });

  next();
});
