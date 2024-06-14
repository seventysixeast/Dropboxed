const phpUnserialize = require("php-serialize").unserialize;
const { INVOICE_EMAIL } = require("../helpers/emailTemplate");
const Collection = require("../models/Collections");
const Notifications = require("../models/Notifications");
const User = require("../models/Users");
const Package = require("../models/Packages");
const Order = require("../models/Orders");
const CustomInvoiceList = require("../models/Invoices");
const { NEW_COLLECTION } = require("../helpers/emailTemplate");
const { sendEmail } = require("../helpers/sendEmail");
const phpSerialize = require("php-serialize").serialize;
const QuickBooks = require("node-quickbooks");
const {
  createQuickBooksInvoice,
  getQuickBooksAccessToken,
  refreshQuickBooksToken,
} = require("./quickbooksController");

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await CustomInvoiceList.findAll({
      where: {
        subdomain_id: req.body.subdomain_id,
      },
    });
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInvoiceData = async (req, res) => {
  try {
    const invoice = await CustomInvoiceList.findOne({
      where: { id: req.body.invoiceId },
    });
    const order = await Order.findOne({ where: { id: invoice.order_id } });
    const collection = await Collection.findOne({
      where: { id: order.collection_id },
    });
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }

    const adminUser = await User.findOne({
      where: { id: collection.subdomain_id },
    });

    if (!adminUser) {
      return res
        .status(404)
        .json({ success: false, message: "Admin user not found" });
    }

    const clientUser = await User.findOne({
      where: { id: collection.client_id },
    });

    const packageIds = collection.package_ids
      .split(",")
      .map((id) => parseInt(id.trim(), 10));
    const packages = await Package.findAll({
      where: { id: packageIds },
    });

    const totalPrice = packages.reduce(
      (sum, pkg) => sum + pkg.package_price,
      0
    );

    let itemDescriptions = invoice.item_descriptions;

    console.log(itemDescriptions);
    if (itemDescriptions) {
      itemDescriptions = phpUnserialize(itemDescriptions);
    }
    const itemsArray = [];
    for (const key in itemDescriptions) {
      const item = {
        name: itemDescriptions[key]["name"],
        description: itemDescriptions[key]["description"],
        quantity: itemDescriptions[key]["quantity"],
        price: itemDescriptions[key]["price"],
      };
      itemsArray.push(item);
    }

    const services = await Package.findAll({
      where: {
        subdomain_id: collection.subdomain_id,
      },
      order: [["id", "DESC"]],
    });

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
        modified: collection.modified,
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
        logo: adminUser.logo,
      },
      client: {
        id: clientUser.id,
        name: clientUser.name,
        address: clientUser.address,
        phone: clientUser.phone,
        email: clientUser.email,
      },
      packages: packages.map((pkg) => ({
        id: pkg.id,
        name: pkg.package_name,
        price: pkg.package_price,
        details: pkg.image_type_details,
      })),
      total_price: totalPrice,
      invoice: invoice,
      itemsArray: itemsArray,
      services: services,
    };

    res.status(200).json({ success: true, data: responseData });
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
};

const serializeItems = (items) => {
  try {
    items.forEach((item) => {
      item.product_name = item.name;
      item.product_desc = item.description;
      item.product_quantity = item.quantity;
      item.product_price = item.price;
    });
    return phpSerialize(items);
  } catch (error) {
    console.error("Error serializing items:", error);
    throw error;
  }
};

const updateInvoice = async (req, res) => {
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
    paidAmount,
    subdomainId,
  } = req.body;

  try {
    const serializedItems = serializeItems(items);

    await CustomInvoiceList.update(
      {
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
        subdomain_id: subdomainId,
      },
      {
        where: { id: invoiceId },
      }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving invoice:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const sendInvoice = async (req, res) => {
  try {
    const invoiceId = req.body.invoiceId;
    const invoice = await CustomInvoiceList.findOne({
      where: { id: invoiceId },
    });

    let items = phpUnserialize(invoice.item_descriptions);
    const order = await Order.findOne({ where: { id: invoice.order_id } });
    const client = await User.findOne({ where: { id: order.user_id } });

    const adminUser = await User.findOne({ where: { id: order.subdomain_id } });

    if (!invoice || !order || !client || !adminUser) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    let quickbooks_invoice_id = "";
    if (adminUser.quickbooks_realm_id !== null) {
      const realmId = adminUser.quickbooks_realm_id;
      let accessToken = await getQuickBooksAccessToken(adminUser.id);

      accessToken = await refreshQuickBooksToken(adminUser.id);

      const qbo = new QuickBooks(
        process.env.QUICKBOOKS_CLIENT_ID,
        process.env.QUICKBOOKS_CLIENT_SECRET,
        accessToken,
        false,
        realmId,
        true,
        false,
        4,
        "2.0",
        process.env.QUICKBOOKS_CLIENT_ID
      );
      let quickbooks_customer_id;
      if (client.quickbooks_customer_id) {
        quickbooks_customer_id = client.quickbooks_customer_id;
      } else {
        quickbooks_customer_id = await createQuickBooksCustomer(
          adminUser.id,
          client,
          qbo
        );
      }

      if (quickbooks_invoice_id !== "") {
        await CustomInvoiceList.update(
          {
            quickbooks_invoice_id: quickbooks_invoice_id,
          },
          {
            where: { id: invoiceId },
          }
        );
      }

      const { qb_invoice } = await createQuickBooksInvoice(
        adminUser.id,
        items,
        invoice.total_price,
        invoice.notes,
        quickbooks_customer_id
      );
      quickbooks_invoice_id = qb_invoice.Id;
    }

    const clientEmail = client.email;
    const clientName = client.name;

    const invoiceData = {
      clientName: clientName,
      invoiceNumber: invoice.id,
      invoiceDate: order.created_at,
      dueDate: order.created_at,
      amountDue: invoice.total_price,
      items: items,
    };

    const emailContent = INVOICE_EMAIL(invoiceData);

    sendEmail(clientEmail, "Your Invoice", emailContent);

    await CustomInvoiceList.update(
      { send_invoice: 1 },
      { where: { id: invoiceId } }
    );

    await Collection.update(
      { send_invoice: 1 },
      { where: { id: order.collection_id } }
    );

    res.status(200).json({
      success: true,
      message: "Invoice sent successfully and status updated",
    });
  } catch (error) {
    console.log("error=====>", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getActiveInvoiceNumber = async (req, res) => {
  try {
    let invoices = 0;
    const activeInvoices = await CustomInvoiceList.findAll({
      attributes: ["id"],
      where: {
        subdomain_id: req.body.subdomainId,
        send_invoice: 0,
      },
      order: [["id", "DESC"]],
    });

    invoices = activeInvoices.length;

    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllInvoices,
  deleteInvoice,
  getInvoiceData,
  updateInvoice,
  sendInvoice,
  getActiveInvoiceNumber,
};
