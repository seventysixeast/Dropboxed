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
  is_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  is_first_login: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  verification_token: {
    type: DataTypes.STRING(255),
    allowNull: true
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
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
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
    type: DataTypes.ENUM('Active', 'Inactive', 'Deleted'),
    allowNull: false,
    defaultValue: 'Active'
  },
  otp: {
    type: DataTypes.STRING(6)
  },
  access_token: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  refresh_token: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  calendar_sub: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0
  },
  calendar_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ''
  },
  quickbooks_access_token: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  quickbooks_refresh_token: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  quickbooks_realm_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  quickbooks_customer_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  quickbooks_income_account_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  quickbooks_expense_account_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  quickbooks_asset_account_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dropbox_refresh: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  dropbox_access: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
    dropbox_id: {
    type: DataTypes.STRING(255),
    allowNull: true
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