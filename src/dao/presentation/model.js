const {Sequelize, SequelizeInstance} = require('../sequelize');
/**
 * presentation model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'presentation', {
		id: {
			type: Sequelize.UUIDV4,
			allowNull: false,
			defaultValue: Sequelize.literal('uuid_generate_v4'),
			primaryKey: true
		},
		nameKey: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'name_key'
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated_at'
		}
    },
    {
        sequelize: SequelizeInstance(),
        tableName: 'presentation',
        schema: 'products',
    }
);
