// models/Package.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Package = sequelize.define('Package', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  package_type: {
    type: DataTypes.ENUM('PACKAGE', 'SERVICE'),
    allowNull: false
  },
  package_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  package_slug: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  package_price: {
    type: DataTypes.FLOAT(7, 2),
    allowNull: false
  },
  image_type_details: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  package_order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_video: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  quickbooks_item_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  show_price: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  subdomain_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    allowNull: false,
    defaultValue: 'Active'
  }
}, {
  tableName: 'packages',
  timestamps: false // Assuming you don't want Sequelize to manage createdAt and updatedAt columns
});

module.exports = Package;
