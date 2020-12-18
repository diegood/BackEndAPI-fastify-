'use strict';

const model = require('./model');
const addressModel = require('./../../address/model');
const sequelize = require('sequelize');
const Op = sequelize.Op;
model.belongsTo(addressModel);

/**
 * Create UserAddress
 * @param {object} userAddress
 * @return {Promise<*>}
 */
const createUserAddress = async(userAddress) => {
    try {
        return await model.create({
            name: userAddress.name,
            priority: userAddress.priority,
            userId: userAddress.userId,
            address: userAddress.address
        },{
            include: [{model: addressModel, as: 'address'}],
            returning: true, 
            plain: true
        });
    } catch (error) {
        console.error(error, error.stack);
        if (error instanceof sequelize.UniqueConstraintError) {
            throw new Error('UserAddressAlreadyExist');
        } else {
            throw new Error(error.message);
        }
    }
};

/**
 * Get UserAddress
 * @param {string} userId
 * @return {Promise<*>}
 */
const getUserAddress = async(userId) => {
    try {
        return await model.findOne({
            include: [ {model: addressModel}],
            where: {
                id: userId,
            },
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};
/**
 * Get UserAddress
 * @param {string} userId
 * @return {Promise<*>}
 */
const getAllUserAddresses = async(userId, type) => {
    try {
        return await model.findAll({
            include: [ {model: addressModel, where: { type }}],
            where: {
                userId,
            },
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Disable userAddress
 * @param {string} userAddressID
 * @return {Promise<*>}
 */
const disableUserAddress = async(id) => {
    try {
        return await model.update({enabled: false, priority: false}, {
            where: {
                addressId: id
            }
        });
    } catch (error) {
        console.error('SQL disableUserAddress: ',error, error.stack);
        throw new Error(error);
    }
}

/**
 * Update userAddresses by array of Ids
 * @param {Array} addressIdArray
 * @return {Promise<*>}
 */
const updateUserAddresses = async(addressIdArray) => {
    try {
        return await model.update({priority: false}, {
            where: {
                id: {
                    [Op.in]: addressIdArray
                }
            }
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
}
module.exports = {
    getUserAddress,
    createUserAddress,
    disableUserAddress,
    getAllUserAddresses,
    updateUserAddresses
};
