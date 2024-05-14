const ImageType = require('../models/ImageTypes');

const getImageTypes = async (req, res) => {
  const subdomain_id = req.body.subdomain_id;
  try {
    const imagesTypes = await ImageType.findAll({
      where: { 'subdomain_id' : subdomain_id },
      order: [
        ['id', 'DESC']
      ]
    });
    res.status(200).json({ success: true, data: imagesTypes });
  } catch (error) {
    res.status(500).json({ error: "Failed to list images types" });
  }
};

const createImageType = async (req, res) => {
  try {
    const { id, type, price, status, gallery_status } = req.body;
    let imageType;

    const imageTypeData = {
      type,
      price,
      status,
      gallery_status,
    };

    if (id) {
      imageType = await ImageType.findByPk(id);
      if (!imageType) {
        return res.status(404).json({ error: 'ImageType not found' });
      }
      await imageType.update(imageTypeData);
      return res.status(200).json({
        success: true,
        message: "ImageType updated successfully",
        data: imageType
      });
    } else {
      imageType = await ImageType.create(imageTypeData);
      return res.status(201).json({
        success: true,
        message: "ImageType created successfully",
        data: imageType
      });
    }
  } catch (error) {
    console.error("Failed to add/update ImageType:", error);
    res.status(500).json({ error: "Failed to add/update ImageType" });
  }
};

const getImageType = async (req, res) => {
  try {
    const imageTypeData = await ImageType.findOne({ where: { id: req.body.id } });
    res.status(200).json({ success: true, data: imageTypeData });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of ImageType" });
  }
};

const deleteImageType = async (req, res) => {
  try {
    const imageTypeId = req.body.id;
    const deleted = await ImageType.destroy({
      where: { id: imageTypeId }
    });
    if (deleted) {
      res.status(200).json({ success: true, message: "ImageType deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "ImageType not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete ImageType" });
  }
};

module.exports = { getImageTypes, createImageType, getImageType, deleteImageType };