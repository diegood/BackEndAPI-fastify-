const userRoleDomain = require('../../domain/users/roles/domain');

/**
 * @function addUserRole
 * @param {object} roleData
* @param {object} roleData
 * @return {Promise<*>}
 */
const addUserRole = async(user, role) => {
    try {
        const roleId = role.id;
        const userId = user.id;

        await userRoleDomain.addUserRole(userId, roleId);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    addUserRole,
};
