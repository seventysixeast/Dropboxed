// models/Booking.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./Users');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    booking_title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    client_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    client_address: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    package: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    package_ids: {
        type: DataTypes.STRING(100)
    },
    photographer_id: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    booking_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    booking_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    booking_time_to: {
        type: DataTypes.TIME
    },
    booking_status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING(200)
    },
    subdomain_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'booking',
    timestamps: false
});

Booking.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Booking;
