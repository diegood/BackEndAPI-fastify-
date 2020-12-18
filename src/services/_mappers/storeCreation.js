
/**
 * @function mapStoreCreationResponse
 * @param {*} createdStore
 * @return {*}
 */
const mapStoreCreationResponse = async (createdStore) => {
    return {
        store: {
            id: createdStore.id,
            name: createdStore.name,
            phoneNumber: createdStore.phoneNumber,
            uriName: createdStore.uriName
        }
    };
};

module.exports = {
    mapStoreCreationResponse,
};
