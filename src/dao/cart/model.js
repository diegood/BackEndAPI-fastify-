'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * Cart model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'cart',
    {
        userId: {
            type: Sequelize.UUIDV4,
            field: 'user_id',
        },
        currency: {
            type: Sequelize.STRING,
            field: 'currency',
            allowNull: false,
            defaultValue: "EUR"
        },
        addressId: {
            type: Sequelize.UUIDV4,
            field: 'address_id',
            allowNull: true,
        },
        pickup: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		billingAddressId: {
			type: Sequelize.UUIDV4,
			allowNull: true,
			field: 'billing_address_id'
		},
        items: {
            type: Sequelize.JSON,
            field: 'items',
            allowNull: false,
        },
        creationDate: {
            type: Sequelize.DATE,
            field: 'creation_date',
            defaultValue: Sequelize.NOW,
        },
        updatedDate: {
            type: Sequelize.DATE,
            field: 'updated_date',
            defaultValue: Sequelize.NOW,
        },
    },
    {
        sequelize: SequelizeInstance(),
        tableName: 'cart',
        schema: 'carts',
        timestamps: false,
    }
);