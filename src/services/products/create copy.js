const productsDomain = require('../../domain/products/store/domain');

/**
 * @function remove
 * @param {object} product
 * @return {Promise<*>}
 */
const deleteStoreProduct = async(product) => {
    try {
        return await productsDomain.remove(product);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    deleteStoreProduct,
};
