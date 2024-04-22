const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./Users');

const BusinessClients = sequelize.define('BusinessClients', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    business_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    client_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'business_clients',
    timestamps: false
});

BusinessClients.belongsTo(User, { foreignKey: 'client_id', as: 'client' });

module.exports = BusinessClients;
