const Collection = require('../models/Collections');
const User = require('../models/Users');
const Package = require('../models/Packages');
const Order = require('../models/Orders');
const CustomInvoiceList = require("../models/Invoices");

function createSlug(title) {
  return title.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

const addGallery = async (req, res) => {
  const user = await User.findOne({
    attributes: ['dropbox_refresh'],
    where: { id: req.body.subdomainId },
  });

  try {
    let imageName = req.files && req.files.banner.name;
    let baseSlug = createSlug(req.body.gallery_title);
    let slug = baseSlug;
    let counter = 1;

    // Check if the slug already exists in the Collection
    while (await Collection.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    let collectionData = {
      client_id: req.body.client,
      client_address: req.body.booking_title,
      package_ids: req.body.services,
      photographer_ids: req.body.photographers,
      name: req.body.gallery_title,
      dropbox_link: req.body.dropbox_link,
      video_link: req.body.vimeo_video_link,
      banner: imageName || req.body.banner,
      lock_gallery: req.body.lock_gallery,
      notify_client: req.body.notify_client,
      subdomain_id: req.body.subdomainId,
      dropbox_refresh: user.dropbox_refresh,
      slug: slug,
      image_count: req.body.image_count
    };

    if (req.files && Object.keys(req.files).length) {
      let file = req.files.banner;
      let fileUrl = `${process.cwd()}/public/gallery/` + req.files.banner.name;

      file.mv(fileUrl, async function (err) {
        if (err) {
          console.log("in image move error...", fileUrl, err);
        }
      });
    }

    let collection;
    if (req.body.id) {
      collection = await Collection.findOne({ where: { id: req.body.id } });
      if (!collection) {
        return res.status(404).json({ error: 'Collection not found' });
      }
      await collection.update(collectionData);
    } else {
      collection = await Collection.create(collectionData);
    }

    res.status(200).json({
      success: true,
      message: req.body.id ? "Gallery updated successfully" : "Gallery created successfully",
      data: collection
    });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ error: "Failed to add/update gallery" });
  }
};


