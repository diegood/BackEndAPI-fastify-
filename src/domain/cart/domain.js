'use strict';
const provider = require('../../dao/cart/provider');

/**
 * Create Cart
 * @param {string} userId
 * @param {string} currency
 * @param {object} items
 * @return {Promise<*>}
 */
const createCart = async(userId, currency, items) => {
    try {
        const cart = {
            currency,
            items,
        };

        if (userId) {
            cart.userId = userId;
        };
        return await provider.createCart(cart);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Update Cart
 * @param {string} cartId
 * @param {string} currency
 * @param {object} items
 * @param {string} shippingAddressId
 * @param {string} userId
 * @return {Promise<*>}
 */
const updateCart = async(id, currency, items, shippingAddressId, userId, pickup, billingAddressId) => {
    try {
        const cart = {
            userId,
            currency,
            items,
            pickup
        };
        if (billingAddressId) {
            cart.billingAddressId = billingAddressId;
        }
        if (shippingAddressId) {
            cart.addressId = shippingAddressId;
        }
        return await provider.updateCart(cart, id);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Find Cart
 * @param {string} cartId
 * @return {Promise<*>}
 */
const findCart = async(cartId) => {
    try {
        return await provider.findCart(cartId);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @description Find Cart by user Id
 * @param {string} userId
 * @return {Promise<*>}
 */
const findCartByUserId = async(userId) => {
    try {
        return await provider.findCartByUserId(userId);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createCart,
    updateCart,
    findCart,
    findCartByUserId
};
