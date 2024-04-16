const Collection = require('../models/Collections');

const addGallery = async (req, res) => {
  try {
    let imageName = req.files && req.files.banner.name;
    let collectionData = {
      name: req.body.title,
      client_id: req.body.client,
      client_address: req.body.address,
      package_ids: req.body.services,
      status: req.body.status,
      banner: imageName || req.body.banner
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

module.exports = { addGallery };