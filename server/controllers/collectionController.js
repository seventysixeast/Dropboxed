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
const sizeOf = require("image-size");
const Jimp = require("jimp");
const fs = require("fs");
const Booking = require("../models/Booking");

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const addGallery = async (req, res) => {
  const user = await User.findOne({
    attributes: ['dropbox_refresh', 'subdomain', 'logo'],
    where: { id: parseInt(req.body.subdomainId) }
  });

  try {
    let collectionData = {
      client_id: req.body.client,
      client_address: req.body.booking_title,
      package_ids: req.body.services,
      photographer_ids: req.body.photographers,
      name: req.body.gallery_title,
      dropbox_link: req.body.dropbox_link,
      video_link: req.body.vimeo_video_link,
      lock_gallery: req.body.lock_gallery,
      notify_client: req.body.notify_client,
      subdomain_id: req.body.subdomainId,
      dropbox_refresh: user.dropbox_refresh,
      image_count: req.body.image_count
    };

    if (!req.body.id) {
      let baseSlug = createSlug(req.body.gallery_title);
      let slug = baseSlug;
      let counter = 1;

      while (await Collection.findOne({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      collectionData.slug = slug;
    }

    if (req.files && Object.keys(req.files).length) {
      let file = req.files.banner;
      let timestamp = Date.now();
      let imageName = req.files.banner.name;
      let imageExt = imageName.split('.').pop();
      let originalImageName = timestamp;
      let smallImageName = `small_${timestamp}`;

      collectionData.banner = originalImageName;
      collectionData.banner_sm = smallImageName;

      let fileUrl = `${process.cwd()}/public/gallery/` + originalImageName;

      file.mv(fileUrl, async function (err) {
        if (err) {
          console.log("in image move error...", fileUrl, err);
        } else {
          const image = await Jimp.read(fileUrl);
          await image.resize(Jimp.AUTO, 256).quality(80).write(`${process.cwd()}/public/gallery/${smallImageName}`);
        }
      });
    }

    let collection;
    if (req.body.id) {
      collection = await Collection.findOne({ where: { id: req.body.id } });
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" });
      }
      await collection.update(collectionData);
      collection = await Collection.findOne({ where: { id: req.body.id } });
    } else {
      collection = await Collection.create(collectionData);
    }

    // Find booking with collectionData.client_address equal to booking.booking_title
    const booking = await Booking.findOne({
      where: { booking_title: collectionData.client_address },
    });

    if (booking) {
      // Update booking's package_ids with collectionData.package_ids
      await booking.update({ package_ids: collectionData.package_ids });
    } else {
      console.log("Booking not found");
    }


    if (req.body.notify_client === "true") {
      const clientData = await User.findOne({
        where: { id: req.body.client },
        attributes: ["email"],
      });
      collectionData.banner = req.body.banner
      console.log(collectionData);
      let SEND_EMAIL = NEW_COLLECTION(
        user.subdomain,
        user.logo,
        collectionData
      );

      sendEmail(clientData.email, "New Collection", SEND_EMAIL);

      await Notifications.create({
        notification: `New gallery '${collectionData.name}' has been created.`,
        client_id: req.body.client,
        subdomain_id: req.body.subdomainId,
        date: new Date(),
      });
    }
    res.status(200).json({
      success: true,
      message: req.body.id
        ? "Gallery updated successfully"
        : "Gallery created successfully",
      data: collection,
    });
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ error: "Failed to add/update gallery" });
  }
};

