const domain = require('../../domain/orders/items/domain.js');
const { mapOrderItemResponse } = require('../_mappers/orderItem');

/**
 * @function updateItem
 * @param order
 * @return {Promise<*>}
 */
const updateItem = async(item) => {
    try {
        const itemUpdated = await domain.updateItem(item);
        return mapOrderItemResponse(itemUpdated);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateItem,
};
