const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50)
  },
  name: {
    type: DataTypes.STRING(50)
  },
  role_id: {
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING(100)
  },
  phone: {
    type: DataTypes.STRING(15)
  },
  password: {
    type: DataTypes.STRING(255)
  },
  profile_photo: {
    type: DataTypes.STRING(255)
  },
  logo: {
    type: DataTypes.STRING(255)
  },
  company: {
    type: DataTypes.STRING(255)
  },
  subdomain: {
    type: DataTypes.STRING(255)
  },
  facebook: {
    type: DataTypes.STRING(255)
  },
  twitter: {
    type: DataTypes.STRING(255)
  },
  googleplus: {
    type: DataTypes.STRING(255)
  },
  linkedin: {
    type: DataTypes.STRING(255)
  },
  instagram: {
    type: DataTypes.STRING(255)
  },
  website: {
    type: DataTypes.STRING(255)
  },
  dob: {
    type: DataTypes.STRING(255)
  },
  country: {
    type: DataTypes.STRING(255)
  },
  address: {
    type: DataTypes.STRING(255)
  },
  account_email: {
    type: DataTypes.STRING(255)
  },
  account_name: {
    type: DataTypes.STRING(255)
  },
  account_number: {
    type: DataTypes.STRING(255)
  },
  bsb_number: {
    type: DataTypes.STRING(255)
  },
  abn_acn: {
    type: DataTypes.STRING(255)
  },
  colorcode: {
    type: DataTypes.STRING(20)
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive')
  },
  created: {
    type: DataTypes.DATE
  },
  modified: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
