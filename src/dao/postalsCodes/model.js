'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * Postal Code model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'postalsCodes', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4()'),
			primaryKey: true
		},
		country: {
			type: Sequelize.STRING,
			allowNull: false
		},
		postalCode: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'postal_code'
		},
		neighborhoods: {
			type: Sequelize.STRING,
			allowNull: false
		},
		regionName: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'region_name'
		},
		regionCode: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'region_code'
		},
		cityName: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'city_name'
		},
		cityCode: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'city_code'
		},
		localTown: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'local_town'
		},
		localTownCode: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'local_town_code'
		},
		lat: {
			type: Sequelize.REAL,
			allowNull: false
		},
		lng: {
			type: Sequelize.REAL,
			allowNull: false
		},
		accuracy: {
			type: Sequelize.CHAR(1),
			allowNull: false
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
		tableName: 'postals_codes',
		schema: 'logistics',
		timestamps: false,
	}
);