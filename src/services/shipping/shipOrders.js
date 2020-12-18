const { ORDER_STATE } = require('../../config/constants');
const service = require('./createShipping');
const serviceUpdate = require('./updateOrderStatus');

const shipOrders = async (formattedOrdersData) => {
    const shipOrders = [];
    const ordersToUpdate = [];

    formattedOrdersData.forEach((order) => {
        shipOrders.push(service.createShipping(order.user, order.store, order.order));
    })

    const shippedOrders = await Promise.all(shipOrders);
    
    shippedOrders.forEach((shippedOrder) => {
        console.log('--------SHIPPED ORDER--->', shippedOrder)
        if (shippedOrder.TransmEnvioResult && shippedOrder.TransmEnvioResult.Estado === '1') {
            const status = ORDER_STATE.PENDING;
            ordersToUpdate.push(serviceUpdate.updateShippingOrder(status, shippedOrder));
        } else {
            console.log('SHIPPING FAILED - ORDER NOT UPDATED', shippedOrder.orderId);
        }
    })
    const updatedOrders = ordersToUpdate.length > 0 ?
        await Promise.all(ordersToUpdate)           :
        null;
    return updatedOrders;
}

module.exports = { shipOrders };