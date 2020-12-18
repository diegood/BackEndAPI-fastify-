const { orderRequestById } = require('./../request/byId')
const servicePayment = require('./../payments/signForm')
const orderProvider = require('./../../dao/orders/provider');
const { ORDER_STATE, REQUEST_STATE } = require('../../config/constants')

const solve = async (QueueMessage) => {
  async function pickupReady() {
    return await pickupReadyCase(QueueMessage);
  }
  async function updateOrder() {
    return await updateCase(QueueMessage);
  }

  const messages = {
    [ORDER_STATE.PICKUP_READY]: pickupReady,
    [ORDER_STATE.PENDING]: updateOrder,
    [ORDER_STATE.WAITING_TICKET]: updateOrder,
  };

  return messages[QueueMessage.newStatus.newStatus](); //
}


const pickupReadyCase = async (QueueMessage) => {
  const body = QueueMessage.getBody;
  const orderDetail = await orderProvider.findOrderById(body.reference);
  const orderRequest = await orderRequestById(orderDetail.requestId);
  if(orderRequest.status === REQUEST_STATE.PREAUTHORIZED){
    return await servicePayment.confirmPayment(orderRequest)
  }
  return 
}

const updateCase = async (QueueMessage) => {
  const body = QueueMessage.getBody;
  return await orderProvider.updateOrder(body.order);
}

module.exports = { solve }