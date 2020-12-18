'use strict';

const model = require('./model');
const roleModel = require('./../roles/model');
const userRoleModel =require('./roles/model');
const userAddress = require('./userAddress/model');
const addressModel = require('./../address/model');
const storeModel =require('./../store/model');
const userStoreModel =require('./../usersStore/model');
const sequelize = require('sequelize');

model.belongsToMany(roleModel, {through: 'users_roles'});
model.belongsToMany(storeModel, {through: userStoreModel});
model.belongsToMany(addressModel, {through: userAddress});

/**
 * Create User
 * @param {object} user
 * @return {Promise<*>}
 */
const createUser = async(user) => {
    try {
        return await model.create(user);
    } catch (error) {
        console.error(error, error.stack);
        if (error instanceof sequelize.UniqueConstraintError) {
            throw new Error('UserAlreadyExist');
        } else {
            throw new Error(error.message);
        }
    }
};

/**
 * Get User
 * @param {string} userId
 * @return {Promise<*>}
 */
const getUser = async(userId) => {
    try {
        return await model.findOne({
            order: [
                [ addressModel, userAddress, 'priority', 'DESC' ]

            ],
            include: [ {model: storeModel, as: 'stores'}, { model: addressModel}, { model: roleModel, as: 'roles', attributes: ['id', 'name'] } ],
            where: {
                id: userId,
            },
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

// TODO  aca hay que corregir el atributo raw ya que elimina el array de roles hacendo que devuelva uno solo
/**
 * Get User By email
 * @param {string} email
 * @return {Promise<*>}
 */
const getUserByEmail = async(email) => {
    try {
        return await model.findOne({
            order: [
                [ addressModel, userAddress, 'priority', 'DESC' ]

            ],
            include: [ {model: storeModel, as: 'stores'}, { model: addressModel}, { model: roleModel, as: 'roles', attributes: ['id', 'name'] } ],
            where: {
                email: email,
            },
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Update User
 * @param {object} user
 * @return {Promise<*>}
 */
const updateUser = async(user, userId) => {
    try {
        return await model.update(user, {where: {id : userId}, returning: true, plain: true});
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
};