const getAllCollections = async (req, res) => {

  try {
    if (req.body.roleId == 3) {
      let collectionsData = await Collection.findAll({
        where: {
          subdomain_id: req.body.subdomainId,
          client_id: req.body.userId,
          notify_client: true
        },
        order: [['created', 'DESC']]
      });
      let clientIds = collectionsData.map(collection => collection.client_id);
      let idsAsIntegers = clientIds.map(ids => ids.split(',').map(id => parseInt(id.trim(), 10)));
      let clientData = await User.findAll({
        where: {
          id: idsAsIntegers.flat()
        }
      });
      let clientNamesAndIds = clientData.map(client => ({
        id: client.id,
        name: client.name
      }));
      let photographerIds = collectionsData.map(collection => collection.photographer_ids);
      let photographerIdsAsIntegers = photographerIds.map(ids => ids.split(',').map(id => parseInt(id.trim(), 10)));
      let photographerData = await User.findAll({
        where: {
          id: photographerIdsAsIntegers.flat()
        }
      });
      let photographerNamesAndIds = photographerData.map(photographer => ({
        id: photographer.id,
        name: photographer.name
      }));
      let packageIds = collectionsData.map(collection => collection.package_ids);
      let packageIdsAsIntegers = packageIds.map(ids => ids.split(',').map(id => parseInt(id.trim(), 10)));
      let packageData = await Package.findAll({
        where: {
          id: packageIdsAsIntegers.flat()
        }
      });
      let packageNamesAndIds = packageData.map(pkg => ({
        id: pkg.id,
        name: pkg.package_name
      }));
      collectionsData.forEach(collection => {
        let clientNames = collection.client_id.split(',').map(id => {
          let clientId = parseInt(id.trim(), 10);
          let client = clientNamesAndIds.find(client => client.id === clientId);
          return client ? client.name : '';
        });
        collection.dataValues.client_name = clientNames.join(', ');
        let photographerNames = collection.photographer_ids.split(',').map(id => {
          let photographerId = parseInt(id.trim(), 10);
          let photographer = photographerNamesAndIds.find(photographer => photographer.id === photographerId);
          return photographer ? photographer.name : '';
        });
        collection.dataValues.photographers_name = photographerNames.join(', ');
        let packageNames = collection.package_ids.split(',').map(id => {
          let packageId = parseInt(id.trim(), 10);
          let pkg = packageNamesAndIds.find(pkg => pkg.id === packageId);
          return pkg ? pkg.name : '';
        });
        collection.dataValues.packages_name = packageNames.join(', ');
      });
      res.status(200).json({ success: true, data: collectionsData });
    } else if (req.body.roleId == 2) {
      let collectionsData = await Collection.findAll({
        where: {
          subdomain_id: req.body.subdomainId,
        },
        order: [['created', 'DESC']]
      });

      collectionsData = collectionsData.filter(collection => {
        const photographerIds = collection.photographer_ids.split(',').map(id => id.trim());
        return photographerIds.includes(req.body.userId);
      });

      console.log(collectionsData.length);
      let clientIds = collectionsData.map(collection => collection.client_id);
      let idsAsIntegers = clientIds.map(ids => ids.split(',').map(id => parseInt(id.trim(), 10)));
      let clientData = await User.findAll({
        where: {
          id: idsAsIntegers.flat()
        }
      });
      let clientNamesAndIds = clientData.map(client => ({
        id: client.id,
        name: client.name
      }));
      let photographerIds = collectionsData.map(collection => collection.photographer_ids);
      let photographerIdsAsIntegers = photographerIds.map(ids => ids.split(',').map(id => parseInt(id.trim(), 10)));
      let photographerData = await User.findAll({
        where: {
          id: photographerIdsAsIntegers.flat()
        }
      });
      let photographerNamesAndIds = photographerData.map(photographer => ({
        id: photographer.id,
        name: photographer.name
      }));
      let packageIds = collectionsData.map(collection => collection.package_ids);
      let packageIdsAsIntegers = packageIds.map(ids => ids.split(',').map(id => parseInt(id.trim(), 10)));
      let packageData = await Package.findAll({
        where: {
          id: packageIdsAsIntegers.flat()
        }
      });
      let packageNamesAndIds = packageData.map(pkg => ({
        id: pkg.id,
        name: pkg.package_name
      }));
      collectionsData.forEach(collection => {
        let clientNames = collection.client_id.split(',').map(id => {
          let clientId = parseInt(id.trim(), 10);
          let client = clientNamesAndIds.find(client => client.id === clientId);
          return client ? client.name : '';
        });
        collection.dataValues.client_name = clientNames.join(', ');
        let photographerNames = collection.photographer_ids.split(',').map(id => {
          let photographerId = parseInt(id.trim(), 10);
          let photographer = photographerNamesAndIds.find(photographer => photographer.id === photographerId);
          return photographer ? photographer.name : '';
        });
        collection.dataValues.photographers_name = photographerNames.join(', ');
        let packageNames = collection.package_ids.split(',').map(id => {
          let packageId = parseInt(id.trim(), 10);
          let pkg = packageNamesAndIds.find(pkg => pkg.id === packageId);
          return pkg ? pkg.name : '';
        });
        collection.dataValues.packages_name = packageNames.join(', ');
      });
      res.status(200).json({ success: true, data: collectionsData });
    } else {
      let collectionsData = await Collection.findAll({
        where: {
          subdomain_id: req.body.subdomainId
        },
        order: [['created', 'DESC']]
      });
      let clientIds = collectionsData.map(collection => collection.client_id);
      let idsAsIntegers = clientIds.map(ids => ids.split(',').map(id => parseInt(id.trim(), 10)));
      let clientData = await User.findAll({
        where: {
          id: idsAsIntegers.flat()
        }
      });
      let clientNamesAndIds = clientData.map(client => ({
        id: client.id,
        name: client.name
      }));
      let photographerIds = collectionsData.map(collection => collection.photographer_ids);
      let photographerIdsAsIntegers = photographerIds.map(ids => ids.split(',').map(id => parseInt(id.trim(), 10)));
      let photographerData = await User.findAll({
        where: {
          id: photographerIdsAsIntegers.flat()
        }
      });
      let photographerNamesAndIds = photographerData.map(photographer => ({
        id: photographer.id,
        name: photographer.name
      }));
      let packageIds = collectionsData.map(collection => collection.package_ids);
      let packageIdsAsIntegers = packageIds.map(ids => ids.split(',').map(id => parseInt(id.trim(), 10)));
      let packageData = await Package.findAll({
        where: {
          id: packageIdsAsIntegers.flat()
        }
      });
      let packageNamesAndIds = packageData.map(pkg => ({
        id: pkg.id,
        name: pkg.package_name
      }));
      collectionsData.forEach(collection => {
        let clientNames = collection.client_id.split(',').map(id => {
          let clientId = parseInt(id.trim(), 10);
          let client = clientNamesAndIds.find(client => client.id === clientId);
          return client ? client.name : '';
        });
        collection.dataValues.client_name = clientNames.join(', ');
        let photographerNames = collection.photographer_ids.split(',').map(id => {
          let photographerId = parseInt(id.trim(), 10);
          let photographer = photographerNamesAndIds.find(photographer => photographer.id === photographerId);
          return photographer ? photographer.name : '';
        });
        collection.dataValues.photographers_name = photographerNames.join(', ');
        let packageNames = collection.package_ids.split(',').map(id => {
          let packageId = parseInt(id.trim(), 10);
          let pkg = packageNamesAndIds.find(pkg => pkg.id === packageId);
          return pkg ? pkg.name : '';
        });
        collection.dataValues.packages_name = packageNames.join(', ');
      });
      res.status(200).json({ success: true, data: collectionsData });
    }
  } catch (error) {
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
      res.status(200).json({ success: true, data: updatedCollection, message: "Collection updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Collection not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Collection" });
  }
}

