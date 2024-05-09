const express = require('express');
const photographerAdminController = require('../controllers/photographerAdminController');
const router = express.Router();

router.post('/getAllPhotographerAdmins', photographerAdminController.getAllPhotographerAdmins);
router.post('/updatePhotographerAdmin', photographerAdminController.updatePhotographerAdmin);
router.post('/getPhotographerAdmin', photographerAdminController.getPhotographerAdmin);
router.post('/deletePhotographerAdmin', photographerAdminController.deletePhotographerAdmin);

module.exports = router;