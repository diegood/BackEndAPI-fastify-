/**
 * @function mapStoreUpdateResponse
 * @param {*} updatedStore
 * @return {*}
 */
const mapStoreUpdateResponse = async (savedStore, savedAddress, savedLogistic) => {
    const updatedStore = savedStore[1];
    const updatedLogistic = savedLogistic[0];

    const response = {
        store: {
            id: updatedStore.id,
            name: updatedStore.name,
            phoneNumber: updatedStore.phoneNumber,
            uriName: updatedStore.uriName,
            description: updatedStore.description,
            bussinesHours: updatedStore.bussinesHours,
            images: updatedStore.images
        },
        logistic: {
            id: updatedLogistic.id,
            addressId: updatedLogistic.addressId,
            storeId: updatedLogistic.storeId,
            creationDate: updatedLogistic.creationDate,
            updatedDate: updatedLogistic.updatedDate,
            owncourier: updatedLogistic.owncourier,
            pickup: updatedLogistic.pickup,
            preparationTime: updatedLogistic.preparationTime,
            postalCodes: updatedLogistic.postalCodes,
            contactEmail: updatedLogistic.contactEmail,
            contactPhone: updatedLogistic.contactPhone,
            address: {
                country: savedAddress.country,
                creationDate: savedAddress.creationDate,
                id: savedAddress.id,
                localTown: savedAddress.localTown,
                type: savedAddress.type,
                updatedDate: savedAddress.updatedDate,
                postalCode: savedAddress.postalCode,
                street: savedAddress.street,
                streetNumber: savedAddress.streetNumber,
                city: savedAddress.city
            }
        }
    };

    if (updatedStore.fiscalData) {
        response.billing = {
            legal_name: updatedStore.fiscalData.legal_name,
            name: updatedStore.name,
            type: updatedStore.fiscalData.type,
            cif: updatedStore.fiscalData.cif,
            address: updatedStore.fiscalData.address,
            name: updatedStore.fiscalData.name,
            email: updatedStore.fiscalData.email
        };
    }

    return response;
};

module.exports = {
    mapStoreUpdateResponse,
};
