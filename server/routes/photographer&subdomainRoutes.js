const express = require('express');
const photographersandsubdomains = require('../controllers/photographers&subdomains');
const router = express.Router();

router.post('/getAllPhotographersAndSubdomains', photographersandsubdomains.getAllPhotographersAndSubdomains);
router.post('/createPhotographerAndSubdomain', photographersandsubdomains.createPhotographerAndSubdomain);
router.post('/getPhotographerAndSubdomain', photographersandsubdomains.getPhotographerAndSubdomain);
router.post('/deletePhotographerAndSubdomain', photographersandsubdomains.deletePhotographerAndSubdomain);

module.exports = router;