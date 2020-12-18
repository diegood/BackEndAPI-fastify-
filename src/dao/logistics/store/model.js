
const {Sequelize, SequelizeInstance} = require('../../sequelize');

/**
 * store logistic model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'storeLogistic', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4()'),
			primaryKey: true
		},
		addressId: {
			type: Sequelize.UUIDV4,
			allowNull: true,
			references: {
				model: {
					tableName: 'address',
					schema: 'logistics'
				},
				key: 'id'
			},
			field: 'address_id'
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
		},
		owncourier: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		pickup: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		preparationTime: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'preparation_time'
		},
		postalCodes: {
			type: Sequelize.JSON,
			allowNull: true,
			field: 'postal_codes'
		},
		contactPhone: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'contact_phone'
		},
		contactEmail: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'contact_email'
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
		tableName: 'store',
		schema: 'logistics',
		timestamps: false
	}
);