const getAllCollections = async (req, res) => {
  try {
    const { roleId, subdomainId, userId } = req.body;
    let collectionsData;

    if (roleId == 3) {
      collectionsData = await Collection.findAll({
        where: {
          subdomain_id: subdomainId,
          client_id: userId,
          notify_client: true,
        },
        order: [["created", "DESC"]],
      });
    } else if (roleId == 2) {
      collectionsData = await Collection.findAll({
        where: {
          subdomain_id: subdomainId,
        },
        order: [["created", "DESC"]],
      });
      collectionsData = collectionsData.filter((collection) => {
        const photographerIds = collection.photographer_ids
          .split(",")
          .map((id) => id.trim());
        return photographerIds.includes(userId.toString());
      });
    } else {
      collectionsData = await Collection.findAll({
        where: {
          subdomain_id: subdomainId,
        },
        order: [["created", "DESC"]],
      });
    }

    const clientIds = collectionsData
      .map((collection) => collection.client_id)
      .filter((id) => id);
    const photographerIds = collectionsData
      .map((collection) => collection.photographer_ids)
      .filter((id) => id);
    const packageIds = collectionsData
      .map((collection) => collection.package_ids)
      .filter((id) => id);

    if (clientIds.length > 0) {
      const uniqueClientIds = [
        ...new Set(
          clientIds.flatMap((ids) =>
            ids.split(",").map((id) => parseInt(id.trim(), 10))
          )
        ),
      ];
      const clientData = await User.findAll({ where: { id: uniqueClientIds } });

      const clientNamesAndIds = clientData.reduce((acc, client) => {
        acc[client.id] = client.name;
        return acc;
      }, {});

      collectionsData.forEach((collection) => {
        if (collection.client_id) {
          const clientNames = collection.client_id
            .split(",")
            .map((id) => clientNamesAndIds[parseInt(id.trim(), 10)] || "")
            .join(", ");
          collection.dataValues.client_name = clientNames;
        }
      });
    }

    if (photographerIds.length > 0) {
      const uniquePhotographerIds = [
        ...new Set(
          photographerIds.flatMap((ids) =>
            ids.split(",").map((id) => parseInt(id.trim(), 10))
          )
        ),
      ];
      const photographerData = await User.findAll({
        where: { id: uniquePhotographerIds },
      });

      const photographerNamesAndIds = photographerData.reduce(
        (acc, photographer) => {
          acc[photographer.id] = photographer.name;
          return acc;
        },
        {}
      );

      collectionsData.forEach((collection) => {
        if (collection.photographer_ids) {
          const photographerNames = collection.photographer_ids
            .split(",")
            .map((id) => photographerNamesAndIds[parseInt(id.trim(), 10)] || "")
            .join(", ");
          collection.dataValues.photographers_name = photographerNames;
        }
      });
    }

    if (packageIds.length > 0) {
      const uniquePackageIds = [
        ...new Set(
          packageIds.flatMap((ids) =>
            ids.split(",").map((id) => parseInt(id.trim(), 10))
          )
        ),
      ];
      const packageData = await Package.findAll({
        where: { id: uniquePackageIds },
      });

      const packageNamesAndIds = packageData.reduce((acc, pkg) => {
        acc[pkg.id] = pkg.package_name;
        return acc;
      }, {});

      await Promise.all(
        collectionsData.map(async (collection) => {
          if (collection.package_ids) {
            const packageNames = collection.package_ids
              .split(",")
              .map((id) => packageNamesAndIds[parseInt(id.trim(), 10)] || "")
              .filter((name) => name)
              .join(", ");

            collection.dataValues.packages_name = packageNames;

            const packageIdsArray = collection.package_ids
              .split(",")
              .map((id) => parseInt(id.trim(), 10));

            let packages = packageData.filter((pkg) =>
              packageIdsArray.includes(pkg.id)
            );

            packages = packages.map((pkg) => {
              let imageTypeDetailsObj = {};
              if (typeof pkg.image_type_details === "string") {
                try {
                  const imageTypeDetails = JSON.parse(pkg.image_type_details);
                  imageTypeDetails.forEach((detail) => {
                    imageTypeDetailsObj[detail.image_type] = detail;
                  });
                } catch (error) {
                  console.error(
                    `Error parsing JSON for package id ${pkg.id}:`,
                    error
                  );
                }
              } else if (
                typeof pkg.image_type_details === "object" &&
                pkg.image_type_details !== null
              ) {
                imageTypeDetailsObj = pkg.image_type_details;
              } else {
                console.warn(
                  `Unexpected data format for package id ${pkg.id}:`,
                  pkg.image_type_details
                );
              }
              pkg.image_type_details = imageTypeDetailsObj;
              return pkg;
            });

            collection.dataValues.packages = packages;
          }

          const order = await Order.findOne({
            where: {
              collection_id: collection.id,
            },
          });

          collection.dataValues.orderFound = !!order;
        })
      );
    }
    res.status(200).json({ success: true, data: collectionsData });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Failed to list collections" });
  }
};

