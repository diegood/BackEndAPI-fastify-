const domain = require('../../domain/store/domain');
/**
 * @function getStoreById
 * @return {Promise<*>}
 */
const getStoreById = async(id) => {
    try {
        return  await domain.getById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getStoreById,
};
