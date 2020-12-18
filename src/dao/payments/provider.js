'use strict';

const model = require('./model');
const requestModel = require('./../orders/request/model');
const Sequelize = require('sequelize');

model.belongsTo(requestModel);

/**
 * Get All customer payments
 * @return {Promise<*>}
 */
const findAll = async() => {
    try {
        return await model.findAll({
            include:[requestModel],
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Get customer payments by payment Id
 * @param {string} id
 * @return {Promise<*>}
 */
const findById = async(id) => {
    try {
        return await model.findOne({  where: {  id },  include:[requestModel] });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};
/**
 * Get customer payments by request Id
 * @param {string} requestId
 * @return {Promise<*>}
 */
const findByRequestId = async(requestId) => {
    try {
        return await model.findAll({  where: {  requestId } });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Get customer payments by request Id and transactionType and transactionCode
 * @param {string} requestId
 * @param {string} transactionType
 * @param {string} transactionCode
 * @return {Promise<*>}
 */
const findByParams = async(requestId, transactionType, transactionCode) => {
    try {
        return await model.findAll({  where: {  requestId, transactionType, transactionCode } });
    } catch (error) {   
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Get customer payments by request Id
 * @param {CustomerPaymentModel} payment
 * @return {Promise<*>}
 */
const create = async(payment) => {
    try {
        return await model.create( payment );
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    findById,
    findAll,
    findByRequestId,
    findByParams,
    create,
};
