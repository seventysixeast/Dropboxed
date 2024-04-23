const Collection = require('../models/Collections');
const User = require('../models/Users');

const addGallery = async (req, res) => {
  try {
    let imageName = req.files && req.files.banner.name;
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
      await Collection.update(collectionData);
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
    collectionsData.forEach(collection => {
      let clientNames = collection.client_id.split(',').map(id => {
        let clientId = parseInt(id.trim(), 10);
        let client = clientNamesAndIds.find(client => client.id === clientId);
        return client ? client.name : '';
      });
      collection.dataValues.client_name = clientNames.join(', ');
    });
    res.status(200).json({ success: true, data: collectionsData });
  } catch (error) {
    res.status(500).json({ error: "Failed to list collections" });
  }
};

module.exports = { addGallery, getAllCollections };