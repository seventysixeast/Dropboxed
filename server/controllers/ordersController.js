const Notifications = require('../models/Notifications');
const User = require('../models/Users');
const Package = require('../models/Packages');
const Orders = require('../models/Orders');
const Collections = require('../models/Collections');
const CustomInvoiceList = require("../models/Invoices");
const { NEW_COLLECTION } = require('../helpers/emailTemplate');
const { sendEmail } = require("../helpers/sendEmail");

const getAllOrders = async (req, res) => {
    try {
        let orders = await Orders.findAll({
            where: {
                subdomain_id: parseInt(req.body.subdomain_id)
            },
            include: [
                {
                    model: Collections,
                },
            ],
        });
        orders = orders.filter(order => order.Collections.length > 0);

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error("Failed to get Orders:", error);
        res.status(500).json({ error: "Failed to get Orders" });
    }
};

module.exports = {
    getAllOrders
};
