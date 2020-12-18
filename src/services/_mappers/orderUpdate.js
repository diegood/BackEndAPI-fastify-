'use strict';

/**
 * @function mapOrderUpdateResponse
 * @param {*} order
 * @return {*}
 */
const mapOrderUpdateResponse = async (order) => {
    return {
        id: order[1].id,
        status: order[1].status,
        storeId: order[1].storeId,
        requestId: order[1].requestId,
        preparationDate: order[1].preparationDate,
        deliveryDate: order[1].deliveryDate,
        logisticType: order[1].logisticType,
        ticketNumber: order[1].ticketNumber,
        ticketImageId: order[1].ticketImageId
    };
};

module.exports = {
    mapOrderUpdateResponse,
};
