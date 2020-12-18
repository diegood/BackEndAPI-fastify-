'use strict';

const orderModel = require('./model');
const itemsModel = require('./items/model');
const requestModel = require('./request/model');
const productStoreModel = require('../productStore/model');
const Sequelize = require('sequelize');
const { ORDER_STATE } = require('../../config/constants');
const Op = Sequelize.Op;

orderModel.hasMany(itemsModel);
itemsModel.belongsTo(orderModel);
itemsModel.belongsTo(productStoreModel);
productStoreModel.hasMany(itemsModel);

/**
 * Get all orders by Store id
 * @param {string} storeId
 * @param {string} preparationDate
 * @param {string} status
 * @return {Promise<*>}
 */
const findAllOrdersByStoreId = async(storeId, preparationDate, status) => {
    try {
        const CURRENT_DAY = new Date().toISOString().split('T')[0];
        const statusNames = status || { [Op.ne]: ORDER_STATE.NEW };
        const dayOrder = preparationDate || CURRENT_DAY;
        const filters = { storeId };

        if (preparationDate) {
            filters.preparationDate = dayOrder;
        }
        
        filters.status = statusNames;

        return await orderModel.findAll({
            include: [ { model: itemsModel, include:[productStoreModel] }],
            where: filters,
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * create Order
 * @param order
 * @return {Promise<*>}
 */
const createOrder = async(order) => {
    try {
        return await orderModel.create(order,{
            include: [{model: itemsModel, as: 'items'}],
            returning: true, 
            plain: true
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Find Order By Id
 * @param id
 * @return {Promise<*>}
 */
const findOrderById = async(id) => {
    try {
        return await orderModel.findOne({
            include: [ { model: itemsModel } ],
            where: {id}
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Update order
 * @param order
 * @return {Promise<*>}
 */
const updateOrder = async(order) => {
    try {
        return await orderModel.update(order,{
            where: {
                id: order.id,
            },
            returning: true,
            plain: true
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};
module.exports = {
    createOrder,
    findAllOrdersByStoreId,
    findOrderById,
    updateOrder,
};
