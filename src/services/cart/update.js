const cartDomain = require('../../domain/cart/domain');
const { mapCartResponse } = require('../_mappers/cartUpdate');
/**
 * @function updateCart
 * @param {string} cartId
 * @param {string} currency
 * @param {object} items
 * @param {string} shippingAddressId
 * @param {string} userId
 * @param {string} pickup
 * @param {string} billingAddressId
 * @return {Promise<*>}
 */
const update = async(cartId, currency, items, shippingAddressId, userId, pickup, billingAddressId) => {
    try {
        const pickupDefault = pickup || false;
        const cart = await cartDomain.updateCart(cartId, currency, items, shippingAddressId, userId, pickupDefault, billingAddressId);
        return mapCartResponse(cart);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    update,
};
