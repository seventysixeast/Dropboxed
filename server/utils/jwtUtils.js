const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(userId, subdomain) {
    const jwtSecret = process.env.JWT_SECRET;
    return jwt.sign({ userId, subdomain }, jwtSecret, { expiresIn: '12h' });
}

module.exports = { generateAccessToken };
