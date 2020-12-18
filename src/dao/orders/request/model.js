'use strict';

const {Sequelize, SequelizeInstance} = require('../../sequelize');

/**
 * items model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'request', {
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
		status: {
			type: Sequelize.STRING,
			allowNull: true
		},
		retainedPrice: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			field: 'retained_price'
		},
		realPrice: {
			type: Sequelize.DOUBLE,
			allowNull: false,
			field: 'real_price'
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
		tableName: 'request',
		schema: 'orders',
		timestamps: false,
		classMethods:{
			associate:function(models){
				this.hasMany(models.orders),
				this.hasOne(models.users)
			}
		}
	}
);