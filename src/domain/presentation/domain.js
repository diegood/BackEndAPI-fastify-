'use strict';
const provider = require('../../dao/presentation/provider');

/**
 * Get All Presentation
 * @return {Promise<*>}
 */
const getAll = async() => {
    try {
        return await provider.getAll();
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    getAll,
};
