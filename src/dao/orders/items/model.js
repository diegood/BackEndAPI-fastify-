'use strict';

const {Sequelize, SequelizeInstance} = require('../../sequelize');

/**
 * items model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'items', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4()'),
			primaryKey: true
		},
		orderId: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			references: {
				model: {
					tableName: 'order',
					schema: 'orders'
				},
				key: 'id'
			},
			field: 'order_id'
		},
		productStoreId: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			field: 'product_store_id',
			references: {
				model: {
					tableName: 'product_store',
					schema: 'products'
				},
				key: 'id'
			},
			field: 'product_store_id'
		},
		done: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		variant: {
			type: Sequelize.JSON,
			allowNull: true
		},
		price: {
			type: Sequelize.DOUBLE,
			allowNull: false
		},
		maxPrice: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'max_price'
		},
		substitution: {
			type: Sequelize.STRING,
			allowNull: true
		},
		clarifications: {
			type: Sequelize.STRING,
			allowNull: true
		},
		quantityPackages: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: 'quantity_pakages'
		},
		creationDate: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'creation_date'
		},
		updatedDate: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated_date'
		}
	}, {
		sequelize: SequelizeInstance(),
		tableName: 'items',
		schema: 'orders',
		timestamps: false,
		classMethods:{
			associate:function(models){
				this.belongsTo(models.orders, {foreignKey: 'order_id'}),
				this.hasOne(models.products),
				this.hasMany(models.productStore)
			}
		}
	}
);