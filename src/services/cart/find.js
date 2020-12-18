const cartDomain = require('../../domain/cart/domain');

/**
 * @function findCart
 * @param {string} cartId
 * @return {Promise<*>}
 */
const find = async(cartId) => {
    try {
        const cart = await cartDomain.findCart(cartId);
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @function findByUserId
 * @param {string} cartId
 * @return {Promise<*>}
 */
const findByUserId = async(userId) => {
    try {
        const cart = await cartDomain.findCartByUserId(userId);
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    find,
    findByUserId
};
