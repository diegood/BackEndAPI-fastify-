const serviceCreateShipping  = require('../shipping/createShippingByRequestId')
const { REQUEST_STATE } = require('../../config/constants')

const solve = (QueueMessage) => {
  async function createShipping() {
    await serviceCreateShipping.createShippingByRequestId(QueueMessage.getReference);
  }
  function updateOrder() {
     //TODO update orders? because only 1 is ready assumption from first ticket upload
    return 'pickup ready';
  }
  function retryPreauth() {
    //TODO How to retry payment
    //return await paymentDomain.createPaymentByRedysFormData(merchantParamsDecoded, requestId);
    return 'retry preauthorization';
  }
  function cancelOrder() {
    //TODO cancel order - cancel shipping - mail to user - mail to admin
    return 'cancel order';
  }
  const messages = {
    [REQUEST_STATE.PREAUTHORIZED]: createShipping,
    [REQUEST_STATE.AUTHORIZED]: updateOrder,
    [REQUEST_STATE.PREAUTHORIZED_REJECT]: retryPreauth,
    [REQUEST_STATE.AUTHORIZED_REJECT]: cancelOrder,
  };
  return messages[QueueMessage.newStatus.newStatus]();
}

module.exports = { solve }