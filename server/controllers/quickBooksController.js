const axios = require('axios');
const User = require('../models/Users');
const { Op } = require("sequelize");
const crypto = require('crypto');

const QUICKBOOKS_CLIENT_ID = process.env.QUICKBOOKS_CLIENT_ID;
const QUICKBOOKS_CLIENT_SECRET = process.env.QUICKBOOKS_CLIENT_SECRET;
const QUICKBOOKS_REDIRECT_URI = process.env.QUICKBOOKS_REDIRECT_URI;

const generateState = (data) => {
  const state = JSON.stringify(data);
  return Buffer.from(state).toString('base64');
};

const parseState = (state) => {
  const decoded = Buffer.from(state, 'base64').toString('utf8');
  return JSON.parse(decoded);
};

exports.getQuickBooksAuthUrl = (req, res) => {
  const clientId = QUICKBOOKS_CLIENT_ID;
  const redirectUri = QUICKBOOKS_REDIRECT_URI;
  const scope = 'com.intuit.quickbooks.accounting';
  const responseType = 'code';

  const subdomain = req.user.subdomain; // Get user subdomain
  const userId = req.user.userId; // Get user id
 
  const state = generateState({ subdomain, userId });

  const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${encodeURIComponent(state)}`;

  res.json({ authUrl });
};


exports.quickBooksCallback = async (req, res) => {
  const { code, state, realmId } = req.query;
  const parsedState = parseState(state);
  const { subdomain, userId } = parsedState;
  const authString = Buffer.from(`${QUICKBOOKS_CLIENT_ID}:${QUICKBOOKS_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: QUICKBOOKS_REDIRECT_URI
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`
      }
    });

    const { access_token, refresh_token } = response.data;
console.log("userId>>>>>>>>>>>>",userId, subdomain)
    // Save tokens and realmId in the user's record
    await User.update({
      quickbooks_access_token: access_token,
      quickbooks_refresh_token: refresh_token,
      quickbooks_realm_id: realmId
    }, {
      where: { id: userId } // Use the userId from the state
    });

    // Send success response with subdomain for frontend to handle redirection
    res.json({ success: true, subdomain });
  } catch (error) {
    console.error('Error during QuickBooks token exchange:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.response?.data });
  }
};
