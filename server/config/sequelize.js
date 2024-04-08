// sequelize.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dropboxed_db', 'admin', 'Admin@123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
