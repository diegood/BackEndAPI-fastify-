const shippingMapper = require('../_mappers/getOrdersWithStoreAndUser');
const storeShipMapper = require('../_mappers/storeShipData');
const userShipMapper = require('../_mappers/formatUserShipData');
const { composeData } = require('../_mappers/shippingDataMerge');
const shipDataUtil = require('../_mappers/formatShipData');
const { SHIPPING_TYPES } = require('../../config/constants');
const serviceMRW = require('./mrw');
const serviceLocalAndPickup = require('./localAndPickup');
/**
 * @function createShippingByRequestId
 * @param {object} orderRequest
 * @param {object} orders
 * @param {string} logisticType
 * @return {Promise<*>}
 */
const processOrders = async(orderRequest, orders, logisticType) => {
    try {
        const { userAddressIdToShip, allStoresDetails, ordersToShip, storeAddressesToPick } = await shippingMapper.getOrdersWithStoreAndUser(orders);

        const formatStoreData = storeShipMapper.formatStoreData(storeAddressesToPick);
        const completeUserData = await userShipMapper.formatUserShipData(orderRequest, userAddressIdToShip);
    
        const completeStoreData = composeData(allStoresDetails, formatStoreData, 'addressId' , 'storeAddressId', 'address');
        const completeOrdersData = composeData(ordersToShip, completeStoreData, 'storeId' , 'storeId', 'store');
    
        //calculate delivery date based in bussines hours and preparation
        const formattedOrdersData = shipDataUtil.formatShipData(completeOrdersData, completeUserData);
    
        //send ship and update order status for each order in order request
        return logisticType === SHIPPING_TYPES.MRW  ? 
            await serviceMRW.processMRW(formattedOrdersData)   :
            await serviceLocalAndPickup.processLocalAndPickup(formattedOrdersData);
    } catch(error) {
        return error;
    }
}

module.exports = { processOrders };