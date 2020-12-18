const cartDomain = require('../../domain/cart/domain');
const storeDomain = require('../../domain/store/domain');
const util = require('../../utils/groupBy');
const ship = require('../../utils/calcShippingCost');
const utilOrders = require('../../utils/getOrderTotals');
const Decimal = require('decimal.js');
/**
 * @function shippingCost
 * @param {string} cartId
 * @return {Promise<*>}
 */
const shippingCost = async(cartId) => {
    try {
        const storesRequest = [];
        const shippingCosts = [];
        const cart = await cartDomain.findCart(cartId);
        const cartPostalCode = cart.address.postalCode;
        const ordersByStore = util.groupBy(cart.items, 'storeId');
        const orderTotals = utilOrders.getOrderTotals(ordersByStore);

        Object.keys(ordersByStore).map((storeId)=> {
            storesRequest.push(storeDomain.getById(storeId));
        })

        const promisesStores = await Promise.all(storesRequest);
        promisesStores.forEach((store) => {
            const orderTotal = orderTotals[store.id].orderTotal;
            const storeLocalPostalCodes = store.logisticStore.postalCodes;
            shippingCosts.push(ship.calcShipCosts(storeLocalPostalCodes, cartPostalCode, orderTotal, store, cart))
        });
        const promisesShipCosts = await Promise.all(shippingCosts);
        const allOrdersTotal = promisesShipCosts.reduce((accu, item) => accu + item.orderWithShip, 0);
        const cartTotal = new Decimal(allOrdersTotal).toPrecision(5);
        return {
            cartTotal,
            storeOrders: promisesShipCosts
        };

    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
};

module.exports = {
    shippingCost,
};
