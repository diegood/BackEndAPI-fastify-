'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * Address model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'productStore', {
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
				},
				key: 'id'
			},
			field: 'store_id'
		},
		uriName: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4'),
			unique: true,
			field: 'uri_name'
		},
		productBaseId: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			references: {
				model: {
					tableName: 'product',
				},
				key: 'id'
			},
			field: 'product_base_id'
		},
		images: {
			type: Sequelize.JSON,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		status: {
			type: Sequelize.STRING,
			allowNull: false
		},
		price: {
			type: Sequelize.DOUBLE,
			allowNull: false
		},
		variant: {
			type: Sequelize.JSON,
			allowNull: false
		},
		filters: {
			type: Sequelize.JSON,
			allowNull: true
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
		tableName: 'product_store',
		schema: 'products',
        timestamps: false,
	}
);