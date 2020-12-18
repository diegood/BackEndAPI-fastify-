const productsDomain = require('../../domain/products/store/domain');

/**
 * @function create
 * @param {object} product
 * @return {Promise<*>}
 */
const createStoreProduct = async(product) => {
    try {
        return await productsDomain.create(product);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createStoreProduct,
};
