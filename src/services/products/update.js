const productsDomain = require('../../domain/products/store/domain');

/**
 * @function update
 * @param {object} product
 * @return {Promise<*>}
 */
const updateStoreProduct = async(product) => {
    try {
        const status = product.images.length ? product.status : 'NO_IMAGE'
        const productToUpdate = {
            images: product.images,
            name: product.name,
            quantity: product.quantity,
            status: status,
            price: product.price,
            variant: product.variant,
            filters: product.filters,
            updatedDate: new Date(),
        };

        const updatedProduct = await productsDomain.update(productToUpdate, product.id);
        return updatedProduct[1];
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateStoreProduct,
};
