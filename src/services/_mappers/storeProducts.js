'use strict';

/**
 * @function mapProductsStoreResponse
 * @param {*} products
 * @return {*}
 */
const mapProductsStoreResponse = async (products) => {
    const LIMIT = 50;
    const paging = {
        total: products.length,
        offset: 0,
        limit: LIMIT,
    };
    
    return {
        paging,
        results: formatResults(products)
    };
};

const formatResults = (products) =>{

    const productsFormatted = products.map((product) => {
        product.store  =  {
            storeId: product.store.id,
            name: product.store.name,
            description: product.store.description,
            images: product.store.images,
            bussinesHours: product.store.bussinesHours,
        };
        return product;
    })
    return productsFormatted;
}

module.exports = {
    mapProductsStoreResponse,
};
