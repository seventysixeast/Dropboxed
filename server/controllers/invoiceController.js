const CustomInvoiceList = require("../models/Invoices");
const { Op } = require("sequelize");

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await CustomInvoiceList.findAll();
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllInvoices
};
