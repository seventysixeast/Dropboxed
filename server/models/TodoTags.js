const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const TaskTag = sequelize.define(
  "TaskTag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tasktag_title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    subdomain_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "task_tags",
    timestamps: false,
  }
);

module.exports = TaskTag;
