const util = require('../../utils/groupBy');
const domain = require('../../domain/orders/request/domain');
const cartDomain = require('../../domain/cart/domain');
const utilOrders = require('../../utils/getOrderTotals');
const orderService = require('./../orders/create')
const shippingCostService = require('../cart/shippingCost');
const { PERCENT_RETAINED, REQUEST_STATE } = require('../../config/constants');
const Decimal = require('decimal.js');

/**
 * @function createRequest
 * @param order
 * @return {Promise<*>}
 */
const createRequest = async(cartId) => {
    try {
        const cart = await cartDomain.findCart(cartId);
        const ordersByStore = util.groupBy(cart.items, 'storeId');
        const orderTotals = utilOrders.getOrderTotals(ordersByStore);
        const grandTotal = await shippingCostService.shippingCost(cartId);
        const retainedPrice = calculateRetainedPrice(grandTotal.cartTotal);
        const totalRealPrice = new Decimal(grandTotal.cartTotal).toNumber();
        const cardRetainedPrice = new Decimal(retainedPrice).toNumber();
        const request = {
            userId: cart.userId,
            status: REQUEST_STATE.NEW,
            retainedPrice: cardRetainedPrice,
            realPrice: totalRealPrice
        }

        const requestResult = await domain.createRequest(request);
        await orderService.createOrderFromStoreList(ordersByStore, orderTotals, cart, requestResult.id);
        return requestResult;
    } catch (error) {
        throw new Error(error.message);
    }
};

const calculateRetainedPrice = (total) => {
    const parsedTotal = new Decimal(total).toNumber();
    const retainedPrice = ((PERCENT_RETAINED *parsedTotal) / 100 + parsedTotal);
    return new Decimal(retainedPrice).toPrecision(4);
}

module.exports = {
    createRequest,
};