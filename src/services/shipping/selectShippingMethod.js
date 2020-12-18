const { SHIPPING_TYPES } = require('../../config/constants');
const logisticAddressDomain = require('../../domain/logistics/address/domain');
const logisticStoreDomain = require('../../domain/logistics/store/domain');

const getUserAddressCP = async (addressId) => {
    try {
        const userAddressCP = await logisticAddressDomain.getById(addressId);
        return userAddressCP[0].postalCode;
    } catch (error) {
        return error;
    }
}

const setShipCourier = async (storePostalCodes, addressId) => {
    try {
        const userPostalCode = await getUserAddressCP(addressId);
        const isLocal = storePostalCodes.includes(userPostalCode);
        return isLocal ? SHIPPING_TYPES.LOCAL : SHIPPING_TYPES.MRW;
    } catch (error) {
        return error;
    }
}

const selectShippingMethod = async (storeId, addressId) => {
    try {
        const logisticStore = await logisticStoreDomain.getById(storeId);
        const storePostalCodes = logisticStore.postalCodes;
        const storeOwnLocalCourier = logisticStore.owncourier;

        return storeOwnLocalCourier ? setShipCourier(storePostalCodes, addressId) : SHIPPING_TYPES.MRW;
    } catch (error) {
        console.error('selectShippingMethod ', error)
        return error;
    }
}

module.exports = {selectShippingMethod};