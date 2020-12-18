'use strict';
const provider = require('../../../dao/logistics/store/provider');

/**
 * Get one logistic store by id
 * @param {string} id
 * @return {Promise<*>}
 */
const getById = async(id) => {
    try {
        return await provider.getByStoreId(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Create logistic store
 * @param {object} store
 * @param {object} address
 * @return {Promise<*>}
 */
const update = async(store, logistic, address) => {
    try {
        const logisticStore = {
            storeId: store.id,
            addressId: address.id,
            owncourier: logistic.owncourier,
            pickup: logistic.pickup,
            preparationTime: logistic.preparationTime,
            postalCodes: logistic.postalCodes,
            contactPhone: logistic.contactPhone,
            contactEmail: logistic.contactEmail
        }
        const storeId = store.id;
        
        return await provider.updateStore(logisticStore, storeId);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getById,
    update
};
