const model = require('./model');
const storeLogisticModel = require('./../storeLogistic/model');
const userModel = require('./../users/model');
const userStoreModel = require('./../usersStore/model');
const addressModel = require('./../address/model');
const { normalizeString } = require('../../utils/normalizeString');

model.belongsToMany(userModel, {through: 'usersStore'});
model.hasOne(storeLogisticModel);
storeLogisticModel.belongsTo(addressModel);

/**
 * Get All stores
 * @return {Promise<*>}
 */
const getAll = async() => {
    try {
        return await model.findAll({
            include: [ { model: storeLogisticModel, include:[addressModel] } ],
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Get Store By Id
 * @param {string} StoreId
 * @return {Promise<*>}
 */
const getStoreById = async(StoreId, full = false ) => {
    const include = [{ model: storeLogisticModel, include:[addressModel] }, { model: userModel}];
    if (full) include.push({ model: userModel});
    try {
        return await model.findOne({ include,  where: {  id: StoreId } });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Get Store By uri Name
 * @param {string} uriName
 * @return {Promise<*>}
 */
const getStoreByName = async(uriName, full = false ) => {
    const include = [{ model: storeLogisticModel, include:[addressModel] }, { model: userModel}];
    if (full) include.push({ model: userModel});
    try {
        return await model.findOne({ include,  where: {  uriName } });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Create Store
 * @param {object} store
 * @return {Promise<*>}
 */
const create = async(store) => {
    try {
        if (store) {
            store.uriName = normalizeString(store.name);
        }
        return await model.create(store);
    } catch (error) {
        console.error(error, error.stack);
        throw  error.parent.routine=='_bt_check_unique' ? new Error('uri-no-unique') :  new Error(error);
    }
};

/**
 * update Store
 * @param {object} store
 * @param {object} billing
 * @return {Promise<*>}
 */
const update = async(store, billing) => {
    try {
        return await model.update({
            name: store.name,
            description: store.description,
            phoneNumber: store.phoneNumber,
            uriName: normalizeString(store.name),
            images: store.images,
            bussinesHours: store.bussinesHours,
            fiscalData: billing
        }, {
            where: {
                id: store.id
            },
            returning: true,
            plain: true
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    getAll,
    getStoreById,
    getStoreByName,
    create,
    update,
};
