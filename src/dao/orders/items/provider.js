'use strict';

const model = require('./model');
/**
 * Find item by id
 * @param id
 * @return {Promise<*>}
 */
const findItemById = async(id) => {
    try {
        return await model.findOne({
            where: {id},
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * update Item
 * @param item
 * @return {Promise<*>}
 */
const updateItem = async(item) => {
    try {
        return await model.update(
            {
                done: item.done,
                quantity: item.quantity,
                price: item.price
            }, 
            {
                where: {
                    id: item.id
                },
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
    updateItem,
    findItemById,
};
