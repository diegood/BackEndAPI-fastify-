const roleDomain = require('../../domain/roles/domain');
const ERRORS = require('../../api/errors');

/**
 * @function getRole
 * @param {string} role
 * @return {Promise<*>}
 */
const getRole = async(role) => {
    try {
        const roleId = await roleDomain.getRole(role);
        if (!roleId) {
            throw new Error(ERRORS['/user/post/invalid'])
        }
        return roleId;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getRole,
};
