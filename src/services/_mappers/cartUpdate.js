'use strict';

/**
 * @function mapCartResponse
 * @param {*} item
 * @return {*}
 */
const mapCartResponse = async (cartResponse) => {
    const cart = cartResponse[1];
    return {
        id: cart.id,
        userId: cart.userId,
        pickUpStore: cart.pickup,
        currency: cart.currency,
        items: cart.items,
        billingAddressId: cart.billingAddressId,
        shippingAddressId: cart.addressId

    };
};

module.exports = {
    mapCartResponse,
};
