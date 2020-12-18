const mapAddress = (addresses) => {
    const allMappedAddresses = [];

    addresses.map((address) => {
        const mappedAddress = {};

        if (address.length > 0) {
            const mainAddress = address[0];
            mappedAddress.addressId = mainAddress.id,
            mappedAddress.country = mainAddress.country,
            mappedAddress.city = mainAddress.city,
            mappedAddress.street = mainAddress.street,
            mappedAddress.streetNumber = mainAddress.streetNumber,
            mappedAddress.postalCode = mainAddress.postalCode,
            mappedAddress.extra = mainAddress.extra,
            mappedAddress.localTown = mainAddress.localTown,
            mappedAddress.roadType = mainAddress.roadType
        }
        
        allMappedAddresses.push(mappedAddress);
        return mappedAddress;
    })

    return allMappedAddresses;
}

module.exports = { mapAddress };