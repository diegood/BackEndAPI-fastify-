'use strict';
const provider = require('../../../dao/logistics/address/provider');

/**
 * Get address by id
 * @param {string} id
 * @return {Promise<*>}
 */
const getById = async(id) => {
    try {
        return await provider.getById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Create Address
 * @param {object} address
 * @return {Promise<*>}
 */
const create = async(address) => {
    try {
        return await provider.createAddress(address);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getById,
    create
};
