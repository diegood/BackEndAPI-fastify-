'use strict';

/**
 * @function mapBaseProductsResponse
 * @param {*} products
 * @return {*}
 */
const mapBaseProductsResponse = async (products) => {
    const LIMIT = 50;
    const paging = {
        total: products.length,
        offset: 0,
        limit: LIMIT,
    };
    
    return {
        paging,
        results: products
    };
};

module.exports = {
    mapBaseProductsResponse,
};
