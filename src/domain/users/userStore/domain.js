'use strict';
const provider = require('../../../dao/usersStore/provider');

/**
 * Create UserStore
 * @param {string} userId
 * @param {string} storeId
 * @return {Promise<*>}
 */
const createUserStore = async(userId, storeId) => {
    try {
        const userStore = {
            userId,
            storeId
        };
        return await provider.create(userStore);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createUserStore,
};
