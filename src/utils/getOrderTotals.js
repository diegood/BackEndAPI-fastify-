const getOrderTotals = (ordersByStore) => {
    let orderTotals = {};
    Object.keys(ordersByStore).forEach(storeId => {
        const orderTotal = ordersByStore[storeId].reduce((sum, item) => sum + (item.price*item.unitWeight)* item.units, 0);
        orderTotals[storeId] = {
            orderTotal: orderTotal
        };
    });
    return orderTotals;
}

module.exports = { getOrderTotals };