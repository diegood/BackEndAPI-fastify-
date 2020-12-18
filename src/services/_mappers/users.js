'use strict';

/**
 * @function mapUserResponse
 * @param {*} tokenResponse
 * @param {*} user
 * @return {*}
 */
const userWithToken = async (tokenResponse, user) => {
    let response = {
        tokenResponse,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar,
            settings: user.settings,
            birthDate: user.birthDate,
            gender: user.gender,
            locale: user.locale,
            acceptTerms: user.acceptTerms,
            acceptCookies: user.acceptCookies,
            lastLoginDate: user.lastLoginDate,
            addresses: buildAddresses(user.addresses)
        }
    };

    function buildRoles(roles) {
        return roles.map((role) => role.name);
    }

    function buildAddresses(addresses){
        return addresses ? addresses.filter((a) => a.usersAddress.enabled).map((address) => {
            return   {
                id: address.id,
                name: address.usersAddress.name,
                type: address.type,
                country: address.country,
                city: address.city,
                roadType: address.roadType,
                street: address.street,
                streetNumber: address.streetNumber,
                postalCodeId: address.postalCodeId,
                postalCode: address.postalCode,
                extra: address.extra,
                localTown: address.localTown,
                priority: address.usersAddress.priority,
                creationDate: address.creationDate
            }
        }) : [];
    }

    if (user.roles && user.roles.length) {
        response.user.roles = buildRoles(user.roles);
    }
    if(response.user && response.user.roles && response.user.roles.some(r => ['BACKOFFICE', 'OWNER'].includes(r))) {
        response['stores'] = user.stores;
    }

    return response;
};

/**
 * @function user
 * @param {*} user
 * @return {*}
 */
const user = async (user) => {
    return  {
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar,
            settings: user.settings,
            birthDate: user.birthDate,
            gender: user.gender,
            locale: user.locale,
            acceptTerms: user.acceptTerms,
            acceptCookies: user.acceptCookies,
            lastLoginDate: user.lastLoginDate,
        }
    }
};

module.exports = {
    userWithToken,
    user
};
