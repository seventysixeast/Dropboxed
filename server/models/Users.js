const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Users = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  },
  business_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: ''
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
    defaultValue: ''
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  profile_photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  logo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  subdomain: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true
  },
  facebook: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  twitter: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  googleplus: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  linkedin: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  instagram: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  dob: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  account_email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  account_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  account_number: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  bsb_number: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  abn_acn: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  colorcode: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: ''
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    allowNull: false,
    defaultValue: 'Active'
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  modified: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = Users;