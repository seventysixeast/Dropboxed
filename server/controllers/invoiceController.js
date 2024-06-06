const CustomInvoiceList = require("../models/Invoices");
const Order = require('../models/Orders');
const Collection = require('../models/Collections');
const Package = require('../models/Packages');
const User = require('../models/Users');
const { Op } = require("sequelize");
const phpUnserialize = require('php-serialize').unserialize;
const phpSerialize = require('php-serialize').serialize;
const { INVOICE_EMAIL } = require('../helpers/emailTemplate');
const { sendEmail } = require("../helpers/sendEmail");// to, subject, html..



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
        let itemDescriptions = invoice.item_descriptions;
        if (itemDescriptions) {
            itemDescriptions = phpUnserialize(itemDescriptions);
        }
        const itemsArray = [];
        for (const key in itemDescriptions) {
            const item = {
                name: itemDescriptions[key]['product_name'],
                description: itemDescriptions[key]['product_desc'],
                quantity: itemDescriptions[key]['product_quantity'],
                price: itemDescriptions[key]['product_price']
            };
            itemsArray.push(item);
        }

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
                name: clientUser.name,
                address: clientUser.address,
            },
            packages: packages.map(pkg => ({
                id: pkg.id,
                name: pkg.package_name,
                price: pkg.package_price,
                details: pkg.image_type_details
            })),
            total_price: totalPrice,
            invoice: invoice,
            itemsArray: itemsArray
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

const serializeItems = (items) => {
    try {
        items.forEach(item => {
            item.product_name = item.name;
            item.product_desc = item.description;
            item.product_quantity = item.quantity;
            item.product_price = item.price;
        })
        console.log('Serialized items:', items);
        return phpSerialize(items);
    } catch (error) {
        console.error('Error serializing items:', error);
        throw error;
    }
};

const updateInvoice = async (req, res) => {
    console.log('Request body:', req.body);

    const {
        invoiceId,
        orderId,
        items,
        subtotal,
        taxRate,
        taxAmount,
        total,
        note,
        invoiceLink,
        clientName,
        clientAddress,
        dueAmount,
        paidAmount
    } = req.body;

    try {
        const serializedItems = serializeItems(items);

        await CustomInvoiceList.update({
            order_id: orderId,
            user_name: clientName,
            user_address: clientAddress,
            item_descriptions: serializedItems,
            paid_amount: paidAmount,
            due_amount: dueAmount,
            total_price: total,
            notes: note,
            send_invoice: false,
            paid_status: false,
            invoice_link: invoiceLink,
        }, {
            where: { id: invoiceId }
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error saving invoice:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const sendInvoice = async (req, res) => {
    try {
        const invoiceId = 882; // req.body.invoiceId;
        const invoice = await CustomInvoiceList.findOne({ where: { id: invoiceId } });
        //console.log("invoice<<<", invoice);
        const order = await Order.findOne({ where: { id: invoice.order_id } });
        //console.log("order<<<", order.client_id);
        const client = await User.findOne({ where: { id: order.user_id } });
        //console.log("client<<<", client);

        if (!invoice || !order || !client) {
            return res.status(404).json({ success: false, message: 'Data not found' });
        }

        const clientEmail = client.email;
        const clientName = client.name;

        // Prepare invoice data for the email template
        const invoiceData = {
            clientName: clientName,
            invoiceNumber: invoice.invoice_number,
            invoiceDate: order.created_at,
            dueDate: order.created_at,
            amountDue: invoice.total_price,
            items: phpUnserialize(invoice.item_descriptions) // Assuming itemsArray contains necessary item details
        };

        /*const invoiceData = {
            clientName: "John Doe",
            invoiceNumber: "12345",
            invoiceDate: "2024-06-05",
            dueDate: "2024-06-20",
            amountDue: "$1000",
            items: [
              { name: "Service 1", description: "Description 1", product_price: "$500", quantity: 1, total: "$500" },
              { name: "Service 2", description: "Description 2", product_price: "$250", quantity: 2, total: "$500" }
            ]
          };*/

        // Generate the HTML content for the email using the provided template function
        const emailContent = INVOICE_EMAIL(invoiceData);
        console.log("emailContent", emailContent);

        // Send the email using the sendEmail function
        // sendEmail(clientEmail, "Your Invoice", emailContent, `/path/to/generated/invoice-${invoiceId}.pdf`); //this will use later
        sendEmail("gurvinder1902@gmail.com", "Your Invoice", emailContent);

        // Update send_invoice status in CustomInvoiceList table
        await CustomInvoiceList.update({ send_invoice: 1 }, { where: { id: invoiceId } });

        // Update send_invoice status in Collection table
        await Collection.update({ send_invoice: 1 }, { where: { id: order.collection_id } });

        res.status(200).json({ success: true, message: 'Invoice sent successfully and status updated' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllInvoices,
    deleteInvoice,
    getInvoiceData,
    updateInvoice,
    sendInvoice
};