const getCollection = async (req, res) => {
  try {
    let collectionData = await Collection.findOne({
      where: {
        slug: req.body.slug
      },
      order: [['created', 'DESC']]
    });
    res.status(200).json({ success: true, data: collectionData });
  } catch (error) {
    res.status(500).json({ error: "Failed to list collection" });
  }
};

const getDropboxRefresh = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ['dropbox_refresh'],
      where: { id: req.body.id },
    });
    res.status(200).json({ success: true, data: user.dropbox_refresh });
  } catch (error) {
    res.status(500).json({ error: "Failed to find Refresh Token." });
  }
}

const deleteCollection = async (req, res) => {
  try {
    const collectionId = req.body.id;
    const deleted = await Collection.destroy({
      where: { id: collectionId }
    });
    if (deleted) {
      res.status(200).json({ success: true, message: "Collection deleted successfully" });
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
      where: { id: collectionId }
    });
    if (updated) {
      res.status(200).json({ success: true, message: "Collection updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Collection not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Collection" });
  }
}

const updateGalleryNotify = async (req, res) => {
  try {
    const collectionId = req.body.id;
    const collection = await Collection.findOne({ where: { id: collectionId } });
    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }
    const updated = await Collection.update({ notify_client: !collection.notify_client }, {
      where: { id: collectionId }
    });
    if (updated) {
      res.status(200).json({ success: true, message: "Collection updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Collection not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Collection" });
  }
}

const getOrderDataForInvoice = async (req, res) => {
  try {
    const { collectionId } = req.body;

    // Fetch collection data
    const collection = await Collection.findOne({
      where: { id: collectionId }
    });

    if (!collection) {
      return res.status(404).json({ success: false, message: 'Collection not found' });
    }

    // Fetch admin user data using subdomain_id
    const adminUser = await User.findOne({
      where: { id: collection.subdomain_id }
    });

    if (!adminUser) {
      return res.status(404).json({ success: false, message: 'Admin user not found' });
    }

    const clientUser = await User.findOne({
      where: { id: collection.client_id }
    });

    // Fetch packages data
    const packageIds = collection.package_ids.split(',').map(id => parseInt(id.trim(), 10));
    const packages = await Package.findAll({
      where: { id: packageIds }
    });

    // Calculate total price
    const totalPrice = packages.reduce((sum, pkg) => sum + pkg.package_price, 0);

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
      total_price: totalPrice
    };

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error('Error fetching order data for invoice:', error);
    res.status(500).json({ error: 'Failed to fetch order data for invoice' });
  }
};

const serializeItems = (items) => {
  const serialized = items.map((item, index) => {
    const details = JSON.parse(item.details);
    return {
      product_name: item.name,
      product_desc: details.map(detail => `${detail.image_type_count} ${detail.image_type_label}`).join(', '),
      product_quantity: String(item.quantity),
      product_price: item.price.toFixed(2)
    };
  });

  return `a:${serialized.length}:{${serialized.map((item, index) => `i:${index};a:4:{s:12:"product_name";s:${item.product_name.length}:"${item.product_name}";s:12:"product_desc";s:${item.product_desc.length}:"${item.product_desc}";s:16:"product_quantity";s:${item.product_quantity.length}:"${item.product_quantity}";s:13:"product_price";s:${item.product_price.length}:"${item.product_price}";}`).join('')}}`;
};

const saveInvoiceToDatabase = async (req, res) => {
  const userId = req.user.userId;
  const {
    collectionId,
    items,
    subtotal,
    taxRate,
    taxAmount,
    total,
    note,
    invoiceLink
  } = req.body;

  try {
    // Insert into Orders table
    const newOrder = await Order.create({
      user_id: userId,
      collection_id: collectionId,
      package_id: 0,
      image_id: 0,
      allow_download: 0,
      invoice_link: invoiceLink,
      invoice_price: total,
    });

    const orderId = newOrder.id;

    const serializedItems = serializeItems(items);

    // Save data to CustomInvoiceList table
    await CustomInvoiceList.create({
      order_id: newOrder.id,
      user_name: '',  
      user_address: '',  
      item_descriptions: serializedItems,
      //paid_amount: total,
      due_amount: 0, 
      total_price: total,
      notes: note,
      send_invoice: false,  
      paid_status: false,  
      invoice_link: invoiceLink,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving invoice:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addGallery, getAllCollections, getCollection, updateGalleryLock, getDropboxRefresh, deleteCollection, updateCollection, updateGalleryNotify, getOrderDataForInvoice, saveInvoiceToDatabase };