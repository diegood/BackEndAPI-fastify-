'use strict';

const {Sequelize, SequelizeInstance} = require('../../sequelize');

/**
 * UserRoles model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'users_roles', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: true,
			defaultValue: Sequelize.literal('uuid_generate_v4()')
		},
		userId: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true,
			references: {
				model: {
					tableName: 'user',
					schema: 'users'
				},
				key: 'id'
			},
			field: 'user_id'
		},
		roleId: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			references: {
				model: {
					tableName: 'role',
					schema: 'roles'
				},
				key: 'id'
			},
			field: 'role_id'
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
        tableName: 'roles',
        schema: 'users',
        timestamps: false,
    }
);