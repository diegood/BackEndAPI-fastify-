const userDomain = require('../../domain/users/domain');
/**
 * @function getUserByEmail
 * @param {string} email
 * @return {Promise<*>}
 */
const getUserByEmail = async(email) => {
    try {
        return await userDomain.getUserByEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @function getUserById
 * @param {string} id
 * @return {Promise<*>}
 */
const getUserById = async(id) => {
    try {
        return await userDomain.getUser(id);
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    getUserByEmail,
    getUserById,
};
