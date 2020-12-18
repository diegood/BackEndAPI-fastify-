'use strict';

const model = require('./model');

/**
 * insert image
 * @param {object} cart
 * @return {Promise<*>}
 */
const insertImage = async(image) => {
    try {
        return await model.create(image);
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error.message);
    }
};

module.exports = {
    insertImage,
};
