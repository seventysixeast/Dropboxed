const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Notifications = sequelize.define('Notifications', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  subdomain_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  notification: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'notifications',
  timestamps: false
});

module.exports = Notifications;