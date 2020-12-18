'use strict';

const requestModel = require('./model');
const usersModel = require('./../../users/model');
const orderModel = require('./../model');

requestModel.belongsTo(usersModel);
requestModel.hasMany(orderModel);

/**
 * create request
 * @param request
 * @return {Promise<*>}
 */
const createRequest = async(request) => {
    try {
        return await requestModel.create(request, {
            include: [ { model: orderModel } ],
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Find request by id
 * @param {string} id
 * @return {Promise<*>}
 */
const findRequestById = async(id) => {
    try {
        return await requestModel.findOne({
            include: [ { model: orderModel },  { model: usersModel} ],
            where: {id},
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Find request by user id
 * @param storeId
 * @return {Promise<*>}
 */
const findRequestByUserID = async(userId) => {
    try {
        return await requestModel.findAll({
            include: [ { model: orderModel } ],
            where: {userId},
            order: [['updatedDate', 'DESC']],
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * update request by
 * @param requestId
 * @return {Promise<*>}
 */
const updateRequestStatus = async(id, status) => {
    try {
        return await requestModel.update(
            {status}, 
            {where: {id}}
        );
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    createRequest,
    findRequestById,
    findRequestByUserID,
    updateRequestStatus
};
