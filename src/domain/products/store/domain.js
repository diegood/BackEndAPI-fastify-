const getSlug = require('speakingurl');
const provider = require('../../../dao/productStore/provider');

/**
 * Get All Products
 * @return {Promise<*>}
 */
const getAllProducts = async() => {
    try {
        return await provider.getAllProductsStore();
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * getStoreProducts
 * @param {string} storeId
 * @return {Promise<*>}
 */
const getProductsStoreByStoreId = async(storeId) => {
    try {
        return await provider.getStoreProductsByStoreId(storeId);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * getStoreProducts
 * @param {string} uriName
 * @return {Promise<*>}
 */
const getProductsStoreByUriName = async(storeId) => {
    try {
        return await provider.getProductsStoreByUriName(storeId);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * create
 * @param {object} product
 * @return {Promise<*>}
 */
const create = async(product, addTimeStamp = false) => {
    try {
        const shortTimeStamp = new Date().getTime().toString().substring(6, 12);
        product.uriName = addTimeStamp ? getSlug(`${product.name} ${shortTimeStamp}`) : getSlug(product.name);
        return await provider.createProductStore(product);
    } catch (error) {
        if (error.message === "uri-no-unique") { return create(product, true)}
        else{throw new Error(error.message)}
    }
};

/**
 * delete
 * @param {object} productId
 * @return {Promise<*>}
 */
const remove = async(productId) => {
    try {
        return await provider.deleteProductStore(productId);
    } catch (error) {
        if (error.message === "uri-no-unique") { return create(product, true)}
        else{throw new Error(error.message)}
    }
};

/**
 * update
 * @param {object} product
 * @return {Promise<*>}
 */
const update = async(product, productId) => {
    try {
        return await provider.updateProductStore(product, productId);
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    getProductsStoreByUriName,
    getAllProducts,
    getProductsStoreByStoreId,
    create,
    update,
    remove
};
