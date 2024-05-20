const Booking = require("../models/Booking");
const axios = require("axios");
const Collection = require('../models/Collections');
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const Users = require("../models/Users");
const BusinessClients = require("../models/BusinessClients");
const { Op } = require("sequelize");
const moment = require("moment");


exports.handleGetWebhook = (req, res) => {
    const challenge = req.query.challenge;
    console.log("Get========>>>>", challenge);
    res.send(challenge);
};

exports.handlePostWebhook = async (req, res) => {
    if (req.query.challenge) {
        console.log("Post========>>>>", challenge);
        res.send(req.query.challenge);
    } else {
        console.log(req.body);
        res.sendStatus(500);
        const accountId = req.body.list_folder.accounts[0];


        try {


            res.sendStatus(200);
        } catch (error) {
            console.error('Error fetching Dropbox data:', error);
            res.sendStatus(500);
        }
    }
};