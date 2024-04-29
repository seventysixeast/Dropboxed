// TaskTodo.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const TaskComment = require("./TodoComments");

const TaskTodo = sequelize.define(
  "TaskTodo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    assign_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    task_description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    task_tags: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_favourite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task_assigndate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    subdomain_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "task_todo",
    timestamps: false,
  }
);

TaskTodo.hasMany(TaskComment, { foreignKey: 'task_id' });


module.exports = TaskTodo;
