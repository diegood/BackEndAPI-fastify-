
const { ORDER_STATE } = require('../../config/constants');
const serviceUpdate = require('./updateOrderStatus');

const processLocalAndPickup = async(localAndPickupOrders) => {
    const updateOrders = [];
    localAndPickupOrders.forEach((order) => {
        const status = ORDER_STATE.PENDING;
        order.deliveryDate =  order.order.date;
        updateOrders.push(serviceUpdate.updateShippingOrder(status, order))
    })
    const updatedOrders =  await Promise.all(updateOrders);
    return updatedOrders;
}

module.exports = { processLocalAndPickup };