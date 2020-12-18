'use strict';

const model = require('../roles/model');
const sequelize = require('sequelize');

/**
 * Get Role
 * @param {string} role
 * @return {Promise<*>}
 */
const getRole = async(role) => {
    try {
        return await model.findOne({
            where: {
                name: role,
            },
            raw: true,
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    getRole,
};
