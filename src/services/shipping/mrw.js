const shipOrdersService = require('./shipOrders');

const processMRW = async(ordersMRW) => {
    try {
        //send ship and update order status for each order in order request
        return await shipOrdersService.shipOrders(ordersMRW);
    } catch(error) {
        return error;
    }
}

module.exports = { processMRW };