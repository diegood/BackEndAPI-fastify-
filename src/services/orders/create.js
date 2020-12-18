const domain = require('../../domain/orders/domain');
const { mapOrderUpdateResponse } = require('../_mappers/orderUpdate');
const { SHIPPING_TYPES, ORDER_STATE } = require('../../config/constants');
const shippingService = require('../shipping/selectShippingMethod');
/**
 * @function createOrderFromStoreList
 * @param storeList
 * @return {Promise<*>}
 */
const createOrderFromStoreList = async(storeList, orderTotals, cart, requestId) => {
    try {
        const addressId = cart.addressId;
        const buildItemList = (items)=>{
            return items.map(item => {
                return {
                    productStoreId: item.id,
                    done: false,
                    quantity: item.unitWeight,
                    variant: item.presentation,
                    price: item.price,
                    maxPrice: item.maximumPrice,
                    substitution: item.alternatives,
                    clarifications: item.message
                }
            });
        };

        return Object.keys(storeList).map(async (storeId)=> {
            const store = storeList[storeId];
            const cartLogisticType = cart.pickup ? SHIPPING_TYPES.PICKUP : await shippingService.selectShippingMethod(storeId, addressId);
            const order = {
                storeId,
                requestId,
                addressId: addressId,
                status: ORDER_STATE.NEW,
                logisticType: cartLogisticType,
                retainedPrice: orderTotals[storeId],
                items: buildItemList(store)
            }
            await domain.createOrder(order);
        })
    } catch (error) {
        throw new Error(error.message);
    }
};
/**
 * @function createOrder
 * @param order
 * @return {Promise<*>}
 */
const createOrder = async(order) => {
    try {
        const orderUpdated = await domain.createOrder(order);
        return mapOrderUpdateResponse(orderUpdated);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createOrderFromStoreList,
    createOrder,
};
