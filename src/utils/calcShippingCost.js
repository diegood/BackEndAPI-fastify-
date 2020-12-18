const MIN_ORDER_TOTAL = parseFloat(process.env.MIN_ORDER_TOTAL);
const FREE_SHIP = parseFloat(process.env.FREE_SHIP);
const LOCAL_SHIP_PRICE = parseFloat(process.env.LOCAL_SHIP_PRICE);
const REGULAR_SHIP_PRICE = parseFloat(process.env.REGULAR_SHIP_PRICE);
const { SHIPPING_TYPES } = require('../config/constants');
const shippingService = require('../services/shipping/selectShippingMethod');
const Decimal = require('decimal.js');

const shipIsLocal = (localPostalCodes, userAddressCP) => {
    return localPostalCodes.includes(userAddressCP);
}

const isFreeShip = (orderTotal, minOrderTotal) => {
    return orderTotal > minOrderTotal;
}
const shipCost = (isLocal) => {
    return isLocal ? LOCAL_SHIP_PRICE : REGULAR_SHIP_PRICE;
}

const calcMRWCost = (localPostalCodes, userAddressCP, orderTotal) => {
    const isLocal = shipIsLocal(localPostalCodes, userAddressCP)
    const freeShip = isFreeShip(orderTotal, MIN_ORDER_TOTAL);

    return freeShip ? FREE_SHIP : shipCost(isLocal);
}

const calcShipCosts = async (localPostalCodes, userAddressCP, orderTotal, store, cart) => {
    const storeId = store.id;
    const cartAddressId = cart.addressId;
    const pickup = cart.pickup;
    const cartLogisticType = pickup ? SHIPPING_TYPES.PICKUP : await shippingService.selectShippingMethod(storeId, cartAddressId);
    const orderTotalDecimal = new Decimal(orderTotal).toPrecision(5);

    const shipCost = cartLogisticType === SHIPPING_TYPES.MRW            ?
        calcMRWCost(localPostalCodes, userAddressCP, orderTotal) :
        FREE_SHIP;

    const orderWithShip = shipCost+orderTotal;
    return {
        storeId,
        storeName: store.name,
        logisticType: cartLogisticType,
        shippingCost: shipCost,
        orderTotal: orderTotalDecimal,
        orderWithShip,
        orderTotalWithShipping: new Decimal(orderWithShip).toPrecision(5),
    };
}

module.exports = { calcShipCosts };