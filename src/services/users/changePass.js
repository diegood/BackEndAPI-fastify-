const userDomain = require('../../domain/users/domain');
/**
 * @function changePass
 * @param {string} newPassword
 * @param {string} userId
 * @return {Promise<*>}
 */
const changePass = async(newPassword, userId) => {
    try {
        return await userDomain.changePass(newPassword, userId);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    changePass,
};
