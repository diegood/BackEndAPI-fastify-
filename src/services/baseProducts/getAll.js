const baseProductsDomain = require('../../domain/products/domain');
const { mapBaseProductsResponse } = require('../_mappers/baseProducts');
/**
 * @function getAll
 * @return {Promise<*>}
 */
const getAll = async() => {
    try {
        const baseProducts = await baseProductsDomain.getAllProducts();
        return mapBaseProductsResponse(baseProducts);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAll,
};
