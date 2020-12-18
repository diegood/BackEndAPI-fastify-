const domain = require('../../domain/store/domain');
/**
 * @function getAllStores
 * @return {Promise<*>}
 */
const getAllStores = async() => {
    try {
        return  await domain.getAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllStores,
};
