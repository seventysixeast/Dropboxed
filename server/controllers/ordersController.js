const Notifications = require('../models/Notifications');
const User = require('../models/Users');
const Package = require('../models/Packages');
const Orders = require('../models/Orders');
const Collection = require('../models/Collections');
const CustomInvoiceList = require("../models/Invoices");
const { NEW_COLLECTION } = require('../helpers/emailTemplate');
const { sendEmail } = require("../helpers/sendEmail");

const getAllOrders = async (req, res) => {
    try {
        let orders = await Orders.findAll({
            where: {
                subdomain_id: req.body.subdomain_id
            },
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }
        orders = orders.map(order => order.toJSON());
        console.log(orders);
        orders = orders.map(order => {
            console.log(order.collection_id);
            order.collection_id = Collection.findOne({
                where: {
                    id: order.collection_id
                }
            });
            return order;
        });

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ error: "Failed to list collections" });
    }
};

module.exports = {
    getAllOrders
};
