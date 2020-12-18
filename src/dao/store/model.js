'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * store model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'store', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4()'),
			primaryKey: true
		},
		uriName: {
			type: Sequelize.STRING,
			allowNull: true,
			unique: true,
			field: 'uri_name'
		},
		name: {
			type: Sequelize.STRING,
			allowNull: true
		},
		description: {
			type: Sequelize.STRING,
			allowNull: true
		},
		phoneNumber: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'phone_number'
		},
		images: {
			type: Sequelize.JSON,
			allowNull: true
		},
		bussinesHours: {
			type: Sequelize.JSON,
			allowNull: true,
			field: 'bussines_hours'
		},
		fiscalData: {
			type: Sequelize.JSON,
			allowNull: true,
			field: 'fiscal_data'
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
		tableName: 'store',
		schema: 'stores',
		timestamps: false
	}
);