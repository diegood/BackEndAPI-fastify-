const userDomain = require('../../domain/users/domain');
/**
 * @function createUser
 * @param {object} userData
 * @return {Promise<*>}
 */
const createUser = async(user) => {
    try {
        return await userDomain.createUser(user);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createUser,
};
