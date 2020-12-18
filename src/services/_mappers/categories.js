'use strict';

/**
 * @function mapCategoriesResponse
 * @param {*} products
 * @return {*}
 */
const mapCategoriesResponse = async (categories) => {
    const results = {
        formOfBreeding: getFormsOfBreeding(),
        preparation: getPreparations(),
        categories: formatResults(categories)
    };
    
    return results;
};

const formatResults = (categories) =>{
    const mainCategories = [];
    const subcategories = [];

    categories.map((category) => {
        category.parentId === null ? mainCategories.push(category) : subcategories.push(category);
        return category
    })

    const results = mainCategories.map((cat) => {
        const partialSubCat = [];
        subcategories.map((subcategory)=> {
            if (subcategory.parentId === cat.id) {
                const singleSubcategory = {
                    id: subcategory.id,
                    name: subcategory.name
                };
                partialSubCat.push(singleSubcategory)
            }
            return subcategory;
        })

        const singleCategory = {
            id: cat.id,
            name: cat.name,
            subcategories: partialSubCat
        }
        return singleCategory;
    })

    return results;
}
const getFormsOfBreeding = () => {
    return [
        {
            id: 1,
            name: 'salvaje',
            key: 'wild'
        },
        {
            id: 2,
            name: 'piscifactoría',
            key: 'fish_farm'
        },
        {
            id: 3,
            name: 'estero',
            key: 'estero'
        }
    ];
};

const getPreparations = () => {
    return [
        {
            id: 1,
            name: 'al horno',
            key: 'baked'
        },
        {
            id: 2,
            name: 'a la sal',
            key: 'in_salt'
        },
        {
            id: 3,
            name: 'a la plancha',
            key: 'grilled'
        },
        {
            id: 4,
            name: 'a la brasa',
            key: 'charcoal_grilled'
        },
        {
            id: 5,
            name: 'al vapor',
            key: 'steamed'
        },
        {
            id: 6,
            name: 'frito',
            key: 'fried'
        },
        {
            id: 7,
            name: 'arroces',
            key: 'rice'
        },
        {
            id: 8,
            name: 'crudo',
            key: 'raw'
        },
        {
            id: 9,
            name: 'cocido',
            key: 'boiled'
        },
        {
            id: 10,
            name: 'vivo',
            key: 'alive'
        },
        {
            id: 11,
            name: 'caldos',
            key: 'soup'
        },
        {
            id: 12,
            name: 'espetado',
            key: 'snap'
        }
    ];
};


module.exports = {
    mapCategoriesResponse,
};
