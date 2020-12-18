const productsDomain = require('../../domain/products/store/domain');
const { mapProductsStoreResponse } = require('../_mappers/storeProducts');

/**
 * @function getProductsStore
 * @return {Promise<*>}
 */
const getAllProductsStore = async() => {
    try {
        const products = await productsDomain.getAllProducts();
        return mapProductsStoreResponse(products);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @function getProductsByStoreId
 * @param {string} storeId
 * @return {Promise<*>}
 */
const getProductsStoreByStoreId = async(storeId) => {
    try {
        return  await productsDomain.getProductsStoreByStoreId(storeId);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @function getProductsByUriName
 * @param {string} UriName
 * @return {Promise<*>}
 */
const getProductsStoreByUriName = async(UriName) => {
    try {
        return await productsDomain.getProductsStoreByUriName(UriName);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllProductsStore,
    getProductsStoreByStoreId,
    getProductsStoreByUriName
};
