'use strict';

const model = require('./model');

/**
 * Get All Presentation
 * @return {Promise<*>}
 */
const getAll = async(role) => {
    try {
        return await model.findAll({
            raw: true,
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Get Presentation by key_name
 * @return {Promise<*>}
 */
const getPresentationByKeyName = async(nameKey) => {
    try {
        return await model.findOne({
            where: {nameKey},
            raw: true,
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};
module.exports = {
    getAll,
    getPresentationByKeyName,
};
