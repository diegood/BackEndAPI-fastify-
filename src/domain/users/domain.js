'use strict';
const provider = require('../../dao/users/provider');

/**
 * Get User
 * @param {string} userId
 * @return {Promise<*>}
 */
const getUser = async(userId) => {
    try {
        return await provider.getUser(userId);
    } catch (error) {
        throw new Error(error.message);
    }
};
/**
 * Get User by email
 * @param {string} email
 * @return {Promise<*>}
 */
const getUserByEmail = async(email) => {
    try {
        return await provider.getUserByEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
};
/**
 * Create User
 * @param {object} user
 * @return {Promise<*>}
 */
const createUser = async(user) => {
    try {
        return await provider.createUser(user);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Update User
 * @param {object} user
 * @return {Promise<*>}
 */
const updateUser = async(user, userId) => {
    try {
        return await provider.updateUser(user, userId);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Change Pass
 * @param {string} newPassword
 * @param {string} userId
 * @return {Promise<*>}
 */
const changePass = async(newPassword, userId) => {
    try {
        const user = { password: newPassword };
        return await provider.updateUser(user, userId);
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    changePass,
};
