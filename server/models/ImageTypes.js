const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ImageTypes = sequelize.define('ImageTypes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false
  },
  gallery_status: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    allowNull: false
  }
}, {
  tableName: 'image_types',
  timestamps: false
});

module.exports = ImageTypes;