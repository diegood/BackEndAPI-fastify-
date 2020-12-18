const domain = require('../../domain/orders/domain');

/**
 * @function updateOrder
 * @param order
 * @return {Promise<*>}
 */
const updateOrder = async(order) => {
    try {
        return await domain.updateOrder(order);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateOrder,
};
