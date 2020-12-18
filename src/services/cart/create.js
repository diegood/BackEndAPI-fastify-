const cartDomain = require('../../domain/cart/domain');

/**
 * @function createCart
 * @param {string} userId
 * @param {string} currency
 * @param {object} items
 * @return {Promise<*>}
 */
const create = async(userId, currency, items) => {
    try {
        const cart = await cartDomain.createCart(userId, currency, items);
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    create,
};
