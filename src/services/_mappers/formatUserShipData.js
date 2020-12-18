
const addressDomain = require('../../domain//logistics/address/domain');


const formatUserShipData = async (orderRequest, userShipAddressId) => {
    const userData = {
        userId: orderRequest.userId,
        name: `${orderRequest.user.firstName} ${orderRequest.user.lastName}`,
        phoneNumber: orderRequest.user.phoneNumber
    }
    const userAddress = await addressDomain.getById(userShipAddressId);
    const addressToShip = userAddress[0];

    userData.address = {
        id: addressToShip.id,
        country: addressToShip.country,
        province: addressToShip.city,
        streetName: addressToShip.street,
        streetNumber: addressToShip.streetNumber,
        postalCode: addressToShip.postalCode,
        extra: addressToShip.extra,
        locality: addressToShip.localTown,
        streetType: addressToShip.roadType
    };
    return userData;
}

module.exports = { formatUserShipData };