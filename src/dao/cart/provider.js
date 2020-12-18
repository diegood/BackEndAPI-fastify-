'use strict';

const model = require('./model');
const addressModel = require('../address/model');

model.belongsTo(addressModel);
/**
 * Create cart
 * @param {object} cart
 * @return {Promise<*>}
 */
const createCart = async(cart) => {
    try {
        return await model.create(cart);
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error.message);
    }
};

/**
 * Update cart
 * @param {object} cart
 * @return {Promise<*>}
 */
const updateCart = async(cart, id) => {
    try {
        return await model.update(
            cart, {
            include: [ { model: addressModel, as: 'address'} ],
            where: { id },
            returning: true,
            plain: true
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error.message);
    }
};

/**
 * Find cart
 * @param {string} cartId
 * @return {Promise<*>}
 */
const findCart = async(cartId) => {
    try {
        return await model.findOne({
            include: [ { model: addressModel } ],
            where: {
                id: cartId
            },
            plain: true
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error.message);
    }
};

/**
 * Find cart by user Id
 * @param {string} userId
 * @return {Promise<*>}
 */
const findCartByUserId = async(userId) => {
    try {
        return await model.findOne({
            include: [ { model: addressModel } ],
            where: { userId },
            order: [['updated_date', 'DESC']],
            plain: true
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error.message);
    }
};

module.exports = {
    createCart,
    updateCart,
    findCart,
    findCartByUserId
};
