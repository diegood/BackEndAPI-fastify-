'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * store model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'order', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4()'),
			primaryKey: true
		},
		storeId: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			references: {
				model: {
					tableName: 'store',
					schema: 'stores'
				},
				key: 'id'
			},
			field: 'store_id'
		},
		addressId: {
			type: Sequelize.UUIDV4,
			allowNull: true,
			references: {
				model: {
					tableName: 'logistics',
					schema: 'address'
				},
				key: 'id'
			},
			field: 'address_id'
		},
		requestId: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			references: {
				model: {
					tableName: 'request',
					schema: 'orders'
				},
				key: 'id'
			},
			field: 'request_id'
		},
		preparationDate: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'preparation_date'
		},
		status: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: "NEW"
		},
		deliveryDate: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'delivery_date'
		},
		logisticType: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'logistic_type'
		},
		trackNumber: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'track_number'
		},
		retainedPrice: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			field: 'retained_price'
		},
		realPrice: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'real_price'
		},
		ticketNumber: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'ticket_number'
		},
		ticketImageId: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'ticket_image_id'
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
		tableName: 'order',
		schema: 'orders',
		timestamps: false,
		classMethods:{
			associate: function(models){
				this.hasMany(models.items)
			}
		}
	}
);