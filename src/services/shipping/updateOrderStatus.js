const orderDomain = require('../../domain/orders/domain');

const formatOrderToUpdate = (status, order) => {
    return {
        id: order.orderId,
        deliveryDate: order.deliveryDate,
        preparationDate: order.preparationDate,
        trackNumber: order.tracking,
        status,
    };
}

const setOrderParams = (orderData) => {
    const orderToUpdate = orderData;
    orderToUpdate.tracking = orderData.TransmEnvioResult ? 
        orderData.TransmEnvioResult.NumeroEnvio                 :
        'asklocal';
    orderToUpdate.preparationDate = orderData.deliveryDate;
    return orderToUpdate;
}

const updateShippingOrder = async (status, orderData) => {
    try {
        const orderToUpdate = setOrderParams(orderData);
        const formattedOrder = formatOrderToUpdate(status, orderToUpdate);
        return await orderDomain.updateOrder(formattedOrder);
    } catch (error) {
        return error;
    }

}

module.exports = { updateShippingOrder };