const Packages = require("../models/Packages");
const Booking = require("../models/Booking");
const Collection = require('../models/Collections');

const createService = async (req, res) => {
  let data = req.body;
  let isVideo = req.body.is_video === "true" ? 1 : 0;
  let subdomainId = Number(req.body.subdomain_id);
  let packagePrice = Number(req.body.package_price);

  data.is_video = isVideo;
  data.subdomain_id = subdomainId;
  data.package_price = packagePrice;
  try {
    if (req.body.id) {
      const service = await Packages.update(data, {
        where: { id: req.body.id },
      });
      const updatedService = await Packages.findByPk(req.body.id);
      if (updatedService.package_order === 0) {
        await Packages.update(
          { package_order: updatedService.id },
          { where: { id: updatedService.id } }
        );
      }

      res.status(200).json({ success: true, data: service });
    } else {
      const service = await Packages.create(req.body);

      const updatedService = await Packages.findByPk(service.id);
      if (updatedService.package_order === 0) {
        await Packages.update(
          { package_order: updatedService.id },
          { where: { id: updatedService.id } }
        );
      }
      res.status(200).json({ success: true, data: service });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
};

const getAllServices = async (req, res) => {
  const subdomainId = req.body.subdomain_id;
  const roleId = req.body.role_id;
  try {
    if (roleId != 3) {
      const collections = await Collection.findAll({
        where: { subdomain_id: subdomainId },
      });
      const bookings = await Booking.findAll({
        where: { subdomain_id: subdomainId },
      });
      const collectionPackageIds = collections.map((collection) =>
        collection.package_ids.split(",")
      );
      const bookingPackageIds = bookings.map((booking) =>
        booking.package_ids.split(", ")
      );
      const allPackageIds = [...collectionPackageIds, ...bookingPackageIds];
      const flattenedPackageIds = allPackageIds.flat();
      const uniquePackageIds = [...new Set(flattenedPackageIds)];

      const services = await Packages.findAll({
        where: {
          subdomain_id: subdomainId,
        },
        order: [["id", "DESC"]],
      });
      res.status(200).json({ success: true, data: services, uniquePackageIds: uniquePackageIds });
    } else {
      const collections = await Collection.findAll({
        where: { subdomain_id: subdomainId },
      });
      const bookings = await Booking.findAll({
        where: { subdomain_id: subdomainId },
      });
      const collectionPackageIds = collections.map((collection) =>
        collection.package_ids.split(",")
      );
      const bookingPackageIds = bookings.map((booking) =>
        booking.package_ids.split(", ")
      );
      const allPackageIds = [...collectionPackageIds, ...bookingPackageIds];
      const flattenedPackageIds = allPackageIds.flat();
      const uniquePackageIds = [...new Set(flattenedPackageIds)];
      const services = await Packages.findAll({
        where: {
          subdomain_id: subdomainId,
          status: "Active",
        },
        order: [["id", "DESC"]],
      });
      res.status(200).json({ success: true, data: services, uniquePackageIds: uniquePackageIds });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to list services" });
  }
};

const getService = async (req, res) => {
  const id = req.body.id;

  try {
    const service = await Packages.findOne({
      where: { id: id },
    });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ error: "Failed to get service" });
    console.log(error);
  }
};

const deleteService = async (req, res) => {
  const id = req.body.id;
  try {
    const service = await Packages.destroy({
      where: { id: id },
    });
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
};

const updateServiceOrder = async (req, res) => {
  const ids = req.body.ids;
  const orders = req.body.orders
  try {
    for (let i = 0; i < ids.length; i++) {
      await Packages.update({ package_order: orders[i] }, { where: { id: ids[i] } });
    }
    res.status(200).json({ success: true, message: "Service order updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update service order" });
  }

};

module.exports = { getAllServices, createService, getService, deleteService, updateServiceOrder };
