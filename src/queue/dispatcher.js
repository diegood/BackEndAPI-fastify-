//const QueueMessage = require("./QueueMessage");
const {ENTITIES_TYPES} = require('./../config/constants');
const requestSolve = require('./../services/request/solver');
const paymentSolve = require('./../services/payments/solver');
const orderSolve = require('./../services/orders/solver');

const dispatchService = (QueueMessage) => {
    switch (QueueMessage.getService) {
        case ENTITIES_TYPES.REQUEST:
            return requestSolve.solve(QueueMessage)
            break;
        case ENTITIES_TYPES.PAYMENT:
            return paymentSolve.solve(QueueMessage)
            break;
        case ENTITIES_TYPES.ORDER:
            return orderSolve.solve(QueueMessage)
            break;
        default:
            break;
    }

}

module.exports = { dispatchService };