'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * Address model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'address', {
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
        roadType: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "CL",
            field: 'road_type'
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
        postalCodeId: {
			type: Sequelize.UUIDV4,
			allowNull: true,
			field: 'postal_code_id'
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
	}, 
	{
		sequelize: SequelizeInstance(),
		tableName: 'address',
		schema: 'logistics',
		timestamps: false
	}
);