const updateGalleryLock = async (req, res) => {
  try {
    const collectionId = req.body.id;
    const collection = await Collection.findByPk(collectionId);
    if (collection) {
      collection.lock_gallery = req.body.lock_gallery;
      await collection.save();
      const updatedCollection = await Collection.findByPk(collectionId);
      res.status(200).json({
        success: true,
        data: updatedCollection,
        message: "Collection updated successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "Collection not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Collection" });
  }
};

const getCollection = async (req, res) => {
  try {
    let collectionData = await Collection.findOne({
      where: {
        slug: req.body.slug,
      },
      order: [["created", "DESC"]],
    });
    res.status(200).json({ success: true, data: collectionData });
  } catch (error) {
    res.status(500).json({ error: "Failed to list collection" });
  }
};

const getDropboxRefresh = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["dropbox_refresh"],
      where: { id: req.body.id },
    });
    res.status(200).json({ success: true, data: user.dropbox_refresh });
  } catch (error) {
    res.status(500).json({ error: "Failed to find Refresh Token." });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const collectionId = req.body.id;
    const deleted = await Collection.destroy({
      where: { id: collectionId },
    });
    if (deleted) {
      res
        .status(200)
        .json({ success: true, message: "Collection deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Collection not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Collection" });
  }
};

const updateCollection = async (req, res) => {
  try {
    const collectionId = req.body.id;
    const updated = await Collection.update(req.body, {
      where: { id: collectionId },
    });
    if (updated) {
      res
        .status(200)
        .json({ success: true, message: "Collection updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Collection not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Collection" });
  }
};

const updateGalleryNotify = async (req, res) => {
  try {
    const collectionId = req.body.id;
    const collection = await Collection.findOne({
      where: { id: collectionId },
    });
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }
    
    const updated = await Collection.update(
      { notify_client: 1 },
      {
        where: { id: collectionId },
      }
    );

    if (updated) {
      const user = await User.findOne({ where: { id: collection.user_id } });
      const clientData = await User.findOne({
        where: { id: collection.client_id },
      });
      const admin = await User.findOne({ where: { id: collection.subdomain_id } });


      if (user && clientData) {
        let SEND_EMAIL = NEW_COLLECTION(admin.subdomain, admin.logo, collection);
        await sendEmail(clientData.email, "New Collection", SEND_EMAIL);

        await Notifications.create({
          notification: `New gallery '${collection.name}' has been created.`,
          client_id: collection.client_id,
          subdomain_id: user.subdomain_id,
          date: new Date(),
        });
      }

      return res
        .status(200)
        .json({ success: true, message: "Collection updated successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Collection" });
  }
};

const getOrderDataForInvoice = async (req, res) => {
  try {
    const { collectionId } = req.body;

    const collection = await Collection.findOne({
      where: { id: collectionId },
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

    // Fetch packages data
    const packageIds = collection.package_ids
      .split(",")
      .map((id) => parseInt(id.trim(), 10));
    const packages = await Package.findAll({
      where: { id: packageIds },
    });

    // Calculate total price
    const totalPrice = packages.reduce(
      (sum, pkg) => sum + pkg.package_price,
      0
    );

    // Structure the response data
    const responseData = {
      collection: {
        id: collection.id,
        client_address: collection.client_address,
        name: collection.name,
        slug: collection.slug,
        dropbox_link: collection.dropbox_link,
        video_link: collection.video_link,
        image_type: collection.image_type,
        price: collection.price,
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
        business_name: adminUser.business_name,
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
        price: pkg.show_price ? pkg.package_price : 0,
        details: pkg.image_type_details,
      })),
      total_price: totalPrice,
    };

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error("Error fetching order data for invoice:", error);
    res.status(500).json({ error: "Failed to fetch order data for invoice" });
  }
};

const serializeInvoiceItems = (items) => {
  return items
    .map((item) => `${item.product_name} x${item.quantity}`)
    .join(", ");
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

const saveInvoiceToDatabase = async (req, res) => {
  const {
    collectionId,
    items,
    subtotal,
    taxRate,
    taxAmount,
    amountPaid,
    amountDue,
    total,
    note,
    invoiceLink,
    clientName,
    clientAddress,
    subdomainId,
    paidStatus
  } = req.body;
  const userId = subdomainId;

  try {
    const collection = await Collection.findOne({
      where: { id: collectionId },
    });
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }

    const clientUser = await User.findOne({
      where: { id: collection.client_id },
    });
    if (!clientUser) {
      return res
        .status(404)
        .json({ success: false, message: "Client user not found" });
    }



    const newOrder = await Order.create({
      user_id: clientUser.id,
      collection_id: collectionId,
      package_id: 0,
      image_id: 0,
      allow_download: 0,
      invoice_link: invoiceLink,
      invoice_price: total,
      subdomain_id: subdomainId,
      paid_status: paidStatus
    });

    const orderId = newOrder.id;

    const serializedItems = phpSerialize(items);
    const invoiceData = {
      order_id: orderId,
      user_name: clientName,
      user_address: clientAddress,
      item_descriptions: serializedItems,
      paid_amount: amountPaid,
      due_amount: amountDue,
      total_price: total,
      notes: note,
      send_invoice: false,
      paid_status: false,
      invoice_link: invoiceLink,
      subdomain_id: subdomainId,
      paid_status: paidStatus
    };
    // if (quickbooks_invoice_id !== "") {
    //   invoiceData.quickbooks_invoice_id = quickbooks_invoice_id;
    // }

    const invoiceCreated = await CustomInvoiceList.create(invoiceData);

    return res.status(200).json({
      success: true,
      invoice: invoiceCreated,
      // quickbooks_invoice_id: quickbooks_invoice_id,
    });
  } catch (error) {
    console.error("Error saving invoice:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const createQuickBooksCustomer = (userId, clientUser, qbo) => {
  return new Promise((resolve, reject) => {
    qbo.createCustomer(
      {
        FullyQualifiedName: clientUser.name,
        PrimaryEmailAddr: {
          Address: clientUser.email,
        },
        DisplayName: clientUser.name,
        // "Suffix": "Jr",
        // "Title": "Mr",
        // "MiddleName": "B",
        Notes: "Here are other details.",
        // "FamilyName": "saruna",
        PrimaryPhone: {
          FreeFormNumber: clientUser.phone,
        },
        // "CompanyName": "saruna business",
        BillAddr: {
          CountrySubDivisionCode: "NSW",
          City: clientUser.city,
          PostalCode: clientUser.postal_code,
          Line1: clientUser.address,
          Country: clientUser.country,
        },
        // "GivenName": "saruna"
      },
      (error, newCustomer) => {
        if (error) {
          console.error("Error creating QuickBooks customer:", error);
          reject(
            new Error("Could not create QuickBooks customer: " + error.message)
          );
        } else {
          // Check if newCustomer is defined and contains Id
          if (!newCustomer || !newCustomer.Id) {
            const errorMessage =
              "Could not create QuickBooks customer: Customer ID not received";
            console.error(errorMessage);
            console.error("QuickBooks API Response:", newCustomer); // Log the response from QuickBooks API
            reject(new Error(errorMessage));
          } else {
            User.update(
              { quickbooks_customer_id: newCustomer.Id },
              { where: { id: clientUser.id } }
            )
              .then(() => {
                resolve(newCustomer.Id);
              })
              .catch((updateError) => {
                console.error(
                  "Error updating user with QuickBooks client ID:",
                  updateError
                );
                reject(
                  new Error("Could not update user with QuickBooks client ID")
                );
              });
          }
        }
      }
    );
  });
};

module.exports = {
  addGallery,
  getAllCollections,
  getCollection,
  updateGalleryLock,
  getDropboxRefresh,
  deleteCollection,
  updateCollection,
  updateGalleryNotify,
  getOrderDataForInvoice,
  saveInvoiceToDatabase,
  createQuickBooksCustomer
};
