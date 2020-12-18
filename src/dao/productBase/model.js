'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * Products model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'productBase', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4'),
			primaryKey: true
		},
		uriName: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'uri_name'
		},
		image: {
			type: Sequelize.STRING,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		available: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: true
		},
		recommendedPortion: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: "0.2",
			field: 'recommended_portion'
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
    },
    {
        sequelize: SequelizeInstance(),
        tableName: 'product_base',
        schema: 'products',
        timestamps: false,
    }
);
