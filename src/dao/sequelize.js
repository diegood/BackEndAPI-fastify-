'use strict';

const {Sequelize} = require('sequelize');

let instance;

/**
 * Create Instance
 */
const createInstance = () => {
  instance = new Sequelize(
    process.env.FISHMARKETDB_NAME,
    process.env.FISHMARKETDB_USERNAME,
    process.env.FISHMARKETDB_PASSWORD,
    {
      host: process.env.FISHMARKETDB_HOST,
      port: process.env.FISHMARKETDB_PORT,
      dialect: 'postgres',
      pool: {
        max: parseInt(process.env.FISHMARKETDB_POOL_MAX),
        min: parseInt(process.env.FISHMARKETDB_POOL_MIN),
        idle: parseInt(process.env.FISHMARKETDB_IDLE),
        handleDisconnects: true,
      },
    },
  );
};

module.exports = {
  Sequelize,
  SequelizeInstance: () => {
    if (!instance) {
      createInstance();
    }
    return instance;
  },
};