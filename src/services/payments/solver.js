const { REQUEST_STATE, REDSYS_TRANSACTIONS_TYPES } = require('../../config/constants');
const { findById } = require('../../domain/payments/domain');
const orderRequestDomain = require('../../domain/orders/request/domain');

const solve = async (QueueMessage) => {
  const payment = await findById(QueueMessage.getReference)

  async function preauthorization() {
    return await preauthorizationCase(payment);
  }
  async function confirmation() {
    return await confirmationCase(payment);
  }

  const messages = {
    [REDSYS_TRANSACTIONS_TYPES.PREAUTHORIZATION]: preauthorization,
    [REDSYS_TRANSACTIONS_TYPES.PREAUTHORIZATION_CONFIRMATION]: confirmation
  };

  return messages[payment.transactionType]();
}

const preauthorizationCase = async(payment) => {
  if(payment.transactionCodeRaw > -1 && payment.transactionCodeRaw < 100){
    return await orderRequestDomain.updateRequestStatus(payment.requestId, REQUEST_STATE.PREAUTHORIZED);
  }else{
    return await orderRequestDomain.updateRequestStatus(payment.requestId, REQUEST_STATE.PREAUTHORIZED_REJECT);
  }
}

const confirmationCase = async (payment) => {
  if(payment.transactionCodeRaw > -1 && payment.transactionCodeRaw < 100){
    return await orderRequestDomain.updateRequestStatus(payment.requestId, REQUEST_STATE.AUTHORIZED);
  }else{
    return await orderRequestDomain.updateRequestStatus(payment.requestId, REQUEST_STATE.AUTHORIZED_REJECT);
  }
}
module.exports = { solve }