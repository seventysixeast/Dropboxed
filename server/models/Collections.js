const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Collections = sequelize.define('Collections', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  client_id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  editor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  photographer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  editor_image_types: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  client_address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  dropbox_link: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  video_link: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  tour_link: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  image_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  price: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  package_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  package_ids: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    allowNull: false,
    defaultValue: 'Active'
  },
  lock_gallery: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  download_allow: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: false,
    defaultValue: '0'
  },
  downloadble_sizes: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  banner: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  notify_client: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  lock_gallery: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  subdomain_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  tableName: 'collections',
  timestamps: false
});

module.exports = Collections;