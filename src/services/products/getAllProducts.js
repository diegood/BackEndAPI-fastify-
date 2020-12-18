const productsDomain = require('../../domain/products/domain');
const { mapProductsResponse } = require('../_mappers/baseProducts');
/**
 * @function getAllProducts
 * @return {Promise<*>}
 */
const getAllProducts = async() => {
    try {
        const products = await productsDomain.getAllProducts();
        return mapProductsResponse(products);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllProducts,
};
