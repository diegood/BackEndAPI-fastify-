'use strict';
const provider = require('../../dao/roles/provider');

/**
 * Get Role
 * @param {string} role
 * @return {Promise<*>}
 */
const getRole = async(role) => {
    try {
        return await provider.getRole(role);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getRole,
};
