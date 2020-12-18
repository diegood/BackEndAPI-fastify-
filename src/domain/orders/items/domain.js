'use strict';
const provider = require('../../../dao/orders/items/provider');

/**
 * Get one Item by Id
 * @param {string} id
 * @return {Promise<*>}
 */
const getItemById = async(id) => {
    try {
        return await provider.findItemById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Update item
 * @param {string} item
 * @return {Promise<*>}
 */
const updateItem = async(item) => {
    try {
        const savedItem = await provider.findItemById(item.id);
        let itemToUpdate = savedItem;

        if (item.done) itemToUpdate.done = item.done;
        if (item.quantity) itemToUpdate.quantity = item.quantity;
        if (item.price) itemToUpdate.price = item.price;

        return await provider.updateItem(itemToUpdate);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getItemById,
    updateItem,
};
