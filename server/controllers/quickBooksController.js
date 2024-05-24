const QuickBooks = require('node-quickbooks');
const crypto = require('crypto');
const pool = require('../db'); // Assuming you are using a pool for database connections

const consumerKey = process.env.QUICKBOOKS_CONSUMER_KEY;
const consumerSecret = process.env.QUICKBOOKS_CONSUMER_SECRET;
const oauthCallback = process.env.QUICKBOOKS_OAUTH_CALLBACK_URL;

// Step 1: Get the OAuth request token
exports.requestToken = (req, res) => {
  QuickBooks.setOauthVersion('2.0');
  const OAuthClient = new QuickBooks.OAuthClient({
    clientId: consumerKey,
    clientSecret: consumerSecret,
    environment: 'sandbox', // or 'production'
    redirectUri: oauthCallback,
  });

  const authUri = OAuthClient.authorizeUri({
    scope: [QuickBooks.scopes.Accounting],
    state: crypto.randomBytes(16).toString('hex'),
  });

  res.redirect(authUri);
};

// Step 2: Handle the OAuth callback
exports.callback = async (req, res) => {
  const OAuthClient = new QuickBooks.OAuthClient({
    clientId: consumerKey,
    clientSecret: consumerSecret,
    environment: 'sandbox', // or 'production'
    redirectUri: oauthCallback,
  });

  const parseRedirect = req.url;

  try {
    const token = await OAuthClient.createToken(parseRedirect);

    // Save tokens to the database
    const userId = req.user.id; // Assuming user ID is available in req.user
    await pool.query(
      'UPDATE users SET quickbooks_access_token = $1, quickbooks_refresh_token = $2, quickbooks_realm_id = $3 WHERE id = $4',
      [token.access_token, token.refresh_token, token.realmId, userId]
    );

    res.send('QuickBooks authentication successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during QuickBooks authentication');
  }
};
