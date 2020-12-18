'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * User model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'user', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4()'),
			primaryKey: true
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'first_name'
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'last_name'
		},
		documentType: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'document_type'
		},
		documentNumber: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'document_number'
		},
		phoneNumber: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'phone_number'
		},
		avatar: {
			type: Sequelize.STRING,
			allowNull: true
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: true
		},
		settings: {
			type: Sequelize.JSON,
			allowNull: true
		},
		birthDate: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'birth_date'
		},
		gender: {
			type: Sequelize.STRING,
			allowNull: true
		},
		locale: {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: "es-ES"
		},
		acceptTerms: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			field: 'accept_terms'
		},
		acceptCookies: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			field: 'accept_cookies'
		},
		lastLoginDate: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'last_login_date'
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
        tableName: 'user',
        schema: 'users',
        timestamps: false,
    }
);
