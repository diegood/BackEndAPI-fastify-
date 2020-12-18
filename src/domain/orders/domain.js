const provider = require('../../dao/orders/provider');
const {ORDER_STATE, ENTITIES_TYPES} = require('../../config/constants')
const QueueMessage = require('../../queue/QueueMessage').QueueMessage


/**
 * Get Find All Orders By Store Id
 * @param {string} storeId
 * @param {string} preparationDate
 * @param status
 * @return {Promise<*>}
 */
const findAllOrdersByStoreId = async(storeId, preparationDate, status) => {
    try {
        return await provider.findAllOrdersByStoreId(storeId, preparationDate, status);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get one Order by Id
 * @param {string} id
 * @return {Promise<*>}
 */
const getOrderById = async(Id) => {
    try {
        return await provider.findOrderById(Id);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Update order
 * @param {string} id
 * @return {Promise<*>}
 */
const updateOrder = async(order) => {
    try {
        //const lastOrder = await provider.findOrderById(Id)
        const orderToUpdate = {
            id : order.id,
            status : order.status
        }
        if (order.deliveryDate) {
            orderToUpdate.deliveryDate = order.deliveryDate;
        }
        if (order.preparationDate) {
            orderToUpdate.preparationDate = order.preparationDate;
        }
        if (order.trackNumber) {
            orderToUpdate.trackNumber = order.trackNumber;
        }
        if (order.ticketNumber) {
            orderToUpdate.ticketNumber = order.ticketNumber;
        }
        if (order.ticketImageId) {
            orderToUpdate.ticketImageId = order.ticketImageId;
        }
        const updatedOrder = await provider.updateOrder(orderToUpdate);
        //todo set updatedOrder as evaluator updatedOrder[1].status
        if(orderToUpdate.status === ORDER_STATE.PICKUP_READY) new QueueMessage(ENTITIES_TYPES.ORDER, order.id, order.status, orderToUpdate).send()
        console.log('-----> updated Order ----->',updatedOrder[1]);
        return updatedOrder
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * create order
 * @param {object} order
 * @return {Promise<*>}
 */
const createOrder = async(order) => {
    try {
        return await provider.createOrder(order);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createOrder,
    findAllOrdersByStoreId,
    getOrderById,
    updateOrder,
};
