const domain = require('../../domain/store/domain');
/**
 * @function getStoreByName
 * @return {Promise<*>}
 */
const getStoreByName = async(uri) => {
    try {
        return  await domain.getByName(uri);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getStoreByName,
};
