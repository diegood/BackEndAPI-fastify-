const storeDomain = require('../../domain/store/domain');
const { mapStoreCreationResponse } = require('../_mappers/storeCreation');
/**
 * @function createStore
 * @param {object} store
 * @return {Promise<*>}
 */
const createStore = async(store) => {
    try {
        const createdStore = await storeDomain.create(store);
        return mapStoreCreationResponse(createdStore);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createStore,
};
