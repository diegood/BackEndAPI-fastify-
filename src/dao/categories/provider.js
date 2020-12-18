'use strict';

const model = require('./model');

/**
 * Get All
 * @return {Promise<*>}
 */
const getAll = async() => {
    try {
        return await model.findAll({
            raw: true,
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    getAll,
};
