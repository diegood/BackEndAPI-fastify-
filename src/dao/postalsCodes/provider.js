'use strict';

const model = require('./model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * Get All Postals Code
 * @return {Promise<*>}
 */
const getAllPostalCodes = async() => {
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
 * Get PostalCode By Id
 * @param {string} PostalCodeId
 * @return {Promise<*>}
 */
const getPostalCodeById = async(PostalCodeId) => {
    try {
        return await model.findOne({
            where: {
                id: PostalCodeId,
            },
            raw: true,
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Get PostalCode By Number
 * @param {string} PostalCodeNumber
 * @return {Promise<*>}
 */
const getPostalCodeByNumber = async(PostalCodeNumber) => {
    try {
        return await model.findOne({
            where: {
                postalCode: PostalCodeNumber,
            },
            raw: true,
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Get Postals Codes By String
 * @param {string} PostalCodeString
 * @return {Promise<*>}
 */
const getPostalCodesByString = async(text) => {
    try {
        return await model.findAll({
            where: {
                [Op.or]: [
                    { localTownCode: { [Op.like]: `%${text}%`} },
                    { postalCode: { [Op.like]: `%${text}%`} },
                    { neighborhoods: { [Op.like]: `%${text}%`} },
                    { regionName: { [Op.like]: `%${text}%`,} },
                    { cityName: { [Op.like]: `%${text}%`,} },
                    { localTown: { [Op.like]: `%${text}%`,} }
                ]
            },
            raw: true,
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    getPostalCodeById,
    getAllPostalCodes,
    getPostalCodeByNumber,
    getPostalCodesByString
};
