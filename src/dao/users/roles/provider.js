'use strict';

const model = require('./model');
const sequelize = require('sequelize');

/**
 * Create User Role
 * @param {object} userRole
 * @return {Promise<*>}
 */
const createUserRole = async(userRole) => {
    try {
        return await model.create(userRole);
    } catch (error) {
        console.error(error, error.stack);
        if (error instanceof sequelize.UniqueConstraintError) {
            throw new Error('UserRoleAlreadyExist');
        } else {
            throw new Error(error.message);
        }
    }
};

module.exports = {
    createUserRole,
};
