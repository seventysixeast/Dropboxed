const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Collections = require('./Collections');

const Orders = sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  package_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Collections,
      key: 'id'
    }
  },
  image_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  allow_download: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_order_extra: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  send_invoice: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  create_invoice: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  paid_status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  invoice_price: {
    type: DataTypes.FLOAT(9, 2),
    allowNull: false
  },
  invoice_link: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'orders',
  timestamps: false
});

Orders.belongsTo(Collections, { foreignKey: 'collection_id' });

module.exports = Orders;
