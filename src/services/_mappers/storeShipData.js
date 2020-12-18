const formatStoreData = (storeAddressesToPick) => {
    return storeAddressesToPick.map((storeAddress) => {
        return {
            addressId: storeAddress.addressId,
            country: storeAddress.country,
            province: storeAddress.city,
            streetName: storeAddress.street,
            streetNumber: storeAddress.streetNumber,
            postalCode: storeAddress.postalCode,
            extra: storeAddress.extra,
            locality: storeAddress.localTown,
            streetType: storeAddress.roadType
        }
    })
};

module.exports = { formatStoreData };