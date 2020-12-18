var SequelizeAuto = require('sequelize-auto')
require('dotenv').config();
const HOST = process.env.FISHMARKETDB_HOST;
var auto = new SequelizeAuto(process.env.FISHMARKETDB_NAME, process.env.FISHMARKETDB_USERNAME, process.env.FISHMARKETDB_PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    camelCase: true,
    camelCaseFileName: true,
    directory: './auto_generated_models_from_db',
    additional: {
        timestamps: false
    },
    schema:'products'
});

auto.run(function (err) {
    if (err) throw err;

    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});