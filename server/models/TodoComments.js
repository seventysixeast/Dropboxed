const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const TaskComment = sequelize.define('TaskComment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comments: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  modified_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  subdomain_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'task_comments',
  timestamps: false
});

module.exports = TaskComment;
