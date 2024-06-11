const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const CustomInvoiceList = sequelize.define(
    "CustomInvoiceList",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "",
        },
        user_address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        item_descriptions: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },
        paid_amount: {
            type: DataTypes.FLOAT(9, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        due_amount: {
            type: DataTypes.FLOAT(9, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        total_price: {
            type: DataTypes.FLOAT(9, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        notes: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },
        send_invoice: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        paid_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        quickbooks_invoice_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        invoice_link: {
            type: DataTypes.STRING(255),
            defaultValue: null,
        },
        subdomain_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "custom_invoice_list",
        timestamps: false,
    }
);

module.exports = CustomInvoiceList;
