'use strict';

const model = require('./model');
const storeModel = require('./../store/model');
const productBaseModel = require('./../productBase/model');
const storeLogisticModel = require('./../storeLogistic/model');
const { ACTIVE } = require('../../config/constants');

model.belongsTo(storeModel);
model.belongsTo(productBaseModel);
storeModel.hasOne(storeLogisticModel);
/**
 * Get All Products
 * @return {Promise<*>}
 */
const getAllProductsStore = async() => {
    try {
        return await model.findAll({
            include: [ { model: storeModel, include:[storeLogisticModel] }, {model: productBaseModel}],
            order: [['name', 'ASC']]
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Get one Product by Uri Name
 * @param {string} uriName
 * @return {Promise<*>}
 */
const getProductsStoreByUriName = async(uriName) => {
    try {
        return await model.findOne({
            include: [ { model: storeModel }, {model: productBaseModel}],
            where: {uriName},
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};
/**
 * Get All Products by store Id
 * @return {Promise<*>}
 */
const getStoreProductsByStoreId = async(storeId) => {
    try {
        return await model.findAll({
            include: [ productBaseModel],
            where: {storeId},
            order: [['name', 'ASC']]
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Create Product Store
 * @param {string} product
 * @return {Promise<*>}
 */
const createProductStore = async(product) => {
    try {
        product.status = ACTIVE;
        return await model.create(product);
    } catch (error) { 
        console.error(error, error.stack);
        throw  error.parent.routine=='_bt_check_unique' ? new Error('uri-no-unique') :  new Error(error);
    }
};

/**
 * Update Product Store
 * @param {string} product
 * @return {Promise<*>}
 */
const updateProductStore = async(product, productId) => {
    try {
        return await model.update(
            product,
            {
                where: {
                    id: productId
                },
                returning: true,
                plain: true
            }
        );
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Delete Product Store
 * @param {string} productId
 * @return {Promise<*>}
 */
const deleteProductStore = async(id) => {
    try {
        return await model.destroy(
            {
                where: {id},
                force: true
            }
        );
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    getProductsStoreByUriName,
    getAllProductsStore,
    getStoreProductsByStoreId,
    createProductStore,
    updateProductStore,
    deleteProductStore
};
