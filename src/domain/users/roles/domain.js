'use strict';
const provider = require('../../../dao/users/roles/provider');

/**
 * Create User Role
 * @param {object} user
 * @param {object} role
 * @return {Promise<*>}
 */
const addUserRole = async(user, role) => {
    try {
        const userRole = {
            userId: user,
            roleId: role
        };

        return await provider.createUserRole(userRole);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    addUserRole,
};
