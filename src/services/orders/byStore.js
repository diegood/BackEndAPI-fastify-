const domain = require('../../domain/orders/domain');
const { mapOrdersResponse } = require('../_mappers/orders');

/**
 * @function getAllOrdersByStoreId
 * @param storeId
 * @param preparationDate
 * @param status
 * @return {Promise<*>}
 */
const getAllOrdersByStoreId = async(storeId, preparationDate, status) => {
    try {
        const orders = await domain.findAllOrdersByStoreId(storeId, preparationDate, status);
        return mapOrdersResponse(orders);

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllOrdersByStoreId,
};
