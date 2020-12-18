'use strict';

const {Sequelize, SequelizeInstance} = require('../../sequelize');

/**
 * UserAddress model
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'usersAddress', {
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
		addressId: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			references: {
				model: {
					tableName: 'address',
					schema: 'logistics'
				},
				key: 'id'
			},
			field: 'address_id'
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
		name: {
			type: Sequelize.STRING,
			allowNull: true
		},
		priority: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		enabled: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: true
		}
	}, {
		sequelize: SequelizeInstance(),
		tableName: 'users_address',
		schema: 'users',
		timestamps: false
	}
);
