const storeDomain = require('../../domain/store/domain');
const logisticAddressDomain = require('../../domain/logistics/address/domain');
const logisticStoreDomain = require('../../domain/logistics/store/domain');

const { mapStoreUpdateResponse } = require('../_mappers/storeUpdate');
/**
 * @function updateStore
 * @param {object} store
 * @param {object} billing
 * @param {object} logistic
 * @return {Promise<*>}
 */
const updateStore = async(store, billing, logistic) => {
    try {
        const warehouseAdress = logistic.address;
        let updatedAddress = {};
        let logisticAddress = {};

        if (warehouseAdress) {
            logisticAddress.type = 'WAREHOUSE';
            logisticAddress.country = 'ES';
            logisticAddress.city = warehouseAdress.city;
            logisticAddress.street = warehouseAdress.street;
            logisticAddress.streetNumber = warehouseAdress.streetNumber;
            logisticAddress.postalCode = warehouseAdress.postalCode;
            logisticAddress.extra = warehouseAdress.extra;
            updatedAddress = await logisticAddressDomain.create(logisticAddress);
        }

        const updatedStore = await storeDomain.update(store, billing);
        const updatedLogistic = await logisticStoreDomain.update(store, logistic, updatedAddress);

        return mapStoreUpdateResponse(updatedStore, updatedAddress, updatedLogistic);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateStore,
};
