const model = require('./model');

/**
 * Get Address by id
 * @return {Promise<*>}
 */
const getByStoreId = async(id) => {
    try {
        return await model.findOne({
            where: {storeId: id},
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Update Logistic Store
 * @param {object} address
 * @return {Promise<*>}
 */
const updateStore = async(logisticStore, storeId) => {
    try {
        const storeToUpdate = await getByStoreId(storeId);
        const idToUpdate = storeToUpdate ? storeToUpdate.id : null;
        if (idToUpdate) {
            logisticStore.id = idToUpdate;
        }

        return await model.upsert(
            logisticStore,
            {
                where: { id: idToUpdate },
                returning: true,
                plain: true
            }
        );
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    getByStoreId,
    updateStore,
};
