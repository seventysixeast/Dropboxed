const CustomInvoiceList = require("../models/Invoices");
const { Op } = require("sequelize");

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await CustomInvoiceList.findAll();
        // send success and data
        res.status(200).json({ success: true, data: invoices });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        const deleted = await CustomInvoiceList.destroy({
            where: { id: req.body.id },
        });
        res.status(200).json({ success: true, data: deleted });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllInvoices,
    deleteInvoice
};
