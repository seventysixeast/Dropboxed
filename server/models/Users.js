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
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: ''
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    defaultValue: ''
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  profile_photo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  company: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  subdomain: {
    type: DataTypes.STRING(255),
    unique: true
  },
  facebook: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  twitter: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  googleplus: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  linkedin: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  instagram: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  dob: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  account_email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  account_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  account_number: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  bsb_number: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  abn_acn: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  colorcode: {
    type: DataTypes.STRING(20),
    allowNull: false,
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

<<<<<<< HEAD:server/models/Users.js
module.exports = Users;
=======
module.exports = User;
>>>>>>> stage:server/models/User.js
