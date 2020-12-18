const model = require('./model');

/**
 * Create UserStore
 * @param {object} userStore
 * @return {Promise<*>}
 */
const create = async(userStore) => {
    try {
        return await model.create(userStore);
    } catch (error) {
        console.error(error, error.stack);
    }
};

module.exports = {
    create,
};
