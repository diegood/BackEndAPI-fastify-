'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

const modelDefinition = {
	id: {
		type: Sequelize.UUIDV4,
		allowNull: false,
		defaultValue: Sequelize.literal('uuid_generate_v4()'),
		primaryKey: true
	},
	requestId: {
		type: Sequelize.UUIDV4,
		allowNull: false,
		references: {
			model: {
				tableName: 'request',
				schema: 'orders'
			},
			key: 'id'
		},
		field: 'request_id'
	},
	transactionDate: {
		type: Sequelize.DATE,
		allowNull: false,
		field: 'transaction_date'
	},
	transactionType: {
		type: Sequelize.STRING,
		allowNull: false,
		field: 'transaction_type'
	},
	transactionCode: {
		type: Sequelize.STRING,
		allowNull: false,
		field: 'transaction_code'
	},
	transactionCodeRaw: {
		type: Sequelize.STRING,
		allowNull: false,
		field: 'transaction_code_raw'
	},
	currency: {
		type: Sequelize.STRING,
		allowNull: false
	},
	amount: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	isSecure: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		field: 'is_secure'
	},
	gatewayOrder: {
		type: Sequelize.STRING,
		allowNull: false,
		field: 'gateway_order'
	},
	cardCountry: {
		type: Sequelize.STRING,
		allowNull: true,
		field: 'card_country'
	},
	cardType: {
		type: Sequelize.STRING,
		allowNull: true,
		field: 'card_type'
	},
	cardBrand: {
		type: Sequelize.STRING,
		allowNull: true,
		field: 'card_brand'
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
};

/**
 * Customer Payment model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
	'customerPayment', modelDefinition, {
		sequelize: SequelizeInstance(),
		tableName: 'customer_payment',
		schema: 'payments',
		timestamps: false
	}
);

// export default modelDefinition;