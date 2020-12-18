'use strict';
const provider = require('../../dao/images/provider');

/**
 * Create Cart
 * @param {string} userId
 * @param {string} currency
 * @param {object} items
 * @return {Promise<*>}
 */
const saveImage = async(id, path, belongsTo, alt) => {
    try {
        const img = {id, path, belongsTo, alt, name: id }
        return provider.insertImage(img);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    saveImage,
};
