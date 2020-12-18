'use strict';

const {Sequelize, SequelizeInstance} = require('../../sequelize');

/**
 * store logistic address model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'storeLogisticAddress', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4()'),
			primaryKey: true
		},
		type: {
			type: Sequelize.STRING,
			allowNull: true
		},
		country: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: "ES"
		},
		city: {
			type: Sequelize.STRING,
			allowNull: false
		},
		street: {
			type: Sequelize.STRING,
			allowNull: false
		},
		streetNumber: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'street_number'
		},
		postalCode: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'postal_code'
		},
		extra: {
			type: Sequelize.STRING,
			allowNull: true
		},
		localTown: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'local_town'
		},
		defaultAddress: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			field: 'default_address'
		},
		roadType: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: "CL",
			field: 'road_type'
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
		tableName: 'address',
		schema: 'logistics',
		timestamps: false
	}
);