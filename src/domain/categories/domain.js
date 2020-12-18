'use strict';
const provider = require('../../dao/categories/provider');

/**
 * Get All Products
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
