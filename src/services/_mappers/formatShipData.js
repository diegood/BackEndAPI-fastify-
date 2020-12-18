const calcShipMapper = require('../_mappers/calculateShipDate');


const orderShippingDate = (order) => {
    const preparationTime = order.store.storePreparationTime;
    const storeBussinesHours = order.store.storeBussinesHours;
    const shippingDate = calcShipMapper.calculateShipDate(storeBussinesHours, preparationTime);

    return shippingDate;
}

const formatShipData = (completeOrdersData, completeUserData) => {
    return completeOrdersData.map((order) => {
        const shippingDateTime = orderShippingDate(order);

        order.user = completeUserData;
        order.order = {
            date: shippingDateTime.pickingDate,
            timeFrom: shippingDateTime.fromTime,
            timeTo: shippingDateTime.toTime,
            number: order.orderId,
            weight: 8
        };
        return order;
    })
}

module.exports = { formatShipData };
