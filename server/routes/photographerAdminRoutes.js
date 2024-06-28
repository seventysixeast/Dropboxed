const express = require('express');
const photographerAdminController = require('../controllers/photographerAdminController');
const router = express.Router();

router.post('/getAllPhotographerAdmins', photographerAdminController.getAllPhotographerAdmins);
router.post('/updatePhotographerAdmin', photographerAdminController.updatePhotographerAdmin);
router.post('/getPhotographerAdmin', photographerAdminController.getPhotographerAdmin);
router.post('/deletePhotographerAdmin', photographerAdminController.deletePhotographerAdmin);
router.post('/updateStatusPhotographerAdmin', photographerAdminController.updateStatusPhotographerAdmin);
router.post('/unsubGoogleCalendar', photographerAdminController.unsubGoogleCalendar)
router.post('/unsubDropbox', photographerAdminController.unsubDropbox)
router.post('/unsubQuickbooks', photographerAdminController.unsubQuickbooks)


module.exports = router;