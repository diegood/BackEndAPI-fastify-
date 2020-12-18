'use strict';

const {Sequelize, SequelizeInstance} = require('../sequelize');

/**
 * Role model
 * @param fastify
 * @return {Model}
 */
module.exports = SequelizeInstance().define(
    'role',
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            field: 'id',
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            field: 'name',
            allowNull: false,
        },
        creationDate: {
            type: Sequelize.DATE,
            field: 'creation_date',
            defaultValue: Sequelize.NOW,
        },
        updatedDate: {
            type: Sequelize.DATE,
            field: 'creation_date',
            defaultValue: Sequelize.NOW,
        },
    },
    {
        sequelize: SequelizeInstance(),
        tableName: 'role',
        schema: 'roles',
        timestamps: false,
    }
);