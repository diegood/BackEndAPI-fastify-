'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * Cart model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'images', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4'),
			primaryKey: true
		},
		path: {
			type: Sequelize.STRING,
			allowNull: false
		},
		alt: {
			type: Sequelize.STRING,
			allowNull: true
		},
		name: {
			type: Sequelize.STRING,
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
		},
		belongsTo: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'belongs_to'
		}
	}, {
		sequelize: SequelizeInstance(),
		tableName: 'images',
		schema: 'upload',
		timestamps: false
	}
);