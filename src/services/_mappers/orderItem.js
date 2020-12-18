'use strict';

/**
 * @function mapOrderItemResponse
 * @param {*} item
 * @return {*}
 */
const mapOrderItemResponse = async (item) => {
    return {
        id: item[1].id,
        done: item[1].done,
        quantity: item[1].quantity,
        variant: item[1].variant,
        price: item[1].price,
        substitution: item[1].substitution,
        clarifications: item[1].clarifications
    };
};

module.exports = {
    mapOrderItemResponse,
};
