'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * Categories model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'categories', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4()'),
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		parentId: {
			type: Sequelize.UUIDV4,
			allowNull: true,
			field: 'parent_id'
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
        Sequelize: SequelizeInstance(),
        tableName: 'category',
        schema: 'categories',
        timestamps: false,
    }
);
