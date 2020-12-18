'use strict';
const serviceUser = require('../../../../../services/users/createUser');
const serviceUserRole = require('../../../../../services/usersRoles/addUserRole');
const serviceRole = require('../../../../../services/roles/getRole');
const userMapper = require('../../../../../services/_mappers/users');
const ERRORS = require('../../../../errors');
const crypt = require('../../../../../utils/hash');
const jwt = require('../../../../../utils/jwtToken');
const { GUEST, OWNER } = require('../../../../../config/constants');
const serviceStore = require('../../../../../services/stores/create');
const serviceUserStore = require('../../../../../services/users/createUserStore');
/**
 * @function signupUser
 * @param {Request} request Http Request
 * @param reply
 * @return {Promise<void>}
 */
const signupUser = async(request, reply) => {
    try {
        const user = request.body;
        const role = user.role || GUEST;

        const roleObject = await serviceRole.getRole(role);
        user.password = await crypt.hashPassword(request.body.password);
        const userCreated = await serviceUser.createUser(user);
        await serviceUserRole.addUserRole(userCreated, roleObject);
        const tokenResponse = await jwt.signToken(request, userCreated.id);
        if (role === OWNER) {
            const store = await serviceStore.createStore();
            await serviceUserStore.createUserStore(userCreated, store);
        }

        const response = await userMapper.userWithToken(tokenResponse, userCreated);
        reply.code(201).send(response);
    } catch (error) {
        if (error.message === 'UserAlreadyExist') {
            reply.conflict(ERRORS['/user/post/invalid']);
        } else {
            console.log('error', error)
            reply.internalServerError(ERRORS['/internalServerError']);
        }
    }
};

module.exports = {
    handler: signupUser,
    schema: require('./schema.json'),
};
