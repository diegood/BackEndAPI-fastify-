'use strict';
const util = require('../../utils/groupBy');
const { PREPARATION_DATE } = require('../../config/constants');

/**
 * @function mapOrdersResponse
 * @param {*} orders
 * @return {*}
 */
const mapOrdersResponse = async (orders) => {

    const ordersByDate = util.groupBy(orders, PREPARATION_DATE);
    const dailyOrders = [];

    Object.keys(ordersByDate).map((key)=> {
        const index = Object.keys(ordersByDate).indexOf(key) + 1;
        
        const filteredItems = ordersByDate[key].map((o) => {
            const formattedItems = o.items.map((item) => {
                const customItem = {
                    name: item.productStore.name,
                    quantity: item.quantity,
                    packages: item.quantityPackages
                }
                return customItem;
            });
            return formattedItems;
        })
        const flatItems = [].concat.apply([],filteredItems);
        const reducedData = flatItems.reduce((ac, {name, quantity, packages}) => {
            let aj;
            ac[name] = ac[name] || 0;
            ac[name] += quantity * packages;
            return ac
        },{})
        const parsedTotals = Object.entries(reducedData).map(([key, value]) => ({
            name: key,
            quantity: value
        }));

        const requestOrders = ordersByDate[key].map((order) => {
            const orderItems = order.items.map((item)=>{
                return {
                    id: item.id,
                    order_requestId: item.orderId,
                    done: item.done,
                    quantity: item.quantity,
                    product: item.productStore.name,
                    making: item.variant,
                    amount: `${item.productStore.price} €/Kg`,
                    substitution: item.substitution,
                    clarifications: item.clarifications,
                    maxPrice: `${item.maxPrice} €/Kg`,
                    packages: item.quantityPackages,
                }
            });

            return {
                id: order.id,
                preparation_date: order.preparationDate,
                status: order.status,
                deliveryDate: order.deliveryDate,
                logisticType: order.logisticType,
                trackNumber: order.trackNumber,
                retainedPrice: order.retainedPrice,
                realPrice: order.realPrice,
                ticketNumber: order.ticketNumber,
                ticketImageId: order.ticketImageId,
                items: orderItems,
            }
        })

        
        const dailyOrder = {
            id: index,
            prepartionDate: key,
            totals: parsedTotals,
            ordersRequest: requestOrders
        };
        dailyOrders.push(dailyOrder);
        return ordersByDate[key];
    });

    return dailyOrders;
};

module.exports = {
    mapOrdersResponse,
};