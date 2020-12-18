const orderRequestService = require('../request/byId');
const utils = require('../../utils/groupBy');
const { SHIPPING_TYPES } = require('../../config/constants');
const objectUtils = require('../../utils/objectIsEmpty');
const serviceProcess = require('./processOrders');
/**
 * @function createShippingByRequestId
 * @param {string} requestId
 * @return {Promise<*>}
 */
const createShippingByRequestId = async(requestId) => {
    try {
        const orderRequest = await orderRequestService.orderRequestById(requestId);
        const ordersByStore = utils.groupBy(orderRequest.orders, 'storeId');

        const localAndPickupOrders = Object.keys(ordersByStore)
        .filter((key)=> ordersByStore[key][0].logisticType !== SHIPPING_TYPES.MRW)
        .reduce((obj, key) => {
            obj[key] = ordersByStore[key];
            return obj;
        }, {});

        const mrwOrders = Object.keys(ordersByStore)
        .filter((key)=> ordersByStore[key][0].logisticType === SHIPPING_TYPES.MRW)
        .reduce((obj, key) => {
            obj[key] = ordersByStore[key];
            return obj;
        }, {});

        if(!objectUtils.isEmpty(mrwOrders)) {
            await serviceProcess.processOrders(orderRequest, mrwOrders, SHIPPING_TYPES.MRW );
        }

        if(!objectUtils.isEmpty(localAndPickupOrders)) {
            await serviceProcess.processOrders(orderRequest, localAndPickupOrders, SHIPPING_TYPES.LOCAL);
        }
 
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    createShippingByRequestId
};
