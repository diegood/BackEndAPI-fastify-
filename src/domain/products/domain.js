const provider = require('../../dao/productBase/provider');

/**
 * Get All Products
 * @return {Promise<*>}
 */
const getAllProducts = async() => {
    try {
        return await provider.getAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllProducts,
};
