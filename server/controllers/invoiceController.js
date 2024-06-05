const CustomInvoiceList = require("../models/Invoices");
const Order = require('../models/Orders');
const Collection = require('../models/Collections');
const Package = require('../models/Packages');
const User = require('../models/Users');
const { Op } = require("sequelize");

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await CustomInvoiceList.findAll();
        res.status(200).json({ success: true, data: invoices });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvoiceData = async (req, res) => {
    try {
        const invoice = await CustomInvoiceList.findOne({ where: { id: req.body.invoiceId } });
        const order = await Order.findOne({ where: { id: invoice.order_id } });
        const collection = await Collection.findOne({ where: { id: order.collection_id } });
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }

        const adminUser = await User.findOne({
            where: { id: collection.subdomain_id }
        });

        if (!adminUser) {
            return res.status(404).json({ success: false, message: 'Admin user not found' });
        }

        const clientUser = await User.findOne({
            where: { id: collection.client_id }
        });

        const packageIds = collection.package_ids.split(',').map(id => parseInt(id.trim(), 10));
        const packages = await Package.findAll({
            where: { id: packageIds }
        });
        const totalPrice = packages.reduce((sum, pkg) => sum + pkg.package_price, 0);

        const responseData = {
            collection: {
                id: collection.id,
                client_address: collection.client_address,
                name: collection.name,
                dropbox_link: collection.dropbox_link,
                video_link: collection.video_link,
                image_type: invoice.item_descriptions,
                price: invoice.total,
                status: collection.status,
                lock_gallery: collection.lock_gallery,
                notify_client: collection.notify_client,
                image_count: collection.image_count,
                created: collection.created,
                modified: collection.modified
            },
            admin: {
                id: adminUser.id,
                name: adminUser.name,
                company: adminUser.company,
                website: adminUser.website,
                account_name: adminUser.account_name,
                address: adminUser.address,
                phone: adminUser.phone,
                email: adminUser.email,
                abn_acn: adminUser.abn_acn,
                bsb_number: adminUser.bsb_number,
            },
            client: {
                name: adminUser.name,
                address: adminUser.address,
            },
            packages: packages.map(pkg => ({
                id: pkg.id,
                name: pkg.package_name,
                price: pkg.package_price,
                details: pkg.image_type_details
            })),
            total_price: totalPrice,
            invoice: invoice

        };

        res.status(200).json({ success: true, data: responseData });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


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
    deleteInvoice,
    getInvoiceData
};
