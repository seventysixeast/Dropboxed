const axios = require('axios');
const User = require('../models/Users');
const Package = require('../models/Packages');
const { Op } = require("sequelize");
const QuickBooks = require('node-quickbooks');


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

  const subdomain = req.user.subdomain;
  const userId = req.user.userId;

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

    // Save tokens and realmId in the user's record
    await User.update({
      quickbooks_access_token: access_token,
      quickbooks_refresh_token: refresh_token,
      quickbooks_realm_id: realmId
    }, {
      where: { id: userId }
    });

    // Send success response with subdomain for frontend to handle redirection
    res.json({ success: true, subdomain });
  } catch (error) {
    console.error('Error during QuickBooks token exchange:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.response?.data });
  }
};

exports.refreshQuickBooksToken = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  const authString = Buffer.from(`${QUICKBOOKS_CLIENT_ID}:${QUICKBOOKS_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: user.quickbooks_refresh_token
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`
      }
    });

    const { access_token, refresh_token } = response.data;

    await User.update({
      quickbooks_access_token: access_token,
      quickbooks_refresh_token: refresh_token
    }, {
      where: { id: userId }
    });

    return access_token;
  } catch (error) {
    console.error('Error refreshing QuickBooks token:', error.response?.data || error.message);
    throw new Error('Failed to refresh QuickBooks token');
  }
};

const createQuickBooksAccount = (qbo, accountData) => {
  return new Promise((resolve, reject) => {
    qbo.createAccount(accountData, (error, newAccount) => {
      if (error) {
        console.error('Error creating QuickBooks account:', JSON.stringify(error));
        reject(new Error('Could not create QuickBooks account: ' + error.message));
      } else {
        resolve(newAccount.Id);
      }
    });
  });
};

const initQuickBooks = async (userId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const realmId = user.quickbooks_realm_id;
    if (!realmId) {
      throw new Error('QuickBooks realm ID not found for user');
    }

    let accessToken = await exports.getQuickBooksAccessToken(userId);

    // Refresh access token if it's expired
    if (!accessToken) {
      accessToken = await exports.refreshQuickBooksToken(userId);
    }

    const qbo = new QuickBooks(
      process.env.QUICKBOOKS_CLIENT_ID,
      process.env.QUICKBOOKS_CLIENT_SECRET,
      accessToken,
      false, // No OAuth 1.0
      realmId,
      true, // Use sandbox or set to false for production
      false, // Turn off debugging
      4, // Minor version
      '2.0', // OAuth version
      process.env.QUICKBOOKS_CLIENT_ID // Consumer key as token secret
    );

    return qbo;
  } catch (error) {
    console.error('Error initializing QuickBooks:', error);
    throw new Error('Could not initialize QuickBooks');
  }
};

const ensureQuickBooksAccounts = async (qbo, user) => {
  let { quickbooks_income_account_id, quickbooks_expense_account_id, quickbooks_asset_account_id } = user;

  if (!quickbooks_income_account_id || !quickbooks_expense_account_id || !quickbooks_asset_account_id) {
    const incomeAccountData = {
      Name: 'Sales of Product Income Studio',
      AccountType: 'Income',
      AccountSubType: 'SalesOfProductIncome',
    };

    const expenseAccountData = {
      Name: 'Cost of Goods Sold Studio',
      AccountType: 'Cost of Goods Sold',
      AccountSubType: 'SuppliesMaterialsCogs',
    };

    const assetAccountData = {
      Name: 'Inventory Asset Studio',
      AccountType: 'Other Current Asset',
      AccountSubType: 'Inventory',
    };

    if (!quickbooks_income_account_id) {
      quickbooks_income_account_id = await createQuickBooksAccount(qbo, incomeAccountData);
      await User.update({ quickbooks_income_account_id }, { where: { id: user.id } });
    }
    if (!quickbooks_expense_account_id) {
      quickbooks_expense_account_id = await createQuickBooksAccount(qbo, expenseAccountData);
      await User.update({ quickbooks_expense_account_id }, { where: { id: user.id } });
    }
    if (!quickbooks_asset_account_id) {
      quickbooks_asset_account_id = await createQuickBooksAccount(qbo, assetAccountData);
      await User.update({ quickbooks_asset_account_id }, { where: { id: user.id } });
    }
  }

  return {
    incomeAccountId: quickbooks_income_account_id,
    expenseAccountId: quickbooks_expense_account_id,
    assetAccountId: quickbooks_asset_account_id
  };
};


