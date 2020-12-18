'use strict';
const provider = require('../../dao/postalsCodes/provider');

/**
 * Get All PostalsCodes
 * @return {Promise<*>}
 */
const getAllPostalCodes = async() => {
    try {
        return await provider.getAllPostalCodes();
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get one PostalsCode by number
 * @return {Promise<*>}
 */
const getPostalCodeByNumber = async(number) => {
    try {
        return await provider.getPostalCodeByNumber(number);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get one Postals Codes by text
 * @return {Promise<*>}
 */
const getPostalCodesByString = async(text) => {
    try {
        return await provider.getPostalCodesByString(text);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllPostalCodes,
    getPostalCodeByNumber,
    getPostalCodesByString
};
