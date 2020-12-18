'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * store usersStore model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'usersStore', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4()'),
			primaryKey: true
		},
		userId: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			references: {
				model: {
					tableName: 'user',
					schema: 'users'
				},
				key: 'id'
			},
			field: 'user_id'
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
		}
	}, {
		sequelize: SequelizeInstance(),
		tableName: 'users_store',
		schema: 'stores',
		timestamps: false
	}
);