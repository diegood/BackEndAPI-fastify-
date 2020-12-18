const userStoreDomain = require('../../domain/users/userStore/domain');
/**
 * @function createUserStore
 * @param {object} user
 * @param {object} store
 * @return {Promise<*>}
 */
const createUserStore = async(user, store) => {
    try {
        const userId = user.id;
        const storeId = store.store.id;
        return await userStoreDomain.createUserStore(userId, storeId);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createUserStore,
};