exports.createQuickBooksInvoice = async (userId, invoiceItems, total, note, quickbooks_customer_id) => {
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const realmId = user.quickbooks_realm_id;
    if (!realmId) {
      throw new Error('QuickBooks realm ID not found for user');
    }

    let accessToken = await exports.refreshQuickBooksToken(userId);

    const qbo = new QuickBooks(
      process.env.QUICKBOOKS_CLIENT_ID,
      process.env.QUICKBOOKS_CLIENT_SECRET,
      accessToken,
      false, // No OAuth 1.0
      realmId,
      true, // Use sandbox
      false, // Turn off debugging
      4, // Minor version
      '2.0', // OAuth version
      process.env.QUICKBOOKS_CLIENT_ID // Consumer key as token secret
    );

    // Ensure necessary accounts exist
    const { incomeAccountId, expenseAccountId, assetAccountId } = await ensureQuickBooksAccounts(qbo, user);

    // Check and create items if not already in QuickBooks
    for (const item of invoiceItems) {
      let quickbooksItemId;
      let item_id = item.id;

      const package = await Package.findOne({ where: { id: item_id } });

      if (!package) {
        throw new Error(`Package with id ${item_id} not found`);
      }

      if (package.quickbooks_item_id) {
        quickbooksItemId = package.quickbooks_item_id;
      } else {
        const itemData = {
          name: item.name,
          description: item.description,
          taxable: item.taxable,
          price: item.price,
          type: 'Service', // Adjust as needed
          incomeAccountRef: { value: incomeAccountId, name: 'Sales of Product Income Studio' },
          expenseAccountRef: { value: expenseAccountId, name: 'Cost of Goods Sold Studio' },
        };
        quickbooksItemId = await createQuickBooksItem(qbo, itemData);
        await Package.update({ quickbooks_item_id: quickbooksItemId }, { where: { id: item_id } });
      }

      item.id = quickbooksItemId;
    }

    const invoiceData = {
      Line: invoiceItems.map(item => ({
        Amount: item.price,
        DetailType: 'SalesItemLineDetail',
        SalesItemLineDetail: {
          ItemRef: {
            value: item.id.toString(),
            name: item.name
          },
          Qty: item.quantity,
          UnitPrice: item.price
        }
      })),
      CustomerRef: {
        value: quickbooks_customer_id.toString()
      },
      TotalAmt: total,
      PrivateNote: note
    };

    const invoice = await new Promise((resolve, reject) => {
      qbo.createInvoice(invoiceData, (error, invoice) => {
        if (error) {
          console.log(JSON.stringify(error));
          reject(error);
        } else {
          resolve(invoice);
        }
      });
    });

    // Generate shareable link
    // const invoiceId = invoice.Id;
    // const sendInvoiceData = {
    //   sendTo: "customer@example.com" // The recipient's email address
    // };

    // const shareLink = await new Promise((resolve, reject) => {
    //   qbo.sendInvoice(invoiceId, sendInvoiceData, (error, result) => {
    //     if (error) {
    //       console.error('Error sending QuickBooks invoice:', JSON.stringify(error));
    //       reject(new Error('Could not send QuickBooks invoice: ' + error.message));
    //     } else {
    //       resolve(result.Invoice.Link); // Assuming the link is provided in this property
    //     }
    //   });
    // });

    return {
      qb_invoice: invoice,
      // shareLink
    };
  } catch (error) {
    console.error('Error creating QuickBooks invoice:', error);
    throw new Error('Could not create QuickBooks invoice');
  }
};





const createQuickBooksItem = (qbo, item) => {
  console.log("item>>>>>",item)
  return new Promise((resolve, reject) => {
    const itemData = {
      Name: item.name,
      Description: item.description || '',
      Active: true,
      FullyQualifiedName: item.name,
      Taxable: item.taxable || false,
      UnitPrice: item.price,
      Type: item.type, // Assuming `item.type` is provided and set appropriately
      IncomeAccountRef: { value: item.incomeAccountRef.value, name: item.incomeAccountRef.name },
      ExpenseAccountRef: { value: item.expenseAccountRef.value, name: item.expenseAccountRef.name },
    };

    if (item.type === 'Inventory') {
      itemData.QtyOnHand = item.qtyOnHand || 0;
      itemData.AssetAccountRef = { value: item.assetAccountRef.value, name: item.assetAccountRef.name };
      itemData.InvStartDate = item.invStartDate || new Date().toISOString().split('T')[0];
    }

    qbo.createItem(itemData, (error, newItem) => {
      if (error) {
        console.error('Error creating QuickBooks item:', JSON.stringify(error));
        reject(new Error('Could not create QuickBooks item: ' + error.message));
      } else {
        resolve(newItem.Id);
      }
    });
  });
};






exports.getQuickBooksAccessToken = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  return user.quickbooks_access_token;
};
