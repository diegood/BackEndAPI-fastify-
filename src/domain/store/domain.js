'use strict';
const provider = require('../../dao/store/provider');
const getSlug = require('speakingurl');

/**
 * Get All stores
 * @return {Promise<*>}
 */
const getAll = async() => {
    try {
        return await provider.getAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get one store by Id
 * @return {Promise<*>}
 */
const getById = async(Id) => {
    try {
        return await provider.getStoreById(Id);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get one store by name
 * @return {Promise<*>}
 */
const getByName = async(uriName) => {
    try {
        return await provider.getStoreByName(uriName);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Create Store
 * @return {Promise<*>}
 */
const create = async(store, addTimeStamp = false) => {
    try {
        const shortTimeStamp = new Date().getTime().toString().substring(6, 12);
        if (store) {
            store.uriName = addTimeStamp ? getSlug(`${store.name} ${shortTimeStamp}`) : getSlug(store.name);
        }
        
        return await provider.create(store);
    } catch (error) {
        if (error.message === "uri-no-unique") { return create(store, true)}
        else{throw new Error(error.message)}
    }
};

/**
 * Update Store
 * @return {Promise<*>}
 */
const update = async(store, billing) => {
    try {
        return await provider.update(store, billing);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
};
