const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(userId) {
    const jwtSecret = process.env.JWT_SECRET;
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '12h' });
}

module.exports = { generateAccessToken };
