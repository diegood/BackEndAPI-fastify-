const { mapAddress } = require('./addresses');
const storeDomain = require('../../domain/store/domain');
const addressDomain = require('../../domain/logistics/address/domain');

const getOrdersWithStoreAndUser = async (ordersByStore) => {
    try {
        const ordersToShip = [];
        const storesRequest = [];
        const storeAddressRequest = [];
        const allStoresDetails = [];
        let userAddressIdToShip;
    
        //Build base objects
        Object.keys(ordersByStore).map((key)=> {
            const orderData = {
                storeId: ordersByStore[key][0].storeId,
                userAddressId: ordersByStore[key][0].addressId,
                orderId: ordersByStore[key][0].id
            }
            userAddressIdToShip = ordersByStore[key][0].addressId;
            storesRequest.push(storeDomain.getById(orderData.storeId));
            ordersToShip.push(orderData);
        })
    
        //Get Stores Details Data
        const storesDetails = await Promise.all(storesRequest);
        storesDetails.forEach((store) => {
            const storeFilteredData = {
                storeId: store.id,
                name: store.name,
                phoneNumber: store.phoneNumber,
                storeBussinesHours: store.bussinesHours,
                storeAddressId: store.logisticStore.addressId,
                storePreparationTime: store.logisticStore.preparationTime
            }
            storeAddressRequest.push(addressDomain.getById(store.logisticStore.addressId));
            allStoresDetails.push(storeFilteredData);
        })
        
        //Get stores Addresses to pickup
        const addressesToPick = await Promise.all(storeAddressRequest);
        const storeAddressesToPick = mapAddress(addressesToPick);
    
        return {
            userAddressIdToShip,
            allStoresDetails,
            ordersToShip,
            storeAddressesToPick
        };
    } catch (error) {
        console.error('Error in getOrdersWithStoreAnUSer ', error)
        return error;
    }
}

module.exports = { getOrdersWithStoreAndUser };
